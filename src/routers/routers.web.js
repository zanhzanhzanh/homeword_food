import userRouter from "./user.router.js";
import rate_resRouter from "./rate_res.router.js";
import orderRouter from "./order.router.js";

const routers = (app, router, model) => {
    userRouter(router, model);
    rate_resRouter(router, model);
    orderRouter(router, model);
    
    // Tạo tiền tố cho các router
    return app.use('/', router);
}

export default routers;