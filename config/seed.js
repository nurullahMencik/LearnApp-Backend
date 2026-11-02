// Demo verisi: veritabanında hiç kurs yoksa (yeni ya da sıfırlanmış veritabanı)
// demo yönetici hesabını ve public/uploads içindeki videolarla örnek kursları oluşturur.
// Veri zaten varsa hiçbir şeye dokunmaz.
const bcrypt = require("bcryptjs");
const User = require("../models/authModel");
const Course = require("../models/courseModel");

const DEMO_ADMIN = {
  username: "admin",
  email: "admin@gmail.com",
  password: "123456",
};

// fileUrl/imageUrl: repodaki public/uploads dosyaları (sunucu /uploads altında yayınlar)
const DEMO_COURSES = [
  {
    title: "TypeScript'e Giriş: Neden ve Nasıl?",
    description: "JavaScript'e tip güvenliği kazandıran TypeScript'in temel kavramları, ES5/ES6 farkları ve gerçek projelerde neden tercih edildiği.",
    category: "Frontend",
    price: 349,
    fileUrl: "/uploads/1747685007413-194783431.mp4",
    imageUrl: "/uploads/1747685007467-882512123.png",
  },
  {
    title: "Yazılımcının Bir Günü",
    description: "Bir yazılım geliştiricinin gününün nasıl geçtiği: planlama, kod yazma, kod incelemesi ve ekip çalışması.",
    category: "Full Stack",
    price: 199,
    fileUrl: "/uploads/1747685340768-456237393.mp4",
    imageUrl: "/uploads/1747685340792-803156775.png",
  },
  {
    title: "Back-End Nedir? Temel Kavramlar",
    description: "Sunucu, veritabanı ve API kavramlarıyla back-end geliştirmenin temelleri; bir isteğin baştan sona yolculuğu.",
    category: "Backend",
    price: 299,
    fileUrl: "/uploads/1747685450916-285861604.mp4",
    imageUrl: "/uploads/1747685450954-34018224.png",
  },
  {
    title: "Frontend ve Backend Arasındaki Fark",
    description: "Kullanıcının gördüğü arayüz ile arka planda çalışan sunucu arasındaki iş bölümü ve iki tarafın nasıl haberleştiği.",
    category: "Full Stack",
    price: 249,
    fileUrl: "/uploads/1747685631897-279783132.mp4",
    imageUrl: "/uploads/1747685631931-930791811.png",
  },
  {
    title: "6 Ayda Full Stack Geliştirici Yol Haritası",
    description: "HTML/CSS/JavaScript ile başlayıp Node.js, veritabanları ve React ile devam eden, adım adım planlanmış 6 aylık öğrenme rotası.",
    category: "Full Stack",
    price: 499,
    fileUrl: "/uploads/1747685970736-766033722.mp4",
    imageUrl: "/uploads/1747685970742-318966168.png",
  },
  {
    title: "JavaScript Neden Bu Kadar Önemli?",
    description: "Web'in dili JavaScript'in tarayıcıdan sunucuya ve mobile uzanan kullanım alanları ve öğrenmeye nereden başlanacağı.",
    category: "Frontend",
    price: 279,
    fileUrl: "/uploads/1747686159294-716699378.mp4",
    imageUrl: "/uploads/1747686159301-264896350.png",
  },
  {
    title: "Android Geliştirici Yol Haritası",
    description: "Kotlin, Android Studio, arayüz tasarımı ve mağazaya yayın: Android geliştirici olmak için izlenecek adımlar.",
    category: "Mobil Geliştirme",
    price: 399,
    fileUrl: "/uploads/1747686587052-185898048.mp4",
    imageUrl: "/uploads/1747686587057-751214108.png",
  },
  {
    title: "Front-End Geliştirici Yol Haritası",
    description: "HTML5, CSS3, responsive tasarım ve JavaScript ile başlayan, framework'lere uzanan front-end öğrenme planı.",
    category: "Frontend",
    price: 299,
    fileUrl: "/uploads/1747686775426-601815875.mp4",
    imageUrl: "/uploads/1747686775437-819301551.png",
  },
  {
    title: "Python ile Web Sitesi Oluşturma",
    description: "Python ve popüler web framework'leriyle sıfırdan basit bir web sitesi kurmanın temel adımları.",
    category: "Backend",
    price: 349,
    fileUrl: "/uploads/1747687042097-346661934.mp4",
    imageUrl: "/uploads/1747687042113-225903593.png",
  },
  {
    title: "Java ile İlk Programımız",
    description: "Java kurulumu, ilk 'Merhaba Dünya' programı ve nesne yönelimli programlamaya giriş.",
    category: "Backend",
    price: 299,
    fileUrl: "/uploads/1747687286115-415603166.mp4",
    imageUrl: "/uploads/1747687286129-732963670.png",
  },
  {
    title: "Veri Bilimi Size Göre mi?",
    description: "Veri biliminin ne olduğu, hangi becerileri gerektirdiği ve bu alanda kariyer yapmak isteyenler için ilk adımlar.",
    category: "Veri Bilimi",
    price: 249,
    fileUrl: "/uploads/1747687444341-397654379.mp4",
    imageUrl: "/uploads/1747687444349-612988384.png",
  },
  {
    title: "JavaScript Öğrenirken Zaman Kaybetmeyin",
    description: "JavaScript öğrenirken en sık yapılan hatalar ve öğrenme sürecini hızlandıracak pratik öneriler.",
    category: "Frontend",
    price: 199,
    fileUrl: "/uploads/1747687657094-252588358.mp4",
    imageUrl: "/uploads/1747687657132-139159679.png",
  },
];

const seedDemoData = async () => {
  if ((await Course.estimatedDocumentCount()) > 0) {
    return;
  }

  let admin = await User.findOne({ email: DEMO_ADMIN.email });
  if (!admin) {
    admin = await User.create({
      username: DEMO_ADMIN.username,
      email: DEMO_ADMIN.email,
      password: await bcrypt.hash(DEMO_ADMIN.password, 12),
      isAdmin: true,
    });
  }

  // Kurslar sırayla eklenmiş gibi görünsün diye oluşturulma tarihleri birer gün arayla
  const now = Date.now();
  const courses = await Course.insertMany(
    DEMO_COURSES.map((course, i) => ({
      ...course,
      user: admin.username,
      createdAt: new Date(now - (DEMO_COURSES.length - i) * 24 * 60 * 60 * 1000),
    })),
  );

  admin.createdCourses = courses.map((c) => c._id);
  await admin.save();
  console.log(`Demo verisi kuruldu: ${courses.length} kurs, yönetici ${DEMO_ADMIN.email}`);
};

module.exports = seedDemoData;
