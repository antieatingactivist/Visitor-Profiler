import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connection.mjs'

class Visitor extends Model {
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