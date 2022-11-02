"use strict";

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "PhoneState",
    // Fields
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      phone: {
        type: DataTypes.STRING,
      },
      state: {
        type: DataTypes.STRING,
      },
      data: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    // Model options
    {
      tableName: "phone_states",
      timestamps: false,
    }
  );
};
