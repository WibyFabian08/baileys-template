"use strict";

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "PenumpangTemp",
    // Fields
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      reservasi_temps_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      penumpang_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      nomor: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      nama: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      seat: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      seat_name: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      additional_data: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    // Model options
    {
      tableName: "penumpang_temps",
      timestamps: false,
    }
  );
};
