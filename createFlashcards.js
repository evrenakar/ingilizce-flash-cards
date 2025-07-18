const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Kelime-emoji eşleştirme fonksiyonu
function getEmojiForWord(word) {
    // Kelime-emoji eşleştirme tablosu
    const emojiMap = {
        // Colors
        'Red': '🔴',
        'Blue': '🔵',
        'Green': '🟢',
        'Yellow': '🟡',
        'Purple': '🟣',
        'Pink': '🎀',
        'Orange': '🟠',
        'Brown': '🟤',
        'Black': '⚫',
        'White': '⚪',
        
        // Animals
        'Dog': '🐕',
        'Cat': '🐈',
        'Bird': '🐦',
        'Butterfly': '🦋',
        'Duck': '🦆',
        'Fish': '🐟',
        'Rabbit': '🐇',
        'Snake': '🐍',
        
        // Food & Drinks
        'Apple': '🍎',
        'Banana': '🍌',
        'Sandwich': '🥪',
        'Soup': '🍲',
        'Salad': '🥗',
        'Spaghetti': '🍝',
        'Chicken': '🍗',
        
        // Toys
        'Ball': '⚽',
        'Doll': '👧',
        'Car': '🚗',
        'Train': '🚂',
        'Lego': '🧱',
        'Puzzle': '🧩',
        'Boat': '🚢',
        'Plane': '✈️',
        
        // Clothes
        'Shoes': '👞',
        'T-shirt': '👕',
        'Dress': '👗',
        'Skirt': '👗',
        'Pants': '👖',
        'Socks': '🧦',
        'Scarf': '🧣',
        'Gloves': '🧤',
        'Sweater': '🧥',
        'Umbrella': '☂️',
        'Raincoat': '🧥',
        'Rainboots': '👢',
        'Cap': '🧢',
        'Sunglasses': '🕶️',
        'Slippers': '🥿',
        
        // Body Parts
        'Head': '👤',
        'Nose': '👃',
        'Mouth': '👄',
        'Ear': '👂',
        'Eye': '👁️',
        'Hand': '👋',
        'Leg': '🦵',
        'Foot': '🦶',
        
        // Numbers
        'One': '1️⃣',
        'Two': '2️⃣',
        'Three': '3️⃣',
        'Four': '4️⃣',
        'Five': '5️⃣',
        
        // Family
        'Mother': '👩',
        'Father': '👨',
        'Sister': '👧',
        'Brother': '👦',
        'Baby': '👶',
        'Grandmother': '👵',
        'Grandfather': '👴',
        
        // Weather & Seasons
        'Sunny': '☀️',
        'Rainy': '🌧️',
        'Windy': '💨',
        'Cloudy': '☁️',
        'Spring': '🌸',
        'Summer': '☀️',
        'Fall': '🍂',
        'Winter': '❄️',
        
        // Classroom Objects
        'Book': '📚',
        'Pencil': '✏️',
        'Ruler': '📏',
        'Notebook': '📓',
        'Backpack': '🎒',
        'Scissors': '✂️',
        'Glue': '🧴',
        'Sharpener': '🔍',
        'Eraser': '🧹',
        'Window': '🪟',
        'Door': '🚪',
        
        // Feelings & Emotions
        'Happy': '😀',
        'Sad': '😢',
        'Angry': '😠',
        'Hungry': '😋',
        'Thirsty': '🥤',
        'Scared': '😱',
        'Tired': '😴',
        
        // Shapes
        'Circle': '⭕',
        'Triangle': '🔺',
        'Square': '⬛',
        'Heart': '❤️',
        'Star': '⭐',
        'Rectangle': '▬',
        
        // House & Furniture
        'House': '🏠',
        'Chair': '🪑',
        'Table': '🪓',
        'Bed': '🛏️',
        'Sofa': '🛋️',
        'Kitchen': '🍳',
        'Bathroom': '🚿',
        
        // Playground
        'Slide': '🛝',
        'Swing': '🔄',
        'Seesaw': '⚖️',
        'Map': '🗺️',
        'Bottle': '🍼',
        
        // Days
        'Monday': '📅',
        'Tuesday': '📅',
        'Wednesday': '📅',
        'Thursday': '📅',
        'Friday': '📅',
        'Saturday': '📅',
        'Sunday': '📅',
        
        // Daily Actions
        'Eat': '🍽️',
        'Sleep': '💤',
        'Run': '🏃',
        'Walk': '🚶',
        'Jump': '⬆️',
        'Dance': '💃',
        'Swim': '🏊',
        'Draw': '🖌️',
        'Read': '📖',
        'Write': '✍️',
        'Count': '🔢',
        'Bounce': '⚾',
        'Row': '🚣',
        
        // Science
        'Fossil': '🦴',
        'Archeology': '🏺',
        'Magnetism': '🧲',
        'Volcano': '🌋',
        'Eruption': '💥',
        'Rainbow': '🌈',
        'Seed': '🌱',
        'Soil': '🌱',
        
        // Greetings & Basics
        'Hello': '👋',
        'Goodbye': '👋',
        'Yes': '✅',
        'No': '❌',
        'Stand up': '🧍',
        'Sit down': '🪑',
        'Open': '📖',
        'Close': '📕',
        'I like': '👍',
        'I don\'t like': '👎',
        
        // Polite Requests
        'Thank you': '🙏',
        'Please': '🙏',
        'You\'re welcome': '😊',
        'Here you are': '👐',
        'Excuse me': '🙋',
        
        // Classroom Rules
        'Listen': '👂',
        'Be quiet': '🤫',
        'Raise your hand': '🙋',
        'Share': '🤝',
        'Help': '🆘',
        'Be kind': '❤️',
        'Wait': '⏰',
        'Take turns': '🔄',
        'Clean up': '🧹'
    };
    
    // Eşleştirme tablosunda kelime varsa emojiyi döndür, yoksa boş string döndür
    return emojiMap[word] || '';
}

