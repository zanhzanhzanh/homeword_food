// Import librarys
import initModels from '../Models/init-models.js';
import sequelize from '../Models/index.js';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

const configServer = (app) => {
    // Config BodyParser
    app.use(bodyParser.json());

    // Config PORT
    dotenv.config();
    const PORT = process.env.PORT || 4000;

    // Config Sequelize
    const model = initModels(sequelize);

    return { PORT, model };
}

export default configServer;