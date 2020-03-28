module.exports = {
  "development": {
    "dialect": "postgres",
    "host": "localhost",
    "username": "postgres",
    "password": "12345",
    "database": "SoftwareRequirements",
    "port": "5432"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "production": {
    "dialect": "postgres",
    "host": process.env.DB_HOST,
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "port": process.env.DB_PORT
  }
}
