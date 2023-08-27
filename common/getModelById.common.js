const getModelById = async(req, res, model, idField, modelName, likeModelName, arrInclude) => {
    try {
        let { id } = req.params;

        // Get Detail Entity with Likes
        const detailEntity = await model[modelName].findOne({
            where: {
                [idField]: id,
            },
            include: [
                {
                    model: model[likeModelName],
                    as: likeModelName,
                    include: arrInclude
                }
            ]
        });

        if (detailEntity === null) {
            return res.status(404).send({
                status: 404,
                message: `Not found ${modelName} with id = ${id}`,
                data: []
            });
        }

        res.status(200).send({
            status: 200,
            message: 'Success',
            data: [detailEntity]
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export default getModelById;