"use strict";

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "ViewSchedule",
    // Fields
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_rute: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      rute: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      nama_rute: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      departure: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      etd: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      arrival: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      eta: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      id_kendaraan: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      nama_kendaraan: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      id_driver: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      nama_driver: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      booked: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      price_online: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      kelas_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      departure_city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      arrival_city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      departure_outlet: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      arrival_outlet: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    // Model options
    {
      tableName: "v_full_schedule",
      timestamps: false,
    }
  );
};
