const  mongoose  = require("mongoose");


module.exports.connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error(`error : ${error.message} ~ ${error} `);
    process.exit(1);
  }
};