// Bu dosya, talep edilen yeni flash kartları içermektedir.
// Bu kodu createFlashcards.js dosyasına entegre edebilirsiniz.

const newThemes = {
    'Duygular (Feelings and Emotions)': [
        { word: 'Happy', sentence: "I am happy.", translation: 'Ben mutluyum.', color: 'lightyellow' },
        { word: 'Angry', sentence: "I am angry.", translation: 'Ben kızgınım.', color: 'lightcoral' },
        { word: 'Surprised', sentence: "I am surprised.", translation: 'Ben şaşkınım.', color: 'lightpink' },
        { word: 'Sad', sentence: "I am sad.", translation: 'Ben üzgünüm.', color: 'lightblue' },
        { word: 'Sleepy', sentence: "I am sleepy.", translation: 'Uykum var.', color: 'lavender' },
        { word: 'Hungry', sentence: "I am hungry.", translation: 'Açım.', color: 'peachpuff' },
        { word: 'Thirsty', sentence: "I'm thirsty.", translation: 'Susadım.', color: 'lightcyan' }
    ],
    'Şekiller (Shapes)': [
        { word: 'Circle', sentence: "This is a circle.", translation: 'Bu bir daire.', color: 'lightcyan' },
        { word: 'Triangle', sentence: "Hop on the triangle.", translation: 'Üçgenin üzerine zıpla.', color: 'lightcoral' },
        { word: 'Square', sentence: "Is this a square? Yes, it is.", translation: 'Bu bir kare mi? Evet, öyle.', color: 'lightyellow' }
    ],
    'Günlük Rutinler (Daily Routines)': [
        { word: 'Monday', sentence: "What day is it today? It's Monday.", translation: 'Bugün günlerden ne? Pazartesi.', color: 'lightblue' },
        { word: 'Tuesday', sentence: "What day is it today? It's Tuesday.", translation: 'Bugün günlerden ne? Salı.', color: 'lightpink' },
        { word: 'Wednesday', sentence: "What day is it today? It's Wednesday.", translation: 'Bugün günlerden ne? Çarşamba.', color: 'lightgreen' },
        { word: 'Thursday', sentence: "What day is it today? It's Thursday.", translation: 'Bugün günlerden ne? Perşembe.', color: 'lightyellow' },
        { word: 'Friday', sentence: "What day is it today? It's Friday.", translation: 'Bugün günlerden ne? Cuma.', color: 'lightcoral' },
        { word: 'Saturday', sentence: "What day is it today? It's Saturday.", translation: 'Bugün günlerden ne? Cumartesi.', color: 'lightcyan' },
        { word: 'Sunday', sentence: "What day is it today? It's Sunday.", translation: 'Bugün günlerden ne? Pazar.', color: 'plum' },
        { word: 'Spring', sentence: "It's spring. Flowers bloom.", translation: 'İlkbahar. Çiçekler açıyor.', color: 'lightgreen' },
        { word: 'Summer', sentence: "It's summer. It's hot.", translation: 'Yaz. Hava sıcak.', color: 'lightyellow' },
        { word: 'Fall', sentence: "It's fall. Leaves are falling.", translation: 'Sonbahar. Yapraklar dökülüyor.', color: 'peachpuff' },
        { word: 'Winter', sentence: "It's winter. It's cold.", translation: 'Kış. Hava soğuk.', color: 'lightblue' }
    ],
    'Nezaket İfadeleri (Polite Requests)': [
        { word: 'Thank you', sentence: "Thank you! You're welcome.", translation: 'Teşekkür ederim! Rica ederim.', color: 'lightpink' },
        { word: 'Please', sentence: "I want the book, please!", translation: 'Kitabı istiyorum, lütfen!', color: 'lightblue' },
        { word: "You're welcome", sentence: "Thank you! You're welcome.", translation: 'Teşekkür ederim! Rica ederim.', color: 'lightyellow' },
        { word: 'Here you are', sentence: "Can I have the pencil? Here you are.", translation: 'Kalemi alabilir miyim? Buyurun.', color: 'lightgreen' },
        { word: 'Excuse me', sentence: "Excuse me, teacher.", translation: 'Affedersiniz, öğretmenim.', color: 'lightcyan' }
    ],
    'Sınıf Kuralları (Classroom Rules)': [
        { word: 'Sit down', sentence: "Sit down, please.", translation: 'Lütfen otur.', color: 'lightblue' },
        { word: 'Stand up', sentence: "Stand up, please.", translation: 'Lütfen ayağa kalk.', color: 'lightpink' },
        { word: 'Listen', sentence: "Listen to the teacher.", translation: 'Öğretmeni dinle.', color: 'lightyellow' },
        { word: "Don't run", sentence: "Don't run in the classroom.", translation: 'Sınıfta koşma.', color: 'lightgreen' },
        { word: 'Turn off/on', sentence: "Turn off/on the light.", translation: 'Işığı kapat/aç.', color: 'lightcyan' },
        { word: 'Look at', sentence: "Look at the smartboard.", translation: 'Akıllı tahtaya bak.', color: 'lightcoral' },
        { word: 'Raise your hand', sentence: "Raise your hand to speak.", translation: 'Konuşmak için elini kaldır.', color: 'plum' },
        { word: 'Be quiet', sentence: "Be quiet, please.", translation: 'Lütfen sessiz ol.', color: 'tan' }
    ],
    'Tanışma ve Temel İfadeler (Greetings and Basics)': [
        { word: "What's your name?", sentence: "What's your name? I'm Tom. Nice to meet you.", translation: 'Adın ne? Ben Tom. Tanıştığıma memnun oldum.', color: 'lightblue' },
        { word: "I'm (name)", sentence: "I'm Ela. Nice to meet you.", translation: 'Ben Ela. Tanıştığıma memnun oldum.', color: 'lightpink' },
        { word: 'My school', sentence: "This is my school.", translation: 'Bu benim okulum.', color: 'lightyellow' },
        { word: 'My friends', sentence: "These are my friends.", translation: 'Bunlar benim arkadaşlarım.', color: 'lightgreen' },
        { word: 'My teacher', sentence: "This is my teacher.", translation: 'Bu benim öğretmenim.', color: 'lightcyan' },
        { word: 'Hello', sentence: "Hello, how are you?", translation: 'Merhaba, nasılsın?', color: 'lightcoral' },
        { word: 'Goodbye', sentence: "Goodbye, see you tomorrow.", translation: 'Hoşça kal, yarın görüşürüz.', color: 'plum' },
        { word: 'Good morning', sentence: "Good morning, teacher.", translation: 'Günaydın, öğretmenim.', color: 'tan' }
    ]
};

// Bu temaları themes nesnesine eklemek için aşağıdaki kodu kullanabilirsiniz:
// Object.assign(themes, newThemes);
