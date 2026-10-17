import type { Dict } from './en';

export const tr: Dict = {
  meta: {
    title: 'Blockheads Club',
    description:
      'The Blockheads etrafında bir topluluk projesi: oyunu modern Android’de çalışır hale getiren bir yama aracı ve sıfırdan yazılmış açık kaynaklı bir sunucu.'
  },
  nav: {
    skip: 'İçeriğe geç',
    label: 'Ana gezinme',
    patcher: 'Yamalayıcı',
    server: 'Sunucu',
    guides: 'Rehberler',
    faq: 'SSS',
    legal: 'Yasal',
    language: 'Dil',
    themeToLight: 'Açık temaya geç',
    themeToDark: 'Koyu temaya geç'
  },
  hero: {
    eyebrow: 'Topluluk projesi',
    title: 'The Blockheads oynanabilir kalsın.',
    lead: 'Blockheads Club, The Blockheads etrafında ücretsiz ve açık kaynaklı araçlar geliştirir: kendi oyun kopyanızı modern Android’de düzelten bir yamalayıcı ve her yerde barındırabileceğiniz, sıfırdan yazılmış bir sunucu.',
    ctaPatcher: 'Web yamalayıcıyı aç',
    ctaServer: 'Sunucuyu edin'
  },
  patcher: {
    title: 'Yamalayıcı',
    lead: 'Yamalayıcı, size ait oyun APK’sını onarır. Tamamen cihazınızda veya tarayıcınızda çalışır; APK’nız hiçbir yere yüklenmez.',
    fixesTitle: 'Neleri düzeltir',
    fixes: [
      {
        title: 'Modern Android’de açılır pencere donması',
        body: 'Yeni Android sürümlerinde 1.7.4 ile 1.7.6 arası sürümler bir açılır pencere gösterildiğinde donabilir. Yama nedeni giderir; menüler ve diyaloglar yeniden çalışır.'
      },
      {
        title: '1.7.6 mağaza yazı tipi çökmesi',
        body: '1.7.6 sürümü, oyun içi mağaza yazı tipini yüklerken çökebilir. Yama bu çökmeyi düzeltir.'
      }
    ],
    versions: 'Desteklenen oyun sürümleri: 1.7.4, 1.7.5 ve 1.7.6.',
    ctaWeb: 'Web yamalayıcıyı kullan',
    ctaReleases: 'Masaüstü ve Android uygulamalarını indir',
    ctaSource: 'Kaynak kod'
  },
  server: {
    title: 'Sunucu',
    lead: 'The Blockheads için Rust ile yazılmış, sıfırdan (clean-room) bir özel sunucu. Belgelenmiş davranışın yeni bir uygulamasıdır; özgün kodun kopyası değildir.',
    platformsTitle: 'Çalıştığı yerler',
    platforms: ['Windows', 'Linux', 'macOS', 'ARM cihazlar', 'Android (sunucu uygulaması)'],
    items: [
      {
        title: 'Her yerden barındırın',
        body: 'Bir bilgisayarda, Raspberry Pi’de veya küçük bir bulut makinesinde çalıştırın; ya da Android sunucu uygulamasıyla doğrudan telefonunuzdan barındırın.'
      },
      {
        title: 'Açık kaynak',
        body: 'Her şey GPL-3.0 lisanslıdır. Okuyun, derleyin, geliştirin.'
      }
    ],
    ctaRepo: 'GitHub’da sunucu',
    ctaReleases: 'Sunucu sürümleri'
  },
  guides: {
    title: 'Rehberler',
    lead: 'Kısa ve pratik anlatımlar.',
    items: [
      {
        id: 'patch-apk',
        title: 'Kendi APK’nızı yamalayın',
        steps: [
          'Oyun APK’sını yasal olarak sahip olduğunuz bir kaynaktan alın. Güvenilmeyen sitelerdeki dosyaları kullanmayın.',
          'Web yamalayıcıyı açın veya masaüstü ya da Android uygulamasını sürümler sayfasından kurun.',
          'APK’nızı seçin. Yamalayıcı sürümü (1.7.4, 1.7.5 veya 1.7.6) algılar.',
          'Yamayı uygulayın ve imzalı çıktı APK’sını kaydedin.',
          'Yamalı APK’yı cihazınıza kurun. Özgün sürüm farklı bir imzayla kuruluysa önce kaldırın (dünyalarınızı yedekleyin).'
        ]
      },
      {
        id: 'host-server',
        title: 'Sunucu barındırın',
        steps: [
          'Sisteminize uygun sunucu sürümünü sunucu sürümleri sayfasından indirin.',
          'Yapılandırmayı ve dünya klasörünü oluşturmak için bir kez başlatın.',
          'Yönlendiricinizde sunucu portunu yönlendirin veya genel adres veren bir barındırıcı kullanın.',
          'Adresinizi arkadaşlarınızla paylaşın. Sunucuyu güncel tutun.'
        ]
      },
      {
        id: 'connect-phone',
        title: 'Telefondan bağlanın',
        steps: [
          'Telefonunuzdaki oyunun yamalı olduğundan ve normal çalıştığından emin olun.',
          'Telefonunuz ile sunucunun birbirine erişebildiğinden emin olun: ev sunucusu için aynı Wi-Fi, çevrimiçi sunucu için genel adres.',
          'Sunucu adresini oyunda ekleyin ve katılın.'
        ]
      }
    ]
  },
  faq: {
    title: 'SSS',
    items: [
      {
        q: 'Oyunu dağıtıyor musunuz?',
        a: 'Hayır. Oyun dosyalarını asla barındırmayız, dağıtmayız ve bağlantısını vermeyiz. Zaten sahip olduğunuz kopyayı yamalarsınız.'
      },
      {
        q: 'APK’m bir yere yükleniyor mu?',
        a: 'Hayır. Yamalayıcı tamamen istemci tarafında, tarayıcınızda veya cihazınızdaki uygulamada çalışır.'
      },
      {
        q: 'Hangi oyun sürümleri destekleniyor?',
        a: 'Android oyununun 1.7.4, 1.7.5 ve 1.7.6 sürümleri.'
      },
      {
        q: 'Sunucu resmî olanın kopyası mı?',
        a: 'Hayır. Rust ile sıfırdan yazılmış bir clean-room yeniden uygulamadır.'
      },
      {
        q: 'Nasıl yardım edebilirim?',
        a: 'GitHub’da sorun bildirebilir, çekme isteği gönderebilir veya bu siteyi çevirebilirsiniz.'
      }
    ]
  },
  legal: {
    title: 'Yasal uyarı',
    body: [
      'Blockheads Club bağımsız bir topluluk projesidir. Majic Jungle Software veya Noodlecake Studios ile bağlantılı değildir, onlar tarafından onaylanmamıştır.',
      'The Blockheads ilgili sahiplerinin ticari markasıdır. Oyuna ait hiçbir dosyayı, varlığı veya kodu dağıtmıyoruz.',
      'Yalnızca sahip olduğunuz veya yasal olarak değiştirmenize izin verilen yazılımları yamalayın.',
      'Buradaki tüm yazılımlar GPL-3.0 lisansıyla ve garanti verilmeksizin sunulur.'
    ]
  },
  footer: {
    license: 'GPL-3.0-only lisansıyla yayımlanmıştır.',
    source: 'Site kaynağı'
  }
};
