import rate_resControllers from "../controllers/rate_res.controller.js";

const rate_resRouter = (router, model) => {
    router.post('/rate', rate_resControllers(model).createRate);
    router.put('/rate/:user_id/:res_id', rate_resControllers(model).updateRate);
    router.delete('/rate', rate_resControllers(model).deleteRate);

    // Get Like By Restaurant
    router.get('/rateByRes/:id', rate_resControllers(model).getRateByRes)
    // Get Like By Restaurant
    router.get('/rateByUser/:id', rate_resControllers(model).getRateByUser)
}

export default rate_resRouter;