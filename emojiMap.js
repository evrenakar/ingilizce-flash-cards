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

// Kelime-emoji eşleştirme fonksiyonu
function getEmojiForWord(word) {
    // Eşleştirme tablosunda kelime varsa emojiyi döndür, yoksa boş string döndür
    return emojiMap[word] || '';
}

// Dışa aktarma
module.exports = {
    emojiMap,
    getEmojiForWord
};
