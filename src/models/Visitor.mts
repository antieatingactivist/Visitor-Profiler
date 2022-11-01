import { Model, DataTypes, CreationOptional } from 'sequelize';
import sequelize from '../config/connection.mjs'

class Visitor extends Model {
    declare id: CreationOptional<number>;
    declare data: object;
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