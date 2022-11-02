import { Model, DataTypes, CreationOptional } from 'sequelize';
import sequelize from '../config/connection.mjs'

class Visitor extends Model {
    declare id: CreationOptional<number>;
    declare data: object;
    declare hidden: boolean;
}

Visitor.init(
    { 
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        data: {
            type: DataTypes.JSON
        },
        hidden: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }

    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'visitor',
    }
);

export default Visitor;