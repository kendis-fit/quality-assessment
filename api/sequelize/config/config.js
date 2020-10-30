module.exports = {
  "development": {
    "dialect": "postgres",
    "host": "localhost",
    "username": "postgres",
    "password": "12345",
    "database": "QualityDB",
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
    "host": process.env.POSTGRES_HOST,
    "username": process.env.POSTGRES_USER,
    "password": process.env.POSTGRES_PASSWORD,
    "database": process.env.POSTGRES_DB,
    "port": process.env.POSTGRES_PORT
  }
}
