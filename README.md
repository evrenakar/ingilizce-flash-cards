# İngilizce Flash Kartları

Bu proje, çocuklar için İngilizce kelime öğrenmeye yardımcı olmak amacıyla tasarlanmış flash kart PDF'leri oluşturan bir uygulamadır. Çeşitli temalar altında İngilizce kelimeler, cümleler ve Türkçe çevirileri içeren kartlar oluşturur.

## Özellikler

- 10 farklı tema altında İngilizce kelimeler (Hayvanlar, Renkler, Meyveler & Sebzeler, Sayılar, Aile, Oyuncaklar, Kıyafetler, Vücut Bölümleri, Günlük Eylemler, Hava Durumu)
- Her tema için ayrı PDF dosyası
- Her PDF'de tema ile ilgili 10 kelime
- Her kartta:
  - İngilizce kelime
  - Örnek İngilizce cümle
  - Türkçe çevirisi
  - Görsel için alan
  - Tematik renkli arka plan

## Kurulum

1. Projeyi bilgisayarınıza klonlayın:
   ```bash
   git clone [repo-url]
   cd ingilizce-flashcards
   ```

2. Gerekli bağımlılıkları yükleyin:
   ```bash
   yarn install
   ```

## Kullanım

Projedeki scriptleri kullanarak flash kartları farklı formatlarda oluşturabilirsiniz:

### PDF Kartlar Oluşturma
```bash
node createFlashcards.js
```
Bu komut, `pdf` klasörü içinde her tema için ayrı bir PDF dosyası oluşturur. Kartlar tema renklerine göre gruplandırılır ve her sayfada 12 kart yer alır.

### HTML Kartlar Oluşturma
```bash
node createHtmlFlashcards.js
```
Bu komut, `html` klasörü içinde her tema için ayrı bir HTML dosyası oluşturur. HTML dosyaları doğrudan tarayıcıda açılabilir, emoji desteği içerir ve yazdırmak için optimize edilmiştir. Her A4 sayfada 12 kart bulunur.

### HTML'den PDF Oluşturma
```bash
node htmlToPdf.js
```
Bu komut, `html` klasöründeki HTML dosyalarını `pdf-from-html` klasöründe PDF dosyalarına dönüştürür. Bu PDF'ler, normal PDF'lerin aksine tam emoji desteği içerir ve yazdırırken arka plan renkleri korunur.

## Teknolojiler

- Node.js
- PDF oluşturma: pdfkit
- HTML'den PDF dönüştürme: puppeteer
- Emoji desteği
- Paket yönetimi: yarn

## Proje Yapısı

```
ingilizce-flashcards/
├── createFlashcards.js   # PDF flash kart oluşturma script'i
├── createHtmlFlashcards.js # HTML flash kart oluşturma script'i
├── htmlToPdf.js         # HTML'den PDF dönüştürme script'i
├── emojiMap.js          # Emoji eşleşme haritası
├── themes.js            # Tema ve kelime verileri
├── package.json         # Bağımlılıklar ve proje bilgileri
├── pdf/                 # Oluşturulan PDF dosyaları
├── html/                # Oluşturulan HTML dosyaları
├── pdf-from-html/       # HTML'den dönüştürülen PDF dosyaları
└── README.md            # Proje dokümantasyonu
```

## Temalar

Projede şu temalar bulunmaktadır:

1. Hayvanlar (Animals)
2. Renkler (Colors)
3. Yiyecek & İçecekler (Food & Drinks)
4. Sayılar (Numbers)
5. Aile (Family)
6. Oyuncaklar (Toys)
7. Kıyafetler (Clothes)
8. Vücut Bölümleri (Body Parts)
9. Şekiller (Shapes)
10. Hava Durumu & Mevsimler (Weather & Seasons)
11. Sınıf Eşyaları (Classroom Objects)
12. Duygular & Hisler (Feelings & Emotions)
13. Ev & Mobilya (House & Furniture)
14. Oyun Alanı (Playground)
15. Günler (Days)
16. Sınıf Kuralları (Classroom Rules)
17. Selamlaşma & Temel Deyimler (Greetings & Basics)
18. Nazik İstekler (Polite Requests)
19. Günlük Aktiviteler (Daily Actions)
20. Bilim (Science)

## Katkıda Bulunma

1. Bu repository'yi fork edin
2. Feature branch'i oluşturun (`git checkout -b yeni-ozellik`)
3. Değişikliklerinizi commit edin (`git commit -am 'Yeni özellik: açıklama'`)
4. Branch'inize push edin (`git push origin yeni-ozellik`)
5. Bir Pull Request oluşturun
