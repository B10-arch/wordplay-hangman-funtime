
export type WordCategory = {
  name: string;
  words: string[];
};

export const wordCategories: WordCategory[] = [
  {
    name: "Animals",
    words: [
      "ELEPHANT", "GIRAFFE", "PENGUIN", "DOLPHIN", "CHEETAH", 
      "KANGAROO", "SQUIRREL", "PANDA", "ZEBRA", "TIGER",
      "MONKEY", "JAGUAR", "RACCOON", "KOALA", "FLAMINGO"
    ]
  },
  {
    name: "Fruits",
    words: [
      "APPLE", "BANANA", "ORANGE", "STRAWBERRY", "WATERMELON",
      "PINEAPPLE", "GRAPE", "MANGO", "KIWI", "PEACH",
      "CHERRY", "LEMON", "COCONUT", "BLUEBERRY", "APRICOT"
    ]
  },
  {
    name: "Countries",
    words: [
      "CANADA", "JAPAN", "BRAZIL", "AUSTRALIA", "GERMANY",
      "MEXICO", "FRANCE", "ITALY", "SPAIN", "EGYPT",
      "INDIA", "CHINA", "RUSSIA", "SWEDEN", "THAILAND"
    ]
  },
  {
    name: "Sports",
    words: [
      "FOOTBALL", "BASKETBALL", "BASEBALL", "TENNIS", "SOCCER",
      "VOLLEYBALL", "CRICKET", "HOCKEY", "SWIMMING", "CYCLING",
      "SKIING", "SURFING", "BOXING", "GYMNASTICS", "RUGBY"
    ]
  }
];

export const getRandomWord = (category?: string): string => {
  if (category) {
    const selectedCategory = wordCategories.find(c => c.name === category);
    if (selectedCategory) {
      const randomIndex = Math.floor(Math.random() * selectedCategory.words.length);
      return selectedCategory.words[randomIndex];
    }
  }
  
  // Pick a random category if none specified
  const randomCategoryIndex = Math.floor(Math.random() * wordCategories.length);
  const randomWordIndex = Math.floor(Math.random() * wordCategories[randomCategoryIndex].words.length);
  return wordCategories[randomCategoryIndex].words[randomWordIndex];
};

export const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
