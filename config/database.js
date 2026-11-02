const mongoose = require("mongoose");
const seedDemoData = require("./seed");

const RETRY_MS = 10000;
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// İlk bağlantı başarısız olursa (ör. Atlas cluster'ı uykudan uyanıyorsa) sunucu
// bağlantısız kalmasın diye 10 sn arayla yeniden dener.
const databaseConnect = async () => {
  for (let attempt = 1; ; attempt++) {
    try {
      await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: RETRY_MS });
      console.log("MongoDB bağlantısı başarılı");
      break;
    } catch (error) {
      console.error(`MongoDB bağlantı hatası (deneme ${attempt}, ${RETRY_MS / 1000} sn sonra tekrar):`, error.message);
      await wait(RETRY_MS);
    }
  }

  try {
    await seedDemoData();
  } catch (error) {
    console.error("Demo verisi kurulamadı:", error);
  }
};

module.exports = databaseConnect;
