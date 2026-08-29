import { UnitCompetition } from "../types";

export const UNIT_COMPETITIONS: UnitCompetition[] = [
  {
    id: "comp-u1",
    unitNumber: 1,
    unitTitle: "Friendship (Arkadaşlık)",
    badgeEmoji: "🤝",
    durationMinutes: 2,
    questions: [
      {
        id: "u1-q1",
        question: "Which of the following phrases is used for MAKING an INVITATION?",
        options: ["Would you like to come over tomorrow?", "I'm sorry, but I can't.", "That sounds boring.", "I don't get on well with him."],
        correctIndex: 0,
        explanation: "'Would you like to...?' (İster misin?) kalıbı davet ve teklif cümlesidir.",
        difficulty: "easy",
        timeLimitSec: 15
      },
      {
        id: "u1-q2",
        question: "A true friend always __________ you up when you have a problem.",
        options: ["backs", "breaks", "hangs", "counts"],
        correctIndex: 0,
        explanation: "'Back up' = Support (Desteklemek, arka çıkmak) anlamına gelir.",
        difficulty: "easy",
        timeLimitSec: 12
      },
      {
        id: "u1-q3",
        question: "Which quality is NEGATIVE in a friendship?",
        options: ["Honest", "Supportive", "Sneaky", "Reliable"],
        correctIndex: 2,
        explanation: "'Sneaky' (Sinsi/kurnaz) olumsuz bir kişilik özelliğidir.",
        difficulty: "medium",
        timeLimitSec: 12
      },
      {
        id: "u1-q4",
        question: "'I'm full / stuffed' means:",
        options: ["I am very hungry", "I cannot eat anymore", "I am thirsty", "I am tired"],
        correctIndex: 1,
        explanation: "'I'm full / stuffed' = Tokum, daha fazla yiyemem.",
        difficulty: "medium",
        timeLimitSec: 10
      },
      {
        id: "u1-q5",
        question: "If you have a lot of things 'in common' with someone, you:",
        options: ["never talk to each other", "share similar interests and hobbies", "always argue", "live in different cities"],
        correctIndex: 1,
        explanation: "'Have something in common' = Ortak ilgi alanlarına sahip olmak.",
        difficulty: "hard",
        timeLimitSec: 15
      }
    ]
  },
  {
    id: "comp-u2",
    unitNumber: 2,
    unitTitle: "Teen Life (Gençlik Yaşamı)",
    badgeEmoji: "🎧",
    durationMinutes: 2,
    questions: [
      {
        id: "u2-q1",
        question: "Which music type is described as 'unbearable'?",
        options: ["A music you love very much", "A music that is too loud and annoying to stand", "A very relaxing rhythm", "A classical masterpiece"],
        correctIndex: 1,
        explanation: "'Unbearable' = Dayanılmaz, çekilmez.",
        difficulty: "easy",
        timeLimitSec: 12
      },
      {
        id: "u2-q2",
        question: "I prefer playing tennis __________ watching it on TV.",
        options: ["than", "to", "at", "for"],
        correctIndex: 1,
        explanation: "İngilizcede 'prefer X to Y' (X'i Y'ye tercih etmek) kalıbında 'to' kullanılır.",
        difficulty: "easy",
        timeLimitSec: 10
      },
      {
        id: "u2-q3",
        question: "Which of the following means 'snob / arrogant'?",
        options: ["Someone who thinks they are better than everyone", "Someone who helps poor people", "Someone who listens carefully", "Someone who does sports daily"],
        correctIndex: 0,
        explanation: "'Snob' = Kendini beğenmiş, kibirli.",
        difficulty: "medium",
        timeLimitSec: 12
      },
      {
        id: "u2-q4",
        question: "Which daily activity matches with 'riding a bicycle in the park'?",
        options: ["Surfing the net", "Cycling", "Archery", "Trekking"],
        correctIndex: 1,
        explanation: "Bisiklete binmek = 'Cycling'.",
        difficulty: "easy",
        timeLimitSec: 10
      }
    ]
  },
  {
    id: "comp-u3",
    unitNumber: 3,
    unitTitle: "In the Kitchen (Mutfakta)",
    badgeEmoji: "🍳",
    durationMinutes: 2,
    questions: [
      {
        id: "u3-q1",
        question: "Which cooking method means cooking in hot water bubbles?",
        options: ["Fry", "Bake", "Boil", "Grill"],
        correctIndex: 2,
        explanation: "'Boil' = Kaynatmak/haşlamak.",
        difficulty: "easy",
        timeLimitSec: 10
      },
      {
        id: "u3-q2",
        question: "What kitchen tool do you use to remove the skin of potatoes?",
        options: ["Peeler", "Rolling pin", "Whisk", "Grater"],
        correctIndex: 0,
        explanation: "'Peeler' = Kabuk soyucu.",
        difficulty: "medium",
        timeLimitSec: 12
      },
      {
        id: "u3-q3",
        question: "Cutting vegetables into small cubes is called:",
        options: ["Mashing", "Dicing", "Kneading", "Squeezing"],
        correctIndex: 1,
        explanation: "'Dice' = Küp küp doğramak.",
        difficulty: "medium",
        timeLimitSec: 10
      },
      {
        id: "u3-q4",
        question: "Which taste matches with 'lemon'?",
        options: ["Sweet", "Sour", "Spicy", "Salty"],
        correctIndex: 1,
        explanation: "'Sour' = Ekşi (Limon tadı).",
        difficulty: "easy",
        timeLimitSec: 10
      }
    ]
  },
  {
    id: "comp-u4",
    unitNumber: 4,
    unitTitle: "On the Phone (Telefonda)",
    badgeEmoji: "📞",
    durationMinutes: 2,
    questions: [
      {
        id: "u4-q1",
        question: "'Hang on a minute' means:",
        options: ["End the call immediately", "Wait on the line", "Dial a wrong number", "Send a text message"],
        correctIndex: 1,
        explanation: "'Hang on' = Beklemek.",
        difficulty: "easy",
        timeLimitSec: 10
      },
      {
        id: "u4-q2",
        question: "Which phrase means 'I will connect you to the manager'?",
        options: ["I'll put you through.", "I'll hang up.", "You called the wrong office.", "I'm engaged."],
        correctIndex: 0,
        explanation: "'Put through' = Telefonda birine bağlamak.",
        difficulty: "medium",
        timeLimitSec: 12
      },
      {
        id: "u4-q3",
        question: "If a phone line is 'engaged', it is:",
        options: ["Broken", "Busy with another call", "Off", "Free"],
        correctIndex: 1,
        explanation: "'Engaged / Busy' = Meşgul.",
        difficulty: "easy",
        timeLimitSec: 10
      }
    ]
  },
  {
    id: "comp-u5",
    unitNumber: 5,
    unitTitle: "The Internet (İnternet)",
    badgeEmoji: "🌐",
    durationMinutes: 2,
    questions: [
      {
        id: "u5-q1",
        question: "A file attached to an email is called an:",
        options: ["Attachment", "Account", "Avatar", "Application"],
        correctIndex: 0,
        explanation: "'Attachment' = E-posta eki.",
        difficulty: "easy",
        timeLimitSec: 10
      },
      {
        id: "u5-q2",
        question: "Which is a SAFE internet rule?",
        options: ["Sharing your passwords with friends", "Refusing stranger chat requests", "Clicking on unknown pop-ups", "Posting your credit card photo"],
        correctIndex: 1,
        explanation: "Yabancılardan gelen sohbet isteklerini reddetmek güvenli bir kuraldır.",
        difficulty: "easy",
        timeLimitSec: 10
      }
    ]
  },
  {
    id: "comp-u6",
    unitNumber: 6,
    unitTitle: "Adventures (Maceralar)",
    badgeEmoji: "🪂",
    durationMinutes: 2,
    questions: [
      {
        id: "u6-q1",
        question: "An 'adrenaline seeker' is someone who:",
        options: ["avoids all risks", "loves exciting and dangerous sports", "prefers staying at home", "sleeps all day"],
        correctIndex: 1,
        explanation: "'Adrenaline seeker' = Heyecan ve adrenalin peşinde koşan kişi.",
        difficulty: "easy",
        timeLimitSec: 10
      },
      {
        id: "u6-q2",
        question: "Which equipment is essential for paragliding?",
        options: ["Helmet and parachute", "Tennis racket", "Swimsuit", "Snowboard"],
        correctIndex: 0,
        explanation: "Yamaç paraşütü için kask ve paraşüt zorunludur.",
        difficulty: "easy",
        timeLimitSec: 10
      }
    ]
  },
  {
    id: "comp-u7",
    unitNumber: 7,
    unitTitle: "Tourism (Turizm)",
    badgeEmoji: "🏖️",
    durationMinutes: 2,
    questions: [
      {
        id: "u7-q1",
        question: "'All-inclusive hotel' means:",
        options: ["Only breakfast is included", "Food, drinks, and room are all included in the price", "You must pay for every meal separately", "There are no rooms left"],
        correctIndex: 1,
        explanation: "'All-inclusive' = Her şey dahil konsept.",
        difficulty: "easy",
        timeLimitSec: 10
      },
      {
        id: "u7-q2",
        question: "A person who prefers historic places is interested in:",
        options: ["Ancient ruins and castles", "Modern shopping malls", "Water slides", "Nightclubs"],
        correctIndex: 0,
        explanation: "'Historic places' = Antik kalıntılar, kaleler ve müzeler.",
        difficulty: "easy",
        timeLimitSec: 10
      }
    ]
  },
  {
    id: "comp-u8",
    unitNumber: 8,
    unitTitle: "Chores (Ev İşleri)",
    badgeEmoji: "🧹",
    durationMinutes: 2,
    questions: [
      {
        id: "u8-q1",
        question: "Which chore means cleaning the floor with a vacuum cleaner?",
        options: ["Vacuuming", "Dusting", "Ironing", "Mopping"],
        correctIndex: 0,
        explanation: "'Vacuuming' = Elektrik süpürgesiyle süpürmek.",
        difficulty: "easy",
        timeLimitSec: 10
      },
      {
        id: "u8-q2",
        question: "It is our duty to __________ the table before dinner.",
        options: ["set / lay", "wash", "break", "iron"],
        correctIndex: 0,
        explanation: "'Set the table' = Sofrayı kurmak.",
        difficulty: "easy",
        timeLimitSec: 10
      }
    ]
  },
  {
    id: "comp-u9",
    unitNumber: 9,
    unitTitle: "Science (Bilim)",
    badgeEmoji: "🔬",
    durationMinutes: 2,
    questions: [
      {
        id: "u9-q1",
        question: "Scientists conduct experiments in a:",
        options: ["Kitchen", "Laboratory", "Library", "Stadium"],
        correctIndex: 1,
        explanation: "'Laboratory' (Laboratuvar) bilim insanlarının deney yaptığı yerdir.",
        difficulty: "easy",
        timeLimitSec: 10
      },
      {
        id: "u9-q2",
        question: "Thomas Edison __________ the electric light bulb.",
        options: ["invented", "discovered", "ate", "painted"],
        correctIndex: 0,
        explanation: "'Invent' = İcat etmek (Yeni bir alet yapmak).",
        difficulty: "medium",
        timeLimitSec: 10
      }
    ]
  },
  {
    id: "comp-u10",
    unitNumber: 10,
    unitTitle: "Natural Forces (Doğal Güçler)",
    badgeEmoji: "🌪️",
    durationMinutes: 2,
    questions: [
      {
        id: "u10-q1",
        question: "A massive shaking of the Earth's surface is an:",
        options: ["Earthquake", "Avalanche", "Drought", "Flood"],
        correctIndex: 0,
        explanation: "'Earthquake' = Deprem.",
        difficulty: "easy",
        timeLimitSec: 10
      },
      {
        id: "u10-q2",
        question: "A long period without rain that causes water shortage is a:",
        options: ["Drought", "Hurricane", "Tsunami", "Landslide"],
        correctIndex: 0,
        explanation: "'Drought' = Kuraklık.",
        difficulty: "easy",
        timeLimitSec: 10
      }
    ]
  }
];
