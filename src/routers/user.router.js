import userControllers from "../controllers/user.controlller.js";

const userRouter = (router, model) => {
    router.get('/user', userControllers(model).getAllUser);
    router.get('/user/:id', userControllers(model).getUserById);
    router.post('/user', userControllers(model).createUser);
    router.put('/user/:id', userControllers(model).updateUser);
    router.delete('/user', userControllers(model).deleteUser);

    // Method Handle Like
    router.post('/handleLike', userControllers(model).handleLikeMethod);
    // Get Like By Restaurant
    router.get('/likeByRes/:id', userControllers(model).getLikeByRes)
    // Get Like By Restaurant
    router.get('/likeByUser/:id', userControllers(model).getLikeByUser)
}

export default userRouter;