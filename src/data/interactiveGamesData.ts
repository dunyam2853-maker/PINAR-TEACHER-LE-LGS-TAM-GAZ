export interface WordDuelItem {
  id: string;
  unit: number;
  word: string;
  pronunciationHint: string;
  correctMeaning: string;
  options: string[];
  example: string;
}

export interface TrapHunterQuestion {
  id: string;
  unit: number;
  questionContext: string;
  questionStem: string;
  options: {
    letter: "A" | "B" | "C" | "D";
    text: string;
    isCorrect: boolean;
    trapReason: string;
  }[];
}

export const WORD_DUEL_ITEMS: WordDuelItem[] = [
  {
    id: "wd-1",
    unit: 1,
    word: "Back up",
    pronunciationHint: "/bæk ʌp/",
    correctMeaning: "Support / Stand by someone",
    options: ["Support / Stand by someone", "Take a step back", "Tell a lie", "Be stubborn"],
    example: "True friends back each other up in difficult times."
  },
  {
    id: "wd-2",
    unit: 1,
    word: "Count on / Rely on",
    pronunciationHint: "/kaʊnt ɒn/",
    correctMeaning: "Trust / Depend on someone",
    options: ["Trust / Depend on someone", "Count numbers", "Refuse an offer", "Make an excuse"],
    example: "I can always count on my buddy Arthur."
  },
  {
    id: "wd-3",
    unit: 2,
    word: "Can't stand",
    pronunciationHint: "/kɑːnt stænd/",
    correctMeaning: "Dislike strongly / Cannot tolerate",
    options: ["Dislike strongly / Cannot tolerate", "Unable to stand up", "Enjoy very much", "Prefer doing"],
    example: "He can't stand loud heavy metal music."
  },
  {
    id: "wd-4",
    unit: 3,
    word: "Chop & Dice",
    pronunciationHint: "/tʃɒp ænd daɪs/",
    correctMeaning: "Cut into pieces and small cubes",
    options: ["Cut into pieces and small cubes", "Roast in the oven", "Boil and drain", "Mop the kitchen floor"],
    example: "First, chop the onions and dice the carrots."
  },
  {
    id: "wd-5",
    unit: 4,
    word: "Put through",
    pronunciationHint: "/pʊt θruː/",
    correctMeaning: "Connect a caller on the phone",
    options: ["Connect a caller on the phone", "Hang up the phone", "Leave a voicemail", "Delete a contact number"],
    example: "Hold on a minute, I will put you through to the manager."
  },
  {
    id: "wd-6",
    unit: 5,
    word: "Internet Safety Rules",
    pronunciationHint: "/ˈɪntənet ˈseɪfti ruːlz/",
    correctMeaning: "Rules for online protection and security",
    options: ["Rules for online protection and security", "Internet connection speed test", "Social media addiction", "Search engine browsing history"],
    example: "Always follow internet safety rules when browsing."
  },
  {
    id: "wd-7",
    unit: 6,
    word: "Adrenaline junkie",
    pronunciationHint: "/əˈdrenəlɪn ˈdʒʌŋki/",
    correctMeaning: "A person who loves thrilling danger and excitement",
    options: ["A person who loves thrilling danger and excitement", "A quiet nature walker", "A fearful tourist", "A security guard"],
    example: "Bungee jumping is made for adrenaline junkies."
  },
  {
    id: "wd-8",
    unit: 7,
    word: "All-inclusive resort",
    pronunciationHint: "/ɔːl ɪnˈkluːsɪv rɪˈzɔːt/",
    correctMeaning: "A hotel package including accommodation, meals and drinks",
    options: ["A hotel package including accommodation, meals and drinks", "Bed and breakfast only", "Tent camping site", "Ancient historic theater"],
    example: "We enjoyed our vacation at an all-inclusive seaside resort."
  },
  {
    id: "wd-9",
    unit: 8,
    word: "Responsible for",
    pronunciationHint: "/rɪˈspɒnsəbl fɔː/",
    correctMeaning: "Having an obligation or duty for a task",
    options: ["Having an obligation or duty for a task", "Running away from chores", "Giving punishment", "Being lazy at home"],
    example: "Chloe is responsible for setting the dinner table."
  },
  {
    id: "wd-10",
    unit: 9,
    word: "Conduct an experiment",
    pronunciationHint: "/kənˈdʌkt ən ɪkˈsperɪmənt/",
    correctMeaning: "Carry out a scientific test in a laboratory",
    options: ["Carry out a scientific test in a laboratory", "Sell pharmaceutical drugs", "Write a personal biography", "Distribute Nobel prizes"],
    example: "Scientists conduct experiments in the biochemistry lab."
  },
  {
    id: "wd-11",
    unit: 10,
    word: "Emergency kit",
    pronunciationHint: "/ɪˈmɜːdʒənsi kɪt/",
    correctMeaning: "Survival supply bag prepared for natural disasters",
    options: ["Survival supply bag prepared for natural disasters", "First aid theory textbook", "Fire extinguishing truck", "Daily weather forecast report"],
    example: "Every family should prepare an earthquake emergency kit."
  }
];

