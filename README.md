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

Flash kartları oluşturmak için aşağıdaki komutu çalıştırın:
```bash
node createFlashcards.js
```

Bu komut, `pdf` klasörü içinde her tema için ayrı bir PDF dosyası oluşturacaktır.

## Teknolojiler

- Node.js
- PDF oluşturma: pdfkit ve pdf-lib
- Paket yönetimi: yarn

## Proje Yapısı

```
ingilizce-flashcards/
├── createFlashcards.js   # Flash kart oluşturma script'i
├── package.json          # Bağımlılıklar ve proje bilgileri
├── pdf/                  # Oluşturulan PDF dosyaları
└── README.md             # Proje dokümantasyonu
```

## Temalar

1. Hayvanlar (Animals)
2. Renkler (Colors)
3. Meyveler & Sebzeler (Fruits & Vegetables)
4. Sayılar (Numbers)
5. Aile (Family)
6. Oyuncaklar (Toys)
7. Kıyafetler (Clothes)
8. Vücut Bölümleri (Body Parts)
9. Günlük Eylemler (Daily Actions)
10. Hava Durumu (Weather)

## Katkıda Bulunma

1. Bu repository'yi fork edin
2. Feature branch'i oluşturun (`git checkout -b yeni-ozellik`)
3. Değişikliklerinizi commit edin (`git commit -am 'Yeni özellik: açıklama'`)
4. Branch'inize push edin (`git push origin yeni-ozellik`)
5. Bir Pull Request oluşturun
