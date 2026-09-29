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

`main` dalına `public/` altında bir değişiklik gönderildiğinde GitHub Actions
siteyi FTPS ile cPanel'deki `public_html/` klasörüne yükler
(`.github/workflows/deploy.yml`). Elle çalıştırmak için: **Actions → Hostinge
yükle → Run workflow**.

Gerekli ayar (bir kez):

- **Settings → Secrets and variables → Actions → New repository secret**
  - `FTP_PASSWORD` → cPanel (`manjelob`) şifresi

Varsayılanlar: sunucu `mt-charon.guzelhosting.com`, kullanıcı `manjelob`,
hedef `public_html/`. Farklı bir FTP hesabı kullanılacaksa aynı sayfadaki
**Variables** sekmesinden `FTP_SERVER`, `FTP_USERNAME`, `FTP_SERVER_DIR`
tanımlanabilir (örneğin dizini doğrudan `public_html` olan bir FTP hesabı için
`FTP_SERVER_DIR` = `./`).

## Fotoğraf eklemek

Tasarımdaki fotoğraf alanları şimdilik markalı desenle dolu. Görseli
`public/images/` altına koyup ilgili `<div class="foto">` içine
`<img src="images/dosya.jpg" alt="...">` eklemek yeterli; `index.html`
içindeki yorumlarda örnekler var.
