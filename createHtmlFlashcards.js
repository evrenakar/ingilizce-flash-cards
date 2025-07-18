const fs = require('fs');
const path = require('path');
const { emojiMap, getEmojiForWord } = require('./emojiMap');
const { themes } = require('./themes');

// Kelime için emoji bulunamazsa kategoriye göre varsayılan emoji döndüren fonksiyon
function getDefaultEmoji(word) {
    // Tema adını bulmak için tüm temaları kontrol et
    for (const [themeName, cards] of Object.entries(themes)) {
        // Bu temada kelime var mı diye kontrol et
        if (cards.some(card => card.word === word)) {
            // Temaya göre varsayılan emoji döndür
            switch(themeName) {
                case "Animals": return '🐻'; // Ayı emojisi
                case "Colors": return '🎨'; // Palet emojisi
                case "Food & Drinks": return '🍽️'; // Çatal bıçak emojisi
                case "Numbers": return '📊'; // Grafik emojisi
                case "Family": return '👪'; // Aile emojisi
                case "Toys": return '🎮'; // Oyun emojisi
                case "Clothes": return '👕'; // T-shirt emojisi
                case "Body Parts": return '👤'; // Yüz emojisi
                case "Shapes": return '🚩'; // Şekil emojisi
                case "Weather & Seasons": return '☀️'; // Güneş emojisi
                case "Classroom Objects": return '✏️'; // Kalem emojisi
                case "Feelings & Emotions": return '🙂'; // Gülümseme emojisi
                case "House & Furniture": return '🏠'; // Ev emojisi
                case "Playground": return '🏫'; // Okul emojisi
                case "Days": return '📅'; // Takvim emojisi
                case "Classroom Rules": return '📚'; // Kitap emojisi
                case "Greetings & Basics": return '👋'; // El sallama emojisi
                case "Polite Requests": return '🙏'; // Namaste emojisi
                case "Daily Actions": return '⏰'; // Saat emojisi
                case "Science": return '🧪'; // Test tüpü emojisi
                default: return '❓'; // Soru işareti emojisi
            }
        }
    }
    return '❓'; // Kelime hiçbir temada bulunamazsa soru işareti emojisi döndür
}

function createHtmlFlashcards() {
    // Çıktı klasörünü oluştur
    const outputDir = 'html';
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    // Her tema için bir HTML dosyası oluştur
    for (const [theme, cards] of Object.entries(themes)) {
        // Tema adından güvenli bir dosya adı oluştur
        const fileName = `${outputDir}/${theme.replace(/[&\\/:*?"<>|]/g, '_')}.html`;
        
        // HTML içeriği oluştur
        let htmlContent = `
        <!DOCTYPE html>
        <html lang="tr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${theme} - Flash Cards</title>
            <style>
                @media print {
                    @page {
                        size: A4;
                        margin: 0;
                    }
                    body {
                        margin: 15px;
                    }
                    /* Yazdırma sırasında arka plan renklerini göster */
                    * {
                        -webkit-print-color-adjust: exact !important;
                        color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                }
                
                body {
                    font-family: Arial, sans-serif;
                    margin: 5px;
                }
                
                .page {
                    width: 21cm;
                    height: 29.7cm;
                    overflow: hidden;
                    page-break-after: always;
                    position: relative;
                    padding: 0;
                }
                
                .cards-container {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    grid-template-rows: repeat(3, 1fr);
                    gap: 10px;
                    height: 97%;
                    margin: 0;
                }
                
                .card {
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    padding: 10px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                    height: calc(100% - 40px);
                    box-sizing: border-box;
                }
                
                .card-word {
                    font-size: 20px;
                    font-weight: bold;
                    margin-bottom: 5px;
                    text-align: center;
                }
                
                .card-emoji {
                    font-size: 120px;
                    text-align: center;
                    margin: 6px 0;
                    line-height: 1.1;
                }
                
                .card-sentence {
                    font-size: 16px;
                    margin-bottom: 10px;
                    text-align: center;
                }
                
                .card-translation {
                    font-size: 14px;
                    font-style: italic;
                    text-align: center;
                    margin-top: auto;
                }
                
                .card-pronunciation {
                    font-size: 13px;
                    color: #444;
                    text-align: center;
                    font-style: italic;
                    margin-bottom: 5px;
                }
                
                /* Tema başlığı kaldırıldı */
            </style>
        </head>
        <body>`;
        
        // Kartları sayfalara böl, her sayfada 12 kart olsun
        const cardsPerPage = 12;
        const pageCount = Math.ceil(cards.length / cardsPerPage);
        
        for (let pageIndex = 0; pageIndex < pageCount; pageIndex++) {
            // Yeni sayfa başlat
            htmlContent += `
            <div class="page">
                <div class="cards-container">`;
            
            // Bu sayfada gösterilecek kartların aralığını belirle
            const startIndex = pageIndex * cardsPerPage;
            const endIndex = Math.min(startIndex + cardsPerPage, cards.length);
            
            // Sayfadaki kartları oluştur
            for (let i = startIndex; i < endIndex; i++) {
                const card = cards[i];
                // emoji değişkenini direkt olarak getEmojiForWord'den al, boşsa veya undefined ise güvenlik amacıyla fallback emojisi kullan
                const emoji = getEmojiForWord(card.word) || getDefaultEmoji(card.word);
                
                htmlContent += `
                    <div class="card" style="background-color: ${card.color || 'white'}">
                        <div class="card-word">${card.word}</div>
                        <div class="card-emoji">${emoji}</div>
                        <div class="card-sentence">${card.sentence}</div>
                        ${card.pronunciation ? `<div class="card-pronunciation">${card.pronunciation}</div>` : ''}
                        <div class="card-translation">${card.translation}</div>
                    </div>`;
            }
            
            // Eğer sayfada 12'den az kart varsa, boş kartlarla doldur
            for (let i = endIndex - startIndex; i < cardsPerPage; i++) {
                htmlContent += `<div class="card" style="visibility: hidden;"></div>`;
            }
            
            // Sayfayı kapat
            htmlContent += `
                </div>
            </div>`;
        }
        
        // HTML dosyasını kapat
        htmlContent += `
        </body>
        </html>`;
        
        // HTML dosyasını kaydet
        fs.writeFileSync(fileName, htmlContent);
        console.log(`HTML oluşturuldu: ${fileName}`);
    }
}

// HTML kartları oluştur
createHtmlFlashcards();
