const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const { getEmojiForWord } = require('./emojiMap');
const { themes } = require('./themes');

function createPDFs() {
    // Her tema için ayrı PDF dosyası oluşturacağız
    const createdFiles = [];

    // A4 boyutları (PDFKit'te varsayılan olarak 72 DPI'da point cinsinden): 595 x 842
    // Kart boyutlarını A4'e göre ayarla, boşlukları hesaba kat
    const pageWidth = 595;
    const pageHeight = 842;

    // A4 sayfasına yatay olarak 4 kart sığdır (kullanıcı isteği)
    // Kartlar arasında ve kenar boşlukları için alan bırak
    const margin = 15; // Kenar boşluğu
    const spaceBetween = 10; // Kartlar arası boşluk

    // 4 kart için genişlik hesapla
    const cardWidth = (pageWidth - (2 * margin) - (3 * spaceBetween)) / 4;

    // 4x3 = 12 kart olarak düzenle (3 sıra)
    // 3 sıra için yükseklik hesapla
    let cardHeight = (pageHeight - (2 * margin) - (2 * spaceBetween)) / 3;
    cardHeight = cardHeight - 10; // Kullanıcı isteği üzerine 10px azalt

    // Sayfa başına 12 kart (4x3) sığdır - kullanıcı isteğiyle uyumlu olması için
    const maxCardsPerPage = 12;

    // Her tema için ayrı PDF dosyası oluştur
    for (const [theme, cards] of Object.entries(themes)) {
        // Tema adından güvenli bir dosya adı oluştur
        const fileName = `pdf/${theme.replace(/[&\/:*?"<>|]/g, '_')}.pdf`;
        createdFiles.push(fileName);

        // PDF klasörünü kontrol et, yoksa oluştur
        if (!fs.existsSync('pdf')) {
            fs.mkdirSync('pdf');
        }

        // Her tema için yeni bir PDF dosyası başlat
        const doc = new PDFDocument({
            size: 'A4',
            font: '/System/Library/Fonts/Supplemental/Arial.ttf' // Türkçe karakter desteği için Arial fontunu kullan
        });
        doc.pipe(fs.createWriteStream(fileName));

        let xOffset = 0;
        let yOffset = 0;
        let cardCount = 0;

        // Başlık olmadan başla
        // Kart çizimlerinin y konumu kenar boşluğundan başlasın

        // Kart sayısını sınırla (her sayfa için 8 kart)
        for (let i = 0; i < cards.length; i++) {
            const card = cards[i];

            // Maksimum kart sayısına ulaşıldığında yeni sayfa ekle
            if (cardCount >= maxCardsPerPage && i < cards.length) {
                doc.addPage();
                xOffset = 0;
                yOffset = 0;
                cardCount = 0;
            }

            // Kartın konumu - kenar boşluklarını ve boşlukları hesaba kat
            const xPos = margin + (xOffset * (cardWidth + spaceBetween));
            const yPos = margin + (yOffset * (cardHeight + spaceBetween));

            // Kartın çerçevesini ve arka plan rengini çiz
            doc.rect(xPos, yPos, cardWidth, cardHeight)
                .fillAndStroke(card.color, '#999999');

            // Kelime için emojiyi al
            const emoji = getEmojiForWord(card.word);

            // Sadece kelimeyi kart üst kısmına yerleştir (emoji olmadan)
            doc.fillColor('black').fontSize(16).font('/System/Library/Fonts/Supplemental/Arial Bold.ttf')
               .text(card.word, xPos + 10, yPos + 10, { width: cardWidth - 20, align: 'center' });

            // Görsel için boşluk bırak - çerçeve içinde emoji göster
            const imageAreaHeight = 100; // Görsel alanının yüksekliği
            doc.rect(xPos + 20, yPos + 40, cardWidth - 40, imageAreaHeight)
                .lineWidth(1)
                .stroke('#555555');
            
            if (emoji) {
                // Görsel alanında emojiyi göster
                doc.fontSize(50) // Emoji boyutu
                   .fillColor('black')
                   .text(emoji, xPos + 20, yPos + 40 + (imageAreaHeight / 2 - 30), 
                         { width: cardWidth - 40, align: 'center' });
            } else {
                // Emoji yoksa görsel alanı yazısını göster
                doc.fontSize(9).fillColor('#555555')
                   .text('Görsel Alanı', xPos + 20, yPos + 40 + (imageAreaHeight / 2 - 5), 
                         { width: cardWidth - 40, align: 'center' });
            }

            // Alt kısımda örnek cümle ve çevirisi
            doc.font('/System/Library/Fonts/Supplemental/Arial.ttf').fillColor('black')
                .fontSize(12).text(card.sentence, xPos + 10, yPos + 150, { width: cardWidth - 20 });
            doc.fontSize(11).text(card.translation, xPos + 10, yPos + 185, { width: cardWidth - 20 });

            // Sonraki kartın konumu için indeksleri güncelle
            xOffset++;
            if (xOffset >= 4) { // Bir satırda 4 kart (güncellendi)
                xOffset = 0;
                yOffset++;
            }

            cardCount++;
        }

        // Her tema için PDF'i tamamla
        doc.end();
        console.log(`PDF oluşturuldu: ${fileName}`);
    }

    return createdFiles;
}

// Tüm PDF dosyalarını oluştur
const createdFiles = createPDFs();
console.log(`Toplam ${createdFiles.length} PDF dosyası oluşturuldu: ${createdFiles.join(', ')}`);
