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
      legal: 'Yasal bildirim · Blockheads Club'
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
      title: 'Hâlâ sevdiğimiz bir oyun için kullanımı kolay araçlar.',
      lead: 'The Blockheads telefonlar için bir kum havuzu oyunudur. Bazı sürümler yeni Android telefonlarda düzgün açılmaz ve pek çok oyuncu kendi sunucusunu ister. İkisi için de ücretsiz araçlar geliştiriyoruz.',
      items: [
        {
          title: 'Açık kaynak, her zaman ücretsiz',
          body: 'Her araç GitHub’da. Herkes kodu okuyabilir, hata bildirebilir veya çeviriye yardım edebilir.'
        },
        {
          title: 'Kopyanız sizin kalır',
          body: 'Patcher, zaten sahip olduğunuz oyunu kendi cihazınızda değiştirir. Oyunu asla barındırmaz veya paylaşmayız.'
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
      lead: 'Modern Android’de 1.7.4 ile 1.7.6 arası oyun sürümleri ilk pencerede donabilir. 1.7.6 ayrıca bir dünya yüklerken çökebilir. Patcher, kendi oyun kopyanızı birkaç tıklamayla onarır.',
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
      noteStrong: 'Hiçbir şey internete yüklenmez.',
      note: 'Yama işlemi cihazınızda çalışır — web uygulaması bile tarayıcınızda çevrimdışı çalışır. Oyunun kendi kopyasına sahip olmanız gerekir.',
      howTitle: 'Nasıl çalışır',
      steps: [
        { title: 'Oyununuzu verin', body: 'APK dosyasını bırakın. Android’de yüklü oyunu seçmeniz yeterli.' },
        { title: 'Düzeltmeleri kontrol edin', body: 'Patcher sürümünüzü bulur ve gereken düzeltmeleri işaretler.' },
        {
          title: 'Kurun ve oynayın',
          body: 'Düzeltilmiş oyunu kaydedin ya da doğrudan telefonunuza kurun. Önce dünyalarınızı yedekleyin — rehber nasıl yapılacağını gösterir.'
        }
      ],
      ctaWeb: 'Web Patcher’ı aç',
      getTitle: 'Patcher’ı indirin',
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
      minRead: { one: 'dk okuma', few: 'dk okuma', many: 'dk okuma', other: 'dk okuma' }
    },
    faq: {
      eyebrow: 'SSS',
      title: 'Merak edilenler',
      lead: 'Yanıtı bulamadınız mı? [Tüm soruları görün](faq) ya da [GitHub](websiteIssues)’da sorun.',
      items: [
        {
          q: 'Bu resmî Blockheads mi?',
          a: 'Hayır. Blockheads Club bağımsız bir hayran projesidir. Majic Jungle Software veya Noodlecake ile bağlantımız yok ve oyunu dağıtmıyoruz.'
        },
        {
          q: 'Güvenli mi? Dosyalarımı görüyor musunuz?',
          a: 'Yama işlemi cihazınızda gerçekleşir. Bize veya başka birine hiçbir şey gönderilmez.'
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
      lead: 'Her adımda kopyalayabileceğiniz bir komut var. Sunucuyu düzgünce durdurmak için konsoluna /stop yazın: dünyayı kaydeder ve kapanır. Ctrl + C son kaydı yapmadan durdurur.',
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
              text: '`blockheads-server-v0.1.1-x86_64-pc-windows-msvc.zip` dosyasını (ARM’de `aarch64-pc-windows-msvc`) alın ve bir klasöre çıkarın, örneğin Belgeler\\Blockheads Server.',
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
              hint: 'Raspberry Pi rehberiyle servis olarak çalıştırın — oradaki systemd adımları her systemd Linux’ta çalışır.'
            }
          ]
        },
        pi: {
          label: 'Raspberry Pi',
          steps: [
            {
              title: 'ARM sürümünü indirin',
              text: '64 bit işletim sisteminde `aarch64`, 32 bit işletim sisteminde `armv7` sürümünü kullanın.'
            },
            {
              title: 'Her açılışta başlatın',
              text: '[Raspberry Pi rehberindeki](raspberryPi) gibi bir systemd servisi oluşturun, sonra etkinleştirin:'
            }
          ]
        },
        docker: {
          label: 'Docker',
          steps: [
            {
              title: 'Konteyneri çalıştırın',
              text: 'Portu UDP olarak eşleyin. Dünyalar `bh-data` volume’ünde tutulur, böylece güncellemelerde korunur. Aynı dünyayı sonra yeniden başlatmak için `--load` kullanın (bkz. [Docker rehberi](docker)).'
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
              text: 'Sunucu arka planda çalışmaya devam eder. Bildirimde durum, oyuncular, adres ve bir Sunucuyu durdur düğmesi görünür.'
            },
            {
              title: 'Telefonu şarjda tutun',
              text: 'Barındırma pil harcar. Sunucu çalışırken uygulama telefonu ve Wi-Fi bağlantısını uyanık tutar. Telefonunuz yine de durduruyorsa Android ayarlarında uygulama için pil optimizasyonunu kapatın.'
            }
          ]
        }
      }
    },
    connect: {
      eyebrow: 'Bağlan',
      title: 'Telefonunuzdan katılın',
      lead: 'Telefonunuz ve sunucu aynı Wi-Fi ağında olmalı. Masaüstü ve Android uygulamaları adresi panelde ve QR kod olarak gösterir. Komut satırı sunucusunda bilgisayarın yerel IP adresini kullanın.',
      steps: [
        {
          title: 'Adresi bulun',
          body: 'Örneğin `192.168.1.42` ve `15151` portu. Telefonda kopyalamak için QR kodu tarayın.'
        },
        {
          title: 'Oyunun çok oyunculu menüsünü açın',
          body: '**Join World** → **Advanced...** → **Online IP/Port...** yolunu izleyin.'
        },
        {
          title: 'Adresi girin ve oynayın',
          body: 'Sunucunun parolası varsa oyun sizden ister.'
        }
      ],
      qrLabel: '192.168.1.42:15151 için örnek QR kod',
      wifi: 'Wi-Fi ağınızda',
      addressHint: 'Örnek adres; Sunucu panelinde göründüğü gibi.',
      warnTitle: 'İnternet üzerinden mi oynuyorsunuz?',
      warnBody:
        'Modeminizde UDP 15151 portunu sunucu bilgisayarına yönlendirin ve genel IP’nizi paylaşın. Önce bir parola belirleyin veya beyaz listeyi açın. [Rehberi okuyun](openInternet)',
      info: 'Telefonunuzdaki oyun sürümü sunucuyla eşleşmelidir. Yamalı ve orijinal oyunlar birlikte oynayabilir.'
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
    title: 'Adım adım öğrenin',
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
    startHere: 'Buradan başlayın',
    patcherTitle: 'Patcher',
    serverTitle: 'Sunucu',
    min: 'dk',
    comingSoon: 'Yakında',
    noResults: 'Aramanızla eşleşen rehber yok.',
    clear: 'Aramayı ve filtreleri temizle',
    resultsStatus: { one: 'rehber gösteriliyor', few: 'rehber gösteriliyor', many: 'rehber gösteriliyor', other: 'rehber gösteriliyor' },
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
        title: 'Aynı Wi-Fi ağındaki arkadaşlarla oynayın',
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
        title: 'İmza anahtarınızı güvende tutun',
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
        summary: 'Port yönlendirme, parolalar ve beyaz listeler, adım adım.'
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
    title: 'Oyunu telefonunuzda baştan sona düzeltin',
    lead: 'Bu rehber Android için Blockheads Patcher uygulamasını kullanır. Dünyalarınızı korur, “Hoş geldin” donmasını ve — 1.7.6’da — dünya yükleme çökmesini düzeltirsiniz.',
    updated: 'Güncellendi: 21 Ekim 2026 · [Bu sayfayı GitHub’da düzenleyin](websiteRepo)',
    toc: 'Bu sayfada',
    need: {
      title: 'Nelere ihtiyacınız var',
      items: [
        'Telefonunuza kurulu The Blockheads 1.7.4, 1.7.5 veya 1.7.6',
        'Blockheads Patcher uygulaması ([indir](patcherReleases))',
        'Yaklaşık 200 MB boş alan'
      ]
    },
    s1: {
      title: 'Dünyalarınızı yedekleyin',
      body: 'Android, düzeltilmiş oyunu ancak orijinal kaldırıldıktan sonra kurmanıza izin verir. Oyunu kaldırmak bu telefonda kayıtlı dünyaları da siler — bu yüzden önce onları başka bir yere kaydedin.',
      calloutStrong: 'Bunu atlamayın.',
      callout:
        'Yalnızca bu telefondaki dünyalar, oyunu kaldırdıktan sonra geri alınamaz. Sunucudaki dünyalar güvendedir.'
    },
    s2: {
      title: 'Yüklü oyunu seçin',
      body: 'Patcher’ı açın ve **Yüklü oyunu kullan**’a dokunun. Patcher telefonunuzdaki oyunu okur ve sürümünü gösterir. Hiçbir şey internete yüklenmez.'
    },
    s3: {
      title: 'Yamalayın',
      body: 'Sürümünüzün ihtiyaç duyduğu düzeltmeler zaten işaretli. **Oyunu yamala**’ya dokunun ve yaklaşık bir dakika bekleyin. Uygulamayı açık tutun.',
      callout:
        'Patcher oyunu **kendi anahtarınızla** imzalar. O anahtarı saklayın — gelecekteki güncellemeleri dünyalarınızı yeniden kaybetmeden kurmak için aynısına ihtiyacınız olacak. [İmza anahtarları hakkında bilgi alın](signingKey)'
    },
    s4: {
      title: 'Oyunları değiştirin',
      body: '**Dünyalarımı yedekledim ya da onlara ihtiyacım yok** kutusunu işaretleyin, **Orijinali kaldır**’a dokunun ve onaylayın. Ardından **Düzeltilmiş oyunu kur**’a dokunun. Android sorarsa Patcher’ın uygulama kurmasına izin verin.'
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
        'Hâlâ takıldınız mı? [GitHub’da sorun bildirin](patcherIssues) ve Patcher logunu ekleyin.'
      ]
    },
    helpful: 'Bu rehber yardımcı oldu mu?',
    yes: 'Evet',
    no: 'Hayır',
    thanks: 'Geri bildiriminiz için teşekkürler!',
    previous: 'Önceki',
    next: 'Sonraki',
    prevTitle: 'Sahip olduğunuz oyunun APK’sını alın',
    nextTitle: 'İmza anahtarınızı güvende tutun'
  },
  docs: {
    'lan-play': {
      tags: 'Sunucu · Wi-Fi',
      title: 'Aynı Wi-Fi ağındaki arkadaşlarınızla oynayın',
      lead: 'Evdeki bir bilgisayarda sunucu başlatın; Wi-Fi ağınıza bağlı her telefon aynı dünyaya katılsın. Yaklaşık dört dakika sürer.',
      need: [
        'Telefonlarla aynı Wi-Fi ağında bir Windows, macOS ya da Linux bilgisayar',
        'Blockheads Sunucu — masaüstü uygulaması ya da komut satırı sunucusu ([indirmeler](serverReleases))',
        'Her telefonda The Blockheads. Yeni Android sürümlerinde [önce oyunu düzeltin](fixGameOnPhone)'
      ],
      steps: [
        {
          title: 'Bir sunucu başlatın',
          body: [
            '**Masaüstü uygulaması:** **Dünyalar**’ı açın, **Dünya oluştur**’a dokunun, bir ad verin ve **Sunucuyu başlat**’a dokunun.',
            '**Komut satırı:** bilgisayarınıza uygun indirmeyi açın ve bir dünya oluşturun. Sunucu hemen başlar:'
          ],
          tip: 'Komut satırı sunucusunu `/stop` ile durdurun. Ctrl + C son kaydı yapmadan kapatır.'
        },
        {
          title: 'Güvenlik duvarından geçirin',
          body: [
            'Sunucu **UDP 15151** portunu kullanır. Windows Güvenlik Duvarı sorduğunda **özel ağlarda** erişime izin verin. Başka sistemlerde güvenlik duvarı kullanıyorsanız 15151’e gelen UDP trafiğine izin verin.'
          ]
        },
        {
          title: 'Sunucunun adresini bulun',
          body: [
            'Masaüstü uygulamasında **Panel**’deki **Telefondan bağlan** kartı **Yerel ağ adresi**ni, portu ve bir QR kodu gösterir. Adresi kopyalamak için kodu telefon kamerasıyla tarayın.',
            'Komut satırında bilgisayarınızın yerel IP adresini ağ ayarlarından bulun, örneğin `192.168.1.42`.'
          ]
        },
        {
          title: 'Oyundan katılın',
          body: ['Her telefonda oyunu açın ve şuraya gidin:'],
          list: [
            '**Join World** → **Advanced...** → **Online IP/Port...**',
            'Adresi ve portu girin (alanda zaten `15151` yazar)',
            '**Join Online World**’e dokunun'
          ],
          tip: 'Sunucunun parolası varsa oyun onu sorar.'
        }
      ],
      help: [
        '**Kimse bağlanamıyor** — telefonların aynı Wi-Fi ağında (misafir ağında değil) olduğunu ve güvenlik duvarının UDP 15151’e izin verdiğini kontrol edin.',
        '**Bir arkadaşınız reddediliyor** — beyaz listede isim varsa yalnızca o isimler katılabilir. Bkz. [Yöneticiler, moderatörler ve yasaklar](adminsMods).',
        'Hâlâ takıldınız mı? [GitHub’da sorun bildirin](serverIssues) ve sunucu logunu ekleyin.'
      ]
    } as GuideDoc,
    'backup-worlds': {
      tags: 'Patcher · Android',
      title: 'Yamalamadan önce dünyalarınızı yedekleyin',
      lead: 'Android’de düzeltilmiş oyunu kurmadan önce orijinali kaldırmanız gerekir — bu da telefonda kayıtlı dünyaları siler. Nedenini ve dünyaları nasıl koruyacağınızı anlatıyoruz.',
      need: ['Telefonunuzda kurulu The Blockheads', 'Yamalamaya başlamadan önce birkaç dakika'],
      steps: [
        {
          title: 'Orijinalin neden kaldırılması gerektiğini bilin',
          body: [
            'Patcher düzeltilmiş oyunu orijinal anahtarla değil **kendi anahtarınızla** imzalar. Android, imzası farklı bir uygulamayı mevcut uygulamanın üzerine kurmaz; bu yüzden önce orijinal kaldırılmalıdır.'
          ],
          warn: '**O telefonda kayıtlı dünyalar oyunla birlikte silinir.** Sunucularda barındırılan dünyalar etkilenmez.'
        },
        {
          title: 'Her dünyayı oyunun içinden yedekleyin',
          body: [
            'Telefonunuzdaki orijinal oyunu açın ve saklamak istediğiniz her dünya için oyunun kendi yedeklemesini kullanın. Patcher bunu sizin yerinize yapamaz: kayıtlarınıza hiç dokunmaz.'
          ]
        },
        {
          title: 'Patcher’da onaylayın',
          body: [
            'Patcher orijinali kaldırmadan önce **Bu telefondaki dünyalarınız silinecek** uyarısını gösterir. Devam etmek için **Dünyalarımı yedekledim ya da onlara ihtiyacım yok** kutusunu işaretleyin.'
          ]
        },
        {
          title: 'Kurduktan sonra geri yükleyin',
          body: ['Düzeltilmiş oyun kurulunca onu açın ve dünyalarınızı yedeğinizden geri yükleyin.'],
          tip: '**Kaldırırken oyun verisini saklamayı öner** düzeltmesi varsayılan olarak açıktır. Bununla Android 10 ve üstü, düzeltilmiş oyunu bir gün kaldırırsanız oyun verisini saklamak isteyip istemediğinizi sorar.'
        },
        {
          title: 'Bir dahaki sefere bunu atlayın',
          body: [
            'İmza anahtarınızı saklayın. Aynı anahtarla yeniden yamalarsanız güncelleme düzeltilmiş oyunun üzerine kurulur ve dünyalarınız kalır. [İmza anahtarınızı güvende tutun](signingKey)'
          ]
        }
      ],
      help: [
        'Bir dünyanın kaydedildiğinden emin değil misiniz? Yeniden yedekleyin — yalnızca bir dakika sürer.',
        'Sorunuz mu var? [GitHub’da sorabilirsiniz](patcherIssues).'
      ]
    } as GuideDoc,
    'get-apk': {
      tags: 'Patcher · Android',
      title: 'Sahip olduğunuz oyunun APK’sını alın',
      lead: 'Web ve masaüstü Patcher oyunu bir `.apk` dosyası olarak ister. Android’de bu rehberi genellikle atlayabilirsiniz.',
      need: [
        'Android telefonunuzda kurulu The Blockheads',
        'Bilgisayarla yapacaksanız: bir USB kablosu ve Android’in `adb` aracı'
      ],
      steps: [
        {
          title: 'Android’de misiniz? Yüklü oyunu kullanın',
          body: [
            'Android için Blockheads Patcher uygulaması telefonunuzdaki oyunu bulur. **Yüklü oyunu kullan**’a dokunun — dosya gerekmez. Elinizde zaten bir dosya varsa **APK dosyası seç**’e dokunun.'
          ]
        },
        {
          title: 'Oyunu bilgisayara kopyalayın',
          body: [
            'Telefonda USB hata ayıklamayı açın, telefonu bağlayın ve Android’e oyunun nerede olduğunu sorun. Ardından o dosyayı kopyalayın:'
          ],
          warn: 'İlk komut **birden fazla** satır yazarsa oyun birden çok APK dosyasına bölünmüştür. Patcher bunları güvenle yamalayamaz — tam (evrensel) bir APK gerekir.'
        },
        {
          title: 'Patcher’da açın',
          body: [
            '[Web Patcher](webPatcher)’ı ya da masaüstü uygulamasını açın ve dosyayı bırakın. **Yalnızca .apk dosyaları** kabul edilir. Hiçbir şey internete yüklenmez.'
          ],
          tip: 'Yalnızca kendi kopyanızı kullanın ve APK’yı başkalarıyla paylaşmayın.'
        }
      ],
      help: [
        '**“Telefonunuzdan kaydettiğiniz The Blockheads .apk dosyasını seçin.”** — dosya başka bir uygulama.',
        '**“Yüklü oyun birden çok APK dosyasına bölünmüş…”** — bunun yerine tam (evrensel) bir APK kullanın.',
        'Sonraki adım: [Oyunu telefonunuzda düzeltin](fixGameOnPhone).'
      ]
    } as GuideDoc,
    'signing-key': {
      tags: 'Patcher',
      title: 'İmza anahtarınızı güvende tutun',
      lead: 'Yamaladığınız her oyun yalnızca cihazınızda duran bir anahtarla imzalanır. Bir yedeğini saklarsanız gelecekteki düzeltmeler kaldırmadan kurulur.',
      need: ['Blockheads Patcher (web, masaüstü ya da Android)', 'Küçük bir dosya için güvenli bir yer ve hatırlayacağınız bir parola'],
      steps: [
        {
          title: 'Anahtarın ne işe yaradığını bilin',
          body: [
            'Patcher anahtarı ilk yamalamada oluşturur. Android, düzeltilmiş oyununuzun üzerine bir güncellemeyi yalnızca **ikisi de aynı anahtarla imzalanmışsa** kurar. Yeni anahtar, yeniden kaldırmak demektir — yedeklemediyseniz yerel dünyaları kaybedersiniz.'
          ],
          warn: '**Gizli tutun.** Anahtarınıza sahip olan biri, oyununuzun güncellemesi gibi görünen uygulamalar yapabilir.'
        },
        {
          title: 'Bir yedek dışa aktarın',
          body: [
            '**İmza anahtarları**’nı açın ve **Yedeği dışa aktar…**’ı seçin. Bir parola belirleyin, tekrarlayın ve **Yedeği kaydet**’e dokunun. Varsayılan adı `blockheads-patcher-key.json` olan bir `.json` dosyası alırsınız.'
          ],
          tip: 'Parolayı kurtaramayız, bu yüzden bir yere yazın. Parola olmadan dosya şifrelenmez ve dosyaya sahip olan herkes sizin adınıza uygulama imzalayabilir.'
        },
        {
          title: 'Başka bir cihaza taşıyın',
          body: [
            'Yeni cihazda **İmza anahtarları**’nı açın, **Anahtarı içe aktar**’ı seçin ve `.json` dosyasını seçin. Yedek parolasını girin, ardından **Bu anahtarı kullan**’a dokunun.',
            'Aynı anahtar olduğundan emin olmak için iki cihazda parmak izinin ilk ve son dört çiftini karşılaştırın.'
          ]
        },
        {
          title: 'Anahtar kaybolursa',
          body: [
            'Yedeğiniz yoksa o anahtarla yamalanmış oyunları güncelleyemezsiniz. Dünyalarınızı yedekleyin, düzeltilmiş oyunu kaldırın ve yeni bir anahtarla yeniden yamalayın. [Dünyalar nasıl yedeklenir](backupWorlds)'
          ]
        }
      ],
      help: [
        'Web Patcher anahtarı tarayıcınızın bu siteye ait depolamasında tutar. Sitenin verilerini temizlemek onu siler — önce bir yedek alın.',
        'İçe aktarma yalnızca Patcher’ın dışa aktardığı `.json` yedeklerini kabul eder.',
        'Sorunuz mu var? [GitHub’da sorabilirsiniz](patcherIssues).'
      ]
    } as GuideDoc,
    'raspberry-pi': {
      tags: 'Sunucu · Linux',
      title: 'Raspberry Pi’de 7/24 sunucu çalıştırın',
      lead: 'Raspberry Pi az enerji harcar ve dünyanızı gece gündüz barındırabilir. ARM sürümünü kuracak, açılışta başlatacak ve her gece yedek alacaksınız.',
      need: [
        'Ağınıza bağlı, Raspberry Pi OS (ya da başka bir Linux) kurulu bir Raspberry Pi',
        'Pi’de bir terminal (doğrudan ya da SSH ile)',
        '[Sürümler sayfasından](serverReleases) komut satırı sunucusu'
      ],
      steps: [
        {
          title: '32 bit mi 64 bit mi, kontrol edin',
          body: [
            '64 bit sistemde `aarch64`, 32 bit sistemde `armv7` sürümünü kullanın. Hangisine sahip olduğunuzu bu komut söyler:'
          ]
        },
        {
          title: 'İndirin ve açın',
          body: [
            'Bu komutlar 0.1.1 sürümünü ve 64 bit yapıyı kullanır. Sürümler sayfasından en yeni sürümü alın; 32 bit sistemde `aarch64-unknown-linux-gnu` yerine `armv7-unknown-linux-gnueabihf` kullanın.'
          ]
        },
        {
          title: 'Dünyanızı oluşturun',
          body: [
            'Dünyayı bir kez elle oluşturun. Dünyalar `~/GNUstep/Library/ApplicationSupport/TheBlockheads` klasörüne kaydedilir.'
          ],
          tip: 'Seçenek verilmezse sunucu en son dünyayı yükler. Aşağıdaki servis bunu kullanır.'
        },
        {
          title: 'Her açılışta başlatın',
          body: [
            'Bir systemd servisi oluşturun. `pi` yerine dünyayı oluşturan kullanıcının adını yazın.'
          ],
          tip: 'Servisin konsolu yoktur. Komutları oyun sohbetinde yönetici olarak verin (bkz. [Yöneticiler, moderatörler ve yasaklar](adminsMods)) ve logları `journalctl` ile izleyin.'
        },
        {
          title: 'Her gece yedek alın',
          body: [
            'Dünya klasörünü yalnızca sunucu dururken kopyalayın. Bu root cron görevi sunucuyu 04:00’te durdurur, her şeyi tarihli bir `.tar.gz` dosyasına paketler ve yeniden başlatır. `/home/pi` yerine kendi ev klasörünüzü yazın.'
          ],
          warn: '`systemctl stop` sunucuyu son kaydı yapmadan kapatır. Sunucu düzenli kaydeder ama son birkaç saniye kaybolabilir — sakin bir saat seçin.'
        }
      ],
      help: [
        '**“Exec format error”** — yanlış yapı. `uname -m` ile yeniden kontrol edin.',
        '**Arkadaşlar bağlanamıyor** — [Aynı Wi-Fi ağındaki arkadaşlarınızla oynayın](lanPlay) rehberindeki kontrollerin aynısı.',
        'Hâlâ takıldınız mı? `journalctl` çıktısıyla [GitHub’da sorun bildirin](serverIssues).'
      ]
    } as GuideDoc,
    'open-internet': {
      tags: 'Sunucu · Ağ',
      title: 'Sunucunuzu internete açın',
      lead: 'Evinizin dışındaki arkadaşlarınız da dünyanıza katılsın. Önce sunucuyu kilitleyecek, sonra modeminizde tek bir portu yönlendireceksiniz.',
      need: [
        'Wi-Fi ağınızda zaten çalışan bir sunucu ([yerel ağ rehberi](lanPlay))',
        'Modeminizin arayüzüne erişim'
      ],
      steps: [
        {
          title: 'Önce sunucuyu kilitleyin',
          body: [
            'Bir **parola** belirleyin: uygulamada **Ayarlar** → **Parola** (en çok 15 karakter) ya da konsolda `/set-password` ile.',
            'Ya da isim ekleyerek **beyaz liste**yi açın: uygulamada **Erişim listeleri** → **Beyaz liste** ya da `/whitelist` ile. Beyaz listede isim olduğu anda yalnızca o oyuncular katılabilir.'
          ]
        },
        {
          title: 'Sunucuya sabit bir adres verin',
          body: [
            'Modeminizde sunucu bilgisayarının yerel IP adresini ayırın (genellikle DHCP rezervasyonu denir); böylece yeniden başlatınca değişmez.'
          ]
        },
        {
          title: 'Portu yönlendirin',
          body: [
            'Modemin port yönlendirme sayfasında **UDP 15151**’i sunucu bilgisayarının yerel adresine yönlendirin. Portu değiştirdiyseniz kendinizinkini kullanın.'
          ]
        },
        {
          title: 'Genel adresinizi paylaşın',
          body: [
            'Genel IP adresinizi öğrenin ve portla birlikte arkadaşlarınıza gönderin. **Join World** → **Advanced...** → **Online IP/Port...** ile katılırlar.'
          ],
          warn: 'Genel IP’niz kabaca nerede olduğunuzu gösterir. Yalnızca güvendiğiniz kişilerle paylaşın.'
        }
      ],
      help: [
        '**Evde çalışıyor, dışarıdan çalışmıyor** — modemin internet (WAN) adresi genel IP’nizden farklı olabilir (bazı sağlayıcılar bir adresi müşteriler arasında paylaştırır). O zaman yönlendirme çalışamaz; sağlayıcınıza sorun.',
        '**Hâlâ engelli** — sunucu bilgisayarındaki güvenlik duvarının UDP 15151’e izin verdiğini kontrol edin.',
        'Yardım mı lazım? [GitHub’da sorun bildirin](serverIssues).'
      ]
    } as GuideDoc,
    'admins-mods': {
      tags: 'Sunucu',
      title: 'Yöneticiler, moderatörler ve yasaklar',
      lead: 'Sunucunuzda kim ne yapabilir; oyuncuları uygulamadan, konsoldan ya da oyun sohbetinden nasıl yönetirsiniz.',
      need: ['Çalışan bir Blockheads sunucusu', 'Yönetmek istediğiniz oyuncu adları'],
      steps: [
        {
          title: 'Rolleri tanıyın',
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
          title: 'Yönetici ve moderatör ekleyin',
          body: [
            'Uygulamada **Erişim listeleri** → **Yöneticiler** ya da **Moderatörler**’i açın ve **Yönetici ekle** ya da **Moderatör ekle**’ye dokunun. Ya da **Oyuncular** altında bir oyuncuya dokunup **Yönetici yap** ya da **Moderatör yap**’ı seçin. Konsolda:'
          ]
        },
        {
          title: 'Atın ve yasaklayın',
          body: [
            'Uygulamada bir oyuncuya dokunun ve **At…** ya da **Yasakla…**’yı seçin. Bir yasak yalnızca adı değil **IP adresini de engelleyebilir**. `/ban` oyuncunun cihazını da yasaklar; `/ban-no-device` yalnızca adı yasaklar.'
          ]
        },
        {
          title: 'Beyaz liste kullanın',
          body: [
            'Beyaz liste içine bir isim eklendiği anda açılır. O zaman yalnızca listedeki oyuncular katılabilir ve izni olmayan herkes atılır.'
          ]
        },
        {
          title: 'Liste dosyalarını düzenleyin',
          body: [
            'Her dünya, `saves` altındaki klasöründe `adminlist.txt`, `modlist.txt`, `whitelist.txt` ve `blacklist.txt` tutar. Her satıra bir isim; büyük/küçük harf fark etmez ve ilk satır yok sayılır. Elle düzenledikten sonra yeniden yükleyin:'
          ]
        }
      ],
      help: [
        '**“Sorry, you do not have permission to issue that command.”** — bu sunucuda moderatör ya da yönetici değilsiniz.',
        'Sunucu çalışırken uygulama liste değişikliklerini konsol komutlarıyla uygular.',
        'Sorunuz mu var? [GitHub’da sorabilirsiniz](serverIssues).'
      ]
    } as GuideDoc,
    'host-android': {
      tags: 'Sunucu · Android',
      title: 'Android telefondan sunucu barındırın',
      lead: 'Boşta duran bir Android telefonu sunucuya çevirin. Blockheads Sunucu uygulaması arka planda çalışmaya devam eder ve onu bir bildirimden yönetirsiniz.',
      need: [
        'Wi-Fi ağınıza bağlı bir Android telefon',
        'Blockheads Sunucu APK’sı (`blockheads-server-…-android.apk`, [sürümler](serverReleases))',
        'Bir şarj aleti'
      ],
      steps: [
        {
          title: 'Uygulamayı kurun',
          body: ['APK’yı indirin ve açın. Android tarayıcınızdan kurulumlara izin vermenizi isteyebilir.']
        },
        {
          title: 'Bir dünya oluşturun ve başlatın',
          body: [
            '**Dünyalar** → **Dünya oluştur**’u açın. Bir ad (en çok 30 karakter) ve boyut seçin, **Bu dünyayı hemen kullan** açık kalsın, sonra **Sunucuyu başlat**’a dokunun.'
          ]
        },
        {
          title: 'Arka planda çalışsın',
          body: [
            'Bir bildirim durumu, dünyayı, çevrimiçi oyuncu sayısını ve adresi gösterir. Düğmeleri **Sunucuyu durdur**, **Adresi kopyala** ve **Konsol**’dur.'
          ],
          tip: 'Sunucu çalışırken uygulama telefonu ve Wi-Fi bağlantısını uyanık tutar. Telefonunuz yine de durduruyorsa Android ayarlarında Blockheads Sunucu için pil optimizasyonunu kapatın.'
        },
        {
          title: 'Telefonu şarjda tutun',
          body: ['Sunucu barındırmak pil harcar. Arkadaşlarınız oynarken telefonu şarjda bırakın.']
        },
        {
          title: 'Arkadaşlarınızı bağlayın',
          body: [
            '**Panel** **Yerel ağ adresi**ni ve bir QR kodu gösterir. Diğer telefonlarda **Join World** → **Advanced...** → **Online IP/Port...** ile katılın.'
          ]
        }
      ],
      help: [
        '**“Sunucu beklenmedik şekilde durdu”** — nedenini görmek için bildirime dokunun ve **Günlüğü aç**’ı seçin.',
        'Dünyalar bu telefondaki uygulamanın özel depolamasında saklanır.',
        'Hâlâ takıldınız mı? [GitHub’da sorun bildirin](serverIssues).'
      ]
    } as GuideDoc,
    docker: {
      tags: 'Sunucu · Docker',
      title: 'Docker ve Docker Compose',
      lead: 'Sunucuyu bir konteyner olarak çalıştırın. Dünyalar bir volume’de durur; böylece güncellemelerden sonra da kalır.',
      need: [
        'Docker (isterseniz Docker Compose da)',
        'Çok mimarili `ghcr.io/blockheads-club/blockheads-server` imajı (amd64, arm64, arm/v7)'
      ],
      steps: [
        {
          title: 'Bir dünya oluşturun',
          body: [
            'Konsolu almak için konteyneri bir kez `-it` ile çalıştırın. Dünyalar `bh-data` volume’üne gider. **World load complete.** yazısını bekleyin, sonra `/stop` yazın.'
          ],
          tip: 'Örnekler 0.1.1 sürümünü kullanır. Her sürümün bir sürüm etiketi vardır; en yenisini seçin.'
        },
        {
          title: 'Dünya kimliğini bulun',
          body: ['Volume’deki dünyaları listeleyin. Uzun onaltılık ad dünya kimliğidir.']
        },
        {
          title: 'Arka planda çalıştırın',
          body: [
            'Dünyayı `--load` ile başlatın. Konsolu sonra açabilmek için `-i` ve `-t` kalsın; portu **UDP** olarak eşleyin.'
          ]
        },
        {
          title: 'Loglar ve konsol',
          body: ['Logları izleyin ya da `/players` veya `/stop` gibi komutlar yazmak için konsola bağlanın.']
        },
        {
          title: 'Ya da Docker Compose kullanın',
          body: ['Aynı kurulum bir `compose.yaml` olarak. `docker compose up -d` ile başlatın.']
        }
      ],
      help: [
        '**Konteyner yalnızca yardım metnini yazıyor** — `--new` ya da `--load` gibi seçenekler vermezseniz imaj `--help` ile başlar.',
        '**Güncelleme** — konteyneri durdurup silin, sonra yeni etiketle yeniden çalıştırın. `bh-data` volume’ü dünyalarınızı saklar. `docker stop` sunucuyu son kaydı yapmadan kapatır; kimse oynamıyorken durdurun.',
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
            a: 'Evet — GitHub’da hata bildirin, rehber yazın veya uygulamaları çevirin.'
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
            a: 'Asla. Web uygulaması, masaüstü uygulamaları ve Android uygulaması kendi cihazınızda yama yapar. Web uygulaması bir kez yüklendikten sonra internet olmadan da çalışır.'
          },
          {
            q: 'Android’de orijinal oyunu neden kaldırmalıyım?',
            a: 'Yamalı oyun orijinal anahtarla değil kendi anahtarınızla imzalanır. Android, farklı imzalı bir uygulamanın yüklü uygulamanın yerine geçmesine izin vermez. Önce dünyalarınızı yedekleyin.'
          },
          {
            q: 'İmza anahtarı nedir ve neden saklamalıyım?',
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
            a: 'Aynı Wi-Fi, doğru adres ve port, güvenlik duvarının sunucuya izin vermesi ve (açıksa) beyaz listede adının bulunması. [Bağlantı rehberi](lanPlay)'
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
      'GitHub’da sorun bildirin. Cihazınızı, oyun sürümünü ve — Patcher için — hata ekranından kopyalanan logu ekleyin.',
    helpButton: 'Sorun bildir',
    helpSection: 'Yardım alma'
  },
  legal: {
    title: 'Yasal bildirim',
    lead: 'Önce sade bir özet. Son güncelleme: 21 Ekim 2026.',
    shortTitle: 'Kısaca',
    short:
      'Biz hayranız, oyunun yapımcıları değil. Araçlarımız yalnızca sahibi olduğunuz bir The Blockheads kopyasıyla çalışır. Oyunu paylaşmayız, dosyalarınızı toplamayız ve araçlar hiçbir garanti vermez.',
    sections: [
      {
        title: '1. Bu projeyi kim yürütüyor',
        body: 'Blockheads Club’ı [GitHub’daki Blockheads Club organizasyonundaki](org) gönüllüler sürdürür. İletişim: [GitHub’da bir konu (issue) açın](websiteIssues).'
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
        body: 'Patcher, kendi cihazınızda sağladığınız bir oyun kopyasını değiştirir. O kopyayı değiştirmeye ve kullanmaya izniniz olduğundan emin olmak sizin sorumluluğunuzdadır. Araçlarımızı oyunu paylaşmak veya satmak için kullanmayın.'
      },
      {
        title: '5. Gizlilik',
        body: 'Patcher dosyaları yalnızca cihazınızda işler; hiçbir şey internete yüklenmez. Bu web sitesi statiktir: analiz, izleme veya çerez kullanmaz. Yalnızca tema ve dil seçiminizi tarayıcınızın yerel depolamasında hatırlar. Sunucu, oyuncu adlarını ve cihaz tanımlayıcılarını yalnızca onu çalıştıran makinede saklar.'
      },
      {
        title: '6. Garanti yok',
        body: 'Yazılım, lisansında belirtildiği gibi “olduğu gibi”, hiçbir tür garanti olmaksızın sunulur. Yamalamadan veya güncellemeden önce dünyalarınızı yedekleyin.'
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
      alt: 'Android’de Blockheads Patcher, “Oyununuzu seçin” adımı: “Bu telefonda bulundu” kartında The Blockheads 1.7.4 ve “Yüklü oyunu kullan” düğmesi, altında “APK dosyası seç”.',
      caption: 'Patcher telefonunuzda kurulu oyunu bulur.'
    },
    'patcher/phone-review': {
      alt: 'Android’de Patcher, “Düzeltmeleri gözden geçirin” adımı: algılanan oyun sürümünün ayrıntıları, imzalanacağı anahtar ve “Oyunu yamala (3 düzeltme)” düğmesi.',
      caption: 'Sürümünüzün ihtiyaç duyduğu düzeltmeler zaten işaretli.'
    },
    'patcher/phone-uninstall-confirm': {
      alt: 'Android’de Patcher, “Düzeltilmiş oyunu kurun”: dünyaların bu telefondan silineceği uyarısı, yedekleme onay kutusu, ardından 1. adım “Orijinali kaldır” ve 2. adım “Düzeltilmiş oyunu kur”.',
      caption: 'Kutuyu yalnızca dünyalarınız yedeklendiyse işaretleyin.'
    },
    'patcher/phone-installed': {
      alt: 'Android’de Patcher’ın son ekranı: düzeltilmiş oyun kuruldu; imza anahtarınızı saklamanız için bir hatırlatma ve dışa aktarma bağlantısı.',
      caption: 'Bitti. Şimdi dünyalarınızı düzeltilmiş oyuna geri yükleyin.'
    },
    'patcher/choose': {
      alt: 'Masaüstü Patcher, “Oyununuzu seçin” adımı: The Blockheads APK dosyası için bırakma alanı ve dosyaya göz atma düğmesi.',
      caption: '.apk dosyasını bırakın ya da seçin.'
    },
    'patcher/keys-export': {
      alt: 'Patcher “Anahtarlar” ekranı: SHA-256 parmak izli “Anahtarım” imza anahtarı ve parola ile parola tekrarı alanları ve “Yedeği kaydet” düğmesi olan açık yedek dışa aktarma formu.',
      caption: 'İmza anahtarınızın parolalı bir yedeğini dışa aktarın.'
    },
    'server/worlds-create': {
      alt: 'Blockheads Server masaüstü uygulaması, “Dünya oluştur” penceresi: dünya adı, 1/16× ile 16× arası dünya boyutu, uzman modu anahtarı ve oluşturma düğmesi.',
      caption: 'Bir dünya oluşturun: ad, boyut ve isterseniz uzman modu.'
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
      caption: 'Rolünü değiştirmek, atmak veya yasaklamak için bir oyuncuya dokunun.'
    },
    'server/settings': {
      alt: 'Sunucunun “Ayarlar” ekranı, bağlantı bölümü: port 15151, en çok oyuncu ve parola (en çok 15 karakter).',
      caption: 'Parola Ayarlar’daki bağlantı bölümündedir.'
    },
    'server/phone-worlds': {
      alt: 'Android telefonda Blockheads Server uygulaması, “Dünyalar” ekranı: “Dünya oluştur” düğmesi ile “Sunny Isle” (şu an yüklü) ve “Cozy Harbor” dünyaları.',
      caption: 'Bir dünya oluşturun, sonra sunucuyu başlatın.'
    },
    'server/phone-dashboard': {
      alt: 'Android telefonda sunucu uygulamasının paneli: diğer telefonlar için LAN adresi, port ve QR kodu.',
      caption: 'Arkadaşlarınız panelde gösterilen adresle katılır.'
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
