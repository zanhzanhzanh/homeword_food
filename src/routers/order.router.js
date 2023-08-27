import orderControllers from "../controllers/order.controller.js";

const orderRouter = (router, model) => {
    router.post('/order', orderControllers(model).createOrder);
    router.put('/order/:code', orderControllers(model).updateOrder);
    router.delete('/order', orderControllers(model).deleteOrder);
}

export default orderRouter;