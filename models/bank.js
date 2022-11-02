"use strict";

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Bank",
    // Fields
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      account_no: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      account_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    // Model options
    {
      tableName: "banks",
      timestamps: false,
    }
  );
};
