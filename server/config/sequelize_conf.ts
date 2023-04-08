import { Dialect, Sequelize } from "sequelize";

const dbName = process.env.DB_DATABASENAME as string
const dbUser = process.env.DB_USERNAME as string
const dbHost = process.env.DB_HOST
const dbDialect = process.env.DB_DIALECT as Dialect
const dbPassword = process.env.DB_PASSWORD as string

const sequelizeConnection = new Sequelize(
    dbName,
    dbUser,
    dbPassword,
    {
        host: dbHost,
        dialect: dbDialect
    }
);

export default sequelizeConnection;
