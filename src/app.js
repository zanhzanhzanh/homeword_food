// Import modules
import getAllRouters from './routers/routers.web.js';
import configServer from './config/configServer.js';
// const { sequelize } = require('./models');
// Import librarys
import express from 'express';
// Use Module
const router = express.Router();
const app = express();

// Config Module
const { PORT, model } = configServer(app);

// Get all routers
getAllRouters(app, router, model);

// Listen on PORT
app.listen(PORT, () => {
    console.log("Listen on PORT:", PORT);
})