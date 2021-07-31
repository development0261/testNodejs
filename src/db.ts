import { createConnection } from "typeorm";
//connection with mysql data base
const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../.env') });
const envVarsSchema = Joi.object();
const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

const connection = createConnection({
    type: envVars.DB_TYPE,
    host: envVars.DB_HOST,
    port: envVars.DB_PORT,
    username: envVars.DB_USERNAME,
    password: envVars.DB_PASSWORD,
    database: envVars.DB_NAME,
    entities: [
        __dirname + "/entity/*.ts"
    ],
    migrationsTableName: "custom_migration_table",
    migrations: ["migration/*.js"],
    cli: {
        "migrationsDir": "migration"
    },
    synchronize: true,
    logging: false
});

module.exports = connection;