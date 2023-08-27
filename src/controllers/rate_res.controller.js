import getModelById from "../../common/getModelById.common.js";

const rate_resController = (model) => {
    return {
        createRate: async (req, res) => {
            try {
                // Get all attr
                const { user_id, res_id, amount } = req.body;

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

                // Get Detail Rate
                const detailRate = await model.rate_res.findOne({
                    where: {
                        user_id,
                        res_id
                    }
                });

                // Check Exist
                if(detailRate) {
                    return res.status(400).send({
                        status: 400,
                        message: 'This Rate Exist',
                        data: []
                    });
                }

                // Add New Rate
                const newRate = await model.rate_res.create({ user_id, res_id, amount, date_rate: new Date() });

                res.status(200).send({
                    status: 200,
                    message: 'Success Create',
                    data: [newRate]
                });
            } catch (error) {
                console.log(error);
                res.status(500).send(error);
            }
        },

        updateRate: async(req, res) => {
            try {
                let { user_id, res_id } = req.params;
                let { amount } = req.body;

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

                // Get Detail Rate
                const detailRate = await model.rate_res.findOne({
                    where: {
                        user_id,
                        res_id
                    }
                });

                // Check Exist
                if(!detailRate) {
                    return res.status(404).send({
                        status: 404,
                        message: `Not found rate_res`,
                        data: []
                    });
                }

                // Re-assign value
                detailRate.amount = amount;
                detailRate.date_rate = new Date();

                // Update
                detailRate.save();
            
                res.status(200).send({
                    status: 200,
                    message: 'Success Updated',
                    data: [detailRate]
                });
            } catch(error) {
                console.log(error);
                res.status(500).send(error);
            }
        },
        
        deleteRate: async (req, res) => {
            try {
                const { user_id, res_id } = req.body;

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

                // Get Detail Rate
                const detailRate = await model.rate_res.findOne({
                    where: {
                        user_id,
                        res_id
                    }
                });

                // Check Exist
                if(!detailRate) {
                    return res.status(404).send({
                        status: 404,
                        message: `Not found rate_res`,
                        data: []
                    });
                }

                // Delete Rate
                await model.rate_res.destroy({
                    where: {
                        user_id,
                        res_id
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

        getRateByRes: async(req, res) => {
            await getModelById(req, res, model, "res_id", "restaurant", "rate_res", ["user"])
        },

        getRateByUser: async(req, res) => {
            await getModelById(req, res, model, "user_id", "user", "rate_res", ["re"])
        }
    }
}

export default rate_resController