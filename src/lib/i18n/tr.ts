import type { Dict, GuideDoc } from './en';

export const tr: Dict = {
  meta: {
    title: 'Blockheads Club',
    description:
      'The Blockheads etrafında bir topluluk projesi: oyunu modern Android’de çalışır hale getiren bir yama aracı ve sıfırdan yazılmış açık kaynaklı bir sunucu.',
    titles: {
      home: 'Blockheads Club',
      server: 'Sunucu hızlı başlangıç · Blockheads Club',
      guides: 'Rehberler · Blockheads Club',
      faq: 'SSS · Blockheads Club',
      legal: 'Yasal bildirim · Blockheads Club',
      mods: 'Modlar · Blockheads Club',
      modsSubmit: 'Mod gönder · Blockheads Club'
    }
  },
  nav: {
    skip: 'İçeriğe geç',
    label: 'Ana gezinme',
    home: 'Blockheads Club ana sayfa',
    patcher: 'Patcher',
    server: 'Sunucu',
    guides: 'Rehberler',
    faq: 'SSS',
    mods: 'Modlar',
    docs: 'Dokümanlar',
    github: 'GitHub',
    menu: 'Menü',
    openMenu: 'Menüyü aç',
    closeMenu: 'Menüyü kapat',
    language: 'Dil',
    theme: 'Tema',
    themeToLight: 'Açık temaya geç',
    themeToDark: 'Koyu temaya geç',
    themeLight: 'Açık',
    themeDark: 'Koyu',
    themeSystem: 'Sistem',
    themeNowSystem: 'Sistem teması',
    themeNowLight: 'Açık tema',
    themeNowDark: 'Koyu tema'
  },
  home: {
    hero: {
      badge: 'Ücretsiz · açık kaynak · oyuncular tarafından',
      title: 'The Blockheads oynanabilir kalsın — bugünün telefonlarında ve kendi sunucularında.',
      lead: 'Blockheads Club bir topluluk projesidir. Yeni Android sürümleri oyunu bozduğunda onu düzeltiriz, arkadaşların için dünya barındırmanı sağlarız.',
      ctaFix: 'Oyunumu düzelt',
      ctaHost: 'Sunucu kur',
      disclaimer: 'Resmî olmayan hayran projesi. Majic Jungle Software veya Noodlecake ile bağlantısı yoktur.',
      cardTitle: 'Oyun 1.7.6 bulundu',
      ready: 'Hazır',
      fixPopup: 'Karşılama penceresi donması',
      fixWorld: 'Dünya yükleme çökmesi'
    },
    what: {
      eyebrow: 'Blockheads Club nedir?',
      title: 'Hâlâ sevdiğimiz bir oyun için kullanımı kolay araçlar.',
      lead: 'The Blockheads telefonlar için bir kum havuzu oyunudur. Bazı sürümler yeni Android telefonlarda düzgün açılmaz ve pek çok oyuncu kendi sunucusunu ister. İkisi için de ücretsiz araçlar geliştiriyoruz.',
      items: [
        {
          title: 'Açık kaynak, her zaman ücretsiz',
          body: 'Her araç GitHub’da. Herkes kodu okuyabilir, hata bildirebilir veya çeviriye yardım edebilir.'
        },
        {
          title: 'Kopyan sende kalır',
          body: 'Patcher, zaten sahip olduğun oyunu kendi cihazında değiştirir. Oyunu asla barındırmaz veya paylaşmayız.'
        },
        {
          title: 'Oyuncular tarafından yapıldı',
          body: 'Bu projeyi gönüllüler keyif için yürütür. Oyunun geliştiricileri değiliz ve onlarla bağlantımız yok.'
        }
      ]
    },
    patcher: {
      eyebrow: 'Blockheads Patcher',
      title: 'Oyun “Hoş geldin” penceresinde mi takıldı? Düzeltelim.',
      lead: 'Modern Android’de 1.7.4 ile 1.7.6 arası oyun sürümleri ilk pencerede donabilir. 1.7.6 ayrıca bir dünya yüklerken çökebilir. Patcher, kendi oyun kopyanı birkaç tıklamayla onarır.',
      fixes: [
        {
          title: 'Karşılama penceresi donması',
          versions: '1.7.4 · 1.7.5 · 1.7.6',
          body: 'Oyun modern Android’de yeniden normal şekilde açılır.'
        },
        {
          title: 'Dünya yükleme çökmesi',
          versions: '1.7.6',
          body: 'Dünyaların oyun kapanmadan yüklenir.'
        }
      ],
      noteStrong: 'Hiçbir şey internete yüklenmez.',
      note: 'Yama işlemi cihazında çalışır — web uygulaması bile tarayıcında çevrimdışı çalışır. Oyunun kendi kopyasına sahip olman gerekir.',
      howTitle: 'Nasıl çalışır',
      steps: [
        { title: 'Oyununu ver', body: 'APK dosyasını bırak. Android’de yüklü oyunu seçmen yeterli.' },
        { title: 'Düzeltmeleri kontrol et', body: 'Patcher sürümünü bulur ve gereken düzeltmeleri işaretler.' },
        {
          title: 'Kur ve oyna',
          body: 'Düzeltilmiş oyunu kaydet ya da doğrudan telefonuna kur. Önce dünyalarını yedekle — rehber nasıl yapılacağını gösterir.'
        }
      ],
      ctaWeb: 'Web Patcher’ı aç',
      getTitle: 'Patcher’ı indir',
      platforms: [
        { name: 'Web uygulaması', hint: 'Herhangi bir modern tarayıcı' },
        { name: 'Android', hint: 'APK · Android 7.0+' },
        { name: 'Windows', hint: '10 / 11 · x64' },
        { name: 'macOS', hint: 'Apple silicon ve Intel' },
        { name: 'Linux', hint: 'AppImage · .deb' }
      ],
      version:
        'Güncel sürüm **0.1.0** (ön sürüm, 20 Ekim 2026) · [Sürüm notları](patcherReleases) · [Sağlama toplamları](patcherReleases)'
    },
    server: {
      eyebrow: 'Blockheads Sunucu',
      title: 'Senin dünyan, senin kuralların, her zaman çevrimiçi.',
      lead: 'The Blockheads için açık kaynaklı bir özel sunucu. Bir bilgisayarda, Raspberry Pi’de veya Docker’da çalıştır — ya da eski bir Android telefonu uygulamamızla sunucuya çevir.',
      platforms: ['Windows', 'macOS', 'Linux', 'Raspberry Pi / ARM', 'Docker', 'Android uygulaması'],
      ctaStart: '5 dakikada başla',
      ctaDownloads: 'İndirmeler',
      exampleNote: 'Örnek çıktı. Sunucu sayfasındaki komutlar gerçek platformuna göredir.'
    },
    guides: {
      eyebrow: 'Rehberler',
      title: 'Adım adım, resimlerle.',
      all: 'Tüm rehberler',
      minRead: { one: 'dk okuma', few: 'dk okuma', many: 'dk okuma', other: 'dk okuma' }
    },
    faq: {
      eyebrow: 'SSS',
      title: 'Merak edilenler',
      lead: 'Yanıtı bulamadın mı? [Tüm soruları gör](faq) ya da [GitHub](websiteIssues)’da sor.',
      items: [
        {
          q: 'Bu resmî Blockheads mi?',
          a: 'Hayır. Blockheads Club bağımsız bir hayran projesidir. Majic Jungle Software veya Noodlecake ile bağlantımız yok ve oyunu dağıtmıyoruz.'
        },
        {
          q: 'Güvenli mi? Dosyalarımı görüyor musunuz?',
          a: 'Yama işlemi cihazında gerçekleşir. Bize veya başka birine hiçbir şey gönderilmez.'
        },
        {
          q: 'Dünyalarımı kaybeder miyim?',
          a: 'Android’de önce orijinal oyunu kaldırman gerekir. Bunu yapmadan önce dünyalarını yedekle.'
        }
      ]
    }
  },
  server: {
    hero: {
      eyebrow: 'Blockheads Sunucu',
      title: 'Arkadaşlarının istediği zaman katılabileceği bir dünya barındır.',
      lead: 'Ücretsiz, açık kaynaklı bir özel sunucu. Bir bilgisayarda, Raspberry Pi’de veya Docker’da çalıştır — ya da uygulamamızla bir Android telefonda.',
      ctaQuick: 'Hızlı başlangıç',
      ctaDownloads: 'Tüm indirmeler',
      whatTitle: 'Neler sunar',
      features: [
        { title: 'Dünyalar', hint: 'Oluştur, yükle, yedekle' },
        { title: 'Canlı konsol', hint: 'Arama, komutlar, geçmiş' },
        { title: 'Oyuncular', hint: 'At, yasakla, yönetici, moderatör' },
        { title: 'Erişim listeleri', hint: 'Beyaz liste, kara liste' }
      ],
      note: 'Masaüstü uygulaması, Android uygulaması ve tarayıcı yönetim paneli aynı arayüzü paylaşır.'
    },
    quick: {
      eyebrow: 'Hızlı başlangıç',
      title: 'Platformunu seç',
      lead: 'Her adımda kopyalayabileceğin bir komut var. Sunucuyu düzgünce durdurmak için konsoluna /stop yaz: dünyayı kaydeder ve kapanır. Ctrl + C son kaydı yapmadan durdurur.',
      tabsLabel: 'Platform',
      copy: 'Kopyala',
      copied: 'Kopyalandı',
      copyFailed: 'Kopyalanamadı',
      copyLabel: 'Komutu kopyala',
      platforms: {
        win: {
          label: 'Windows',
          steps: [
            {
              title: 'İndir ve arşivden çıkar',
              text: '`blockheads-server-v0.1.1-x86_64-pc-windows-msvc.zip` dosyasını (ARM’de `aarch64-pc-windows-msvc`) al ve bir klasöre çıkar, örneğin Belgeler\\Blockheads Server.',
              button: 'Windows için indir'
            },
            {
              title: 'Sunucuyu başlat',
              text: 'O klasörde PowerShell’i aç ve şunu çalıştır:',
              hint: 'Tıklamayı mı tercih edersin? Bunun yerine masaüstü uygulamasını kur — aynı özellikler düğmelerle gelir.'
            },
            {
              title: 'Ağında izin ver',
              text: 'Windows Güvenlik Duvarı sorduğunda **özel ağlarda** erişime izin ver. Şimdi telefonundan bağlan (aşağıda).'
            }
          ]
        },
        mac: {
          label: 'macOS',
          steps: [
            { title: 'İndir ve aç' },
            {
              title: 'macOS’un açmasına izin ver',
              text: 'İlk seferde, Gatekeeper’ın programa izin vermesi için indirme işaretini kaldır:'
            },
            { title: 'Sunucuyu başlat' }
          ]
        },
        linux: {
          label: 'Linux',
          steps: [
            { title: 'İndir ve aç' },
            {
              title: 'Sunucuyu başlat',
              hint: 'Raspberry Pi rehberiyle servis olarak çalıştır — oradaki systemd adımları her systemd Linux’ta çalışır.'
            }
          ]
        },
        pi: {
          label: 'Raspberry Pi',
          steps: [
            {
              title: 'ARM sürümünü indir',
              text: '64 bit işletim sisteminde `aarch64`, 32 bit işletim sisteminde `armv7` sürümünü kullan.'
            },
            {
              title: 'Her açılışta başlat',
              text: '[Raspberry Pi rehberindeki](raspberryPi) gibi bir systemd servisi oluştur, sonra etkinleştir:'
            }
          ]
        },
        docker: {
          label: 'Docker',
          steps: [
            {
              title: 'Konteyneri çalıştır',
              text: 'Portu UDP olarak eşle. Dünyalar `bh-data` volume’ünde tutulur, böylece güncellemelerde korunur. Aynı dünyayı sonra yeniden başlatmak için `--load` kullan (bkz. [Docker rehberi](docker)).'
            },
            { title: 'Konsolu aç' }
          ]
        },
        android: {
          label: 'Android',
          steps: [
            {
              title: 'Sunucu uygulamasını kur',
              text: 'APK’yı indirip aç. Android, tarayıcından kurulum yapmaya izin vermeni isteyebilir.',
              button: 'Android için indir'
            },
            {
              title: 'Bir dünya oluştur ve Başlat’a dokun',
              text: 'Sunucu arka planda çalışmaya devam eder. Bildirimde durum, oyuncular, adres ve bir Sunucuyu durdur düğmesi görünür.'
            },
            {
              title: 'Telefonu şarjda tut',
              text: 'Barındırma pil harcar. Sunucu çalışırken uygulama telefonu ve Wi-Fi bağlantısını uyanık tutar. Telefonun yine de durduruyorsa Android ayarlarında uygulama için pil optimizasyonunu kapat.'
            }
          ]
        }
      }
    },
    connect: {
      eyebrow: 'Bağlan',
      title: 'Telefonundan katıl',
      lead: 'Telefonun ve sunucu aynı Wi-Fi ağında olmalı. Masaüstü ve Android uygulamaları adresi panelde ve QR kod olarak gösterir. Komut satırı sunucusunda bilgisayarın yerel IP adresini kullan.',
      steps: [
        {
          title: 'Adresi bul',
          body: 'Örneğin `192.168.1.42` ve `15151` portu. Telefonda kopyalamak için QR kodu tara.'
        },
        {
          title: 'Oyunun çok oyunculu menüsünü aç',
          body: '**Join World** → **Advanced...** → **Online IP/Port...** yolunu izle.'
        },
        {
          title: 'Adresi gir ve oyna',
          body: 'Sunucunun parolası varsa oyun senden ister.'
        }
      ],
      qrLabel: '192.168.1.42:15151 için örnek QR kod',
      wifi: 'Wi-Fi ağında',
      addressHint: 'Örnek adres; Sunucu panelinde göründüğü gibi.',
      warnTitle: 'İnternet üzerinden mi oynuyorsun?',
      warnBody:
        'Modeminde UDP 15151 portunu sunucu bilgisayarına yönlendir ve genel IP’ni paylaş. Önce bir parola belirle veya beyaz listeyi aç. [Rehberi oku](openInternet)',
      info: 'Telefonundaki oyun sürümü sunucuyla eşleşmelidir. Yamalı ve orijinal oyunlar birlikte oynayabilir.'
    },
    downloads: {
      title: 'İndirmeler',
      items: [
        { name: 'Masaüstü uygulaması', hint: 'Windows · macOS · Linux' },
        { name: 'Komut satırı sunucusu', hint: 'x64 · ARM64 · ARMv7' },
        { name: 'Docker imajı', hint: 'çoklu mimari · `ghcr.io/blockheads-club/blockheads-server`' },
        { name: 'Android uygulaması', hint: 'APK · Android 7.0+' }
      ],
      version:
        'Sürüm **0.1.1** (ön sürüm, 20 Ekim 2026) · [Sürüm notları](serverReleases) · [Sağlama toplamları](serverReleases) · [GitHub’da kaynak](serverRepo)'
    }
  },
  guides: {
    eyebrow: 'Rehberler',
    title: 'Adım adım öğren',
    lead: 'Oyuncular ve sunucu sahipleri için kısa, resimli rehberler. Her biri ne kadar sürdüğünü ve nelere ihtiyaç olduğunu söyler.',
    searchLabel: 'Rehberlerde ara',
    searchPlaceholder: 'Rehberlerde ara, örn. “yedek” veya “port”',
    filterLabel: 'Konuya göre filtrele',
    filters: {
      all: 'Tüm rehberler',
      patcher: 'Patcher',
      server: 'Sunucu',
      android: 'Android',
      beginner: 'Başlangıç',
      advanced: 'İleri'
    },
    startHere: 'Buradan başla',
    patcherTitle: 'Patcher',
    serverTitle: 'Sunucu',
    min: 'dk',
    comingSoon: 'Yakında',
    noResults: 'Aramanla eşleşen rehber yok.',
    clear: 'Aramayı ve filtreleri temizle',
    resultsStatus: { one: 'rehber gösteriliyor', few: 'rehber gösteriliyor', many: 'rehber gösteriliyor', other: 'rehber gösteriliyor' },
    missing: 'Eksik bir rehber mi var ya da hata mı buldun?',
    suggest: 'GitHub’da öner',
    items: [
      {
        id: 'fix-game-on-phone',
        title: 'Oyunu telefonunda baştan sona düzelt',
        summary: 'Dünyaları yedekle, yamala, orijinali kaldır ve düzeltilmiş oyunu kur.'
      },
      {
        id: 'lan-play',
        title: 'Aynı Wi-Fi ağındaki arkadaşlarla oyna',
        summary: 'Bilgisayarında bir sunucu başlat ve evdeki her telefondan katıl.'
      },
      {
        id: 'backup-worlds',
        title: 'Yamalamadan önce dünyalarını yedekle',
        summary: 'Orijinal oyunun neden kaldırılması gerektiği ve dünyalarını nasıl koruyacağın.'
      },
      {
        id: 'get-apk',
        title: 'Sahip olduğun oyunun APK’sını al',
        summary: 'Yüklü oyunu telefonundan bilgisayarına kopyala.'
      },
      {
        id: 'signing-key',
        title: 'İmza anahtarını güvende tut',
        summary: 'Güncellemelerin neden aynı anahtarı gerektirdiği ve onu nasıl dışa/içe aktaracağın.'
      },
      {
        id: 'raspberry-pi',
        title: 'Raspberry Pi’de 7/24 sunucu çalıştır',
        summary: 'ARM sürümünü kur, açılışta başlat ve otomatik yedekleri koru.'
      },
      {
        id: 'open-internet',
        title: 'Sunucunu internete aç',
        summary: 'Port yönlendirme, parolalar ve beyaz listeler, adım adım.'
      },
      {
        id: 'admins-mods',
        title: 'Yöneticiler, moderatörler ve yasaklar',
        summary: 'Kim neyi yapabilir ve oyuncuları uygulamadan nasıl yönetirsin.'
      },
      {
        id: 'host-android',
        title: 'Android telefondan barındır',
        summary: 'Android durdurmadan sunucuyu arka planda çalışır tut.'
      },
      {
        id: 'docker',
        title: 'Docker ve Docker Compose',
        summary: 'Konteynerde çalışan sunucular için volume’ler, güncellemeler ve loglar.'
      }
    ]
  },
  article: {
    breadcrumb: 'Sayfa yolu',
    guides: 'Rehberler',
    topic: 'Patcher',
    tags: 'Patcher · Android',
    level: 'Başlangıç',
    title: 'Oyunu telefonunda baştan sona düzelt',
    lead: 'Bu rehber Android için Blockheads Patcher uygulamasını kullanır. Dünyalarını korur, “Hoş geldin” donmasını ve — 1.7.6’da — dünya yükleme çökmesini düzeltirsin.',
    updated: 'Güncellendi: 21 Ekim 2026 · [Bu sayfayı GitHub’da düzenle](websiteRepo)',
    toc: 'Bu sayfada',
    need: {
      title: 'Nelere ihtiyacın var',
      items: [
        'Telefonuna kurulu The Blockheads 1.7.4, 1.7.5 veya 1.7.6',
        'Blockheads Patcher uygulaması ([indir](patcherReleases))',
        'Yaklaşık 200 MB boş alan'
      ]
    },
    s1: {
      title: 'Dünyalarını yedekle',
      body: 'Android, düzeltilmiş oyunu ancak orijinal kaldırıldıktan sonra kurmana izin verir. Oyunu kaldırmak bu telefonda kayıtlı dünyaları da siler — bu yüzden önce onları başka bir yere kaydet.',
      calloutStrong: 'Bunu atlama.',
      callout:
        'Yalnızca bu telefondaki dünyalar, oyunu kaldırdıktan sonra geri alınamaz. Sunucudaki dünyalar güvendedir.'
    },
    s2: {
      title: 'Yüklü oyunu seç',
      body: 'Patcher’ı aç ve **Yüklü oyunu kullan**’a dokun. Patcher telefonundaki oyunu okur ve sürümünü gösterir. Hiçbir şey internete yüklenmez.'
    },
    s3: {
      title: 'Yamala',
      body: 'Sürümünün ihtiyaç duyduğu düzeltmeler zaten işaretli. **Oyunu yamala**’ya dokun ve yaklaşık bir dakika bekle. Uygulamayı açık tut.',
      callout:
        'Patcher oyunu **kendi anahtarınla** imzalar. O anahtarı sakla — gelecekteki güncellemeleri dünyalarını yeniden kaybetmeden kurmak için aynısına ihtiyacın olacak. [İmza anahtarları hakkında bilgi al](signingKey)'
    },
    s4: {
      title: 'Oyunları değiştir',
      body: '**Dünyalarımı yedekledim ya da onlara ihtiyacım yok** kutusunu işaretle, **Orijinali kaldır**’a dokun ve onayla. Ardından **Düzeltilmiş oyunu kur**’a dokun. Android sorarsa Patcher’ın uygulama kurmasına izin ver.'
    },
    s5: {
      title: 'Dünyalarını geri getir',
      body: 'Düzeltilmiş oyunu aç ve 1. adımda kaydettiğin dünyaları geri yükle. Karşılama penceresi artık normal şekilde kapanır.'
    },
    help: {
      title: 'Bir şeyler ters giderse',
      items: [
        '**“Uygulama yüklenmedi”** — orijinal oyun hâlâ telefonda. Önce onu kaldır.',
        '**“Sürüm desteklenmiyor”** — bu rehber yalnızca 1.7.4–1.7.6 içindir.',
        'Hâlâ takıldın mı? [GitHub’da sorun bildir](patcherIssues) ve Patcher logunu ekle.'
      ]
    },
    helpful: 'Bu rehber yardımcı oldu mu?',
    yes: 'Evet',
    no: 'Hayır',
    thanks: 'Geri bildirimin için teşekkürler!',
    previous: 'Önceki',
    next: 'Sonraki',
    prevTitle: 'Sahip olduğun oyunun APK’sını al',
    nextTitle: 'İmza anahtarını güvende tut'
  },
  docs: {
    'lan-play': {
      tags: 'Sunucu · Wi-Fi',
      title: 'Aynı Wi-Fi ağındaki arkadaşlarınla oyna',
      lead: 'Evdeki bir bilgisayarda sunucu başlat; Wi-Fi ağına bağlı her telefon aynı dünyaya katılsın. Yaklaşık dört dakika sürer.',
      need: [
        'Telefonlarla aynı Wi-Fi ağında bir Windows, macOS ya da Linux bilgisayar',
        'Blockheads Sunucu — masaüstü uygulaması ya da komut satırı sunucusu ([indirmeler](serverReleases))',
        'Her telefonda The Blockheads. Yeni Android sürümlerinde [önce oyunu düzelt](fixGameOnPhone)'
      ],
      steps: [
        {
          title: 'Bir sunucu başlat',
          body: [
            '**Masaüstü uygulaması:** **Dünyalar**’ı aç, **Dünya oluştur**’a dokun, bir ad ver ve **Sunucuyu başlat**’a dokun.',
            '**Komut satırı:** bilgisayarına uygun indirmeyi aç ve bir dünya oluştur. Sunucu hemen başlar:'
          ],
          tip: 'Komut satırı sunucusunu `/stop` ile durdur. Ctrl + C son kaydı yapmadan kapatır.'
        },
        {
          title: 'Güvenlik duvarından geçir',
          body: [
            'Sunucu **UDP 15151** portunu kullanır. Windows Güvenlik Duvarı sorduğunda **özel ağlarda** erişime izin ver. Başka sistemlerde güvenlik duvarı kullanıyorsan 15151’e gelen UDP trafiğine izin ver.'
          ]
        },
        {
          title: 'Sunucunun adresini bul',
          body: [
            'Masaüstü uygulamasında **Panel**’deki **Telefondan bağlan** kartı **Yerel ağ adresi**ni, portu ve bir QR kodu gösterir. Adresi kopyalamak için kodu telefon kamerasıyla tara.',
            'Komut satırında bilgisayarının yerel IP adresini ağ ayarlarından bul, örneğin `192.168.1.42`.'
          ]
        },
        {
          title: 'Oyundan katıl',
          body: ['Her telefonda oyunu aç ve şuraya git:'],
          list: [
            '**Join World** → **Advanced...** → **Online IP/Port...**',
            'Adresi ve portu gir (alanda zaten `15151` yazar)',
            '**Join Online World**’e dokun'
          ],
          tip: 'Sunucunun parolası varsa oyun onu sorar.'
        }
      ],
      help: [
        '**Kimse bağlanamıyor** — telefonların aynı Wi-Fi ağında (misafir ağında değil) olduğunu ve güvenlik duvarının UDP 15151’e izin verdiğini kontrol et.',
        '**Bir arkadaşın reddediliyor** — beyaz listede isim varsa yalnızca o isimler katılabilir. Bkz. [Yöneticiler, moderatörler ve yasaklar](adminsMods).',
        'Hâlâ takıldın mı? [GitHub’da sorun bildir](serverIssues) ve sunucu logunu ekle.'
      ]
    } as GuideDoc,
    'backup-worlds': {
      tags: 'Patcher · Android',
      title: 'Yamalamadan önce dünyalarını yedekle',
      lead: 'Android’de düzeltilmiş oyunu kurmadan önce orijinali kaldırman gerekir — bu da telefonda kayıtlı dünyaları siler. Nedenini ve dünyaları nasıl koruyacağını anlatıyoruz.',
      need: ['Telefonunda kurulu The Blockheads', 'Yamalamaya başlamadan önce birkaç dakika'],
      steps: [
        {
          title: 'Orijinalin neden kaldırılması gerektiğini bil',
          body: [
            'Patcher düzeltilmiş oyunu orijinal anahtarla değil **kendi anahtarınla** imzalar. Android, imzası farklı bir uygulamayı mevcut uygulamanın üzerine kurmaz; bu yüzden önce orijinal kaldırılmalıdır.'
          ],
          warn: '**O telefonda kayıtlı dünyalar oyunla birlikte silinir.** Sunucularda barındırılan dünyalar etkilenmez.'
        },
        {
          title: 'Her dünyayı oyunun içinden yedekle',
          body: [
            'Telefonundaki orijinal oyunu aç ve saklamak istediğin her dünya için oyunun kendi yedeklemesini kullan. Patcher bunu senin yerine yapamaz: kayıtlarına hiç dokunmaz.'
          ]
        },
        {
          title: 'Patcher’da onayla',
          body: [
            'Patcher orijinali kaldırmadan önce **Bu telefondaki dünyaların silinecek** uyarısını gösterir. Devam etmek için **Dünyalarımı yedekledim ya da onlara ihtiyacım yok** kutusunu işaretle.'
          ]
        },
        {
          title: 'Kurduktan sonra geri yükle',
          body: ['Düzeltilmiş oyun kurulunca onu aç ve dünyalarını yedeğinden geri yükle.'],
          tip: '**Kaldırırken oyun verisini saklamayı öner** düzeltmesi varsayılan olarak açıktır. Bununla Android 10 ve üstü, düzeltilmiş oyunu bir gün kaldırırsan oyun verisini saklamak isteyip istemediğini sorar.'
        },
        {
          title: 'Bir dahaki sefere bunu atla',
          body: [
            'İmza anahtarını sakla. Aynı anahtarla yeniden yamalarsan güncelleme düzeltilmiş oyunun üzerine kurulur ve dünyaların kalır. [İmza anahtarını güvende tut](signingKey)'
          ]
        }
      ],
      help: [
        'Bir dünyanın kaydedildiğinden emin değil misin? Yeniden yedekle — yalnızca bir dakika sürer.',
        'Soracağın bir şey mi var? [GitHub’da sorabilirsin](patcherIssues).'
      ]
    } as GuideDoc,
    'get-apk': {
      tags: 'Patcher · Android',
      title: 'Sahip olduğun oyunun APK’sını al',
      lead: 'Web ve masaüstü Patcher oyunu bir `.apk` dosyası olarak ister. Android’de bu rehberi genellikle atlayabilirsin.',
      need: [
        'Android telefonunda kurulu The Blockheads',
        'Bilgisayarla yapacaksan: bir USB kablosu ve Android’in `adb` aracı'
      ],
      steps: [
        {
          title: 'Android’de misin? Yüklü oyunu kullan',
          body: [
            'Android için Blockheads Patcher uygulaması telefonundaki oyunu bulur. **Yüklü oyunu kullan**’a dokun — dosya gerekmez. Elinde zaten bir dosya varsa **APK dosyası seç**’e dokun.'
          ]
        },
        {
          title: 'Oyunu bilgisayara kopyala',
          body: [
            'Telefonda USB hata ayıklamayı aç, telefonu bağla ve Android’e oyunun nerede olduğunu sor. Ardından o dosyayı kopyala:'
          ],
          warn: 'İlk komut **birden fazla** satır yazarsa oyun birden çok APK dosyasına bölünmüştür. Patcher bunları güvenle yamalayamaz — tam (evrensel) bir APK gerekir.'
        },
        {
          title: 'Patcher’da aç',
          body: [
            '[Web Patcher](webPatcher)’ı ya da masaüstü uygulamasını aç ve dosyayı bırak. **Yalnızca .apk dosyaları** kabul edilir. Hiçbir şey internete yüklenmez.'
          ],
          tip: 'Yalnızca kendi kopyanı kullan ve APK’yı başkalarıyla paylaşma.'
        }
      ],
      help: [
        '**“Telefonundan kaydettiğin The Blockheads .apk dosyasını seç.”** — dosya başka bir uygulama.',
        '**“Yüklü oyun birden çok APK dosyasına bölünmüş…”** — bunun yerine tam (evrensel) bir APK kullan.',
        'Sonraki adım: [Oyunu telefonunda düzelt](fixGameOnPhone).'
      ]
    } as GuideDoc,
    'signing-key': {
      tags: 'Patcher',
      title: 'İmza anahtarını güvende tut',
      lead: 'Yamaladığın her oyun yalnızca cihazında duran bir anahtarla imzalanır. Bir yedeğini saklarsan gelecekteki düzeltmeler kaldırmadan kurulur.',
      need: ['Blockheads Patcher (web, masaüstü ya da Android)', 'Küçük bir dosya için güvenli bir yer ve hatırlayacağın bir parola'],
      steps: [
        {
          title: 'Anahtarın ne işe yaradığını bil',
          body: [
            'Patcher anahtarı ilk yamalamada oluşturur. Android, düzeltilmiş oyununun üzerine bir güncellemeyi yalnızca **ikisi de aynı anahtarla imzalanmışsa** kurar. Yeni anahtar, yeniden kaldırmak demektir — yedeklemediysen yerel dünyaları kaybedersin.'
          ],
          warn: '**Gizli tut.** Anahtarına sahip olan biri, oyununun güncellemesi gibi görünen uygulamalar yapabilir.'
        },
        {
          title: 'Bir yedek dışa aktar',
          body: [
            '**İmza anahtarları**’nı aç ve **Yedeği dışa aktar…**’ı seç. Bir parola belirle, tekrarla ve **Yedeği kaydet**’e dokun. Varsayılan adı `blockheads-patcher-key.json` olan bir `.json` dosyası alırsın.'
          ],
          tip: 'Parolayı kurtaramayız, bu yüzden bir yere yaz. Parola olmadan dosya şifrelenmez ve dosyaya sahip olan herkes senin adına uygulama imzalayabilir.'
        },
        {
          title: 'Başka bir cihaza taşı',
          body: [
            'Yeni cihazda **İmza anahtarları**’nı aç, **Anahtarı içe aktar**’ı seç ve `.json` dosyasını seç. Yedek parolasını gir, ardından **Bu anahtarı kullan**’a dokun.',
            'Aynı anahtar olduğundan emin olmak için iki cihazda parmak izinin ilk ve son dört çiftini karşılaştır.'
          ]
        },
        {
          title: 'Anahtar kaybolursa',
          body: [
            'Yedeğin yoksa o anahtarla yamalanmış oyunları güncelleyemezsin. Dünyalarını yedekle, düzeltilmiş oyunu kaldır ve yeni bir anahtarla yeniden yamala. [Dünyalar nasıl yedeklenir](backupWorlds)'
          ]
        }
      ],
      help: [
        'Web Patcher anahtarı tarayıcının bu siteye ait depolamasında tutar. Sitenin verilerini temizlemek onu siler — önce bir yedek al.',
        'İçe aktarma yalnızca Patcher’ın dışa aktardığı `.json` yedeklerini kabul eder.',
        'Soracağın bir şey mi var? [GitHub’da sorabilirsin](patcherIssues).'
      ]
    } as GuideDoc,
    'raspberry-pi': {
      tags: 'Sunucu · Linux',
      title: 'Raspberry Pi’de 7/24 sunucu çalıştır',
      lead: 'Raspberry Pi az enerji harcar ve dünyanı gece gündüz barındırabilir. ARM sürümünü kuracak, açılışta başlatacak ve her gece yedek alacaksın.',
      need: [
        'Ağına bağlı, Raspberry Pi OS (ya da başka bir Linux) kurulu bir Raspberry Pi',
        'Pi’de bir terminal (doğrudan ya da SSH ile)',
        '[Sürümler sayfasından](serverReleases) komut satırı sunucusu'
      ],
      steps: [
        {
          title: '32 bit mi 64 bit mi, kontrol et',
          body: [
            '64 bit sistemde `aarch64`, 32 bit sistemde `armv7` sürümünü kullan. Hangisine sahip olduğunu bu komut söyler:'
          ]
        },
        {
          title: 'İndir ve aç',
          body: [
            'Bu komutlar 0.1.1 sürümünü ve 64 bit yapıyı kullanır. Sürümler sayfasından en yeni sürümü al; 32 bit sistemde `aarch64-unknown-linux-gnu` yerine `armv7-unknown-linux-gnueabihf` kullan.'
          ]
        },
        {
          title: 'Dünyanı oluştur',
          body: [
            'Dünyayı bir kez elle oluştur. Dünyalar `~/GNUstep/Library/ApplicationSupport/TheBlockheads` klasörüne kaydedilir.'
          ],
          tip: 'Seçenek verilmezse sunucu en son dünyayı yükler. Aşağıdaki servis bunu kullanır.'
        },
        {
          title: 'Her açılışta başlat',
          body: [
            'Bir systemd servisi oluştur. `pi` yerine dünyayı oluşturan kullanıcının adını yaz.'
          ],
          tip: 'Servisin konsolu yoktur. Komutları oyun sohbetinde yönetici olarak ver (bkz. [Yöneticiler, moderatörler ve yasaklar](adminsMods)) ve logları `journalctl` ile izle.'
        },
        {
          title: 'Her gece yedek al',
          body: [
            'Dünya klasörünü yalnızca sunucu dururken kopyala. Bu root cron görevi sunucuyu 04:00’te durdurur, her şeyi tarihli bir `.tar.gz` dosyasına paketler ve yeniden başlatır. `/home/pi` yerine kendi ev klasörünü yaz.'
          ],
          warn: '`systemctl stop` sunucuyu son kaydı yapmadan kapatır. Sunucu düzenli kaydeder ama son birkaç saniye kaybolabilir — sakin bir saat seç.'
        }
      ],
      help: [
        '**“Exec format error”** — yanlış yapı. `uname -m` ile yeniden kontrol et.',
        '**Arkadaşlar bağlanamıyor** — [Aynı Wi-Fi ağındaki arkadaşlarınla oyna](lanPlay) rehberindeki kontrollerin aynısı.',
        'Hâlâ takıldın mı? `journalctl` çıktısıyla [GitHub’da sorun bildir](serverIssues).'
      ]
    } as GuideDoc,
    'open-internet': {
      tags: 'Sunucu · Ağ',
      title: 'Sunucunu internete aç',
      lead: 'Evinin dışındaki arkadaşların da dünyana katılsın. Önce sunucuyu kilitleyecek, sonra modeminde tek bir portu yönlendireceksin.',
      need: [
        'Wi-Fi ağında zaten çalışan bir sunucu ([yerel ağ rehberi](lanPlay))',
        'Modeminin arayüzüne erişim'
      ],
      steps: [
        {
          title: 'Önce sunucuyu kilitle',
          body: [
            'Bir **parola** belirle: uygulamada **Ayarlar** → **Parola** (en çok 15 karakter) ya da konsolda `/set-password` ile.',
            'Ya da isim ekleyerek **beyaz liste**yi aç: uygulamada **Erişim listeleri** → **Beyaz liste** ya da `/whitelist` ile. Beyaz listede isim olduğu anda yalnızca o oyuncular katılabilir.'
          ]
        },
        {
          title: 'Sunucuya sabit bir adres ver',
          body: [
            'Modeminde sunucu bilgisayarının yerel IP adresini ayır (genellikle DHCP rezervasyonu denir); böylece yeniden başlatınca değişmez.'
          ]
        },
        {
          title: 'Portu yönlendir',
          body: [
            'Modemin port yönlendirme sayfasında **UDP 15151**’i sunucu bilgisayarının yerel adresine yönlendir. Portu değiştirdiysen kendininkini kullan.'
          ]
        },
        {
          title: 'Genel adresini paylaş',
          body: [
            'Genel IP adresini öğren ve portla birlikte arkadaşlarına gönder. **Join World** → **Advanced...** → **Online IP/Port...** ile katılırlar.'
          ],
          warn: 'Genel IP’n kabaca nerede olduğunu gösterir. Yalnızca güvendiğin kişilerle paylaş.'
        }
      ],
      help: [
        '**Evde çalışıyor, dışarıdan çalışmıyor** — modemin internet (WAN) adresi genel IP’nden farklı olabilir (bazı sağlayıcılar bir adresi müşteriler arasında paylaştırır). O zaman yönlendirme çalışamaz; sağlayıcına sor.',
        '**Hâlâ engelli** — sunucu bilgisayarındaki güvenlik duvarının UDP 15151’e izin verdiğini kontrol et.',
        'Yardım mı lazım? [GitHub’da sorun bildir](serverIssues).'
      ]
    } as GuideDoc,
    'admins-mods': {
      tags: 'Sunucu',
      title: 'Yöneticiler, moderatörler ve yasaklar',
      lead: 'Sunucunda kim ne yapabilir; oyuncuları uygulamadan, konsoldan ya da oyun sohbetinden nasıl yönetirsin.',
      need: ['Çalışan bir Blockheads sunucusu', 'Yönetmek istediğin oyuncu adları'],
      steps: [
        {
          title: 'Rolleri tanı',
          body: [
            'Sunucu konsolunun tüm yetkileri vardır. **Yöneticiler** diğer yöneticiler dahil tam denetime sahiptir. **Moderatörler** oyuncuları atabilir ve yasaklayabilir, yöneticileri değiştiremez. Yöneticiler ve moderatörler komutları oyun sohbetine `/` ile başlayarak yazar.'
          ],
          list: [
            '**Moderatörler:** `/players`, `/kick`, `/ban`, `/unban`, `/whitelist`, `/unwhitelist`, `/clear`',
            '**Yöneticiler ayrıca:** `/stop`, `/pvp-on`, `/pvp-off`, `/mod`, `/unmod`, `/admin`, `/unadmin`, `/load-lists`',
            '**Yalnızca sahip:** `/set-password`, `/remove-password`'
          ]
        },
        {
          title: 'Yönetici ve moderatör ekle',
          body: [
            'Uygulamada **Erişim listeleri** → **Yöneticiler** ya da **Moderatörler**’i aç ve **Yönetici ekle** ya da **Moderatör ekle**’ye dokun. Ya da **Oyuncular** altında bir oyuncuya dokunup **Yönetici yap** ya da **Moderatör yap**’ı seç. Konsolda:'
          ]
        },
        {
          title: 'At ve yasakla',
          body: [
            'Uygulamada bir oyuncuya dokun ve **At…** ya da **Yasakla…**’yı seç. Bir yasak yalnızca adı değil **IP adresini de engelleyebilir**. `/ban` oyuncunun cihazını da yasaklar; `/ban-no-device` yalnızca adı yasaklar.'
          ]
        },
        {
          title: 'Beyaz liste kullan',
          body: [
            'Beyaz liste içine bir isim eklendiği anda açılır. O zaman yalnızca listedeki oyuncular katılabilir ve izni olmayan herkes atılır.'
          ]
        },
        {
          title: 'Liste dosyalarını düzenle',
          body: [
            'Her dünya, `saves` altındaki klasöründe `adminlist.txt`, `modlist.txt`, `whitelist.txt` ve `blacklist.txt` tutar. Her satıra bir isim; büyük/küçük harf fark etmez ve ilk satır yok sayılır. Elle düzenledikten sonra yeniden yükle:'
          ]
        }
      ],
      help: [
        '**“Sorry, you do not have permission to issue that command.”** — bu sunucuda moderatör ya da yönetici değilsin.',
        'Sunucu çalışırken uygulama liste değişikliklerini konsol komutlarıyla uygular.',
        'Soracağın bir şey mi var? [GitHub’da sorabilirsin](serverIssues).'
      ]
    } as GuideDoc,
    'host-android': {
      tags: 'Sunucu · Android',
      title: 'Android telefondan sunucu barındır',
      lead: 'Boşta duran bir Android telefonu sunucuya çevir. Blockheads Sunucu uygulaması arka planda çalışmaya devam eder ve onu bir bildirimden yönetirsin.',
      need: [
        'Wi-Fi ağına bağlı bir Android telefon',
        'Blockheads Sunucu APK’sı (`blockheads-server-…-android.apk`, [sürümler](serverReleases))',
        'Bir şarj aleti'
      ],
      steps: [
        {
          title: 'Uygulamayı kur',
          body: ['APK’yı indir ve aç. Android tarayıcından kurulumlara izin vermeni isteyebilir.']
        },
        {
          title: 'Bir dünya oluştur ve başlat',
          body: [
            '**Dünyalar** → **Dünya oluştur**’u aç. Bir ad (en çok 30 karakter) ve boyut seç, **Bu dünyayı hemen kullan** açık kalsın, sonra **Sunucuyu başlat**’a dokun.'
          ]
        },
        {
          title: 'Arka planda çalışsın',
          body: [
            'Bir bildirim durumu, dünyayı, çevrimiçi oyuncu sayısını ve adresi gösterir. Düğmeleri **Sunucuyu durdur**, **Adresi kopyala** ve **Konsol**’dur.'
          ],
          tip: 'Sunucu çalışırken uygulama telefonu ve Wi-Fi bağlantısını uyanık tutar. Telefonun yine de durduruyorsa Android ayarlarında Blockheads Sunucu için pil optimizasyonunu kapat.'
        },
        {
          title: 'Telefonu şarjda tut',
          body: ['Sunucu barındırmak pil harcar. Arkadaşların oynarken telefonu şarjda bırak.']
        },
        {
          title: 'Arkadaşlarını bağla',
          body: [
            '**Panel** **Yerel ağ adresi**ni ve bir QR kodu gösterir. Diğer telefonlarda **Join World** → **Advanced...** → **Online IP/Port...** ile katıl.'
          ]
        }
      ],
      help: [
        '**“Sunucu beklenmedik şekilde durdu”** — nedenini görmek için bildirime dokun ve **Günlüğü aç**’ı seç.',
        'Dünyalar bu telefondaki uygulamanın özel depolamasında saklanır.',
        'Hâlâ takıldın mı? [GitHub’da sorun bildir](serverIssues).'
      ]
    } as GuideDoc,
    docker: {
      tags: 'Sunucu · Docker',
      title: 'Docker ve Docker Compose',
      lead: 'Sunucuyu bir konteyner olarak çalıştır. Dünyalar bir volume’de durur; böylece güncellemelerden sonra da kalır.',
      need: [
        'Docker (istersen Docker Compose da)',
        'Çok mimarili `ghcr.io/blockheads-club/blockheads-server` imajı (amd64, arm64, arm/v7)'
      ],
      steps: [
        {
          title: 'Bir dünya oluştur',
          body: [
            'Konsolu almak için konteyneri bir kez `-it` ile çalıştır. Dünyalar `bh-data` volume’üne gider. **World load complete.** yazısını bekle, sonra `/stop` yaz.'
          ],
          tip: 'Örnekler 0.1.1 sürümünü kullanır. Her sürümün bir sürüm etiketi vardır; en yenisini seç.'
        },
        {
          title: 'Dünya kimliğini bul',
          body: ['Volume’deki dünyaları listele. Uzun onaltılık ad dünya kimliğidir.']
        },
        {
          title: 'Arka planda çalıştır',
          body: [
            'Dünyayı `--load` ile başlat. Konsolu sonra açabilmek için `-i` ve `-t` kalsın; portu **UDP** olarak eşle.'
          ]
        },
        {
          title: 'Loglar ve konsol',
          body: ['Logları izle ya da `/players` veya `/stop` gibi komutlar yazmak için konsola bağlan.']
        },
        {
          title: 'Ya da Docker Compose kullan',
          body: ['Aynı kurulum bir `compose.yaml` olarak. `docker compose up -d` ile başlat.']
        }
      ],
      help: [
        '**Konteyner yalnızca yardım metnini yazıyor** — `--new` ya da `--load` gibi seçenekler vermezsen imaj `--help` ile başlar.',
        '**Güncelleme** — konteyneri durdurup sil, sonra yeni etiketle yeniden çalıştır. `bh-data` volume’ü dünyalarını saklar. `docker stop` sunucuyu son kaydı yapmadan kapatır; kimse oynamıyorken durdur.',
        '**Bağlantı yok** — port `15151:15151/udp` olarak eşlenmelidir.'
      ]
    } as GuideDoc
  },
  faq: {
    title: 'Sık sorulan sorular',
    lead: 'Önce kısa yanıtlar. Bilinecek daha fazla şey varsa her yanıt tam bir rehbere bağlanır.',
    sidebar: 'SSS bölümleri',
    sections: [
      {
        id: 'general',
        title: 'Proje hakkında',
        items: [
          {
            q: 'Bu resmî Blockheads mi?',
            a: 'Hayır. Blockheads Club bağımsız, ticari olmayan bir hayran projesidir. Majic Jungle Software veya Noodlecake ile bağlantımız yok; oyunu satmıyor ya da paylaşmıyoruz.'
          },
          { q: 'Bir maliyeti var mı?', a: 'Hayır. Tüm araçlar ücretsiz ve açık kaynaklıdır.' },
          {
            q: 'Yardım edebilir miyim?',
            a: 'Evet — GitHub’da hata bildir, rehber yaz veya uygulamaları çevir.'
          }
        ]
      },
      {
        id: 'patcher',
        title: 'Patcher',
        items: [
          {
            q: 'Hangi oyun sürümlerini düzeltir?',
            a: '“Hoş geldin” penceresi donması için 1.7.4, 1.7.5 ve 1.7.6. 1.7.6 ayrıca dünya yüklerken çökmeye karşı da düzeltme alır.'
          },
          {
            q: 'Oyun dosyamı bir yere yüklüyor musunuz?',
            a: 'Asla. Web uygulaması, masaüstü uygulamaları ve Android uygulaması kendi cihazında yama yapar. Web uygulaması bir kez yüklendikten sonra internet olmadan da çalışır.'
          },
          {
            q: 'Android’de orijinal oyunu neden kaldırmalıyım?',
            a: 'Yamalı oyun orijinal anahtarla değil kendi anahtarınla imzalanır. Android, farklı imzalı bir uygulamanın yüklü uygulamanın yerine geçmesine izin vermez. Önce dünyalarını yedekle.'
          },
          {
            q: 'İmza anahtarı nedir ve neden saklamalıyım?',
            a: 'Bir uygulamanın aynı kaynaktan geldiğini kanıtlar. Daha sonra aynı anahtarla yeniden yamalarsan yamalı oyunun üzerine kurabilir ve dünyalarını koruyabilirsin. Dışa aktar ve güvenli bir yerde sakla.'
          }
        ]
      },
      {
        id: 'server',
        title: 'Sunucu',
        items: [
          { q: 'Kaç oyuncu katılabilir?', a: '1 ile 32 arası. Sınırı Ayarlar’dan seçersin.' },
          {
            q: 'Arkadaşım bağlanamıyor. Nelere bakmalıyım?',
            a: 'Aynı Wi-Fi, doğru adres ve port, güvenlik duvarının sunucuya izin vermesi ve (açıksa) beyaz listede adının bulunması. [Bağlantı rehberi](lanPlay)'
          },
          {
            q: 'Eski bir Android telefonda çalıştırabilir miyim?',
            a: 'Evet. Sunucu uygulamasını kullan, telefonu şarjda tut ve arka planda çalışmasına izin ver.'
          }
        ]
      }
    ],
    helpTitle: 'Hâlâ yardıma mı ihtiyacın var?',
    helpBody:
      'GitHub’da sorun bildir. Cihazını, oyun sürümünü ve — Patcher için — hata ekranından kopyalanan logu ekle.',
    helpButton: 'Sorun bildir',
    helpSection: 'Yardım alma'
  },
  legal: {
    title: 'Yasal bildirim',
    lead: 'Önce sade bir özet. Son güncelleme: 21 Ekim 2026.',
    shortTitle: 'Kısaca',
    short:
      'Biz hayranız, oyunun yapımcıları değil. Araçlarımız yalnızca sahibi olduğun bir The Blockheads kopyasıyla çalışır. Oyunu paylaşmayız, dosyalarını toplamayız ve araçlar hiçbir garanti vermez.',
    sections: [
      {
        title: '1. Bu projeyi kim yürütüyor',
        body: 'Blockheads Club’ı [GitHub’daki Blockheads Club organizasyonundaki](org) gönüllüler sürdürür. İletişim: [GitHub’da bir konu (issue) aç](websiteIssues).'
      },
      {
        title: '2. Bağlantı yok',
        body: 'Blockheads Club bağımsız, ticari olmayan bir topluluk projesidir. Majic Jungle Software, Noodlecake veya The Blockheads’in başka herhangi bir hak sahibiyle bağlantılı değildir; onlar tarafından onaylanmamış, desteklenmemiş veya yetkilendirilmemiştir.'
      },
      {
        title: '3. Ticari markalar ve oyun içeriği',
        body: '“The Blockheads” ve ilgili adlar, logolar ve çizimler kendi sahiplerine aittir. Adı yalnızca araçlarımızın neyle çalıştığını anlatmak için kullanırız. Logomuz ve tasarımımız bize aittir. Oyunu veya dosyalarını dağıtmayız.'
      },
      {
        title: '4. Kendi kopyanla kullanım',
        body: 'Patcher, kendi cihazında sağladığın bir oyun kopyasını değiştirir. O kopyayı değiştirmeye ve kullanmaya iznin olduğundan emin olmak senin sorumluluğundadır. Araçlarımızı oyunu paylaşmak veya satmak için kullanma.'
      },
      {
        title: '5. Gizlilik',
        body: 'Patcher dosyaları yalnızca cihazında işler; hiçbir şey internete yüklenmez. Bu web sitesi statiktir: analiz, izleme veya çerez kullanmaz. Yalnızca tema ve dil seçimini tarayıcının yerel depolamasında hatırlar. Sunucu, oyuncu adlarını ve cihaz tanımlayıcılarını yalnızca onu çalıştıran makinede saklar.'
      },
      {
        title: '6. Garanti yok',
        body: 'Yazılım, lisansında belirtildiği gibi “olduğu gibi”, hiçbir tür garanti olmaksızın sunulur. Yamalamadan veya güncellemeden önce dünyalarını yedekle.'
      },
      {
        title: '7. Lisanslar',
        body: 'Kodumuz GPL-3.0-or-later altında yayımlanır. Üçüncü taraf bileşenler ve yazı tipleri (Bricolage Grotesque, Atkinson Hyperlegible Next, Onest, Golos Text, JetBrains Mono — SIL Open Font License) her uygulamada Ayarlar → Hakkında → Lisanslar altında listelenir.'
      },
      {
        title: '8. Kaldırma talebi ve iletişim',
        body: 'Hak sahipleri bize [GitHub’da bir konu (issue) açarak](websiteIssues) ulaşabilir. İyi niyetli taleplere çabucak yanıt veririz.'
      }
    ]
  },
  shots: {
    'patcher/phone-choose': {
      alt: 'Android’de Blockheads Patcher, “Oyununu seç” adımı: “Bu telefonda bulundu” kartında The Blockheads 1.7.4 ve “Yüklü oyunu kullan” düğmesi, altında “APK dosyası seç”.',
      caption: 'Patcher telefonunda kurulu oyunu bulur.'
    },
    'patcher/phone-review': {
      alt: 'Android’de Patcher, “Düzeltmeleri gözden geçir” adımı: algılanan oyun sürümünün ayrıntıları, imzalanacağı anahtar ve “Oyunu yamala (3 düzeltme)” düğmesi.',
      caption: 'Sürümünün ihtiyaç duyduğu düzeltmeler zaten işaretli.'
    },
    'patcher/phone-uninstall-confirm': {
      alt: 'Android’de Patcher, “Düzeltilmiş oyunu kur”: dünyaların bu telefondan silineceği uyarısı, yedekleme onay kutusu, ardından 1. adım “Orijinali kaldır” ve 2. adım “Düzeltilmiş oyunu kur”.',
      caption: 'Kutuyu yalnızca dünyaların yedeklendiyse işaretle.'
    },
    'patcher/phone-installed': {
      alt: 'Android’de Patcher’ın son ekranı: düzeltilmiş oyun kuruldu; imza anahtarını saklaman için bir hatırlatma ve dışa aktarma bağlantısı.',
      caption: 'Bitti. Şimdi dünyalarını düzeltilmiş oyuna geri yükle.'
    },
    'patcher/choose': {
      alt: 'Masaüstü Patcher, “Oyununu seç” adımı: The Blockheads APK dosyası için bırakma alanı ve dosyaya göz atma düğmesi.',
      caption: '.apk dosyasını bırak ya da seç.'
    },
    'patcher/keys-export': {
      alt: 'Patcher “Anahtarlar” ekranı: SHA-256 parmak izli “Anahtarım” imza anahtarı ve parola ile parola tekrarı alanları ve “Yedeği kaydet” düğmesi olan açık yedek dışa aktarma formu.',
      caption: 'İmza anahtarının parolalı bir yedeğini dışa aktar.'
    },
    'server/worlds-create': {
      alt: 'Blockheads Server masaüstü uygulaması, “Dünya oluştur” penceresi: dünya adı, 1/16× ile 16× arası dünya boyutu, uzman modu anahtarı ve oluşturma düğmesi.',
      caption: 'Bir dünya oluştur: ad, boyut ve istersen uzman modu.'
    },
    'server/dashboard': {
      alt: 'Çalışan sunucunun paneli: durum Çalışıyor, 2 çevrimiçi oyuncu, çalışma süresi ve geçerli dünya “Sunny Isle”; QR kodu, 192.168.1.42 LAN adresi ve 15151 portu olan telefondan bağlanma kartı.',
      caption: 'Panel LAN adresini, portu ve bir QR kodu gösterir.'
    },
    'server/access': {
      alt: 'Sunucunun “Erişim listeleri” ekranında dört kart: yöneticiler, moderatörler, beyaz liste ve kara liste; her birinde ad alanı ve ekleme düğmesi.',
      caption: 'Yöneticiler, moderatörler, beyaz liste ve kara liste tek yerde.'
    },
    'server/players-menu': {
      alt: 'Sunucunun “Oyuncular” ekranında Sam adlı oyuncunun işlem menüsü açık: yönetici yap, moderatörlüğü kaldır, cihaz kimliğini kopyala, at ve yasakla.',
      caption: 'Rolünü değiştirmek, atmak veya yasaklamak için bir oyuncuya dokun.'
    },
    'server/settings': {
      alt: 'Sunucunun “Ayarlar” ekranı, bağlantı bölümü: port 15151, en çok oyuncu ve parola (en çok 15 karakter).',
      caption: 'Parola Ayarlar’daki bağlantı bölümündedir.'
    },
    'server/phone-worlds': {
      alt: 'Android telefonda Blockheads Server uygulaması, “Dünyalar” ekranı: “Dünya oluştur” düğmesi ile “Sunny Isle” (şu an yüklü) ve “Cozy Harbor” dünyaları.',
      caption: 'Bir dünya oluştur, sonra sunucuyu başlat.'
    },
    'server/phone-dashboard': {
      alt: 'Android telefonda sunucu uygulamasının paneli: diğer telefonlar için LAN adresi, port ve QR kodu.',
      caption: 'Arkadaşların panelde gösterilen adresle katılır.'
    }
  },
  mods: {
    eyebrow: 'Modlar',
    title: 'The Blockheads için modlar',
    lead: 'Sunucular ve istemciler için topluluk modlarına göz at. Her mod, neler yapabildiğini açıkça listeler.',
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
      playersBody: 'İstemci modları oyun içi mod tarayıcısından veya Patcher ile kurulacak. Bu daha sonra geliyor.',
      admins: 'Sunucu yöneticileri',
      adminsBody:
        '`.bhmod` dosyasını indirip sunucunun `mods/` klasörüne at. İleride `/mods install <id>` bunu senin yerine yapacak. Sunucular henüz mod yükleyemiyor: bu sonraki bir sürümde gelecek.',
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
        'İzin farkı paylaşılır. Yerel modlar ve her yeni izin `needs-security-review` etiketini alır ve bir bakımcıyı bekler.'
      ],
      nativeTitle: 'Yerel modlar',
      nativeBody: '`native = true` olan modlar korumalı alanın dışında kod çalıştırır. İzin verilir, ama elle incelenir ve kırmızı bir uyarıyla gösterilir.',
      toolsTitle: 'Araçlar',
      toolsBody: 'Mod SDK’sında `bhmod` komut satırı aracı, şemalar ve örnekler var.',
      sdkButton: 'Mod SDK’sını aç',
      modsButton: 'Blockheads-Club/mods’u aç',
      docsButton: 'Mod yapma (dokümanlar)',
      notPublic: 'mod-sdk ve mods depoları henüz herkese açık değil, bu yüzden bu bağlantılar şimdilik çalışmayabilir.'
    }
  },
  footer: {
    tagline: 'The Blockheads için topluluk araçları. Gönüllüler tarafından',
    love: 'sevgi',
    taglineEnd: 'ile yapıldı.',
    products: 'Ürünler',
    help: 'Yardım',
    project: 'Proje',
    downloads: 'İndirmeler',
    reportBug: 'Hata bildir',
    translate: 'Çeviriye yardım et',
    legal: 'Yasal bildirim',
    legalShort: 'Yasal',
    nav: 'Alt bilgi',
    short: 'Resmî olmayan topluluk projesi. Majic Jungle Software veya Noodlecake ile bağlantısı yoktur.',
    disclaimer:
      'Blockheads Club resmî olmayan, ticari olmayan bir topluluk projesidir. Majic Jungle Software veya Noodlecake ile bağlantılı değildir, onlar tarafından onaylanmamış veya desteklenmemiştir. “The Blockheads” ilgili sahibinin ticari markasıdır. Kod GPL-3.0-or-later altında yayımlanır.'
  }
};
