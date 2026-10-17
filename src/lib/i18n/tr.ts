import type { Dict } from './en';

export const tr: Dict = {
  meta: {
    title: 'Blockheads Club',
    description:
      'The Blockheads etrafında bir topluluk projesi: oyunu modern Android’de çalışır hale getiren bir yama aracı ve sıfırdan yazılmış açık kaynaklı bir sunucu.',
    titles: {
      home: 'Blockheads Club',
      server: 'Sunucu hızlı başlangıç · Blockheads Club',
      guides: 'Rehberler · Blockheads Club',
      article: 'Oyunu telefonunuzda düzeltin · Blockheads Club',
      faq: 'SSS · Blockheads Club',
      legal: 'Yasal bildirim · Blockheads Club'
    }
  },
  nav: {
    skip: 'İçeriğe geç',
    label: 'Ana gezinme',
    home: 'Blockheads Club ana sayfa',
    patcher: 'Yamalayıcı',
    server: 'Sunucu',
    guides: 'Rehberler',
    faq: 'SSS',
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
      title: 'The Blockheads oynanabilir kalsın — bugünün telefonlarında ve kendi sunucularınızda.',
      lead: 'Blockheads Club bir topluluk projesidir. Yeni Android sürümleri oyunu bozduğunda onu düzeltiriz, arkadaşlarınız için dünya barındırmanızı sağlarız.',
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
      title: 'Hâlâ sevdiğimiz bir oyun için dost canlısı bir alet çantası.',
      lead: 'The Blockheads telefonlar için bir kum havuzu oyunudur. Bazı sürümler yeni Android telefonlarda düzgün açılmaz ve pek çok oyuncu kendi sunucusunu ister. İkisi için de ücretsiz araçlar geliştiriyoruz.',
      items: [
        {
          title: 'Açık kaynak, her zaman ücretsiz',
          body: 'Her araç GitHub’da. Herkes kodu okuyabilir, hata bildirebilir veya çeviriye yardım edebilir.'
        },
        {
          title: 'Kopyanız sizin kalır',
          body: 'Yamalayıcı, zaten sahip olduğunuz oyunu kendi cihazınızda değiştirir. Oyunu asla barındırmaz veya paylaşmayız.'
        },
        {
          title: 'Oyuncular tarafından yapıldı',
          body: 'Bu projeyi gönüllüler keyif için yürütür. Oyunun geliştiricileri değiliz ve onlarla bağlantımız yok.'
        }
      ]
    },
    patcher: {
      eyebrow: 'Blockheads Yamalayıcı',
      title: 'Oyun “Hoş geldin” penceresinde mi takıldı? Düzeltelim.',
      lead: 'Modern Android’de 1.7.4 ile 1.7.6 arası oyun sürümleri ilk pencerede donabilir. 1.7.6 ayrıca bir dünya yüklerken çökebilir. Yamalayıcı, kendi oyun kopyanızı birkaç tıklamayla onarır.',
      fixes: [
        {
          title: 'Karşılama penceresi donması',
          versions: '1.7.4 · 1.7.5 · 1.7.6',
          body: 'Oyun modern Android’de yeniden normal şekilde açılır.'
        },
        {
          title: 'Dünya yükleme çökmesi',
          versions: '1.7.6',
          body: 'Dünyalarınız oyun kapanmadan yüklenir.'
        }
      ],
      noteStrong: 'Hiçbir şey yüklenmez.',
      note: 'Yama işlemi cihazınızda çalışır — web uygulaması bile tarayıcınızda çevrimdışı çalışır. Oyunun kendi kopyasına sahip olmanız gerekir.',
      howTitle: 'Nasıl çalışır',
      steps: [
        { title: 'Oyununuzu verin', body: 'APK dosyasını bırakın. Android’de yüklü oyunu seçmeniz yeterli.' },
        { title: 'Düzeltmeleri kontrol edin', body: 'Yamalayıcı sürümünüzü bulur ve gereken düzeltmeleri işaretler.' },
        {
          title: 'Kurun ve oynayın',
          body: 'Düzeltilmiş oyunu kaydedin ya da doğrudan telefonunuza kurun. Önce dünyalarınızı yedekleyin — rehber nasıl yapılacağını gösterir.'
        }
      ],
      ctaWeb: 'Web yamalayıcıyı aç',
      getTitle: 'Yamalayıcıyı edinin',
      platforms: [
        { name: 'Web uygulaması', hint: 'Herhangi bir modern tarayıcı' },
        { name: 'Android', hint: 'APK · {{[EN DÜŞÜK ANDROID]}}' },
        { name: 'Windows', hint: '10 / 11 · x64' },
        { name: 'macOS', hint: 'Apple silicon ve Intel' },
        { name: 'Linux', hint: 'AppImage · .deb' }
      ],
      version:
        'Güncel sürüm {{[SÜRÜM]}} · [Sürüm notları](patcherReleases) · [Sağlama toplamları](patcherReleases)'
    },
    server: {
      eyebrow: 'Blockheads Sunucu',
      title: 'Dünyanız, kurallarınız, her zaman çevrimiçi.',
      lead: 'The Blockheads için açık kaynaklı bir özel sunucu. Bir bilgisayarda, Raspberry Pi’de veya Docker’da çalıştırın — ya da eski bir Android telefonu uygulamamızla sunucuya çevirin.',
      platforms: ['Windows', 'macOS', 'Linux', 'Raspberry Pi / ARM', 'Docker', 'Android uygulaması'],
      ctaStart: '5 dakikada başla',
      ctaDownloads: 'İndirmeler',
      exampleNote: 'Örnek çıktı. Sunucu sayfasındaki komutlar gerçek platformunuza göredir.'
    },
    guides: {
      eyebrow: 'Rehberler',
      title: 'Adım adım, resimlerle.',
      all: 'Tüm rehberler',
      minRead: 'dk okuma'
    },
    faq: {
      eyebrow: 'SSS',
      title: 'İyi sorular',
      lead: 'Yanıtı bulamadınız mı? [Tüm soruları görün](faq) ya da [GitHub](websiteIssues)’da sorun.',
      items: [
        {
          q: 'Bu resmî Blockheads mi?',
          a: 'Hayır. Blockheads Club bağımsız bir hayran projesidir. Majic Jungle Software veya Noodlecake ile bağlantımız yok ve oyunu dağıtmıyoruz.'
        },
        {
          q: 'Güvenli mi? Dosyalarımı görüyor musunuz?',
          a: 'Yama işlemi cihazınızda gerçekleşir. Bize veya başkasına hiçbir şey yüklenmez.'
        },
        {
          q: 'Dünyalarımı kaybeder miyim?',
          a: 'Android’de önce orijinal oyunu kaldırmanız gerekir. Bunu yapmadan önce dünyalarınızı yedekleyin.'
        }
      ]
    }
  },
  server: {
    hero: {
      eyebrow: 'Blockheads Sunucu',
      title: 'Arkadaşlarınızın istediği zaman katılabileceği bir dünya barındırın.',
      lead: 'Ücretsiz, açık kaynaklı bir özel sunucu. Bir bilgisayarda, Raspberry Pi’de veya Docker’da çalıştırın — ya da uygulamamızla bir Android telefonda.',
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
      title: 'Platformunuzu seçin',
      lead: 'Her adımda kopyalayabileceğiniz bir komut var. Sunucu siz kapatana veya Ctrl + C’ye basana kadar çalışmaya devam eder.',
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
              title: 'İndirin ve arşivden çıkarın',
              text: '`blockheads-server-windows-x64.zip` dosyasını alın ve bir klasöre çıkarın, örneğin Belgeler\\Blockheads Server.',
              button: 'Windows için indir'
            },
            {
              title: 'Sunucuyu başlatın',
              text: 'O klasörde PowerShell’i açın ve şunu çalıştırın:',
              hint: 'Tıklamayı mı tercih edersiniz? Bunun yerine masaüstü uygulamasını kurun — aynı özellikler düğmelerle gelir.'
            },
            {
              title: 'Ağınızda izin verin',
              text: 'Windows Güvenlik Duvarı sorduğunda **özel ağlarda** erişime izin verin. Şimdi telefonunuzdan bağlanın (aşağıda).'
            }
          ]
        },
        mac: {
          label: 'macOS',
          steps: [
            { title: 'İndirin ve açın' },
            {
              title: 'macOS’un açmasına izin verin',
              text: 'İlk seferde, Gatekeeper’ın programa izin vermesi için indirme işaretini kaldırın:'
            },
            { title: 'Sunucuyu başlatın' }
          ]
        },
        linux: {
          label: 'Linux',
          steps: [
            { title: 'İndirin ve açın' },
            {
              title: 'Sunucuyu başlatın',
              hint: 'Raspberry Pi adımlarıyla hizmet olarak çalıştırın — bunlar her systemd Linux’ta çalışır.'
            }
          ]
        },
        pi: {
          label: 'Raspberry Pi',
          steps: [
            {
              title: 'ARM sürümünü indirin',
              text: '64 bit işletim sistemli Raspberry Pi 4 ve 5’te 64 bit sürümü kullanın.'
            },
            { title: 'Her açılışta başlatın' }
          ]
        },
        docker: {
          label: 'Docker',
          steps: [
            {
              title: 'Kapsayıcıyı çalıştırın',
              text: 'Dünyalar `bh-data` biriminde tutulur, böylece güncellemelerde korunur.'
            },
            { title: 'Konsolu açın' }
          ]
        },
        android: {
          label: 'Android',
          steps: [
            {
              title: 'Sunucu uygulamasını kurun',
              text: 'APK’yı indirip açın. Android, tarayıcınızdan kurulum yapmaya izin vermenizi isteyebilir.',
              button: 'Android için indir'
            },
            {
              title: 'Bir dünya oluşturun ve Başlat’a dokunun',
              text: 'Sunucu arka planda çalışmaya devam eder. Bir bildirim durumunu ve Durdur düğmesini gösterir.'
            },
            {
              title: 'Telefonu şarjda tutun',
              text: 'Barındırma pil harcar. İstendiğinde uygulama için pil optimizasyonunu kapatın; böylece Android onu durdurmaz.'
            }
          ]
        }
      }
    },
    connect: {
      eyebrow: 'Bağlan',
      title: 'Telefonunuzdan katılın',
      lead: 'Telefonunuz ve sunucu aynı Wi-Fi’de olmalı. Sunucu başladığında adresini gösterir — konsolda, panoda ve QR kod olarak.',
      steps: [
        {
          title: 'Adresi bulun',
          body: 'Örneğin `192.168.1.42` ve `15151` bağlantı noktası. Telefonda kopyalamak için QR kodu tarayın.'
        },
        {
          title: 'Oyunun çok oyunculu menüsünü açın',
          body: 'Adresle bir sunucuya katılmayı seçin.'
        },
        {
          title: 'Adresi girin ve oynayın',
          body: 'Sunucunun parolası varsa oyun sizden ister.'
        }
      ],
      qrLabel: '192.168.1.42:15151 için örnek QR kod',
      wifi: 'Wi-Fi’nizde',
      addressHint: 'Örnek adres; Sunucu panosunda göründüğü gibi.',
      warnTitle: 'İnternet üzerinden mi oynuyorsunuz?',
      warnBody:
        'Yönlendiricinizde 15151 numaralı bağlantı noktasını sunucu bilgisayarına yönlendirin ve genel IP’nizi paylaşın. Önce bir parola belirleyin veya beyaz listeyi açın. [Rehberi okuyun](guides)',
      info: 'Telefonunuzdaki oyun sürümü sunucuyla eşleşmelidir. Yamalı ve orijinal oyunlar birlikte oynayabilir.'
    },
    downloads: {
      title: 'İndirmeler',
      items: [
        { name: 'Masaüstü uygulaması', hint: 'Windows · macOS · Linux' },
        { name: 'Komut satırı sunucusu', hint: 'x64 · ARM64 · ARMv7' },
        { name: 'Docker imajı', hint: 'çoklu mimari · {{[İMAJ]}}' },
        { name: 'Android uygulaması', hint: 'APK · {{[EN DÜŞÜK ANDROID]}}' }
      ],
      version:
        'Sürüm {{[SÜRÜM]}} · [Sürüm notları](serverReleases) · [Sağlama toplamları](serverReleases) · [GitHub’da kaynak](serverRepo)'
    }
  },
  guides: {
    eyebrow: 'Rehberler',
    title: 'Adım adım öğrenin',
    lead: 'Oyuncular ve sunucu sahipleri için kısa, resimli rehberler. Her biri ne kadar sürdüğünü ve nelere ihtiyaç olduğunu söyler.',
    searchLabel: 'Rehberlerde ara',
    searchPlaceholder: 'Rehberlerde ara, örn. “yedek” veya “port”',
    filterLabel: 'Konuya göre süz',
    filters: {
      all: 'Tüm rehberler',
      patcher: 'Yamalayıcı',
      server: 'Sunucu',
      android: 'Android',
      beginner: 'Başlangıç',
      advanced: 'İleri'
    },
    startHere: 'Buradan başlayın',
    patcherTitle: 'Yamalayıcı',
    serverTitle: 'Sunucu',
    min: 'dk',
    comingSoon: 'Yakında',
    noResults: 'Aramanızla eşleşen rehber yok.',
    clear: 'Aramayı ve süzgeçleri temizle',
    resultsStatus: 'rehber gösteriliyor',
    missing: 'Eksik bir rehber mi var ya da hata mı buldunuz?',
    suggest: 'GitHub’da önerin',
    items: [
      {
        id: 'fix-game-on-phone',
        title: 'Oyunu telefonunuzda baştan sona düzeltin',
        summary: 'Dünyaları yedekleyin, yamalayın, orijinali kaldırın ve düzeltilmiş oyunu kurun.'
      },
      {
        id: 'lan-play',
        title: 'Aynı Wi-Fi’de arkadaşlarla oynayın',
        summary: 'Bilgisayarınızda bir sunucu başlatın ve evdeki her telefondan katılın.'
      },
      {
        id: 'backup-worlds',
        title: 'Yamalamadan önce dünyalarınızı yedekleyin',
        summary: 'Orijinal oyunun neden kaldırılması gerektiği ve dünyalarınızı nasıl koruyacağınız.'
      },
      {
        id: 'get-apk',
        title: 'Sahip olduğunuz oyunun APK’sını alın',
        summary: 'Yüklü oyunu telefonunuzdan bilgisayarınıza kopyalayın.'
      },
      {
        id: 'signing-key',
        title: 'İmzalama anahtarınızı güvende tutun',
        summary: 'Güncellemelerin neden aynı anahtarı gerektirdiği ve onu nasıl dışa/içe aktaracağınız.'
      },
      {
        id: 'raspberry-pi',
        title: 'Raspberry Pi’de 7/24 sunucu çalıştırın',
        summary: 'ARM sürümünü kurun, açılışta başlatın ve otomatik yedekleri koruyun.'
      },
      {
        id: 'open-internet',
        title: 'Sunucunuzu internete açın',
        summary: 'Bağlantı noktası yönlendirme, parolalar ve beyaz listeler, adım adım.'
      },
      {
        id: 'admins-mods',
        title: 'Yöneticiler, moderatörler ve yasaklar',
        summary: 'Kim neyi yapabilir ve oyuncuları uygulamadan nasıl yönetirsiniz.'
      },
      {
        id: 'host-android',
        title: 'Android telefondan barındırın',
        summary: 'Android durdurmadan sunucuyu arka planda çalışır tutun.'
      },
      {
        id: 'docker',
        title: 'Docker ve Docker Compose',
        summary: 'Kapsayıcı sunucular için birimler, güncellemeler ve günlükler.'
      }
    ]
  },
  article: {
    breadcrumb: 'Sayfa yolu',
    guides: 'Rehberler',
    topic: 'Yamalayıcı',
    tags: 'Yamalayıcı · Android',
    level: 'Başlangıç',
    title: 'Oyunu telefonunuzda baştan sona düzeltin',
    lead: 'Bu rehber Android için Blockheads Yamalayıcı uygulamasını kullanır. Dünyalarınızı korur, “Hoş geldin” donmasını ve — 1.7.6’da — dünya yükleme çökmesini düzeltirsiniz.',
    updated: 'Güncellendi {{[TARİH]}} · [Bu sayfayı GitHub’da düzenleyin](websiteRepo)',
    toc: 'Bu sayfada',
    need: {
      title: 'Nelere ihtiyacınız var',
      items: [
        'Telefonunuza kurulu The Blockheads 1.7.4, 1.7.5 veya 1.7.6',
        'Blockheads Yamalayıcı uygulaması ([indir](patcherReleases))',
        'Yaklaşık 200 MB boş alan'
      ]
    },
    s1: {
      title: 'Dünyalarınızı yedekleyin',
      body: 'Android, düzeltilmiş oyunu ancak orijinal kaldırıldıktan sonra kurmanıza izin verir. Oyunu kaldırmak bu telefonda kayıtlı dünyaları da siler — bu yüzden önce onları başka bir yere kaydedin.',
      calloutStrong: 'Bunu atlamayın.',
      callout:
        'Yalnızca bu telefondaki dünyalar, oyunu kaldırdıktan sonra geri alınamaz. Sunucudaki dünyalar güvendedir.',
      shotAlt: 'Ekran görüntüsü yer tutucusu: oyunun dünya listesi ve yedekleme seçeneği',
      shot: '[EKRAN GÖRÜNTÜSÜ — dünya listesi ve yedekleme seçeneği]'
    },
    s2: {
      title: 'Yüklü oyunu seçin',
      body: 'Yamalayıcıyı açın ve **Yüklü oyunu kullan**’a dokunun. Yamalayıcı telefonunuzdaki oyunu okur ve sürümünü gösterir. Hiçbir şey yüklenmez.',
      shotAlt: 'Ekran görüntüsü yer tutucusu: Yamalayıcı oyun seçme ekranı',
      shot: '[EKRAN GÖRÜNTÜSÜ — Yamalayıcı “Oyununuzu seçin”]'
    },
    s3: {
      title: 'Yamalayın',
      body: 'Sürümünüzün ihtiyaç duyduğu düzeltmeler zaten işaretli. **Oyunu yamala**’ya dokunun ve yaklaşık bir dakika bekleyin. Uygulamayı açık tutun.',
      callout:
        'Yamalayıcı oyunu **kendi anahtarınızla** imzalar. O anahtarı saklayın — gelecekteki güncellemeleri dünyalarınızı yeniden kaybetmeden kurmak için aynısına ihtiyacınız olacak. [İmzalama anahtarları hakkında bilgi alın](guides)'
    },
    s4: {
      title: 'Oyunları değiştirin',
      body: '**Orijinali kaldır**’a dokunun ve onaylayın. Ardından **Yamalı oyunu kur**’a dokunun. Android sorarsa Yamalayıcı’nın uygulama kurmasına izin verin.'
    },
    s5: {
      title: 'Dünyalarınızı geri getirin',
      body: 'Düzeltilmiş oyunu açın ve 1. adımda kaydettiğiniz dünyaları geri yükleyin. Karşılama penceresi artık normal şekilde kapanır.'
    },
    help: {
      title: 'Bir şeyler ters giderse',
      items: [
        '**“Uygulama yüklenmedi”** — orijinal oyun hâlâ telefonda. Önce onu kaldırın.',
        '**“Sürüm desteklenmiyor”** — bu rehber yalnızca 1.7.4–1.7.6 içindir.',
        'Hâlâ takıldınız mı? [GitHub’da bir sorun açın](patcherIssues) ve Yamalayıcı günlüğünü ekleyin.'
      ]
    },
    helpful: 'Bu rehber yardımcı oldu mu?',
    yes: 'Evet',
    no: 'Hayır',
    thanks: 'Geri bildiriminiz için teşekkürler!',
    previous: 'Önceki',
    next: 'Sonraki',
    prevTitle: 'Sahip olduğunuz oyunun APK’sını alın',
    nextTitle: 'İmzalama anahtarınızı güvende tutun'
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
            a: 'Evet — GitHub’da hata bildirin, rehber yazın veya uygulamaları çevirin.'
          }
        ]
      },
      {
        id: 'patcher',
        title: 'Yamalayıcı',
        items: [
          {
            q: 'Hangi oyun sürümlerini düzeltir?',
            a: '“Hoş geldin” penceresi donması için 1.7.4, 1.7.5 ve 1.7.6. 1.7.6 ayrıca dünya yüklerken çökmeye karşı da düzeltme alır.'
          },
          {
            q: 'Oyun dosyamı yüklüyor musunuz?',
            a: 'Asla. Web uygulaması, masaüstü uygulamaları ve Android uygulaması kendi cihazınızda yama yapar. Web uygulaması bir kez yüklendikten sonra internet olmadan da çalışır.'
          },
          {
            q: 'Android’de orijinal oyunu neden kaldırmalıyım?',
            a: 'Yamalı oyun orijinal anahtarla değil kendi anahtarınızla imzalanır. Android, farklı imzalı bir uygulamanın yüklü uygulamanın yerine geçmesine izin vermez. Önce dünyalarınızı yedekleyin.'
          },
          {
            q: 'İmzalama anahtarı nedir ve neden saklamalıyım?',
            a: 'Bir uygulamanın aynı kaynaktan geldiğini kanıtlar. Daha sonra aynı anahtarla yeniden yamalarsanız yamalı oyunun üzerine kurabilir ve dünyalarınızı koruyabilirsiniz. Dışa aktarın ve güvenli bir yerde saklayın.'
          }
        ]
      },
      {
        id: 'server',
        title: 'Sunucu',
        items: [
          { q: 'Kaç oyuncu katılabilir?', a: '1 ile 32 arası. Sınırı Ayarlar’dan seçersiniz.' },
          {
            q: 'Arkadaşım bağlanamıyor. Nelere bakmalıyım?',
            a: 'Aynı Wi-Fi, doğru adres ve bağlantı noktası, güvenlik duvarının sunucuya izin vermesi ve (açıksa) beyaz listede adının bulunması. [Bağlantı rehberi](guides)'
          },
          {
            q: 'Eski bir Android telefonda çalıştırabilir miyim?',
            a: 'Evet. Sunucu uygulamasını kullanın, telefonu şarjda tutun ve arka planda çalışmasına izin verin.'
          }
        ]
      }
    ],
    helpTitle: 'Hâlâ yardıma mı ihtiyacınız var?',
    helpBody:
      'GitHub’da bir sorun açın. Cihazınızı, oyun sürümünü ve — Yamalayıcı için — hata ekranından kopyalanan günlüğü ekleyin.',
    helpButton: 'Sorun aç',
    helpSection: 'Yardım alma'
  },
  legal: {
    title: 'Yasal bildirim',
    lead: 'Önce sade bir özet. Son güncelleme {{[TARİH]}}.',
    shortTitle: 'Kısaca',
    short:
      'Biz hayranız, oyunun yapımcıları değil. Araçlarımız yalnızca sahibi olduğunuz bir The Blockheads kopyasıyla çalışır. Oyunu paylaşmayız, dosyalarınızı toplamayız ve araçlar hiçbir garanti vermez.',
    sections: [
      {
        title: '1. Bu projeyi kim yürütüyor',
        body: 'Blockheads Club’ı {{[BAKIMCI ADI VEYA KURUM]}}, {{[ÜLKENİZDE GEREKİYORSA POSTA ADRESİ]}} sürdürür. İletişim: {{[İLETİŞİM E-POSTASI]}}.'
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
        title: '4. Kendi kopyanızla kullanım',
        body: 'Yamalayıcı, kendi cihazınızda sağladığınız bir oyun kopyasını değiştirir. O kopyayı değiştirmeye ve kullanmaya izniniz olduğundan emin olmak sizin sorumluluğunuzdadır. Araçlarımızı oyunu paylaşmak veya satmak için kullanmayın.'
      },
      {
        title: '5. Gizlilik',
        body: 'Yamalayıcı dosyaları yalnızca cihazınızda işler; hiçbir şey yüklenmez. Bu web sitesi statiktir. {{[ANALİZ / ÇEREZ KULLANIMINI BELİRTİN YA DA “YOK” YAZIN]}}. Sunucu, oyuncu adlarını ve cihaz tanımlayıcılarını yalnızca onu çalıştıran makinede saklar.'
      },
      {
        title: '6. Garanti yok',
        body: 'Yazılım, lisansında belirtildiği gibi “olduğu gibi”, hiçbir tür garanti olmaksızın sunulur. Yamalamadan veya güncellemeden önce dünyalarınızı yedekleyin.'
      },
      {
        title: '7. Lisanslar',
        body: 'Kodumuz GPL-3.0-only altında yayımlanır. Üçüncü taraf bileşenler ve yazı tipleri (Bricolage Grotesque, Atkinson Hyperlegible Next, JetBrains Mono — SIL Open Font License) her uygulamada Ayarlar → Hakkında → Lisanslar altında listelenir.'
      },
      {
        title: '8. Kaldırma talebi ve iletişim',
        body: 'Hak sahipleri bize {{[İLETİŞİM E-POSTASI]}} adresinden ulaşabilir. İyi niyetli taleplere çabucak yanıt veririz.'
      }
    ]
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
      'Blockheads Club resmî olmayan, ticari olmayan bir topluluk projesidir. Majic Jungle Software veya Noodlecake ile bağlantılı değildir, onlar tarafından onaylanmamış veya desteklenmemiştir. “The Blockheads” ilgili sahibinin ticari markasıdır. Kod GPL-3.0-only altında yayımlanır.'
  }
};
