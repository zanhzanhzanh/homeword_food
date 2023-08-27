import getModelById from "../../common/getModelById.common.js";

const userControllers = (model) => {
    return {
        getAllUser: async (req, res) => {
            try {
                let getData = await model.user.findAll();
                
                res.status(200).send({
                    status: 200,
                    message: 'Success',
                    data: getData
                });
            } catch (error) {
                console.log(error);
                res.status(500).send(error);
            }
        },

        getUserById: async(req, res) => {
            try {
                const { id } = req.params;
    
                // Get Detail User
                const detailUser = await model.user.findOne({
                    where: {
                        user_id: id,
                    }
                });

                if(detailUser == null) {
                    return res.status(404).send({
                        status: 404,
                        message: `Not found user with id = ${id}`,
                        data: []
                    });
                }
    
                res.status(200).send({
                    status: 200,
                    message: 'Success',
                    data: [detailUser]
                });
            } catch (error) {
                console.log(error);
                res.status(500).send(error);
            }
        },

        createUser: async (req, res) => {
            try {
                // Get all attr
                const { full_name, email, password } = req.body;

                // Check Regex
                if(!String(email)
                .toLowerCase()
                .match(
                    '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'
                )) {
                    return res.status(400).send({
                        status: 400,
                        message: `Wrong email syntax!`,
                        data: []
                    });
                }

                // Check Email
                let checkEmail = await model.user.findOne({
                    where: {
                        email
                    }
                })

                if(checkEmail != null) {
                    return res.status(400).send({
                        status: 400,
                        message: `Email has been taken!`,
                        data: []
                    });
                }

                // Add New User
                const newUser = await model.user.create({ full_name, email, password });

                res.status(200).send({
                    status: 200,
                    message: 'Success Create',
                    data: [newUser]
                });
            } catch (error) {
                console.log(error);
                res.status(500).send(error);
            }
        },

        updateUser: async(req, res) => {
            try {
                let { id } = req.params;
                let { full_name, email, password } = req.body;

                // Check Regex
                if(!String(email)
                .toLowerCase()
                .match(
                    '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'
                )) {
                    return res.status(400).send({
                        status: 400,
                        message: `Wrong email syntax!`,
                        data: []
                    });
                }

                // Get Detail User
                const detailUser = await model.user.findOne({
                    where: {
                        user_id: id,
                    }
                });

                // Check If Exist
                if(detailUser) {
                    // Check Email
                    if(detailUser.email != email) {
                        const checkEmail = await model.user.findOne({
                            where: {
                                email,
                            }
                        });
        
                        if(checkEmail) return res.status(400).send({
                            status: 400,
                            message: `Email has been taken!`,
                            data: []
                        });
                    }

                    // Re-assign value
                    detailUser.full_name = full_name;
                    detailUser.email = email;
                    detailUser.password = password;

                    // Update
                    detailUser.save();
                
                    res.status(200).send({
                        status: 200,
                        message: 'Success Updated',
                        data: [detailUser]
                    });
                } else return res.status(404).send({
                    status: 404,
                    message: `Not found user with id = ${id}`,
                    data: []
                });
            } catch(error) {
                console.log(error);
                res.status(500).send(error);
            }
        },
        
        deleteUser: async (req, res) => {
            try {
                const { id } = req.body;

                // Get Detail User
                const detailUser = await model.user.findOne({
                    where: {
                        user_id: id,
                    }
                });

                // Check Exist
                if(!detailUser) {
                    return res.status(404).send({
                        status: 404,
                        message: `Not found user with id = ${id}`,
                        data: []
                    });
                }

                // Delete User
                await model.user.destroy({
                    where: {
                        user_id: id,
                    }
                });

                res.status(200).send({
                    status: 200,
                    message: 'Success Deleted',
                    data: []
                });
            } catch (error) {
                console.log(error);
                res.status(500).send(error);
            }
        },

        handleLikeMethod: async (req, res) => {
            try {
                let { user_id, res_id } = req.body;

                // Get Detail User
                const detailUser = await model.user.findOne({
                    where: {
                        user_id,
                    }
                });

                // Check Exist
                if(!detailUser) {
                    return res.status(404).send({
                        status: 404,
                        message: `Not found user with id = ${user_id}`,
                        data: []
                    });
                }

                // Get Detail Restaurant
                const detailRes = await model.restaurant.findOne({
                    where: {
                        res_id,
                    }
                });

                // Check Exist
                if(!detailRes) {
                    return res.status(404).send({
                        status: 404,
                        message: `Not found restaurant with id = ${res_id}`,
                        data: []
                    });
                }

                // Check Like Exist
                const detailLike_res = await model.like_res.findOne({
                    where: {
                        user_id,
                        res_id
                    }
                });

                if(detailLike_res) {
                    // Delete Old Like_res
                    const newLike = await model.like_res.destroy({
                        where: {
                            user_id,
                            res_id,
                        }
                    });
    
                    res.status(200).send({
                        status: 200,
                        message: 'Success Deleted',
                        data: []
                    });
                } else {
                    // Add New Like_res
                    const newLike = await model.like_res.create({
                        user_id, res_id, date_like: new Date()
                    });
    
                    res.status(200).send({
                        status: 200,
                        message: 'Success Create',
                        data: [newLike]
                    });
                }
            } catch (error) {
                console.log(error);
                res.status(500).send(error);
            }

        },

        getLikeByRes: async(req, res) => {
            await getModelById(req, res, model, "res_id", "restaurant", "like_res", ["user"])
        },

        getLikeByUser: async(req, res) => {
            await getModelById(req, res, model, "user_id", "user", "like_res", ["re"])
        } 
    }
}

export default userControllers;