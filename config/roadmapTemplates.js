// Yapay zekâ servisi kullanılamadığında (API anahtarı yok, model hatası, kota) "Yol Haritam"
// özelliğinin çalışmaya devam etmesi için hazır yol haritaları. Kullanıcının yazdığı metindeki
// anahtar kelimelere göre en uygun alan seçilir.

const ROADMAPS = [
  {
    keys: ["full stack", "fullstack", "full-stack", "mern"],
    title: "Full Stack Geliştirici Yol Haritası",
    steps: [
      "HTML, CSS ve modern JavaScript (ES6+) temelleri",
      "Git ve GitHub ile sürüm kontrolü",
      "React ile bileşen tabanlı arayüz geliştirme (state, props, hook'lar)",
      "Node.js ve Express ile REST API yazma",
      "MongoDB ya da PostgreSQL ile veri modelleme",
      "Kimlik doğrulama (JWT), güvenlik temelleri ve form doğrulama",
      "Next.js ile sunucu tarafı render ve tam yığın uygulama",
      "Test (Jest / Vitest), Docker ve bir bulut ortamına dağıtım",
    ],
    resources: ["MDN Web Docs", "react.dev resmi dokümantasyonu", "Node.js ve Express dokümantasyonu", "freeCodeCamp Full Stack müfredatı"],
    projects: ["Görev yönetimi uygulaması (giriş + CRUD)", "Blog platformu (yorum ve yönetici paneli)", "Gerçek zamanlı sohbet uygulaması (Socket.io)"],
  },
  {
    keys: ["backend", "back-end", "arka uç", "sunucu", "api", "node", "express", "asp.net", ".net", "c#", "java", "spring"],
    title: "Backend Geliştirici Yol Haritası",
    steps: [
      "Bir programlama dili seç ve iyice öğren (JavaScript/Node.js, C#/.NET ya da Java)",
      "Git, Linux komut satırı ve HTTP'nin çalışma mantığı",
      "REST API tasarımı: kaynaklar, durum kodları, doğrulama, hata yönetimi",
      "Veritabanları: SQL (PostgreSQL / SQL Server) ve bir NoSQL (MongoDB)",
      "ORM kullanımı (Prisma, Entity Framework Core ya da Hibernate)",
      "Kimlik doğrulama ve yetkilendirme (JWT, roller), güvenlik (OWASP Top 10)",
      "Önbellekleme (Redis), kuyruklar ve arka plan işleri",
      "Test, Docker, CI/CD ve bulutta yayınlama",
    ],
    resources: ["Resmi dil/framework dokümantasyonu", "roadmap.sh/backend", "PostgreSQL Tutorial", "OWASP Top 10"],
    projects: ["Kimlik doğrulamalı not uygulaması API'si", "Rezervasyon sistemi (çakışma kontrolü ile)", "Dosya yükleme ve e-posta bildirimli bir servis"],
  },
  {
    keys: ["frontend", "front-end", "ön yüz", "arayüz", "react", "vue", "angular", "web tasarım", "html", "css", "javascript"],
    title: "Frontend Geliştirici Yol Haritası",
    steps: [
      "HTML5 ve anlamsal (semantic) etiketler",
      "CSS: Flexbox, Grid, responsive tasarım; ardından Tailwind CSS",
      "JavaScript: DOM, olaylar, fetch, async/await, ES6+ özellikleri",
      "Git ve GitHub",
      "React: bileşenler, state, hook'lar, yönlendirme (React Router)",
      "Durum yönetimi (Redux Toolkit ya da Zustand) ve API entegrasyonu",
      "TypeScript ile tip güvenliği",
      "Next.js, erişilebilirlik, performans ve test",
    ],
    resources: ["MDN Web Docs", "javascript.info", "react.dev", "web.dev (performans ve erişilebilirlik)"],
    projects: ["Kişisel portföy sitesi", "Hava durumu uygulaması (açık bir API ile)", "E-ticaret ön yüzü (sepet ve filtreleme)"],
  },
  {
    keys: ["mobil", "mobile", "android", "ios", "flutter", "react native", "kotlin", "swift"],
    title: "Mobil Geliştirici Yol Haritası",
    steps: [
      "Yol seç: çapraz platform (Flutter ya da React Native) veya native (Kotlin / Swift)",
      "Dilin temelleri (Dart, JavaScript/TypeScript, Kotlin ya da Swift)",
      "Arayüz bileşenleri, yerleşim ve ekranlar arası gezinme",
      "Durum yönetimi (Riverpod / Redux / ViewModel)",
      "API'den veri çekme, yerel depolama ve çevrimdışı çalışma",
      "Bildirimler, kamera ve konum gibi cihaz özellikleri",
      "Test ve hata ayıklama",
      "Google Play / App Store'a yayınlama",
    ],
    resources: ["flutter.dev ya da reactnative.dev resmi dokümantasyonu", "Android Developers", "roadmap.sh/android"],
    projects: ["Yapılacaklar listesi (yerel kayıtlı)", "Haber okuma uygulaması (API)", "Harcama takip uygulaması (grafikli)"],
  },
  {
    keys: ["veri bilimi", "data science", "veri analizi", "makine öğrenmesi", "machine learning", "yapay zeka", "yapay zekâ", "python"],
    title: "Veri Bilimi ve Makine Öğrenmesi Yol Haritası",
    steps: [
      "Python temelleri",
      "Temel istatistik, olasılık ve lineer cebir",
      "NumPy ve Pandas ile veri işleme",
      "Matplotlib / Seaborn ile görselleştirme",
      "SQL ile veri sorgulama",
      "Scikit-learn ile makine öğrenmesi (regresyon, sınıflandırma, kümeleme)",
      "Model değerlendirme ve özellik mühendisliği",
      "Derin öğrenmeye giriş (PyTorch ya da TensorFlow) ve projeleri yayınlama",
    ],
    resources: ["Kaggle Learn", "Python resmi dokümantasyonu", "Scikit-learn kullanıcı rehberi"],
    projects: ["Ev fiyatı tahmini", "Müşteri segmentasyonu", "Kaggle yarışmasına katılım"],
  },
  {
    keys: ["devops", "bulut", "cloud", "docker", "kubernetes", "aws", "azure"],
    title: "DevOps Yol Haritası",
    steps: [
      "Linux, komut satırı ve ağ temelleri",
      "Git ve bir betik dili (Bash ya da Python)",
      "Docker ile konteynerleştirme",
      "CI/CD (GitHub Actions)",
      "Bir bulut sağlayıcı (AWS, Azure ya da GCP)",
      "Altyapıyı kodla yönetme (Terraform)",
      "Kubernetes temelleri",
      "İzleme ve loglama (Prometheus, Grafana)",
    ],
    resources: ["roadmap.sh/devops", "Docker resmi dokümantasyonu", "GitHub Actions dokümantasyonu"],
    projects: ["Bir web uygulamasını Docker ile paketleyip CI/CD ile yayınlama", "Terraform ile küçük bir bulut altyapısı"],
  },
  {
    keys: ["oyun", "game", "unity", "unreal", "godot"],
    title: "Oyun Geliştirici Yol Haritası",
    steps: [
      "Bir motor seç: Unity (C#), Godot (GDScript) ya da Unreal (C++)",
      "Dilin ve motorun temelleri: sahneler, nesneler, bileşenler",
      "2D oyun mekanikleri: hareket, çarpışma, puan",
      "Fizik, animasyon ve ses",
      "Arayüz, menüler ve kayıt sistemi",
      "3D temelleri ve kamera kontrolü",
      "Optimizasyon ve test",
      "Oyunu yayınlama (itch.io, Google Play, Steam)",
    ],
    resources: ["Resmi motor dokümantasyonu", "Motorların resmi öğretici projeleri"],
    projects: ["Basit bir platform oyunu", "Mobil için küçük bir bulmaca oyunu"],
  },
  {
    keys: ["siber", "güvenlik", "security", "pentest", "hacking"],
    title: "Siber Güvenlik Yol Haritası",
    steps: [
      "Ağ temelleri (TCP/IP, DNS, HTTP) ve Linux",
      "İşletim sistemi ve komut satırı güvenliği",
      "Bir betik dili (Python ya da Bash)",
      "Web güvenliği ve OWASP Top 10",
      "Kriptografi temelleri",
      "Sızma testi araçları (yasal ortamlarda)",
      "Olay müdahalesi ve log analizi",
      "Sertifikalar (Security+, eJPT gibi)",
    ],
    resources: ["OWASP", "TryHackMe ve Hack The Box (yasal laboratuvarlar)"],
    projects: ["Kendi laboratuvarında zafiyetli bir uygulamayı test etme", "Bir web uygulaması için güvenlik kontrol listesi"],
  },
];

