import { DataTypes } from "sequelize";

export function getData(sequelize) {
	return sequelize.define("data", {
		id: {
			type: DataTypes.NUMBER,
			unique: true,
			allowNull: false,
			primaryKey: true,
		},
		url: {
			type: DataTypes.STRING,
			unique: false,
			allowNull: false,
		},
	}, { timestamps: false });
}