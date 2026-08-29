import { LgsPastQuestion } from "../types";

export const LGS_PAST_QUESTIONS: LgsPastQuestion[] = [
  // 2024 LGS QUESTIONS
  {
    id: "lgs-2024-q1",
    year: 2024,
    questionNumber: 1,
    unitNumber: 1,
    unitTitle: "Friendship",
    topic: "Invitations & Refusals (Davetiye ve Mazeret Bildirme)",
    questionPrompt: "According to the conversation, which of the following is CORRECT?",
    contextPassage: `Sarah: Hey Mark, we are going to a comedy film tonight. Would you like to join us?
Mark: I'd love to, but I have to finish my science project for tomorrow.
Sarah: Don't worry, we can hang out at the weekend then.
Mark: That sounds awesome! See you on Saturday.`,
    options: [
      { key: "A", text: "Mark accepts the invitation for tonight." },
      { key: "B", text: "Mark makes an excuse for not joining tonight." },
      { key: "C", text: "Sarah refuses to meet Mark at the weekend." },
      { key: "D", text: "They are going to do the science project together." }
    ],
    correctAnswer: "B",
    mebAnalysis: "Mark 'I have to finish my science project' diyerek bu akşam gelemeyeceği için mazeret bildirmektedir (makes an excuse). Dolayısıyla B şıkkı doğrudur.",
    strategyTactic: "LGS'de 'refusal with an excuse' (mazeretli ret) kalıpları her yıl kesin olarak sorulur. 'I'd love to, but...' ifadesinden sonra gelen cümle mazerettir.",
    distractorExplanation: {
      A: "Mark bu geceki teklifi kabul etmiyor, mazeret bildirerek reddediyor.",
      B: "Doğru seçenek: Mark bu gece gelemeyeceği için fen projesini mazeret olarak sunuyor.",
      C: "Sarah hafta sonu buluşmayı reddetmiyor, aksine kendisi öneriyor.",
      D: "Projeyi birlikte yapacaklarına dair hiçbir bilgi yoktur."
    },
    difficulty: "Temel"
  },
  {
    id: "lgs-2024-q2",
    year: 2024,
    questionNumber: 2,
    unitNumber: 3,
    unitTitle: "In the Kitchen",
    topic: "Cooking Steps & Process Connectors (Yemek Tarifi Sıralaması)",
    questionPrompt: "Which of the following completes the recipe in the correct order?",
    contextPassage: `How to Make Tomato Soup:
1. First, peel and chop five fresh tomatoes.
2. Next, melt two tablespoons of butter in a saucepan and add some flour.
3. Then, pour the chopped tomatoes and three glasses of water into the pot.
4. After that, boil the mixture for 15 minutes and stir constantly.
5. Finally, __________.`,
    options: [
      { key: "A", text: "chop the tomatoes into small pieces" },
      { key: "B", text: "serve it hot with some grated cheese on top" },
      { key: "C", text: "heat the oven to 200 degrees Celsius" },
      { key: "D", text: "wash the vegetables before peeling" }
    ],
    correctAnswer: "B",
    mebAnalysis: "Yemek tarifinin son adımı ('Finally') servis aşamasıdır. 'Serve it hot with some grated cheese on top' (Üzerine rendelenmiş peynirle sıcak servis yapın) en mantıklı son adımdır.",
    strategyTactic: "Sıralama adımlarında First (ilk), Next/Then/After that (ardından), Finally (son olarak / servis) bağlaçlarına dikkat edilir.",
    distractorExplanation: {
      A: "Domatesleri doğrama işlemi 1. adımda zaten yapılmıştır.",
      B: "Doğru seçenek: Çorba piştikten sonra sıcak servis yapılır.",
      C: "Tencerede çorba pişirirken fırını 200 dereceye ısıtmak anlamsızdır.",
      D: "Yıkama adımı en başta yapılır, sonda değil."
    },
    difficulty: "Temel"
  },
  {
    id: "lgs-2024-q3",
    year: 2024,
    questionNumber: 3,
    unitNumber: 4,
    unitTitle: "On the Phone",
    topic: "Phone Call Expressions (Sekreter ve Arama Diyalogları)",
    questionPrompt: "According to the dialogue, which sentence does the secretary say to David?",
    contextPassage: `Secretary: Bright Future School, good morning. How can I help you?
David: Hello, this is David Miller. May I speak to Mr. Peker, please?
Secretary: __________. Let me check if he is available in his office.
David: Sure, thank you.`,
    options: [
      { key: "A", text: "I'll call back later." },
      { key: "B", text: "He has gone out for lunch." },
      { key: "C", text: "Hold on a moment, please." },
      { key: "D", text: "You have dialed the wrong number." }
    ],
    correctAnswer: "C",
    mebAnalysis: "Sekreter 'Let me check if he is available' (Ofisinde müsait mi kontrol edeyim) dediğine göre karşıdaki kişiyi hatta bekletmektedir ('Hold on a moment, please').",
    strategyTactic: "'Hold on', 'Hang on', 'Wait a minute' kalıpları hatta bekleme durumunda kullanılır.",
    distractorExplanation: {
      A: "'I'll call back later' arayan kişi tarafından söylenir.",
      B: "Müsait olup olmadığını henüz kontrol etmeden 'Dışarı çıktı' denemez.",
      C: "Doğru seçenek: 'Lütfen hatta bekleyin, kontrol edeyim.'",
      D: "Numara yanlış olsaydı kontrol etmeye gerek kalmazdı."
    },
    difficulty: "Orta"
  },
  {
    id: "lgs-2024-q4",
    year: 2024,
    questionNumber: 4,
    unitNumber: 2,
    unitTitle: "Teen Life",
    topic: "Preferences and Daily Habits (Gençlerin Tercihleri ve Anket Yorumlama)",
    questionPrompt: "According to the survey results below, which of the following is NOT correct?",
    visualGraphic: {
      type: "chart",
      title: "100 Teens' Favorite Free Time Activities",
      items: [
        { label: "Listening to Rock Music", value: "45 teens" },
        { label: "Reading Books", value: "25 teens" },
        { label: "Playing Video Games", value: "20 teens" },
        { label: "Doing Outdoor Sports", value: "10 teens" }
      ]
    },
    options: [
      { key: "A", text: "Most of the teenagers prefer listening to rock music." },
      { key: "B", text: "Doing outdoor sports is the least popular activity among teens." },
      { key: "C", text: "Teens prefer playing video games to reading books." },
      { key: "D", text: "A quarter of the students enjoy reading books." }
    ],
    correctAnswer: "C",
    mebAnalysis: "Kitap okuyanlar (%25 / 25 kişi), video oyunu oynayanlardan (%20 / 20 kişi) daha fazladır. Dolayısıyla gençlerin video oyununu kitap okumaya tercih ettiği iddiası YANLIŞTIR.",
    strategyTactic: "Grafik sorularında 'prefer X to Y' kalıbına dikkat edin: X tercih edilen, Y tercih edilmeyendir. 'Quarter' = 1/4 (%25), 'half' = 1/2 (%50), 'most' = en çok, 'least' = en az.",
    distractorExplanation: {
      A: "Doğrudur, %45 ile en popüleridir.",
      B: "Doğrudur, %10 ile en az tercih edilendir.",
      C: "Yanlış (İstenen Doğru Cevap): Video oyunu (20) kitap okumaktan (25) daha azdır.",
      D: "Doğrudur, 25 kişi çeyreğe (quarter) eşittir."
    },
    difficulty: "LGS Ayarı (Seçici)"
  },
  {
    id: "lgs-2024-q5",
    year: 2024,
    questionNumber: 5,
    unitNumber: 5,
    unitTitle: "The Internet",
    topic: "Internet Safety Rules (İnternet Güvenlik Kuralları)",
    questionPrompt: "Which of the following people follows the internet safety rules?",
    contextPassage: `Tom: I share my home address and phone number with online friends.
Emma: I never open emails and attachments from strangers.
Jack: I use easy passwords like '123456' so I don't forget them.
Lily: I meet people in person that I met online without telling my parents.`,
    options: [
      { key: "A", text: "Tom" },
      { key: "B", text: "Emma" },
      { key: "C", text: "Jack" },
      { key: "D", text: "Lily" }
    ],
    correctAnswer: "B",
    mebAnalysis: "Emma tanımadığı kişilerden gelen e-postaları ve ekleri açmayarak güvenli internet kuralına uymaktadır. Diğerleri güvenlik açığı oluşturmaktadır.",
    strategyTactic: "İnternet ünitesinde 'Safe / Dangerous' (Güvenli / Tehlikeli) davranış ayrımları MEB'in vazgeçilmez soru tipidir.",
    distractorExplanation: {
      A: "Adres ve telefon paylaşmak tehlikelidir.",
      B: "Doğru seçenek: Emma yabancılardan gelen e-postaları açmayarak güvenliği sağlar.",
      C: "Kolay şifre kullanmak güvenlik kuralına aykırıdır.",
      D: "İnternette tanışılan biriyle ebeveyne söylemeden buluşmak tehlikelidir."
    },
    difficulty: "Temel"
  },

  // 2023 LGS QUESTIONS
  {
    id: "lgs-2023-q1",
    year: 2023,
    questionNumber: 1,
    unitNumber: 1,
    unitTitle: "Friendship",
    topic: "Personal Characteristics & Ideal Friend (İdeal Arkadaş Nitelikleri)",
    questionPrompt: "According to the speech bubbles, who thinks Kevin is an HONEST person?",
    contextPassage: `Lisa: Kevin always backs me up when I need help.
Brian: He never tells lies and keeps our secrets.
Amy: He shares his snacks and money with everyone.
Dave: He only thinks about himself and never changes his mind.`,
    options: [
      { key: "A", text: "Lisa" },
      { key: "B", text: "Brian" },
      { key: "C", text: "Amy" },
      { key: "D", text: "Dave" }
    ],
    correctAnswer: "B",
    mebAnalysis: "'Honest' (Dürüst) kişi asla yalan söylemez ('never tells lies'). Brian bunu ifade etmektedir.",
    strategyTactic: "Karakter sıfatları eşleştirmesi: Honest = tells the truth / never lies, Generous = shares, Supportive = backs up, Stubborn = never changes mind.",
    distractorExplanation: {
      A: "Lisa Kevin'in 'supportive' (destekleyici) olduğunu belirtiyor.",
      B: "Doğru seçenek: Brian Kevin'in 'honest' (dürüst) olduğunu söylüyor.",
      C: "Amy Kevin'in 'generous' (cömert) olduğunu söylüyor.",
      D: "Dave Kevin'in 'selfish & stubborn' olduğunu söylüyor."
    },
    difficulty: "Temel"
  },
  {
    id: "lgs-2023-q2",
    year: 2023,
    questionNumber: 2,
    unitNumber: 6,
    unitTitle: "Adventures",
    topic: "Extreme Sports Comparison (Ekstrem Spor Karşılaştırmaları)",
    questionPrompt: "Which of the following is CORRECT according to Arthur's statement?",
    contextPassage: `Arthur: "I love extreme sports that challenge my limits. To me, skydiving is more exciting and adrenaline-filled than rafting. Rafting is too easy and boring for me. Also, I would never try scuba diving because I am afraid of deep water."`,
    options: [
      { key: "A", text: "Arthur finds rafting more thrilling than skydiving." },
      { key: "B", text: "Arthur is interested in underwater activities." },
      { key: "C", text: "Arthur prefers skydiving to rafting." },
      { key: "D", text: "Arthur thinks rafting is dangerous and scary." }
    ],
    correctAnswer: "C",
    mebAnalysis: "Arthur 'Skydiving is more exciting than rafting' dediği için skydiving'i rafting'e tercih etmektedir ('prefers skydiving to rafting').",
    strategyTactic: "'More exciting than' = 'prefers X to Y'. Sıfat karşılaştırmalarında (comparatives) zıt anlamlara dikkat edin.",
    distractorExplanation: {
      A: "Rafting'i sıkıcı (boring) buluyor, daha heyecanlı değil.",
      B: "Derin sudan korktuğu için su altı etkinlikleriyle ilgilenmiyor.",
      C: "Doğru seçenek: Skydiving'i rafting'e tercih ediyor.",
      D: "Rafting'i tehlikeli değil, çok kolay ve sıkıcı buluyor."
    },
    difficulty: "Orta"
  },
  {
    id: "lgs-2023-q3",
    year: 2023,
    questionNumber: 3,
    unitNumber: 7,
    unitTitle: "Tourism",
    topic: "Tourist Preferences & Travel Plans (Turizm Tercihleri)",
    questionPrompt: "According to the brochure and Clara's preferences, which place should she visit?",
    contextPassage: `Clara is interested in ancient architecture, historic ruins, and museums. She doesn't like seaside holidays or modern skyscrapers.

Destinations:
1. Blue Coast: Sandy beaches, swimming, and water sports.
2. Pine Valley: Trekking in nature and camping by the lake.
3. Ancient Ephesus: 2000-year-old temples, amphitheater, and archaeological museum.
4. Neon City: Shopping malls, high-tech amusement parks, and modern towers.`,
    options: [
      { key: "A", text: "Blue Coast" },
      { key: "B", text: "Pine Valley" },
      { key: "C", text: "Ancient Ephesus" },
      { key: "D", text: "Neon City" }
    ],
    correctAnswer: "C",
    mebAnalysis: "Clara antik mimari, tarihi kalıntılar ve müzelerle ilgilendiği için 'Ancient Ephesus' (Efes Antik Kenti) onun için en uygun yerdir.",
    strategyTactic: "Turizm sorularında 'Historic site / ancient / museum' anahtar kelimeleri doğrudan antik kent ve arkeolojik mekanlarla eşleşir.",
    distractorExplanation: {
      A: "Deniz kenarı tatillerini sevmiyor.",
      B: "Doğa yürüyüşü ve kamp tarihi ilgi alanıyla uyuşmuyor.",
      C: "Doğru seçenek: Tarihi kalıntılar ve müze içeren Efes.",
      D: "Modern gökdelenleri sevmiyor."
    },
    difficulty: "Temel"
  },
  {
    id: "lgs-2023-q4",
    year: 2023,
    questionNumber: 4,
    unitNumber: 8,
    unitTitle: "Chores",
    topic: "Household Responsibilities & Sharing Tasks (Ev İçi Sorumluluklar)",
    questionPrompt: "Who is responsible for an OUTDOOR chore?",
    contextPassage: `Mother: Here is our weekend chore distribution:
• Kevin: Washing the dishes and taking out the trash.
• Sandra: Dusting the furniture and vacuuming the living room floor.
• Tim: Mowing the lawn in the garden and washing the family car.
• Laura: Making the beds and ironing the clothes.`,
    options: [
      { key: "A", text: "Sandra" },
      { key: "B", text: "Tim" },
      { key: "C", text: "Laura" },
      { key: "D", text: "Mother" }
    ],
    correctAnswer: "B",
    mebAnalysis: "'Outdoor chore' (Dış mekan görevi) bahçedeki çimleri biçmek ('mowing the lawn in the garden') ve araba yıkamaktır. Bu görev Tim'e aittir.",
    strategyTactic: "Indoor (ev içi: vacuum, dust, iron, make bed) vs Outdoor (ev dışı: mow the lawn, wash car, water flowers) sınıflandırmasını unutmayın.",
    distractorExplanation: {
      A: "Sandra evin içindeki mobilyaların tozunu alıp süpürüyor (indoor).",
      B: "Doğru seçenek: Tim bahçede çim biçip araba yıkıyor (outdoor).",
      C: "Laura yatakları toplayıp ütü yapıyor (indoor).",
      D: "Anne görev dağıtıcısıdır."
    },
    difficulty: "Orta"
  },

  // 2022 LGS QUESTIONS
  {
    id: "lgs-2022-q1",
    year: 2022,
    questionNumber: 1,
    unitNumber: 9,
    unitTitle: "Science",
    topic: "Scientific Inventions & Discoveries (Bilimsel Buluşlar)",
    questionPrompt: "Which of the following questions DOES NOT have an answer in the text?",
    contextPassage: `Marie Curie was born in Poland in 1867. She was a world-famous physicist and chemist. She discovered two radioactive elements: polonium and radium. She conducted numerous experiments in her laboratory and won two Nobel Prizes for her scientific achievements. She died in France in 1934.`,
    options: [
      { key: "A", text: "When and where was Marie Curie born?" },
      { key: "B", text: "What elements did she discover?" },
      { key: "C", text: "How many Nobel Prizes did she win?" },
      { key: "D", text: "Which university did she study at?" }
    ],
    correctAnswer: "D",
    mebAnalysis: "Metinde Marie Curie'nin hangi üniversitede okuduğuna ('Which university did she study at?') dair hiçbir bilgi bulunmamaktadır.",
    strategyTactic: "'Which question does NOT have an answer' soru kökünde her şıkkın metindeki karşılığını çizerek bulun. Karşılığı olmayan şık doğru cevaptır.",
    distractorExplanation: {
      A: "Cevabı var: 1867'de Polonya'da doğdu.",
      B: "Cevabı var: Polonyum ve radyum elementlerini keşfetti.",
      C: "Cevabı var: İki Nobel ödülü kazandı.",
      D: "Doğru seçenek: Hangi üniversitede okuduğunun cevabı metinde YOKTUR."
    },
    difficulty: "Orta"
  },
  {
    id: "lgs-2022-q2",
    year: 2022,
    questionNumber: 2,
    unitNumber: 10,
    unitTitle: "Natural Forces",
    topic: "Disaster Precautions & Global Threats (Doğal Afetler ve Alınacak Önlemler)",
    questionPrompt: "According to the poster, which of the following is a solution for SAVING WATER?",
    visualGraphic: {
      type: "poster",
      title: "PREVENT DROUGHT & PROTECT OUR PLANET",
      items: [
        { label: "Tip 1", value: "Turn off the tap while brushing your teeth." },
        { label: "Tip 2", value: "Plant more trees to prevent soil erosion." },
        { label: "Tip 3", value: "Use public transportation to reduce carbon footprint." },
        { label: "Tip 4", value: "Do not throw plastic waste into the oceans." }
      ]
    },
    options: [
      { key: "A", text: "Turning off the tap when brushing teeth" },
      { key: "B", text: "Using public transportation" },
      { key: "C", text: "Planting green trees" },
      { key: "D", text: "Recycling plastic containers" }
    ],
    correctAnswer: "A",
    mebAnalysis: "Su tasarrufu sağlamak için verilen öneri 'Turn off the tap while brushing your teeth' (Diş fırçalarken musluğu kapatmak) maddesidir.",
    strategyTactic: "'Save water / Prevent drought / Turn off tap' ifadeleri su tasarrufuyla doğrudan ilişkilidir.",
    distractorExplanation: {
      A: "Doğru seçenek: Diş fırçalarken musluğu kapatmak su tasarrufudur.",
      B: "Toplu taşıma hava kirliliği ve karbon salınımı ile ilgilidir.",
      C: "Ağaç dikmek erozyonla mücadeledir.",
      D: "Geri dönüşüm çevre kirliliğiyle ilgilidir."
    },
    difficulty: "Temel"
  }
];

export const LGS_UNIT_NAMES: Record<number, string> = {
  1: "Unit 1: Friendship",
  2: "Unit 2: Teen Life",
  3: "Unit 3: In the Kitchen",
  4: "Unit 4: On the Phone",
  5: "Unit 5: The Internet",
  6: "Unit 6: Adventures",
  7: "Unit 7: Tourism",
  8: "Unit 8: Chores",
  9: "Unit 9: Science",
  10: "Unit 10: Natural Forces",
};