const OFF_TOPIC =
  "Yalnızca yazılım alanlarında yol haritası verebilirim (örneğin backend, frontend, mobil, oyun geliştirme).";

const normalize = (text) => String(text || "").toLocaleLowerCase("tr-TR");

const findRoadmap = (content) => {
  const text = normalize(content);
  let best = null;
  let bestScore = 0;
  for (const roadmap of ROADMAPS) {
    const score = roadmap.keys.reduce((sum, key) => (text.includes(key) ? sum + key.length : sum), 0);
    if (score > bestScore) {
      best = roadmap;
      bestScore = score;
    }
  }
  return best;
};

const buildTemplateRoadmap = (content) => {
  const text = normalize(content);
  if (/sen kimsin|kimsin\?/.test(text)) return "Ben yazılım yol arkadaşınım.";

  const roadmap = findRoadmap(content);
  if (!roadmap) {
    const looksLikeSoftware = /yazılım|kod|program|geliştir|developer|yol harita/.test(text);
    if (!looksLikeSoftware) return OFF_TOPIC;
  }
  const chosen = roadmap || ROADMAPS[0];

  // Ön yüz metni <pre> içinde düz metin olarak gösteriyor; bu yüzden Markdown işareti kullanılmaz
  return [
    chosen.title.toLocaleUpperCase("tr-TR"),
    "",
    "Adım adım öğrenme sırası:",
    ...chosen.steps.map((step, i) => `  ${i + 1}. ${step}`),
    "",
    "Önerilen kaynaklar:",
    ...chosen.resources.map((r) => `  • ${r}`),
    "",
    "Pratik için proje fikirleri:",
    ...chosen.projects.map((p) => `  • ${p}`),
    "",
    "Her adımı küçük bir projeyle pekiştir ve kodunu GitHub'a yükle; düzenli pratik, en hızlı ilerleme yoludur.",
  ].join("\n");
};

module.exports = { buildTemplateRoadmap };
