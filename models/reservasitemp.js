"use strict";

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "ReservasiTemp",
    // Fields
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      kota_start: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      kota_arrive: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      outlet_start: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      outlet_arrive: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tanggal_keberangkatan: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      waktu_keberangkatan: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      jumlah_penumpang: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      count_seat: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      schedule_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      schedule_class_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      trx_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      additional_data: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    // Model options
    {
      tableName: "reservasi_temps",
      timestamps: false,
    }
  );
};