function createPDFs() {
    // Her tema için ayrı PDF dosyası oluşturacağız
    const createdFiles = [];

    // Tema verileri - her tema için 10 kart içeriği
    const themes = {
        "Animals": [
            { word: "Horse", sentence: "Horses run fast.", translation: "Atlar hızlı koşar.", color: "lightgray" },
            { word: "Rabbit", sentence: "Rabbits like carrots.", translation: "Tavşanlar havuç sever.", color: "peachpuff" },
            { word: "Fish", sentence: "A fish can swim.", translation: "Balık yüzebilir.", color: "lightblue" },
            { word: "Butterfly", sentence: "The butterfly is colorful.", translation: "Kelebek renklidir.", color: "lightpink" },
            { word: "Cat", sentence: "A cat says meow!", translation: "Kedi miyav der!", color: "lavender" },
            { word: "Dog", sentence: "Dog woofs/barks.", translation: "Köpek havlar.", color: "tan" },
            { word: "Turtle", sentence: "The turtle is slow.", translation: "Kaplumbağa yavaştır.", color: "lightgreen" },
            { word: "Monkey", sentence: "The monkey climbs trees.", translation: "Maymun ağaçlara tırmanır.", color: "lightsalmon" },
            { word: "Bird", sentence: "A bird says tweet tweet.", translation: "Kuş cik cik der.", color: "lightyellow" },
            { word: "Duck", sentence: "The duck can swim.", translation: "Ördek yüzebilir.", color: "lightcyan" },
            { word: "Frog", sentence: "It's a big frog.", translation: "Bu büyük bir kurbağa.", color: "lightgreen" },
            { word: "Mouse", sentence: "I'm a mouse. Squeak!", translation: "Ben bir fareyim. Cik cik!", color: "lightgray" },
            { word: "Chicken", sentence: "Chicken lives in a farm.", translation: "Tavuk çiftlikte yaşar.", color: "lightyellow" },
            { word: "Cow", sentence: "The cow gives milk.", translation: "İnek süt verir.", color: "white" },
            { word: "Pig", sentence: "Pigs like mud.", translation: "Domuzlar çamuru sever.", color: "pink" }
        ],
        "Colors": [
            { word: "Green", sentence: "This/It is green.", translation: "Bu yeşil.", color: "lightgreen" },
            { word: "Red", sentence: "The tomato is red.", translation: "Domates kırmızıdır.", color: "lightcoral" },
            { word: "Yellow", sentence: "The sun is yellow.", translation: "Güneş sarıdır.", color: "lightyellow" },
            { word: "Blue", sentence: "The sky is blue.", translation: "Gökyüzü mavidir.", color: "lightblue" },
            { word: "Black", sentence: "My shoes are black.", translation: "Ayakkabılarım siyah.", color: "lightgray" },
            { word: "Orange", sentence: "The orange is orange.", translation: "Portakal turuncudur.", color: "orange" },
            { word: "Pink", sentence: "This is a pink dress.", translation: "Bu pembe bir elbise.", color: "lightpink" },
            { word: "Purple", sentence: "This is a purple crayon.", translation: "Bu mor bir pastel boya.", color: "plum" }
        ],
        "Food & Drinks": [
            { word: "Milk", sentence: "I want some milk.", translation: "Biraz süt istiyorum.", color: "white" },
            { word: "Bread", sentence: "I want some bread.", translation: "Biraz ekmek istiyorum.", color: "tan" },
            { word: "Cheese", sentence: "I like cheese.", translation: "Peyniri severim.", color: "lightyellow" },
            { word: "Egg", sentence: "I want an egg.", translation: "Bir yumurta istiyorum.", color: "beige" },
            { word: "Honey", sentence: "I like honey.", translation: "Balı severim.", color: "gold" },
            { word: "Water", sentence: "I'm thirsty. I want some water.", translation: "Susadım. Biraz su istiyorum.", color: "lightblue" },
            { word: "Apple", sentence: "I want an apple.", translation: "Bir elma istiyorum.", color: "lightcoral" },
            { word: "Banana", sentence: "I don’t like bananas.", translation: "Muz sevmiyorum.", color: "lightyellow" },
            { word: "Sandwich", sentence: "What do you want in your sandwich?", translation: "Sandviçine ne koymak istersin?", color: "wheat" },
            { word: "Soup", sentence: "Soup is boiling.", translation: "Çorba kaynıyor.", color: "lightsalmon" },
            { word: "Salad", sentence: "Do you like salad?", translation: "Salatayı sever misin?", color: "lightgreen" },
            { word: "Spaghetti", sentence: "I want spaghetti.", translation: "Spagetti istiyorum.", color: "lightyellow" }
        ],
        "Numbers": [
            { word: "One", sentence: "I have one ball.", translation: "Bir topum var.", color: "lightblue" },
            { word: "Two", sentence: "I have two feet.", translation: "İki ayağım var.", color: "lightpink" },
            { word: "Three", sentence: "How many legs does it have? Three legs.", translation: "Kaç bacağı var? Üç bacak.", color: "lightyellow" },
            { word: "Four", sentence: "I have four crayons.", translation: "Dört pastel boyam var.", color: "lightgreen" },
            { word: "Five", sentence: "I want five apples.", translation: "Beş elma istiyorum.", color: "lightcyan" },
            { word: "Six", sentence: "Count to six.", translation: "Altıya kadar say.", color: "lavender" },
            { word: "Seven", sentence: "There are seven days in a week.", translation: "Bir haftada yedi gün vardır.", color: "peachpuff" },
            { word: "Eight", sentence: "I have eight fingers.", translation: "Sekiz parmağım var.", color: "lightcoral" },
            { word: "Nine", sentence: "Nine is after eight.", translation: "Dokuz sekizden sonra gelir.", color: "lightsteelblue" },
            { word: "Ten", sentence: "I count to ten.", translation: "Ona kadar sayarım.", color: "plum" }
        ],
        "Family": [
            { word: "Mom", sentence: "This is my mom.", translation: "Bu benim annem.", color: "lightpink" },
            { word: "Dad", sentence: "My dad is tall.", translation: "Babam uzun boylu.", color: "lightblue" },
            { word: "Brother", sentence: "I have one brother.", translation: "Bir erkek kardeşim var.", color: "lightgreen" },
            { word: "Sister", sentence: "I have one sister.", translation: "Bir kız kardeşim var.", color: "lightyellow" },
            { word: "Baby", sentence: "This is my baby.", translation: "Bu benim bebeğim.", color: "lightcyan" },
            { word: "Family", sentence: "This is my family.", translation: "Bu benim ailem.", color: "lavender" }
        ],
        "Toys": [
            { word: "Boat", sentence: "I'm playing with my boat.", translation: "Teknemle oynuyorum.", color: "lightblue" },
            { word: "Plane", sentence: "I'm playing with my plane.", translation: "Uçağımla oynuyorum.", color: "lightgray" },
            { word: "Lego", sentence: "I build with lego.", translation: "Lego ile inşa ederim.", color: "lightcoral" },
            { word: "Puzzle", sentence: "The puzzle is fun.", translation: "Yapboz eğlenceli.", color: "lightyellow" },
            { word: "Car", sentence: "This is a toy car.", translation: "Bu bir oyuncak araba.", color: "lightgreen" },
            { word: "Train", sentence: "The train goes choo-choo.", translation: "Tren çuf çuf gider.", color: "lightcyan" },
            { word: "Doll", sentence: "She loves her doll.", translation: "Bebeğini seviyor.", color: "lightpink" },
            { word: "Robot", sentence: "The robot can dance.", translation: "Robot dans edebilir.", color: "lavender" },
            { word: "Ball", sentence: "I have a ball.", translation: "Bir topum var.", color: "peachpuff" },
            { word: "Kite", sentence: "The kite flies high.", translation: "Uçurtma yüksekte uçar.", color: "lightsteelblue" },
            { word: "Present", sentence: "I have a present for you.", translation: "Senin için bir hediyem var.", color: "plum" }
        ],
        "Clothes": [
            { word: "T-shirt", sentence: "This is a blue T-shirt.", translation: "Bu mavi bir tişört.", color: "lightblue" },
            { word: "Shorts", sentence: "These are blue shorts.", translation: "Bunlar mavi şort.", color: "lightcyan" },
            { word: "Coat", sentence: "I wear a coat in winter.", translation: "Kışın palto giyerim.", color: "lightgray" },
            { word: "Boots", sentence: "In winter, we wear boots.", translation: "Kışın bot giyeriz.", color: "tan" },
            { word: "Hat", sentence: "Put on the hat!", translation: "Şapkayı giy!", color: "lightyellow" },
            { word: "Shoes", sentence: "My shoes are black.", translation: "Ayakkabılarım siyah.", color: "lightcoral" },
            { word: "Dress", sentence: "This is a pink dress.", translation: "Bu pembe bir elbise.", color: "lightpink" },
            { word: "Skirt", sentence: "This is a purple skirt.", translation: "Bu mor bir etek.", color: "plum" },
            { word: "Pants", sentence: "These are black pants.", translation: "Bunlar siyah pantolon.", color: "lightgreen" },
            { word: "Socks", sentence: "I'm wearing red socks.", translation: "Kırmızı çoraplar giyiyorum.", color: "lightcoral" },
            { word: "Scarf", sentence: "In winter, we wear scarves.", translation: "Kışın atkı giyeriz.", color: "plum" },
            { word: "Gloves", sentence: "Put on your gloves!", translation: "Eldivenlerini giy!", color: "lightblue" },
            { word: "Sweater", sentence: "I'm wearing a sweater.", translation: "Kazak giyiyorum.", color: "lightcoral" },
            { word: "Umbrella", sentence: "Take your umbrella.", translation: "Şemsiyeni al.", color: "lightsteelblue" },
            { word: "Raincoat", sentence: "Wear your raincoat.", translation: "Yağmurluğunu giy.", color: "lightyellow" },
            { word: "Rainboots", sentence: "These are rainboots.", translation: "Bunlar yağmur çizmeleri.", color: "lightgreen" },
            { word: "Cap", sentence: "I wear a cap in summer.", translation: "Yazın şapka giyerim.", color: "lightcyan" },
            { word: "Sunglasses", sentence: "Put on your sunglasses.", translation: "Güneş gözlüklerini tak.", color: "lavender" },
            { word: "Slippers", sentence: "These are slippers.", translation: "Bunlar terlik.", color: "peachpuff" }
        ],
        "Body Parts": [
            { word: "Head", sentence: "Touch your head.", translation: "Başına dokun.", color: "peachpuff" },
            { word: "Eye", sentence: "I have two eyes.", translation: "İki gözüm var.", color: "lightblue" },
            { word: "Nose", sentence: "This is a nose.", translation: "Bu bir burun.", color: "lightpink" },
            { word: "Mouth", sentence: "I eat with my mouth.", translation: "Ağzımla yerim.", color: "lightcoral" },
            { word: "Ear", sentence: "I hear with my ears.", translation: "Kulaklarımla duyarım.", color: "lightyellow" },
            { word: "Arm", sentence: "I have two arms.", translation: "İki kolum var.", color: "lightgreen" },
            { word: "Leg", sentence: "My legs are long.", translation: "Bacaklarım uzun.", color: "lightcyan" },
            { word: "Hand", sentence: "I write with my hand.", translation: "Elimle yazarım.", color: "lavender" },
            { word: "Foot", sentence: "I walk with my feet.", translation: "Ayaklarımla yürürüm.", color: "tan" },
            { word: "Tongue", sentence: "The monster has a big tongue.", translation: "Canavarın büyük bir dili var.", color: "lightcoral" }
        ],
        "Shapes": [
            { word: "Circle", sentence: "This is a circle.", translation: "Bu bir daire.", color: "lightcyan" },
            { word: "Triangle", sentence: "Hop on the triangle.", translation: "Üçgenin üzerine zıpla.", color: "lightcoral" },
            { word: "Square", sentence: "This is a square.", translation: "Bu bir kare.", color: "lightyellow" },
            { word: "Rectangle", sentence: "This is a rectangle.", translation: "Bu bir dikdörtgen.", color: "lightgreen" },
            { word: "Heart", sentence: "This is a pink heart.", translation: "Bu pembe bir kalp.", color: "lightpink" }
        ],
        "Weather & Seasons": [
            { word: "Sunny", sentence: "It's sunny in summer.", translation: "Yazın hava güneşli.", color: "lightyellow" },
            { word: "Rainy", sentence: "It's rainy in spring.", translation: "İlkbaharda yağmurlu.", color: "lightblue" },
            { word: "Snowy", sentence: "It's snowy in winter.", translation: "Kışın karlı.", color: "white" },
            { word: "Windy", sentence: "It's windy today.", translation: "Bugün rüzgarlı.", color: "lightgray" },
            { word: "Hot", sentence: "Summer is hot.", translation: "Yaz sıcaktır.", color: "lightcoral" },
            { word: "Cold", sentence: "Winter is cold.", translation: "Kış soğuktur.", color: "lightcyan" },
            { word: "Spring", sentence: "Flowers bloom in spring.", translation: "İlkbaharda çiçekler açar.", color: "lightgreen" },
            { word: "Summer", sentence: "We swim in summer.", translation: "Yazın yüzeriz.", color: "lightyellow" },
            { word: "Fall", sentence: "Leaves fall in fall.", translation: "Sonbaharda yapraklar düşer.", color: "peachpuff" },
            { word: "Winter", sentence: "We wear coats in winter.", translation: "Kışın palto giyeriz.", color: "lightblue" },
            { word: "Buoyancy", sentence: "How the ship sail? Learning the buoyancy of water.", translation: "Gemi nasıl yüzer? Suyun kaldırma kuvvetini öğreniyoruz.", color: "lightblue" }
        ],
        "Classroom Objects": [
            { word: "Book", sentence: "This is a book.", translation: "Bu bir kitap.", color: "lightblue" },
            { word: "Pencil", sentence: "It's a pencil.", translation: "Bu bir kalem.", color: "lightgray" },
            { word: "Chair", sentence: "It's a chair.", translation: "Bu bir sandalye.", color: "tan" },
            { word: "Table", sentence: "This is a table.", translation: "Bu bir masa.", color: "lightgreen" },
            { word: "Crayon", sentence: "What's this? This is a crayon.", translation: "Bu ne? Bu bir pastel boya.", color: "lightpink" },
            { word: "Glue", sentence: "I want the glue, please!", translation: "Yapıştırıcıyı istiyorum, lütfen!", color: "lightyellow" },
            { word: "Schoolbag", sentence: "This is my schoolbag.", translation: "Bu benim okul çantam.", color: "lightcyan" },
            { word: "Scissors", sentence: "Here are the scissors.", translation: "İşte makas.", color: "lightcoral" },
            { word: "Sharpener", sentence: "What's this? It's a sharpener.", translation: "Bu ne? Bu bir kalemtraş.", color: "lavender" },
            { word: "Eraser", sentence: "I want the eraser, please!", translation: "Silgiyi istiyorum, lütfen!", color: "peachpuff" },
            { word: "Window", sentence: "It's a window.", translation: "Bu bir pencere.", color: "lightsteelblue" },
            { word: "Door", sentence: "It's a door.", translation: "Bu bir kapı.", color: "plum" },
            { word: "Ruler", sentence: "Where is my ruler?", translation: "Cetvelim nerede?", color: "lightgray" },
            { word: "Notebook", sentence: "This is my notebook.", translation: "Bu benim defterim.", color: "white" }
        ],
        "Feelings & Emotions": [
            { word: "Happy", sentence: "I am happy.", translation: "Ben mutluyum.", color: "lightyellow" },
            { word: "Angry", sentence: "I am angry.", translation: "Ben kızgınım.", color: "lightcoral" },
            { word: "Surprised", sentence: "I am surprised.", translation: "Şaşırdım.", color: "lightpink" },
            { word: "Sad", sentence: "I am sad.", translation: "Üzgünüm.", color: "lightblue" },
            { word: "Sleepy", sentence: "I am sleepy.", translation: "Uykum var.", color: "lavender" },
            { word: "Hungry", sentence: "I'm hungry. I want some fish.", translation: "Açım. Biraz balık istiyorum.", color: "peachpuff" },
            { word: "Thirsty", sentence: "I'm thirsty. I want some milk.", translation: "Susadım. Biraz süt istiyorum.", color: "lightcyan" }
        ],
        "House & Furniture": [
            { word: "House", sentence: "This is my house.", translation: "Bu benim evim.", color: "lightblue" },
            { word: "Living Room", sentence: "This is the living room.", translation: "Bu oturma odası.", color: "lightpink" },
            { word: "Bedroom", sentence: "I'm in the bedroom.", translation: "Yatak odasındayım.", color: "lightyellow" },
            { word: "Bathroom", sentence: "Where is mom? Mom is in the bathroom.", translation: "Anne nerede? Anne banyoda.", color: "lightgreen" },
            { word: "Kitchen", sentence: "Dad is in the kitchen cooking.", translation: "Babam mutfakta yemek yapıyor.", color: "lightcyan" },
            { word: "Sofa", sentence: "This is a sofa.", translation: "Bu bir kanepe.", color: "lavender" },
            { word: "Bed", sentence: "Sleep in bed.", translation: "Yatakta uyu.", color: "peachpuff" },
            { word: "Fridge", sentence: "This is a fridge.", translation: "Bu bir buzdolabı.", color: "lightsteelblue" },
            { word: "Television", sentence: "The television is in the living room.", translation: "Televizyon oturma odasında.", color: "plum" },
            { word: "Table", sentence: "The table is in the kitchen.", translation: "Masa mutfakta.", color: "tan" }
        ],
        "Playground": [
            { word: "Slide", sentence: "I can slide.", translation: "Kayabilirim.", color: "lightblue" },
            { word: "Swing", sentence: "I'm swinging.", translation: "Sallanıyorum.", color: "lightpink" },
            { word: "See-saw", sentence: "This is a see-saw.", translation: "Bu bir tahterevalli.", color: "lightyellow" },
            { word: "Sandbox", sentence: "Let's play in the sandbox.", translation: "Kum havuzunda oynayalım.", color: "tan" },
            { word: "Map", sentence: "Look at the map.", translation: "Haritaya bak.", color: "lightgreen" },
            { word: "Bottle", sentence: "I have a water bottle.", translation: "Bir su şişem var.", color: "lightcyan" }
        ],
        "Days": [
            { word: "Monday", sentence: "What day is it today? It's Monday.", translation: "Bugün günlerden ne? Pazartesi.", color: "lightblue" },
            { word: "Tuesday", sentence: "What day is it today? It's Tuesday.", translation: "Bugün günlerden ne? Salı.", color: "lightpink" },
            { word: "Wednesday", sentence: "What day is it today? It's Wednesday.", translation: "Bugün günlerden ne? Çarşamba.", color: "lightyellow" },
            { word: "Thursday", sentence: "What day is it today? It's Thursday.", translation: "Bugün günlerden ne? Perşembe.", color: "lightgreen" },
            { word: "Friday", sentence: "What day is it today? It's Friday.", translation: "Bugün günlerden ne? Cuma.", color: "lightcyan" },
            { word: "Saturday", sentence: "What day is it today? It's Saturday.", translation: "Bugün günlerden ne? Cumartesi.", color: "lavender" },
            { word: "Sunday", sentence: "What day is it today? It's Sunday.", translation: "Bugün günlerden ne? Pazar.", color: "peachpuff" }
        ],
        "Classroom Rules": [
            { word: "Sit down", sentence: "Sit down, please.", translation: "Lütfen otur.", color: "lightblue" },
            { word: "Stand up", sentence: "Stand up, please.", translation: "Lütfen ayağa kalk.", color: "lightpink" },
            { word: "Listen", sentence: "Listen to the teacher.", translation: "Öğretmeni dinle.", color: "lightyellow" },
            { word: "Don't run", sentence: "Don't run in the classroom.", translation: "Sınıfta koşma.", color: "lightgreen" },
            { word: "Turn off/on", sentence: "Turn off/on the light.", translation: "Işığı kapat/aç.", color: "lightcyan" },
            { word: "Look at", sentence: "Look at the smartboard.", translation: "Akıllı tahtaya bak.", color: "lavender" }
        ],
        "Greetings & Basics": [
            { word: "What's your name?", sentence: "What's your name? I'm Tom.", translation: "Adın ne? Ben Tom.", color: "lightblue" },
            { word: "I'm (name)", sentence: "I'm Ela. Nice to meet you.", translation: "Ben Ela. Tanıştığıma memnun oldum.", color: "lightpink" },
            { word: "My school", sentence: "This is my school.", translation: "Bu benim okulum.", color: "lightyellow" },
            { word: "My friends", sentence: "These are my friends.", translation: "Bunlar benim arkadaşlarım.", color: "lightgreen" },
            { word: "My teacher", sentence: "This is my teacher.", translation: "Bu benim öğretmenim.", color: "lightcyan" },
            { word: "Hello", sentence: "Hello, how are you?", translation: "Merhaba, nasılsın?", color: "lavender" },
            { word: "Goodbye", sentence: "Goodbye, see you tomorrow.", translation: "Hoşça kal, yarın görüşürüz.", color: "peachpuff" }
        ],
        "Polite Requests": [
            { word: "Thank you", sentence: "Thank you! You're welcome.", translation: "Teşekkür ederim! Rica ederim.", color: "lightpink" },
            { word: "Please", sentence: "I want the book, please!", translation: "Kitabı istiyorum, lütfen!", color: "lightblue" },
            { word: "You're welcome", sentence: "Thank you! You're welcome.", translation: "Teşekkür ederim! Rica ederim.", color: "lightyellow" },
            { word: "Here you are", sentence: "Can I have the pencil? Here you are.", translation: "Kalemi alabilir miyim? Buyurun.", color: "lightgreen" },
            { word: "Excuse me", sentence: "Excuse me, teacher.", translation: "Affedersiniz, öğretmenim.", color: "lightcyan" }
        ],
        "Daily Actions": [
            { word: 'Eat', sentence: 'I eat breakfast.', translation: 'Kahvaltı yapıyorum.', color: 'lightsalmon' },
            { word: 'Sleep', sentence: 'I sleep at night.', translation: 'Geceleri uyurum.', color: 'lightgray' },
            { word: 'Run', sentence: 'I run in the park.', translation: 'Parkta koşarım.', color: 'lightgreen' },
            { word: 'Walk', sentence: 'I walk to school.', translation: 'Okula yürüyerek giderim.', color: 'tan' },
            { word: 'Jump', sentence: 'Children jump for joy.', translation: 'Çocuklar sevinçten zıplar.', color: 'lightcoral' },
            { word: 'Read', sentence: 'I read a book.', translation: 'Kitap okurum.', color: 'lightpink' },
            { word: 'Write', sentence: 'I write with a pencil.', translation: 'Kalemle yazarım.', color: 'lightblue' },
            { word: 'Sing', sentence: 'She sings a song.', translation: 'O bir şarkı söylüyor.', color: 'plum' },
            { word: 'Dance', sentence: 'We dance at the party.', translation: 'Partide dans ederiz.', color: 'lightcyan' },
            { word: 'Play', sentence: 'Children play games.', translation: 'Çocuklar oyun oynar.', color: 'lightyellow' },
            { word: 'Tidy up', sentence: 'Tidy up your toys!', translation: 'Oyuncaklarını topla!', color: 'lightyellow' },
            { word: 'Dig', sentence: 'Let\'s dig for fossils!', translation: 'Hadi fosil kazalım!', color: 'tan' },
            { word: 'Bounce', sentence: 'The ball is bouncing.', translation: 'Top zıplıyor.', color: 'lightcoral' },
            { word: 'Row', sentence: 'The boat is rowing.', translation: 'Tekne kürek çekiyor.', color: 'lightblue' }
        ],
        'Science': [
            { word: 'Fossil', sentence: 'We found a fossil!', translation: 'Bir fosil bulduk!', color: 'tan' },
            { word: 'Archeology', sentence: 'We learn about archeology.', translation: 'Arkeoloji hakkında bilgi ediniyoruz.', color: 'peachpuff' },
            { word: 'Pickaxe', sentence: 'Use the pickaxe carefully.', translation: 'Kazmayı dikkatli kullan.', color: 'lightgray' },
            { word: 'Volcano', sentence: 'The volcano is erupting!', translation: 'Volkan patlıyor!', color: 'lightcoral' },
            { word: 'Eruption', sentence: 'Look at the eruption!', translation: 'Patlamaya bak!', color: 'sienna' },
            { word: 'Rainbow', sentence: 'Let\'s create a rainbow!', translation: 'Hadi gökkuşağı yapalım!', color: 'violet' },
            { word: 'Seed', sentence: 'Plant the seed.', translation: 'Tohumu ek.', color: 'tan' },
            { word: 'Soil', sentence: 'Farming without soil.', translation: 'Topraksız tarım.', color: 'sienna' }
        ]
    };

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
