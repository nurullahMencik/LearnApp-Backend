const mongoose = require("mongoose");
const seedDemoData = require("./seed");

const databaseConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB bağlantısı başarılı");
  } catch (error) {
    console.error("MongoDB bağlantı hatası:", error);
    return;
  }

  try {
    await seedDemoData();
  } catch (error) {
    console.error("Demo verisi kurulamadı:", error);
  }
};

module.exports = databaseConnect;
