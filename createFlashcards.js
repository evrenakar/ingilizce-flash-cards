const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

function createPDFs() {
    // Her tema için ayrı PDF dosyası oluşturacağız
    const createdFiles = [];

    // Tema verileri - her tema için 10 kart içeriği
    const themes = {
        Animals: [
            { word: 'Dog', sentence: 'This is a dog.', translation: 'Bu bir köpek.', color: 'lightblue' },
            { word: 'Cat', sentence: 'I love my cat.', translation: 'Kedimi seviyorum.', color: 'lightpink' },
            { word: 'Bird', sentence: 'The bird is flying.', translation: 'Kuş uçuyor.', color: 'lightyellow' },
            { word: 'Fish', sentence: 'The fish swims.', translation: 'Balık yüzer.', color: 'lightgreen' },
            { word: 'Horse', sentence: 'Horses run fast.', translation: 'Atlar hızlı koşar.', color: 'lightgray' },
            { word: 'Elephant', sentence: 'The elephant is big.', translation: 'Fil büyüktür.', color: 'lightcyan' },
            { word: 'Lion', sentence: 'The lion roars.', translation: 'Aslan kükredi.', color: 'lightcoral' },
            { word: 'Tiger', sentence: 'The tiger is strong.', translation: 'Kaplan güçlüdür.', color: 'lightgoldenrodyellow' },
            { word: 'Monkey', sentence: 'The monkey climbs trees.', translation: 'Maymun ağaçlara tırmanır.', color: 'lightsalmon' },
            { word: 'Zebra', sentence: 'Zebras have stripes.', translation: 'Zebraların çizgileri vardır.', color: 'lavender' }
        ],
        Colors: [
            { word: 'Red', sentence: 'The apple is red.', translation: 'Elma kırmızıdır.', color: 'lightcoral' },
            { word: 'Blue', sentence: 'The sky is blue.', translation: 'Gökyüzü mavidir.', color: 'lightsteelblue' },
            { word: 'Green', sentence: 'The grass is green.', translation: 'Çimen yeşildir.', color: 'lightgreen' },
            { word: 'Yellow', sentence: 'The sun is yellow.', translation: 'Güneş sarıdır.', color: 'lightyellow' },
            { word: 'Black', sentence: 'The night is black.', translation: 'Gece karadır.', color: 'lightgray' },
            { word: 'White', sentence: 'The snow is white.', translation: 'Kar beyazdır.', color: 'white' },
            { word: 'Purple', sentence: 'The flower is purple.', translation: 'Çiçek mordur.', color: 'plum' },
            { word: 'Pink', sentence: 'The dress is pink.', translation: 'Elbise pembedir.', color: 'lightpink' },
            { word: 'Orange', sentence: 'The orange is orange.', translation: 'Portakal turuncudur.', color: 'peachpuff' },
            { word: 'Brown', sentence: 'The chocolate is brown.', translation: 'Çikolata kahverengidir.', color: 'tan' }
        ],
        'Fruits & Vegetables': [
            { word: 'Apple', sentence: 'I eat an apple every day.', translation: 'Her gün bir elma yerim.', color: 'lightcoral' },
            { word: 'Banana', sentence: 'The monkey eats a banana.', translation: 'Maymun muz yer.', color: 'lightyellow' },
            { word: 'Orange', sentence: 'The orange is juicy.', translation: 'Portakal suludur.', color: 'peachpuff' },
            { word: 'Carrot', sentence: 'Rabbits like carrots.', translation: 'Tavşanlar havuçları sever.', color: 'lightsalmon' },
            { word: 'Potato', sentence: 'I want a baked potato.', translation: 'Fırında patates istiyorum.', color: 'tan' },
            { word: 'Tomato', sentence: 'Tomato is red.', translation: 'Domates kırmızıdır.', color: 'lightcoral' },
            { word: 'Grape', sentence: 'Grapes grow on vines.', translation: 'Üzümler asmalarda yetişir.', color: 'plum' },
            { word: 'Cucumber', sentence: 'The cucumber is green.', translation: 'Salatalık yeşildir.', color: 'lightgreen' },
            { word: 'Strawberry', sentence: 'I like strawberry jam.', translation: 'Çilek reçelini severim.', color: 'pink' },
            { word: 'Onion', sentence: 'Onions make me cry.', translation: 'Soğanlar beni ağlatır.', color: 'lavender' }
        ],
        Numbers: [
            { word: 'One', sentence: 'I have one dog.', translation: 'Bir köpeğim var.', color: 'lightblue' },
            { word: 'Two', sentence: 'I have two hands.', translation: 'İki elim var.', color: 'lightpink' },
            { word: 'Three', sentence: 'There are three cats.', translation: 'Üç kedi var.', color: 'lightyellow' },
            { word: 'Four', sentence: 'The table has four legs.', translation: 'Masanın dört bacağı var.', color: 'lightgreen' },
            { word: 'Five', sentence: 'I have five fingers.', translation: 'Beş parmağım var.', color: 'lightcyan' },
            { word: 'Six', sentence: 'Six birds are flying.', translation: 'Altı kuş uçuyor.', color: 'lightgray' },
            { word: 'Seven', sentence: 'There are seven days in a week.', translation: 'Bir haftada yedi gün vardır.', color: 'peachpuff' },
            { word: 'Eight', sentence: 'The octopus has eight legs.', translation: 'Ahtapotun sekiz bacağı vardır.', color: 'tan' },
            { word: 'Nine', sentence: 'She is nine years old.', translation: 'O dokuz yaşında.', color: 'lightsteelblue' },
            { word: 'Ten', sentence: 'I count to ten.', translation: 'Ona kadar sayıyorum.', color: 'lavender' }
        ],
        Family: [
            { word: 'Mother', sentence: 'My mother loves me.', translation: 'Annem beni seviyor.', color: 'lightpink' },
            { word: 'Father', sentence: 'My father is tall.', translation: 'Babam uzun boyludur.', color: 'lightblue' },
            { word: 'Sister', sentence: 'My sister is younger than me.', translation: 'Kız kardeşim benden küçük.', color: 'plum' },
            { word: 'Brother', sentence: 'My brother plays football.', translation: 'Erkek kardeşim futbol oynar.', color: 'lightgreen' },
            { word: 'Grandmother', sentence: 'My grandmother bakes cookies.', translation: 'Büyükannem kurabiye pişirir.', color: 'lavender' },
            { word: 'Grandfather', sentence: 'My grandfather tells stories.', translation: 'Büyükbabam hikayeler anlatır.', color: 'lightgray' },
            { word: 'Aunt', sentence: 'My aunt lives far away.', translation: 'Halam/Teyzem uzakta yaşıyor.', color: 'lightyellow' },
            { word: 'Uncle', sentence: 'My uncle drives a car.', translation: 'Amcam/Dayım araba kullanır.', color: 'lightsalmon' },
            { word: 'Cousin', sentence: 'My cousin is my friend.', translation: 'Kuzinim arkadaşımdır.', color: 'lightcoral' },
            { word: 'Baby', sentence: 'The baby is crying.', translation: 'Bebek ağlıyor.', color: 'lightcyan' }
        ],
        Toys: [
            { word: 'Ball', sentence: 'I play with a ball.', translation: 'Topla oynuyorum.', color: 'lightcoral' },
            { word: 'Doll', sentence: 'She loves her doll.', translation: 'Bebeğini seviyor.', color: 'lightpink' },
            { word: 'Car', sentence: 'The toy car is fast.', translation: 'Oyuncak araba hızlıdır.', color: 'lightblue' },
            { word: 'Teddy Bear', sentence: 'I sleep with my teddy bear.', translation: 'Oyuncak ayımla uyuyorum.', color: 'tan' },
            { word: 'Robot', sentence: 'The robot can dance.', translation: 'Robot dans edebilir.', color: 'lightgray' },
            { word: 'Puzzle', sentence: 'The puzzle is difficult.', translation: 'Yapboz zordur.', color: 'lightgreen' },
            { word: 'Blocks', sentence: 'I build with blocks.', translation: 'Bloklarla inşa ediyorum.', color: 'lightyellow' },
            { word: 'Bike', sentence: 'I ride my bike.', translation: 'Bisikletimi sürüyorum.', color: 'lightcyan' },
            { word: 'Kite', sentence: 'The kite flies high.', translation: 'Uçurtma yüksekte uçuyor.', color: 'lightsalmon' },
            { word: 'Train', sentence: 'The train goes choo-choo.', translation: 'Tren düdük sesi çıkarır.', color: 'plum' }
        ],
        Clothes: [
            { word: 'Shirt', sentence: 'I wear a blue shirt.', translation: 'Mavi bir gömlek giyiyorum.', color: 'lightsteelblue' },
            { word: 'Pants', sentence: 'My pants are black.', translation: 'Pantolonlarım siyah.', color: 'lightgray' },
            { word: 'Dress', sentence: 'She wears a pretty dress.', translation: 'Güzel bir elbise giyiyor.', color: 'lightpink' },
            { word: 'Shoes', sentence: 'My shoes are new.', translation: 'Ayakkabılarım yeni.', color: 'tan' },
            { word: 'Socks', sentence: 'I have colorful socks.', translation: 'Renkli çoraplarım var.', color: 'lightyellow' },
            { word: 'Hat', sentence: 'The hat is on my head.', translation: 'Şapka başımda.', color: 'peachpuff' },
            { word: 'Coat', sentence: 'I wear a coat in winter.', translation: 'Kışın palto giyerim.', color: 'lightcyan' },
            { word: 'Scarf', sentence: 'The scarf is warm.', translation: 'Atkı sıcak tutar.', color: 'plum' },
            { word: 'Gloves', sentence: 'I wear gloves on my hands.', translation: 'Ellerime eldiven giyiyorum.', color: 'lightcoral' },
            { word: 'Jacket', sentence: 'The jacket is blue.', translation: 'Ceket mavi.', color: 'lightblue' }
        ],
        'Body Parts': [
            { word: 'Head', sentence: 'I have a head.', translation: 'Bir başım var.', color: 'peachpuff' },
            { word: 'Eye', sentence: 'I see with my eyes.', translation: 'Gözlerimle görürüm.', color: 'lightblue' },
            { word: 'Nose', sentence: 'I smell with my nose.', translation: 'Burnumla koku alırım.', color: 'lightpink' },
            { word: 'Mouth', sentence: 'I eat with my mouth.', translation: 'Ağzımla yerim.', color: 'lightcoral' },
            { word: 'Ear', sentence: 'I hear with my ears.', translation: 'Kulaklarımla duyarım.', color: 'lightyellow' },
            { word: 'Hand', sentence: 'I write with my hand.', translation: 'Elimle yazarım.', color: 'lightgreen' },
            { word: 'Foot', sentence: 'I walk with my feet.', translation: 'Ayaklarımla yürürüm.', color: 'lightgray' },
            { word: 'Leg', sentence: 'My legs are long.', translation: 'Bacaklarım uzundur.', color: 'tan' },
            { word: 'Arm', sentence: 'I hug with my arms.', translation: 'Kollarımla sarılırım.', color: 'lightcyan' },
            { word: 'Finger', sentence: 'I have ten fingers.', translation: 'On parmağım var.', color: 'plum' }
        ],
        'Daily Actions': [
            { word: 'Eat', sentence: 'I eat breakfast.', translation: 'Kahvaltı yapıyorum.', color: 'lightsalmon' },
            { word: 'Sleep', sentence: 'I sleep at night.', translation: 'Geceleri uyurum.', color: 'lightgray' },
            { word: 'Run', sentence: 'I run in the park.', translation: 'Parkta koşarım.', color: 'lightgreen' },
            { word: 'Walk', sentence: 'I walk to school.', translation: 'Okula yürüyerek giderim.', color: 'tan' },
            { word: 'Jump', sentence: 'Children jump for joy.', translation: 'Çocuklar sevinçten zıplar.', color: 'lightcoral' },
            { word: 'Read', sentence: 'I read a book.', translation: 'Kitap okurum.', color: 'lightpink' },
            { word: 'Write', sentence: 'I write with a pencil.', translation: 'Kalemle yazarım.', color: 'lightblue' },
            { word: 'Sing', sentence: 'She sings a song.', translation: 'O bir şarkı söylüyor.', color: 'plum' },
            { word: 'Dance', sentence: 'We dance at the party.', translation: 'Partide dans ederiz.', color: 'lightcyan' },
            { word: 'Play', sentence: 'Children play games.', translation: 'Çocuklar oyun oynar.', color: 'lightyellow' }
        ],
        Weather: [
            { word: 'Sunny', sentence: 'It is sunny today.', translation: 'Bugün güneşli.', color: 'lightyellow' },
            { word: 'Rainy', sentence: 'It is a rainy day.', translation: 'Yağmurlu bir gün.', color: 'lightblue' },
            { word: 'Cloudy', sentence: 'The sky is cloudy.', translation: 'Gökyüzü bulutlu.', color: 'lightgray' },
            { word: 'Snowy', sentence: 'It is snowy in winter.', translation: 'Kışın karlı olur.', color: 'white' },
            { word: 'Windy', sentence: 'It is windy outside.', translation: 'Dışarısı rüzgarlı.', color: 'lightcyan' },
            { word: 'Foggy', sentence: 'The morning is foggy.', translation: 'Sabah sisli.', color: 'lightgray' },
            { word: 'Hot', sentence: 'Summer is hot.', translation: 'Yaz sıcaktır.', color: 'lightcoral' },
            { word: 'Cold', sentence: 'Winter is cold.', translation: 'Kış soğuktur.', color: 'lightsteelblue' },
            { word: 'Stormy', sentence: 'The night is stormy.', translation: 'Gece fırtınalı.', color: 'lavender' },
            { word: 'Icy', sentence: 'The road is icy.', translation: 'Yol buzlu.', color: 'azure' }
        ]
    };

    // A4 boyutları (PDFKit'te varsayılan olarak 72 DPI'da point cinsinden): 595 x 842
    // Kart boyutlarını A4'e göre ayarla, boşlukları hesaba kat
    const pageWidth = 595;
    const pageHeight = 842;
    
    // A4 sayfasına yatay olarak 3 kart sığdır (kullanıcı isteği)
    // Kartlar arasında ve kenar boşlukları için alan bırak
    const margin = 15; // Kenar boşluğu
    const spaceBetween = 10; // Kartlar arası boşluk
    
    // 3 kart için genişlik hesapla
    const cardWidth = (pageWidth - (2 * margin) - (2 * spaceBetween)) / 3;
    
    // 3x4 = 12 kart olarak düzenle (4 sıra)
    // 4 sıra için yükseklik hesapla
    let cardHeight = (pageHeight - (2 * margin) - (3 * spaceBetween)) / 4;
    cardHeight = cardHeight - 9; // Kullanıcı isteği üzerine 10px azalt
    
    // Sayfa başına 12 kart (3x4) sığdır - kullanıcı isteğiyle uyumlu olması için
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
            
            // Kart arka planı
            doc.rect(xPos, yPos, cardWidth, cardHeight)
              .fillAndStroke(card.color, '#999999');
            
            // Kelime başlığı - daha büyük ve belirgin
            doc.fillColor('black').fontSize(16).font('/System/Library/Fonts/Supplemental/Arial Bold.ttf')
              .text(card.word, xPos + 10, yPos + 10, { width: cardWidth - 20, align: 'center' });
              
            // Görsel için boşluk bırak - dikkat çekici bir çerçeve içinde
            const imageAreaHeight = 100; // Görsel alanının yüksekliği
            doc.rect(xPos + 20, yPos + 40, cardWidth - 40, imageAreaHeight)
              .lineWidth(1)
              .stroke('#555555');
            doc.fontSize(9).fillColor('#555555')
              .text('Görsel Alanı', xPos + 20, yPos + 40 + (imageAreaHeight/2 - 5), { width: cardWidth - 40, align: 'center' });
            
            // Alt kısımda örnek cümle ve çevirisi
            doc.font('/System/Library/Fonts/Supplemental/Arial.ttf').fillColor('black')
              .fontSize(12).text(card.sentence, xPos + 10, yPos + 150, { width: cardWidth - 20 });
            doc.fontSize(11).text(card.translation, xPos + 10, yPos + 170, { width: cardWidth - 20 });
            
            // Sonraki kartın konumu için indeksleri güncelle
            xOffset++;
            if (xOffset >= 3) { // Bir satırda 3 kart
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
