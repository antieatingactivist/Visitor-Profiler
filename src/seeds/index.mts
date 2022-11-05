import sequelize from "../config/connection.mjs";
import Visitor from "../models/Visitor.mjs";
import visitorData from "./visitor-seeds.json" assert { type: "json" };


const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await Visitor.bulkCreate(visitorData, {
        individualHooks: true,
        returning: true
    });


    process.exit(0);
};

seedDatabase();
