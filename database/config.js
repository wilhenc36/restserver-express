const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_ATLAS, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("The connection database is ready!");
  } catch (error) {
    console.log(error);
    throw new Error("Error on the database");
  }
};

module.exports = {
  dbConnection,
};
