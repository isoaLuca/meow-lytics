module.exports = {
  development: {
    username: "CatMaster",
    password: "miaou12",
    database: "dbpaw",
    host: "db",
    dialect: "postgres",
  },
  test: {
    username: "CatMaster",
    password: "miaou12",
    database: "dbpaw",
    host: "db",
    dialect: "postgres",
  },
  production: {
    username: "CatMaster",
    password: "miaou12",
    database: "dbpaw",
    host: "db",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Pas bien mais bon...
      },
    },
  },
};