export const TRAP_HUNTER_QUESTIONS: TrapHunterQuestion[] = [
  {
    id: "trap-1",
    unit: 1,
    questionContext: "Invitation: 'Hi Mark, I'm organizing a basketball match this Saturday at 3 PM. Would you like to come?'\nMark: 'I'd love to, but I must take my dog to the vet on Saturday afternoon.'",
    questionStem: "According to the dialogue, which option explains Mark's situation?",
    options: [
      {
        letter: "A",
        text: "Mark accepts the invitation without any hesitation.",
        isCorrect: false,
        trapReason: "Distractor Trap: Seeing 'I'd love to' might trick you into thinking he accepted. However, the subsequent 'BUT' signifies a polite refusal!"
      },
      {
        letter: "B",
        text: "Mark gives an excuse for refusing the invitation.",
        isCorrect: true,
        trapReason: "CORRECT ANSWER: Mark provides a valid excuse (taking his dog to the vet) for turning down the invitation."
      },
      {
        letter: "C",
        text: "Mark hates playing basketball and being outdoors.",
        isCorrect: false,
        trapReason: "Distractor Trap: There is no evidence Mark dislikes basketball; 'I'd love to' actually indicates he wanted to play."
      },
      {
        letter: "D",
        text: "Mark will meet his friend at 3 PM on Saturday.",
        isCorrect: false,
        trapReason: "Distractor Trap: Mark cannot attend the match, so they will not meet."
      }
    ]
  },
  {
    id: "trap-2",
    unit: 3,
    questionContext: "Recipe: 'First, peel and slice the potatoes. Next, heat the oil in a pan. Then, fry the potatoes until golden. Finally, sprinkle salt and serve hot.'",
    questionStem: "What should you do BEFORE frying the potatoes?",
    options: [
      {
        letter: "A",
        text: "Sprinkle salt over them and serve hot.",
        isCorrect: false,
        trapReason: "Distractor Trap: This is the FINAL step AFTER frying; the question specifically asks for BEFORE (preceding step)."
      },
      {
        letter: "B",
        text: "Heat the oil in a frying pan.",
        isCorrect: true,
        trapReason: "CORRECT ANSWER: The immediate step preceding frying the potatoes is heating the oil in a pan."
      },
      {
        letter: "C",
        text: "Eat the meal with your guests.",
        isCorrect: false,
        trapReason: "Distractor Trap: This is an action outside of the preparation steps."
      },
      {
        letter: "D",
        text: "Boil them in a large pot of water.",
        isCorrect: false,
        trapReason: "Distractor Trap: Boiling is never mentioned in this fried potato recipe."
      }
    ]
  }
];
