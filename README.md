# manjeloburger.com

Manjelo Burger tanıtım sitesi. Tamamen statik (HTML + CSS), derleme adımı yok.

```
public/              → sunucudaki public_html/ klasörüne birebir yüklenir
  index.html
  css/style.css      → tüm stiller (renkler en üstte değişken olarak)
  css/fonts.css      → Anton & Poppins (sunucuda barındırılıyor)
  fonts/
  images/            → fotoğraflar buraya (paylasim.png = sosyal medya önizlemesi)
  favicon.svg, robots.txt, sitemap.xml, .htaccess
```

## Yayına alma

Sunucu siteyi GitHub'dan kendisi çeker. cPanel → **Cron İşleri**'nde 5 dakikada
bir çalışan şu komut, `main` dalındaki son hali `public_html/` klasörüne kopyalar:

```
(cd ~ && (test -d manjelo || git clone -q https://github.com/anilozeel/manjelo.git) && cd manjelo && git pull -q --ff-only && cp -a public/. ~/public_html/) > /dev/null 2>&1
```

Yani `main`'e gönderilen bir değişiklik en geç 5 dakikada yayına girer. Bu
yöntem reponun herkese açık olmasına dayanır (sunucu kimlik bilgisi olmadan
klonluyor).

`.github/workflows/deploy.yml` yedek olarak duruyor ve yalnızca elle
çalıştırılır. Sunucu FTPS desteklemiyor, SSH (22) de kapalı olduğu için bu akış
ancak `FTP_PASSWORD` secret'ı ve Variables sekmesindeki `FTP_USERNAME`,
`FTP_SERVER_DIR`, `DEPLOY_PROTOCOL` (`ftp` / `sftp`), `SSH_PORT` ayarlarıyla
kullanılabilir.

## Önbellek

`index.html` stil ve betik dosyalarını `?v=...` sürümüyle çağırır
(`css/style.css?v=20260930a`). CSS/JS değiştiğinde bu değeri artırın; aksi
halde ziyaretçilerin tarayıcısı eski dosyayı bir hafta kullanabilir.

## İkonlar

`public/images/ikon/` altındaki SVG'ler marka sticker setinden vektöre
çevrildi. Sitede `class="ikon"` ile kullanılır ve sağa sola sallanır
(`--aci` bekleme açısı, `--sure` süre). Kaydırınca beliren öğeler
`data-anim` özniteliği taşır (`js/site.js`).

## Fotoğraf eklemek

Tasarımdaki fotoğraf alanları şimdilik markalı desenle dolu. Görseli
`public/images/` altına koyup ilgili `<div class="foto">` içine
`<img src="images/dosya.jpg" alt="...">` eklemek yeterli; `index.html`
içindeki yorumlarda örnekler var.
