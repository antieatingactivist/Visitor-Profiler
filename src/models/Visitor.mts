import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection.mjs";

class Visitor extends Model {
    declare id: number;
    declare createdAt: string;
    declare ip: string;
    declare data: object;
    declare hidden: boolean;
}

Visitor.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        data: {
            type: DataTypes.JSON
        },
        ip: {
            type: DataTypes.STRING
        },
        hidden: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }

    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: "visitor"
    }
);

export default Visitor;
