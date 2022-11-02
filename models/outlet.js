"use strict";

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Outlet",
    // Fields
    {
      code: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      kota: {
        type: DataTypes.STRING,
      },
    },
    // Model options
    {
      tableName: "outlet",
      timestamps: false,
    }
  );
};
