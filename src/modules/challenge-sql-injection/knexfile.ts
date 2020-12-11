export default {
    development: {
        client: "mysql2",
        connection: {
            host : process.env.MYSQL_HOST,
            user : process.env.MYSQL_DB_USER,
            password : process.env.MYSQL_DB_PASS,
            database : process.env.MYSQL_DB_NAME
        }
    },
    production: {
        client: "mysql2",
        connection: {
            host : process.env.MYSQL_HOST,
            user : process.env.MYSQL_DB_USER,
            password : process.env.MYSQL_DB_PASS,
            database : process.env.MYSQL_DB_NAME
        }
    }
};