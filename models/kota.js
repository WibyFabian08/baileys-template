"use strict";

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Kota",
    // Fields
    {
      code: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
