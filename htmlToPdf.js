const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

async function convertHtmlToPdf() {
    // Çıktı klasörlerini kontrol et
    const htmlDir = 'html';
    const pdfFromHtmlDir = 'pdf-from-html';

    if (!fs.existsSync(htmlDir)) {
        console.error(`${htmlDir} klasörü bulunamadı. Önce HTML dosyalarını oluşturun.`);
        return;
    }

    // PDF klasörünü oluştur
    if (!fs.existsSync(pdfFromHtmlDir)) {
        fs.mkdirSync(pdfFromHtmlDir);
    }

    // HTML dosyalarını oku
    const htmlFiles = fs.readdirSync(htmlDir).filter(file => file.endsWith('.html'));

    if (htmlFiles.length === 0) {
        console.error('HTML dosyası bulunamadı.');
        return;
    }

    // Puppeteer tarayıcıyı başlat
    const browser = await puppeteer.launch();
    
    console.log(`Toplam ${htmlFiles.length} HTML dosyası PDF'e dönüştürülecek...`);
    
    try {
        // Her HTML dosyasını PDF'e çevir
        for (const htmlFile of htmlFiles) {
            const htmlFilePath = path.join(htmlDir, htmlFile);
            const pdfFilePath = path.join(pdfFromHtmlDir, htmlFile.replace('.html', '.pdf'));
            
            console.log(`Dönüştürülüyor: ${htmlFilePath} -> ${pdfFilePath}`);
            
            // Yeni bir sayfa aç
            const page = await browser.newPage();
            
            // HTML dosyasını yükle
            await page.goto(`file://${path.resolve(htmlFilePath)}`, {
                waitUntil: 'networkidle0'
            });

            // PDF olarak kaydet - A4 boyutunda
            await page.pdf({
                path: pdfFilePath,
                format: 'A4',
                printBackground: true, // Arka plan renklerini yazdır
                margin: {
                    top: '0mm',
                    right: '0mm',
                    bottom: '0mm',
                    left: '0mm'
                }
            });
            
            // Sayfayı kapat
            await page.close();
            
            console.log(`PDF oluşturuldu: ${pdfFilePath}`);
        }
    } catch (error) {
        console.error('PDF dönüştürme sırasında hata:', error);
    } finally {
        // Tarayıcıyı kapat
        await browser.close();
    }
    
    console.log('Tüm dönüşümler tamamlandı!');
}

// HTML'den PDF'e dönüştürme işlemini başlat
convertHtmlToPdf().catch(error => {
    console.error('Beklenmeyen hata:', error);
    process.exit(1);
});
