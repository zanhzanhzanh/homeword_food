import { Sequelize } from 'sequelize';

const sequelize = new Sequelize("homework_db", "root", "01696478018", {
    host: "localhost",
    port: 3306,
    dialect: "mysql"
})

export default sequelize;