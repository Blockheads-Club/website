import type { Dict } from './en';

export const tr: Dict = {
  meta: {
    title: 'Blockheads Club',
    description:
      'The Blockheads için oyuncuların yaptığı ücretsiz, açık kaynaklı araçlar: oyunu bilgisayarında oyna, yeni telefonlarda düzelt ve arkadaşların için dünya aç.',
    titles: {
      home: 'Blockheads Club',
      download: 'İndir · Blockheads Club',
      pc: 'Blockheads PC · Blockheads Club',
      patcher: 'Patcher · Blockheads Club',
      server: 'Sunucu · Blockheads Club',
      mods: 'Modlar · Blockheads Club',
      modsSubmit: 'Mod gönder · Blockheads Club',
      contribute: 'Katkı ver · Blockheads Club',
      about: 'Hakkında ve yasal · Blockheads Club',
      moved: 'Bu sayfa taşındı · Blockheads Club'
    }
  },
  nav: {
    skip: 'İçeriğe geç',
    label: 'Ana gezinme',
    home: 'Blockheads Club ana sayfa',
    apps: 'Uygulamalar',
    docs: 'Dokümanlar',
    contribute: 'Katkı ver',
    about: 'Hakkında ve yasal',
    download: 'İndir',
    github: 'GitHub’da kaynak kodu',
    menu: 'Menü',
    openMenu: 'Menüyü aç',
    closeMenu: 'Menüyü kapat',
    language: 'Dil',
    themeToLight: 'Açık temaya geç',
    themeToDark: 'Koyu temaya geç',
    themeLight: 'Açık',
    themeDark: 'Koyu',
    notSure: 'Hangisine ihtiyacın olduğundan emin değil misin?',
    helpChoose: 'Seçmeme yardım et'
  },
  apps: {
    pc: {
      task: 'Bilgisayarımda oynamak',
      menu: 'Kendi kopyanı Windows, macOS ve Linux’ta oyna',
      card: 'Oyunun kendi kopyasını pencerede ya da tam ekranda, klavye ve fareyle oyna.',
      get: 'Blockheads PC’yi indir'
    },
    patcher: {
      task: 'Telefonumdaki oyunu düzeltmek',
      menu: 'Oyunu yeni Android telefonlarda düzelt',
      card: 'Oyunun yeni Android sürümlerinde donmasını ya da çökmesini engeller. Tarayıcında da çalışır.',
      get: 'Patcher’ı indir'
    },
    server: {
      task: 'Arkadaşlarımla oynamak',
      menu: 'Arkadaşların için bir dünya aç',
      card: 'Arkadaşlarının katılabileceği bir dünya aç — PC’de, eski bir telefonda, Raspberry Pi’de ya da Docker ile.',
      get: 'Sunucuyu indir'
    },
    mods: {
      task: 'Mod eklemek',
      menu: 'Sunuculara ve oyuna yeni şeyler ekle'
    },
    names: { server: 'Sunucu', mods: 'Modlar' }
  },
  devices: {
    windows: 'Windows',
    macos: 'macOS',
    linux: 'Linux',
    android: 'Android',
    pi: 'Raspberry Pi',
    docker: 'Docker',
    ios: 'iPhone / iPad',
    web: 'Web',
    desktop: 'Masaüstü'
  },
  common: {
    unofficial: 'Resmî olmayan hayran projesi. Majic Jungle Software veya Noodlecake ile bağlantısı yoktur.',
    free: 'Ücretsiz',
    openSource: 'Açık kaynak',
    learnMore: 'Daha fazlasını öğren'
  },
  home: {
    badge: 'Ücretsiz · Açık kaynak · Oyuncuların eseri',
    title: 'The Blockheads’i oyuncuları yaşatıyor.',
    lead: 'Oyunu bilgisayarında oynamak, yeni telefonlarda düzeltmek ve arkadaşların için dünya açmak için ücretsiz araçlar.',
    cta: 'Doğru indirmeyi bul',
    ctaWhat: 'Blockheads Club nedir?',
    q: 'Ne yapmak istiyorsun?',
    qLead: 'Üç ücretsiz uygulama. Ne yapmak istiyorsan ona uygun olanı seç.',
    mods: {
      title: 'Modlar geldi',
      body: 'Sunucun için komutlar, sohbet araçları ve mini oyunlar; yöneticilerin gözden geçirdiği herkese açık bir listeden. Kendi modunu da yapabilirsin.',
      link: 'Modlara göz at'
    },
    what: {
      eyebrow: 'Blockheads Club nedir?',
      title: 'Sevdiğimiz bir oyunu oynanabilir tutan bir oyuncu grubu.',
      lead: 'The Blockheads, 2013’ten kalma bir kum havuzu oyunu. Yeni telefonlar ve bilgisayarlar oyunun bazı yerlerini bozdu. İnsanlar oynamaya devam edebilsin diye ücretsiz araçlar yapıyoruz — ve tüm kodu paylaşıyoruz.',
      free: 'Ücretsiz, reklamsız',
      gpl: 'Açık kaynak (GPL)',
      steps: [
        { title: 'Kendi kopyanı getir', body: 'Zaten sahip olduğun oyun dosyasını kullanırsın. Oyunu asla paylaşmayız ya da satmayız.' },
        {
          title: 'Ücretsiz bir araç seç',
          body: 'Blockheads PC, Patcher ya da Sunucu. Hepsi açık kaynak, yani ne yaptığını herkes kontrol edebilir.'
        },
        { title: 'Oyna', body: 'Dünyaların kendi cihazlarında kalır. Takılırsan dokümanlardaki rehberler yardım eder.' }
      ]
    },
    join: {
      eyebrow: 'Oyuncuların eseri',
      title: 'Gel, yardım et — her beceri işe yarar.',
      lead: 'Programcı olman gerekmez. Çeviriler, hata bildirimleri ve rehberler de kod kadar yardımcı olur.',
      cta: 'Katkı ver',
      code: 'Koda bak',
      cards: [
        { title: 'Kod yaz', body: 'Rust, TypeScript ve Svelte — ilk iş için uygun konular etiketli' },
        { title: 'Çevir', body: 'English, Türkçe, Русский, Қазақша — ve yeni diller' },
        { title: 'Test et, hata bildir', body: 'Yeni sürümleri dene, neyin bozulduğunu söyle' },
        { title: 'Rehber yaz', body: 'Dokümanlarda diğer oyunculara yardım et' }
      ]
    },
    releases: {
      title: 'Son sürümler',
      all: 'GitHub’daki tüm sürümler',
      whatsNew: 'Yenilikler',
      note: 'Site derlenirken GitHub sürümlerinden doldurulur, böylece hiç eskimez.',
      failed: 'Son sürüm için GitHub’a bak'
    },
    docs: {
      eyebrow: 'Dokümanlar',
      title: 'Takıldın mı? Dokümanlarda adım adım rehberler var.',
      lead: 'Her platform için kurulum adımları, yedekleme, sunucu açma ve sık sorulan soruların yanıtları. 4 dilde.',
      cta: 'Dokümanları aç'
    }
  },
  product: {
    home: 'Ana sayfa',
    apps: 'Uygulamalar',
    breadcrumb: 'Sayfa yolu',
    what: 'Ne yapar',
    how: 'Nasıl çalışır',
    before: 'Başlamadan önce',
    platforms: 'Platformlar',
    open: 'Aç',
    download: 'İndir',
    otherPlatforms: 'Diğer platformlar',
    help: 'Yardım mı lazım?',
    helpLead: 'Dokümanlarda resimli, adım adım rehberler var. 4 dilde.',
    report: 'GitHub’da sorun bildir',
    latest: 'GitHub’daki son sürüm'
  },
  pc: {
    tagline: 'The Blockheads’in kendi kopyasını bilgisayarında oyna.',
    lead: 'Windows, macOS ve Linux için ücretsiz bir başlatıcı. Klavye ve fare, büyük pencere ya da tam ekran — dünyaların güvende kalır.',
    features: [
      { title: 'Klavye ve fareyle oyna', body: 'Tuşlarını kendin ayarla. Oyun kolları da çalışır.' },
      { title: 'Her pencere boyutu', body: 'Küçük pencereden tam ekrana, büyük ekranlarda da net.' },
      { title: 'İstediğin sunucuya katıl', body: 'Blockheads Sunucu dünyalarında arkadaşlarınla oyna.' }
    ],
    steps: [
      { title: 'Blockheads PC’yi kur', body: 'Normal bir yükleyici. Hesap gerekmez.' },
      { title: 'Oyun dosyanı ekle', body: 'Sahip olduğun oyunun APK’sını seç (1.7.4 – 1.7.6). Oyunu asla paylaşmayız.' },
      { title: 'Oyna', body: 'Ayarların ve dünyaların bilgisayarında kalır.' }
    ],
    before: [
      'Oyunun kendi kopyan (APK dosyası)',
      '64 bit Windows 10 ya da 11, macOS 11 veya daha yeni, ya da Linux',
      'Intel, AMD veya ARM işlemci'
    ],
    platforms: ['Windows 10, 11', 'macOS 11+', 'Linux · AppImage, .deb, .rpm'],
    guides: ['Oyun dosyasını telefonundan al', 'Kur, kayıtları aktar ve kontrolleri ayarla', 'Bir arkadaşının sunucusuna katıl'],
    snipTitle: 'Kopyan · hazır',
    snipPlay: 'Oyna'
  },
  patcher: {
    tagline: 'The Blockheads’i yeni Android telefonlarda düzelt.',
    lead: 'Bazı sürümler yeni Android’de donar ya da çöker. Patcher, kendi kopyanı birkaç tıklamayla onarır — tarayıcında, telefonunda ya da bilgisayarda.',
    primary: 'Web Patcher’ı aç',
    features: [
      { title: 'Donmayı ve çökmeleri düzeltir', body: '1.7.4 – 1.7.6 sürümleri için. Sürümünün ihtiyaç duyduğu düzeltmeleri işaretler.' },
      { title: 'Hiçbir şey yüklenmez', body: 'Her şey, tarayıcıda bile, kendi cihazında olur.' },
      { title: 'Paketlerle daha fazla düzeltme', body: 'İsteğe bağlı: yama paketlerini içe aktar, daha fazla düzeltme ekle.' }
    ],
    steps: [
      { title: 'Oyununu ver', body: 'APK dosyasını bırak ya da Android’de yüklü oyunu seç.' },
      { title: 'Düzeltmeleri kontrol et', body: 'Patcher sürümünü bulur ve gerekenleri işaretler.' },
      { title: 'Kur ve oyna', body: 'Önce dünyalarını yedekle — rehber nasıl yapılacağını gösterir.' }
    ],
    before: [
      'Oyunun kendi kopyan (sürüm 1.7.4 – 1.7.6)',
      'Bir tarayıcı ya da uygulama için Android 7.0 veya daha yeni',
      'Dünyalarının bir yedeği'
    ],
    platforms: ['Her tarayıcı · kurulum yok', 'Android uygulaması', 'Windows', 'macOS', 'Linux'],
    guides: ['Telefondaki oyunu baştan sona düzelt', 'Yamalamadan önce dünyalarını yedekle', 'APK’yı telefonundan al'],
    snipFound: 'Oyun 1.7.6 bulundu',
    snipReady: 'Hazır',
    snipFix1: 'Karşılama penceresi donması',
    snipFix2: 'Dünya yükleme çökmesi'
  },
  server: {
    tagline: 'Arkadaşlarının katılabileceği bir dünya aç.',
    lead: 'PC’de çalıştır, eski bir Android telefonu sunucuya çevir ya da bir dünyayı Raspberry Pi’de veya Docker ile 7/24 açık tut.',
    features: [
      { title: 'Arkadaşlarınla oyna', body: 'Aynı Wi-Fi’da bir dakikada, ya da port yönlendirmeyle internet üzerinden.' },
      { title: 'Yönetmesi kolay', body: 'Başlat, durdur, dünyaları yedekle ve oyuncuları basit bir uygulamadan yönet.' },
      { title: 'Modlar', body: 'Gözden geçirilmiş herkese açık listeden sunucu modları ekle.' }
    ],
    steps: [
      { title: 'Sunucuyu kur', body: 'Masaüstü ya da Android uygulaması — veya Linux’ta tek komut.' },
      { title: 'Bir dünya seç ya da oluştur', body: 'Sıfırdan başla ya da elindeki bir dünyayı getir.' },
      { title: 'Adresi paylaş', body: 'Arkadaşların adresle ya da QR kodu tarayarak katılır.' }
    ],
    before: [
      'Herhangi bir 64 bit bilgisayar, Raspberry Pi ya da Android 7.0+ telefon',
      'Oyuncuların oyunun kendi kopyası olmalı',
      'İnternet için: port yönlendirme (rehber aşağıda)'
    ],
    platforms: ['Windows, macOS, Linux uygulaması', 'Android uygulaması', 'Raspberry Pi', 'Docker', 'Ekransız Linux'],
    guides: ['Aynı Wi-Fi’daki arkadaşlarınla oyna', 'Sunucunu internete aç', 'Raspberry Pi’de 7/24 sunucu çalıştır'],
    tech: {
      eyebrow: 'Teknik sunucu sahipleri için',
      title: 'Linux, Pi ya da Docker’da tek komut.',
      lead: 'Orijinaliyle aynı seçeneklere sahip ekransız bir sunucu; dünyalar tek klasörde, loglar stdout’ta.',
      link: 'Dokümanlarda sunucu başvurusu',
      tabs: 'Platform'
    }
  },
  copy: {
    copy: 'Kopyala',
    copied: 'Kopyalandı',
    failed: 'Kopyalanamadı',
    command: 'Komutu kopyala'
  },
  download: {
    title: 'Doğru indirmeyi bul',
    lead: 'İki soruyu yanıtla. Dosyayı senin için seçeriz. Hepsi ücretsiz.',
    q1: 'Ne yapmak istiyorsun?',
    q2: 'Hangi cihaz?',
    detected: 'Sanırız şunu kullanıyorsun:',
    yours: 'Senin indirmen',
    for: {
      windows: 'Windows için',
      macos: 'macOS için',
      linux: 'Linux için',
      android: 'Android için',
      pi: 'Raspberry Pi için',
      docker: 'Docker için',
      ios: 'iPhone / iPad için'
    },
    button: {
      windows: 'Windows için indir',
      macos: 'macOS için indir',
      linux: 'Linux için indir',
      android: 'APK’yı indir',
      pi: 'Raspberry Pi için indir',
      docker: 'İndir',
      ios: 'İndir'
    },
    files: {
      pcWin: 'Windows 10 ve 11 için yükleyici (.exe) · 64 bit',
      pcMac: 'macOS 11 veya daha yeni için uygulama (.dmg) · Apple silicon',
      pcLinux: 'AppImage · x86-64',
      patcherWin: 'Windows için masaüstü uygulaması (.exe) · 64 bit',
      patcherMac: 'macOS için masaüstü uygulaması (.dmg) · Apple silicon ve Intel',
      patcherLinux: 'AppImage · x86-64',
      patcherAndroid: 'Android uygulaması (.apk) · Android 7.0 veya daha yeni',
      serverWin: 'Windows için masaüstü uygulaması (.exe) · 64 bit',
      serverMac: 'macOS için masaüstü uygulaması (.dmg) · Apple silicon',
      serverLinux: 'Masaüstü uygulaması (AppImage) · x86-64',
      serverAndroid: 'Android uygulaması (.apk) · telefonu sunucuya çevirir',
      serverPi: '64 bit Raspberry Pi OS için ekransız sunucu (.tar.gz)',
      serverDocker: 'GitHub Container Registry’de resmî imaj · x86-64 ve ARM'
    },
    alts: {
      winArm: 'ARM’de Windows',
      macIntel: 'Intel Mac',
      macArm: 'Apple silicon',
      deb: '.deb',
      rpm: '.rpm',
      linuxArm: 'ARM64 AppImage',
      headless: 'Ekransız sunucu (.tar.gz)',
      apk32: 'Eski 32 bit telefonlar',
      piArmv7: '32 bit Raspberry Pi OS',
      winCli: 'Komut satırı sunucusu (.zip)'
    },
    also: 'Şunlar da var:',
    none: {
      pcAndroid: 'Blockheads PC bilgisayarlar içindir. Android telefonda oyunu Patcher düzeltir.',
      pcPi: 'Blockheads PC henüz Raspberry Pi’de çalışmıyor. Pi, sunucu açmak için harika.',
      pcDocker: 'Docker sunucu açmak içindir, oyun oynamak için değil.',
      pcIos: 'Uygulamalarımız iPhone ya da iPad’de çalışmaz. Bunun yerine Windows, Mac, Linux veya Android cihaz kullan.',
      patcherPi: 'Pi’nin tarayıcısında web Patcher’ı kullan — kurulacak bir şey yok.',
      patcherDocker: 'Patcher’ın Docker imajı yok. Herhangi bir tarayıcıda web Patcher’ı kullan.',
      patcherIos: 'Patcher oyunun Android sürümünü düzeltir. iPhone ya da iPad’deki oyunu değiştiremez.',
      serverIos: 'Sunucu iPhone ya da iPad’de çalışmaz. Eski bir Android telefon veya herhangi bir bilgisayar olur.'
    },
    notHere: 'burada yok',
    go: { patcher: 'Patcher’ı indir', server: 'Sunucuyu indir', web: 'Web Patcher’ı aç' },
    orWeb: 'Ya da indirmeyi atla:',
    orWebLink: 'Patcher’ı tarayıcında kullan',
    own: 'Oyunu kendin getir',
    ownApk: 'Oyunun APK dosyası lazım. Oyunu asla paylaşmayız.',
    ownServer: 'Oyuncular kendi oyun kopyalarıyla katılır. Sunucu oyunu içermez.',
    guide: 'Kurulum rehberi',
    guideHint: 'Adım adım, resimli',
    notes: 'Sürüm notları ve sağlama toplamları',
    notesHint: 'Dosyanın bizden olduğunu kontrol et',
    apkNote: 'Android, tarayıcından kurulum yapmana izin vermeni ister. Rehber nasıl yapılacağını gösterir.',
    failedTitle: 'Son sürümü yükleyemedik.',
    failedBody: 'Tüm dosyalar her zaman GitHub Releases’ta, sağlama toplamlarıyla birlikte.',
    failedButton: 'GitHub Releases’ı aç',
    all: 'Tüm indirmeler',
    tableApp: 'Uygulama',
    webRow: 'Patcher · web',
    webOpen: 'Tarayıcında aç',
    webHint: '— modern tarayıcısı olan her cihazda çalışır, ilk ziyaretten sonra çevrimdışı da',
    image: 'İmaj',
    older: 'Eski sürümler, kaynak kodu ve sağlama toplamları:',
    olderLink: 'GitHub Releases',
    footnote: 'Resmî olmayan hayran projesi. Oyunun kendisini asla dağıtmayız — kendi kopyan lazım.'
  },
  contribute: {
    eyebrow: 'Katkı ver',
    title: 'Blockheads Club senin gibi insanlar tarafından yapılıyor.',
    lead: 'Buradaki her şey ücretsiz ve GPL altında açık kaynak. Küçük bir şey seç — her katkı işe yarar.',
    github: 'GitHub’ı aç',
    issues: 'İlk iş konularına göz at',
    cards: [
      {
        title: 'Kod yaz',
        body: 'Her uygulamada Rust, TypeScript ve Svelte, Android için biraz Kotlin. “good first issue” etiketli bir konuyla başla.'
      },
      {
        title: 'Çevir',
        body: 'English, Türkçe, Русский ve Қазақша’yı güncel tut — ya da yeni bir dil ekle. Kod bilmen gerekmez.'
      },
      { title: 'Test et, hata bildir', body: 'Yeni sürümleri dene, neyin bozulduğunu söyle. Açık hata bildirimleri çok işe yarar.' },
      {
        title: 'Rehber yaz',
        body: 'Çözdüğün bir şeyi anlat. Rehberler dokümanlarda durur ve herkes değişiklik önerebilir.'
      },
      {
        title: 'Diğer oyunculara yardım et',
        body: 'GitHub konularındaki soruları yanıtla. Birçok oyuncu yamalamaya ya da sunucu açmaya yeni.'
      },
      { title: 'Mod yap', body: 'Seninkini herkes için herkese açık listede yayınla.' }
    ],
    links: ['İlk iş bul', 'Çeviri dosyalarını aç', 'Hata bildir', 'Dokümanları düzenle', 'Açık konular', 'Modlar hakkında'],
    langTitle: 'Çeviriler',
    langHint: 'Site derlenirken web sitesinin çeviri dosyalarından sayılır.',
    langReview: 'Ana dili konuşan birinin incelemesini bekliyor',
    goodTitle: 'Bilmen iyi olur',
    good: [
      'Nazik ve sabırlı ol. Buradaki herkes gönüllü.',
      'Oyunun kendisini asla paylaşma: ne konularda ne de başka bir yerde.',
      'Tüm kod GPL. Katkı vererek çalışmanı bu lisansla paylaşmayı kabul edersin.',
      'Çocuklar da hoş geldi — GitHub hesabı açmadan önce bir büyüğe sor.'
    ]
  },
  about: {
    eyebrow: 'Hakkında',
    title: 'Bir oyunu oynanabilir tutan oyuncular.',
    lead: 'Blockheads Club gönüllü, açık kaynaklı bir proje. İnsanlar The Blockheads’i bugünün cihazlarında oynamaya devam edebilsin diye ücretsiz araçlar yapıyoruz.',
    toc: 'Bu sayfada',
    us: 'Biz kimiz',
    usBody: [
      'Küçük bir oyuncu ve geliştirici grubu. Yeni Android sürümleri birçok kişi için oyunu bozduğu için başladık: oyun ilk pencerede donuyordu.',
      'Önce Patcher geldi. Sonra herkesin dünya açabilmesi için özel sunucunun açık kaynaklı yeniden yazımı ve bilgisayarda oynamak için Blockheads PC. Sırada modlar var.',
      'Gönüllüler tarafından [GitHub’daki Blockheads Club organizasyonunda](org) sürdürülür.'
    ],
    legal: 'Resmî olmayan bir hayran projesi',
    legalBody: [
      'Blockheads Club; Majic Jungle Software veya Noodlecake tarafından yapılmamıştır, onlarla **bağlantılı değildir** ve onlarca onaylanmamıştır. “The Blockheads” sahiplerinin ticari markasıdır.',
      'Oyunu asla paylaşmayız ya da satmayız. Her araç, kendi cihazında sahip olduğun bir kopyayla çalışır. Logomuz ve tasarımımız bize aittir.',
      'Yazılım “olduğu gibi”, garanti olmadan sunulur. Yamalamadan ya da güncellemeden önce dünyalarını yedekle. Hak sahipleri bize [GitHub’da bir konu açarak](websiteIssues) ulaşabilir.'
    ],
    lic: 'Lisanslar',
    licBody: [
      'Tüm kodumuz GNU General Public License (GPL-3.0-or-later) altında özgür yazılımdır. Kullanabilir, inceleyebilir, değiştirebilir ve paylaşabilirsin. Üçüncü taraf lisansları her uygulamada listelenir.',
      'Bu web sitesinin kodu ve metni aynı lisans altındadır. Yazı tipleri: SIL Open Font License.'
    ],
    priv: 'Gizlilik',
    privBody:
      'Bu web sitesinde analiz, izleme ya da çerez yok. Yalnızca temanı ve dilini tarayıcında hatırlar. Uygulamalarımız cihazında çalışır: oyun dosyan ve dünyaların asla bize yüklenmez.',
    contact: 'İletişim',
    contactBody: 'En hızlı yol GitHub: hatalar ya da sorular için bir konu aç.',
    issue: 'Konu aç'
  },
  moved: {
    title: 'Bu sayfa dokümanlara taşındı.',
    body: 'Seni şimdi oraya götürüyoruz.',
    link: 'Aç'
  },
  notFound: {
    title: 'Bu blok eksik.',
    body: 'Sayfa taşınmış ya da hiç var olmamış.',
    home: 'Ana sayfaya dön',
    docs: 'Dokümanlarda ara'
  },
  mods: {
    eyebrow: 'Modlar',
    title: 'The Blockheads için modlar',
    lead: 'Sunucular ve istemciler için topluluk modlarına göz at. Her mod, neler yapabildiğini açıkça listeler.',
    safeTitle: 'Varsayılan olarak güvenli',
    safeBody:
      'Sunucu sahipleri her modun neler yapabileceğine karar verir: bir mod yalnızca sana verdiğin izinleri alır. WebAssembly modları bir kum havuzunda çalışır.',
    permRead: 'Dünyayı oku',
    permChange: 'Dünyayı değiştir',
    permNet: 'İnternet: tek bir sunucu',
    nativeTitle: 'Yerel kod · tam erişim',
    nativeBody:
      'Kum havuzunun dışında çalışan modlar her zaman ek bir güvenlik incelemesinden geçer; bir güncelleme daha fazlasını istediğinde de yeniden.',
    sample: 'Örnek veri: mod dizini henüz yayında değil, aşağıdaki modlar örnektir.',
    searchLabel: 'Modlarda ara',
    searchPlaceholder: 'Ada, kimliğe, açıklamaya veya etikete göre ara',
    tagsLabel: 'Etikete göre süz',
    allTags: 'Tüm etiketler',
    resultsStatus: { one: 'mod gösteriliyor', few: 'mod gösteriliyor', many: 'mod gösteriliyor', other: 'mod gösteriliyor' },
    noResults: 'Aramana uyan mod yok.',
    clear: 'Aramayı temizle',
    by: 'yazan:',
    draft: 'Taslak',
    allYanked: 'Tüm sürümler geri çekildi',
    submitButton: 'Mod gönder',
    makeButton: 'Mod yap',
    clientRequired: 'Oyuncular da kurmalı',
    version: 'Sürüm',
    sides: { server: 'Sunucu', client: 'İstemci', both: 'Sunucu + istemci' },
    native: {
      badge: 'Yerel kod',
      warn: 'Yerel kodu korumalı alanın dışında çalıştırır. Yalnızca yazarına güveniyorsan kur.'
    },
    perms: {
      none: 'Özel bir izne ihtiyacı yok.',
      world: {
        read: { label: 'Dünya: okuma', text: 'Dünyayı okuyabilir: blokları, eşyaları ve diğer verileri.' },
        write: { label: 'Dünya: yazma', text: 'Dünyayı değiştirebilir: blok koyabilir ve kırabilir, eşya ekleyebilir.' }
      },
      players: {
        chat: { label: 'Sohbet', text: 'Oyunculara sohbet mesajı gönderebilir.' },
        teleport: { label: 'Işınlama', text: 'Oyuncuları ışınlayabilir.' },
        kick: { label: 'Atma', text: 'Oyuncuları sunucudan atabilir.' },
        ban: { label: 'Yasaklama', text: 'Oyuncuları yasaklayabilir.' },
        inventory: { label: 'Envanter', text: 'Oyuncuların taşıdıklarına bakabilir ve değiştirebilir.' },
        health: { label: 'Can', text: 'Oyuncuların canını değiştirebilir.' }
      },
      http: { label: 'İnternet', text: 'Şu sitelere bağlanabilir:' },
      channels: { label: 'Mesajlar', text: 'Sunucu, istemciler ve diğer modlar arasında kendi mesajlarını gönderebilir.' }
    },
    detail: {
      breadcrumb: 'Gezinti yolu',
      all: 'Tüm modlar',
      noDescription: 'Açıklama yok.',
      owners: 'Sahipler',
      repo: 'Kaynak kod',
      tags: 'Etiketler',
      versions: 'Sürümler',
      columns: { version: 'Sürüm', published: 'Yayın tarihi', size: 'Boyut', sides: 'Çalıştığı yer', download: 'İndir' },
      select: 'Ayrıntıları göster',
      selected: 'Gösterilen',
      yanked: 'Geri çekildi',
      latest: 'En yeni',
      download: 'İndir',
      mirror: 'Yansı',
      sha: 'SHA-256',
      copy: 'Kopyala',
      copied: 'Kopyalandı',
      copyFailed: 'Kopyalanamadı',
      copyLabel: 'SHA-256’yı kopyala',
      noDownload: 'Bu modun tüm sürümleri geri çekildi, indirilecek bir şey yok.',
      api: 'Gereken mod API’si',
      loader: 'Yükleyici',
      depends: 'Gerektirdiği modlar',
      softDepends: 'Şunlarla daha iyi çalışır',
      notInIndex: 'dizinde yok',
      noDepends: 'Başka mod gerekmiyor.',
      permsTitle: 'Bu sürüm neler yapabilir',
      draftNote: 'Bu bir taslak kayıt: mod henüz yayında değil ve indirilecek bir şey yok.',
      installTitle: 'Nasıl kurulur',
      players: 'Oyuncular',
      playersBody: 'İstemci modları mod yükleyiciyle kurulur: PC Sürümü başlatıcısında ya da Android’de oyunun içinde (bir Patcher seçeneği). İkisi de şimdilik geliştirme sürümlerinde.',
      admins: 'Sunucu yöneticileri',
      adminsBody:
        '`.bhmod` dosyasını indirip sunucunun `mods/` klasörüne at, sonra izinlerini `mods.toml` içinde ver. Blockheads Server geliştirme sürümlerinde Lua ve WASM modlarını çalıştırır; bir sürüm arkasından gelecek.',
      nativeTitle: 'Yerel kod: dikkatli ol',
      nativeBody:
        'Bu sürüm yerel kodu korumalı alanın dışında çalıştırır. Bilgisayarında programın yapabildiği her şeyi yapabilir. Yalnızca yazarına güveniyorsan ve kaynağı okuduysan kur.'
    },
    submit: {
      eyebrow: 'Modlar',
      title: 'Mod gönder',
      lead: 'Modlar, Blockheads-Club/mods deposuna gönderilen bir çekme isteğiyle (pull request) listelenir. CI dosyaları kontrol eder, gerisini bir bakımcı inceler.',
      stepsTitle: 'Nasıl gönderilir',
      steps: [
        {
          title: 'Modunu derle ve yayınla',
          body: '`bhmod pack` çalıştır ve `.bhmod` dosyasını kendi deponun bir sürümüne ekle. İndirme bağlantısı `.bhmod` ile biten herkese açık bir `https://` adresi olmalı.'
        },
        {
          title: 'Blockheads-Club/mods deposunu çatalla',
          body: 'Tek bir dosya ekle: `mods/<first letter>/<id>.toml` (ilk harf, mod kimliğinin ilk harfidir), örneğin `mods/h/hello-lua.toml`. Modun adı, sahipleri, deposu ve yayınlanmış tüm sürümleri bu dosyada durur.'
        },
        {
          title: 'Sürümü tanımla',
          body: 'Her sürüm için indirme adresini, `.bhmod` dosyasının SHA-256 değerini ve boyutunu, tarafları, API aralığını, izinleri ve tarihi yaz.'
        },
        {
          title: 'Çekme isteği aç',
          body: 'CI aşağıdaki kontrolleri çalıştırır ve sonucu yorum olarak yazar. Bir bakımcı inceleyip birleştirir. Sonra dizin yeniden oluşturulur ve bu sayfa bir sonraki derlemede onu alır.'
        }
      ],
      rulesTitle: 'Kurallar',
      rules: [
        'Her çekme isteğinde tek mod.',
        'Her yeni mod güvenlik incelemesinden geçer: listelenmeden önce bir bakımcı kodunu okur. Güncellemeler yeni izin veya yerel kod eklediğinde tekrar incelenir.',
        'Dosyada listelenen sahipler dışında kimse sürüm ekleyemez. İlk gönderen ilk sahip olur.',
        'Sürümler yalnızca eklenir. Yayınlanmış bir sürümü asla düzenleme veya silme; izin verilen tek değişiklik bozuk ya da güvensiz bir sürümü geri çekmek için `yanked = true` yazmaktır.',
        'Yalnızca kendi yaptığın veya paylaşma hakkın olan modları gönder ve lisansını deponda tut.',
        'Yalnızca modun gerçekten ihtiyaç duyduğu izinleri iste.',
        'Oyun dosyası ve kopyalanmış oyun varlığı yok.'
      ],
      ciTitle: 'CI neleri kontrol eder',
      ci: [
        'Dosya dizin şemasına uyar ve yolu mod kimliğiyle eşleşir.',
        'Çekme isteği tam olarak bir moda dokunur.',
        'Sürümler yalnızca eklenir; mevcut olanlar yalnızca `yanked` ile değişir.',
        'Çekme isteğini açan kişi `owners` listesindedir.',
        'İndirme çalışır; SHA-256 ve boyut eşleşir.',
        'Paket, paket kurallarına uyar ve `mod.toml` dosyası kayıtla eşleşir.',
        'Bağımlılıklar dizinde vardır ve sürüm aralıkları karşılanabilir.',
        'WASM modülleri doğrulanır, Lua/Luau betikleri derlenir.',
        'İzin farkı paylaşılır. Her yeni mod, yerel kod kullanan sürümler ve yeni izin ekleyen güncellemeler `needs-security-review` etiketini alır ve bir bakımcının incelemesini bekler.'
      ],
      nativeTitle: 'Yerel modlar',
      nativeBody: '`native = true` olan modlar korumalı alanın dışında kod çalıştırır. İzin verilir, ama elle incelenir ve kırmızı bir uyarıyla gösterilir.',
      toolsTitle: 'Araçlar',
      toolsBody: 'Mod SDK’sında `bhmod` komut satırı aracı, şemalar ve örnekler var.',
      sdkButton: 'Mod SDK’sını aç',
      modsButton: 'Blockheads-Club/mods’u aç',
      docsButton: 'Mod yapma (dokümanlar)',
    }
  },
  footer: {
    tagline: 'The Blockheads için oyuncuların yaptığı ücretsiz, açık kaynaklı araçlar.',
    disclaimer:
      'Resmî olmayan hayran projesi. Majic Jungle Software veya Noodlecake ile bağlantısı yoktur. Oyunun kendi kopyası sende olmalı.',
    apps: 'Uygulamalar',
    help: 'Yardım',
    project: 'Proje',
    allDownloads: 'Tüm indirmeler',
    guides: 'Kurulum rehberleri',
    faq: 'SSS',
    bug: 'Hata bildir',
    licence: 'Lisans (GPL)',
    fine: 'Kod GPL ile lisanslıdır · “The Blockheads” sahiplerinin ticari markasıdır.',
    nav: 'Alt bilgi'
  }
};
