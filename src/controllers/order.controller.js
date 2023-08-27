const orderController = (model) => {
    return {
        createOrder: async (req, res) => {
            try {
                // Get all attr
                const { user_id, food_id, amount, code, arr_sub_id } = req.body;

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

                // Get Detail Food
                const detailFood = await model.food.findOne({
                    where: {
                        food_id,
                    }
                });

                // Check Exist
                if(!detailFood) {
                    return res.status(404).send({
                        status: 404,
                        message: `Not found food with id = ${food_id}`,
                        data: []
                    });
                }

                // Get Detail Order
                const detailOrder = await model.order.findOne({
                    where: {
                        code,
                    }
                });

                // Check Exist
                if(detailOrder) {
                    return res.status(400).send({
                        status: 400,
                        message: `Code ${code} has been used!`,
                        data: []
                    });
                }

                let response_sub_objects = [];
                let message;

                await Promise.all(arr_sub_id.map(async e => {
                    let detailSub = await model.sub_food.findOne({
                        where: {
                            sub_id: e
                        }
                    })

                    // Check Exist
                    if(!detailSub) {
                        message = `Not found sub_food with id = ${e}`;
                    }

                    response_sub_objects.push(detailSub)
                }));

                if(message) {
                    return res.status(404).send({
                        status: 404,
                        message,
                        data: []
                    });
                }

                // Add New Order
                const newOrder = await model.order.create({ user_id, food_id, amount, code, arr_sub_id: '[' + arr_sub_id.toString() + ']' });

                newOrder.dataValues.arr_sub = response_sub_objects;

                res.status(200).send({
                    status: 200,
                    message: 'Success Create',
                    data: [newOrder]
                });
            } catch (error) {
                console.log(error);
                res.status(500).send(error);
            }
        },

        updateOrder: async(req, res) => {
            try {
                let { code } = req.params;
                let { food_id, amount, arr_sub_id } = req.body;

                // Get Detail Order
                const detailOrder = await model.order.findOne({
                    where: {
                        code,
                    }
                });

                // Check Exist
                if(!detailOrder) {
                    return res.status(404).send({
                        status: 404,
                        message: `Not found order with code = ${code}`,
                        data: []
                    });
                }

                // Get Detail Food
                const detailFood = await model.food.findOne({
                    where: {
                        food_id,
                    }
                });

                // Check Exist
                if(!detailFood) {
                    return res.status(404).send({
                        status: 404,
                        message: `Not found food with id = ${food_id}`,
                        data: []
                    });
                }

                let response_sub_objects = [];
                let message;

                await Promise.all(arr_sub_id.map(async e => {
                    let detailSub = await model.sub_food.findOne({
                        where: {
                            sub_id: e
                        }
                    })

                    // Check Exist
                    if(!detailSub) {
                        message = `Not found sub_food with id = ${e}`;
                    }

                    response_sub_objects.push(detailSub)
                }));

                if(message) {
                    return res.status(404).send({
                        status: 404,
                        message,
                        data: []
                    });
                }

                // Re-assign value
                detailOrder.food_id = food_id;
                detailOrder.amount = amount;
                detailOrder.arr_sub_id = '[' + arr_sub_id.toString() + ']';

                // Update
                detailOrder.save();

                detailOrder.arr_sub = response_sub_objects;
            
                res.status(200).send({
                    status: 200,
                    message: 'Success Updated',
                    data: [detailOrder]
                });
            } catch(error) {
                console.log(error);
                res.status(500).send(error);
            }
        },
        
        deleteOrder: async (req, res) => {
            try {
                const { code } = req.body;

                // Get Detail Order
                const detailOrder = await model.order.findOne({
                    where: {
                        code,
                    }
                });

                // Check Exist
                if(!detailOrder) {
                    return res.status(404).send({
                        status: 404,
                        message: `Not found order with code = ${code}`,
                        data: []
                    });
                }

                // Delete Order
                await model.order.destroy({
                    where: {
                        code
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
    }
}

export default orderController;