import { LGSUnit } from "../types";

export const LGS_UNITS: LGSUnit[] = [
  {
    unitNumber: 1,
    id: "unit-1-friendship",
    title: "Friendship",
    turkishTitle: "Arkadaşlık",
    iconName: "Users",
    color: "from-blue-500 to-indigo-600",
    themeOverview: "Accepting and refusing invitations, giving reasons/excuses, personal qualities of true friends, making offers.",
    learningOutcomes: [
      "E8.1.L1. Students will be able to understand the main ideas in short, simple invitations and offers.",
      "E8.1.S1. Students will be able to make offers, accept or refuse invitations and give reasons.",
      "E8.1.R1. Students will be able to understand short and simple invitation letters, emails, and notes."
    ],
    targetVocabulary: [
      {
        id: "f-1",
        word: "Back up",
        partOfSpeech: "Phrasal Verb",
        turkishMeaning: "Desteklemek, arka çıkmak",
        definition: "To support or help someone, especially in a difficult situation.",
        exampleSentence: "A true friend always backs you up when you have a problem.",
        synonyms: ["Support", "Help", "Stand by"],
        antonyms: ["Abandon", "Let down"],
        lgsFrequency: "Crucial"
      },
      {
        id: "f-2",
        word: "Count on / Rely on",
        partOfSpeech: "Phrasal Verb",
        turkishMeaning: "Güvenmek, bel bağlamak",
        definition: "To trust someone to do what they promise or what you expect.",
        exampleSentence: "I can always count on Jane because she never shares my secrets.",
        synonyms: ["Trust", "Depend on"],
        antonyms: ["Distrust"],
        lgsFrequency: "Crucial"
      },
      {
        id: "f-3",
        word: "Get on well with",
        partOfSpeech: "Phrasal Verb",
        turkishMeaning: "Biriyle iyi geçinmek",
        definition: "To have a friendly and harmonious relationship with someone.",
        exampleSentence: "Tim and Arthur get on well with each other because they have common interests.",
        synonyms: ["Have a good relationship"],
        antonyms: ["Argue", "Fall out with"],
        lgsFrequency: "Crucial"
      },
      {
        id: "f-4",
        word: "Honest",
        partOfSpeech: "Adjective",
        turkishMeaning: "Dürüst, doğru sözlü",
        definition: "Telling the truth and not lying or cheating.",
        exampleSentence: "An honest buddy never tells lies to his friends.",
        synonyms: ["Truthful", "Sincere"],
        antonyms: ["Dishonest", "Sneaky"],
        lgsFrequency: "High"
      },
      {
        id: "f-5",
        word: "Generous",
        partOfSpeech: "Adjective",
        turkishMeaning: "Cömert",
        definition: "Willing to give money, help, or kindness freely.",
        exampleSentence: "Mark is very generous; he always shares his snacks with classmates.",
        synonyms: ["Unselfish", "Giving"],
        antonyms: ["Mean", "Stingy"],
        lgsFrequency: "High"
      },
      {
        id: "f-6",
        word: "Stubborn",
        partOfSpeech: "Adjective",
        turkishMeaning: "İnatçı",
        definition: "Determined not to change your attitude or opinion on something.",
        exampleSentence: "He is so stubborn that he never changes his mind even if he is wrong.",
        synonyms: ["Obstinate"],
        antonyms: ["Flexible", "Easygoing"],
        lgsFrequency: "High"
      },
      {
        id: "f-7",
        word: "Have things in common",
        partOfSpeech: "Phrase",
        turkishMeaning: "Ortak noktalara/ilgilere sahip olmak",
        definition: "To share similar interests, attitudes, or characteristics.",
        exampleSentence: "We are best buddies because we have lots of things in common.",
        synonyms: ["Share interests"],
        antonyms: ["Have nothing in common"],
        lgsFrequency: "Crucial"
      },
      {
        id: "f-8",
        word: "Refuse / Turn down",
        partOfSpeech: "Verb",
        turkishMeaning: "Reddetmek, geri çevirmek",
        definition: "To say no to an invitation, offer, or request.",
        exampleSentence: "Sally refused the slumber party invitation because she was ill.",
        synonyms: ["Reject", "Decline"],
        antonyms: ["Accept", "Agree"],
        lgsFrequency: "Crucial"
      },
      {
        id: "f-9",
        word: "Excuse",
        partOfSpeech: "Noun",
        turkishMeaning: "Mazeret, bahane, gerekçe",
        definition: "A reason given to explain why you cannot do something or why a mistake happened.",
        exampleSentence: "She didn't give any excuse for not attending my birthday bash.",
        synonyms: ["Reason", "Explanation"],
        lgsFrequency: "Crucial"
      },
      {
        id: "f-10",
        word: "Slumber party / Pyjama party",
        partOfSpeech: "Noun",
        turkishMeaning: "Pijama partisi",
        definition: "A party where a group of young friends stays overnight at one friend's house.",
        exampleSentence: "Are you coming to my slumber party this Friday night?",
        lgsFrequency: "Core"
      }
    ],
    grammarStructures: [
      {
        id: "g-1",
        title: "Making Offers & Invitations",
        turkishTitle: "Teklif ve Davet Kalıpları",
        explanation: "In English, we use different question structures to invite friends to activities.",
        formula: "Would you like to + V1...? / How about / What about + V_ing / Noun? / Why don't we + V1...? / Shall we + V1...?",
        examples: [
          { english: "Would you like to come over for dinner tonight?", turkish: "Bu akşam yemeğe bize gelmek ister misin?" },
          { english: "How about going to the cinema on Sunday?", turkish: "Pazar günü sinemaya gitmeye ne dersin?" },
          { english: "Why don't we organize a barbecue party?", turkish: "Neden bir barbekü partisi düzenlemiyoruz?" }
        ],
        lgsTrapTip: "'How about' ve 'What about' yapılarından sonra fiil -ING alır (How about watchING?). 'Would you like' ve 'Why don't we' sonrasında ise yalın fiil (V1) gelir."
      },
      {
        id: "g-2",
        title: "Accepting, Refusing & Giving Reasons",
        turkishTitle: "Kabul Etme, Reddetme ve Mazeret Bildirme",
        explanation: "Recognizing whether a person accepts or refuses with an excuse is one of the most tested LGS patterns.",
        formula: "Accepting: 'I'd love to', 'Sounds great', 'Sure/Why not'. Refusing + Reason: 'I'd love to, but I'm busy', 'I'm afraid I can't because...'",
        examples: [
          { english: "I'd love to, but my grandparents are visiting us.", turkish: "Çok isterdim ama büyükanne ve büyükbabam bizi ziyarete geliyor." },
          { english: "Awesome! What time does the match start?", turkish: "Harika! Maç saat kaçta başlıyor?" }
        ],
        lgsTrapTip: "LGS'de soru kökü 'Who refuses the invitation by giving a reason?' şeklindeyse sadece 'No, thanks' diyen değil, 'I must study for the exam' gibi SEBEP bildiren seçilmelidir!"
      }
    ],
    keyPhrases: [
      {
        category: "Accepting Invitations",
        phrases: [
          { english: "Yeah, that would be great!", turkish: "Evet, harika olur!" },
          { english: "Sure, sounds fun / awesome.", turkish: "Tabii ki, kulağa eğlenceli geliyor." },
          { english: "I can't refuse this offer.", turkish: "Bu teklifi geri çeviremem." }
        ]
      },
      {
        category: "Refusing Politely with an Excuse",
        phrases: [
          { english: "I'm sorry, but I have another plan.", turkish: "Üzgünüm ama başka bir planım var." },
          { english: "I'd love to, but I have to finish my project.", turkish: "Çok isterdim ama projemi bitirmek zorundayım." },
          { english: "I can't make it. I feel exhausted.", turkish: "Gelemiyorum / Yetişemem. Çok yorgun hissediyorum." }
        ]
      }
    ],
    lgsStrategyTips: [
      "Davetiye kartı (Invitation card) sorularında Sender (Gönderen), Receiver/Invitee (Davetli), Event/Occasion (Etkinlik türü), Date & Time (Tarih ve Saat), Location/Place (Mekan) ve Deadline/RSVP (Son katılım tarihi) bilgilerini kartın üzerinde hemen işaretleyin.",
      "'Back up', 'count on', 'get on well' ve 'share common interests' kelimeleri iyi arkadaş özelliklerinin kilit ifadeleridir.",
      "Kişilik sıfatları tablosunda (honest, generous, supportive vs. selfish, arrogant, aggressive) eşleştirmelere dikkat edin."
    ],
    speakingPrompts: [
      "Talk about your best friend. Why is he/she special to you?",
      "Imagine your friend invites you to a rock concert, but you dislike rock music. Politely refuse and make an alternative offer."
    ],
    sampleQuestions: [
      {
        id: "q-u1-1",
        unitNumber: 1,
        type: "Invitation/Card",
        contextTitle: "Class Reunion Invitation Card",
        contextBody: "Dear Classmates,\nWe are organizing our 5th annual class reunion! It will be a wonderful chance to see all old friends and talk about sweet memories.\n\nDate: Saturday, October 14th\nTime: 2:00 PM - 6:00 PM\nPlace: Sunrise Cafe, Green Street\nTicket Price: $15 per person (Food and drinks included)\n\nP.S. Please inform Mr. Anderson until October 10th if you can join us.\nContact: 555-0192 / reunion@classof2020.com",
        visualType: "card",
        questionStem: "According to the invitation card above, which of the following information DOES NOT have an answer?",
        options: {
          A: "What is the deadline for responding to the invitation?",
          B: "How much does each person pay to attend the event?",
          C: "What kinds of games and activities will they play at the party?",
          D: "Where and when is the reunion going to take place?"
        },
        correctAnswer: "C",
        explanationTurkish: "Davetiyede etkinlik tarihi ve yeri (D), bilet fiyatı 15$ (B) ve son yanıt tarihi 10 Ekim (A) belirtilmiştir. Ancak partide hangi oyunların oynanacağıyla (C) ilgili hiçbir bilgi yoktur.",
        keyVocabulary: ["deadline", "inform", "reunion", "attend", "per person"],
        kazanim: "E8.1.R1"
      },
      {
        id: "q-u1-2",
        unitNumber: 1,
        type: "Dialogue",
        contextTitle: "Friends' Chat",
        contextBody: "Alex: We are having a picnic by the lake this Sunday. Would you like to join us?\nBrian: I'd love to, but I have to help my dad paint the garage.\nClara: That sounds awesome! Shall I bring some homemade cookies?\nDavid: No, thanks. I hate outdoor activities.\nElena: Why not? What time are you meeting?",
        visualType: "dialogue",
        questionStem: "According to the conversation, who REFUSES the invitation by GIVING AN EXCUSE?",
        options: {
          A: "Brian",
          B: "Clara",
          C: "David",
          D: "Elena"
        },
        correctAnswer: "A",
        explanationTurkish: "Clara ve Elena teklifi kabul etmiştir. David reddetmiştir fakat gerekçe belirtmeden sevmediğini söylemiştir. Brian ise 'babasının garajı boyamasına yardım etmek zorunda olduğu' mazeretini (excuse) sunarak reddetmiştir.",
        keyVocabulary: ["refuse", "excuse", "accept", "join"],
        kazanim: "E8.1.S1"
      }
    ]
  },
  {
    unitNumber: 2,
    id: "unit-2-teen-life",
    title: "Teen Life",
    turkishTitle: "Gençlik Yaşamı",
    iconName: "Headphones",
    color: "from-amber-500 to-orange-600",
    themeOverview: "Daily routines, music and book preferences, regular activities, expressing likes and dislikes with prefer/would rather.",
    learningOutcomes: [
      "E8.2.L1. Students will be able to understand phrases and expressions related to regular teen activities.",
      "E8.2.S1. Students will be able to express what they prefer doing in their daily life.",
      "E8.2.R1. Students will be able to read and understand charts and surveys about teen preferences."
    ],
    targetVocabulary: [
      {
        id: "t-1",
        word: "Fond of / Keen on",
        partOfSpeech: "Adjective phrase",
        turkishMeaning: "Bir şeye düşkün olmak, çok sevmek",
        definition: "Having a strong liking or affection for something.",
        exampleSentence: "Most teens are fond of listening to hip-hop music nowadays.",
        synonyms: ["Crazy about", "Into", "Like"],
        antonyms: ["Dislike", "Can't stand"],
        lgsFrequency: "Crucial"
      },
      {
        id: "t-2",
        word: "Can't stand / Bear",
        partOfSpeech: "Phrase",
        turkishMeaning: "Hiç katlanamamak, tahammül edememek",
        definition: "To strongly dislike or hate something/someone.",
        exampleSentence: "I can't stand loud heavy metal music; it gives me a headache.",
        synonyms: ["Detest", "Hate"],
        antonyms: ["Love", "Adore"],
        lgsFrequency: "Crucial"
      },
      {
        id: "t-3",
        word: "Unbearable / Ridiculous",
        partOfSpeech: "Adjective",
        turkishMeaning: "Dayanılmaz, katlanılmaz / Gülünç",
        definition: "Too unpleasant, painful, or difficult to accept.",
        exampleSentence: "Listening to opera music is unbearable for Kevin.",
        synonyms: ["Intolerable"],
        antonyms: ["Pleasant", "Enjoyable"],
        lgsFrequency: "High"
      },
      {
        id: "t-4",
        word: "Trendy / In fashion",
        partOfSpeech: "Adjective",
        turkishMeaning: "Modaya uygun, popüler, trend",
        definition: "Very fashionable, modern and up to date.",
        exampleSentence: "She likes buying trendy clothes and following fashion blogs.",
        synonyms: ["Fashionable", "Popular"],
        antonyms: ["Old-fashioned", "Outdated"],
        lgsFrequency: "High"
      },
      {
        id: "t-5",
        word: "Regularly / Daily routine",
        partOfSpeech: "Adverb / Noun",
        turkishMeaning: "Düzenli olarak / Günlük rutin",
        definition: "Happening at fixed times or intervals.",
        exampleSentence: "He does physical exercises regularly every morning before school.",
        synonyms: ["Routinely", "Periodically"],
        antonyms: ["Rarely", "Seldom"],
        lgsFrequency: "High"
      }
    ],
    grammarStructures: [
      {
        id: "g-t1",
        title: "Expressing Preferences: PREFER",
        turkishTitle: "Tercih Bildirme: PREFER Kalıbı",
        explanation: "We use 'prefer' to express general likes/dislikes between two options.",
        formula: "Subject + PREFER(S) + Noun / V_ing + TO + Noun / V_ing",
        examples: [
          { english: "I prefer pop music to classical music.", turkish: "Pop müziği klasik müziğe tercih ederim." },
          { english: "She prefers reading sci-fi books to watching movies.", turkish: "Bilimkurgu kitabı okumayı film izlemeye tercih eder." }
        ],
        lgsTrapTip: "PREFER cümlesinde iki seçenek arasına mutlaka 'TO' gelir (THAN gelmez!). İlk söylenen şey TERCİH EDİLEN, TO'dan sonraki ise TERCİH EDİLMEYENDİR."
      }
    ],
    keyPhrases: [
      {
        category: "Expressing Likes and Dislikes",
        phrases: [
          { english: "I'm crazy about playing tennis.", turkish: "Tenis oynamaya bayılırım." },
          { english: "It sounds harmonic / impressive to me.", turkish: "Kulağıma ahenkli / etkileyici geliyor." },
          { english: "To be honest, it is too boring.", turkish: "Dürüst olmak gerekirse çok sıkıcı." }
        ]
      }
    ],
    lgsStrategyTips: [
      "Gençlerin ilgi alanları anketlerinde (Survey / Graphic questions) pasta veya sütun grafiklerindeki yüzdelere (percentages) dikkat edin: 'Most of them', 'Half of the teens', 'Nearly 30%', 'None of them', 'Fewest students'.",
      "Müzik ve kitap türleri eşleştirmelerine dikkat edin (sci-fi, fantasy, detective, travel, classical, rap)."
    ],
    speakingPrompts: [
      "Describe your typical Saturday routine from morning to evening.",
      "What type of music do you prefer listening to and why?"
    ],
    sampleQuestions: [
      {
        id: "q-u2-1",
        unitNumber: 2,
        type: "Table/Graphic",
        contextTitle: "Music Preferences Survey of 100 8th Graders",
        contextBody: "A school counselor conducted a survey about music preferences among 100 teenagers:\n- Pop Music: 45 students\n- Rock Music: 25 students\n- Rap / Hip-Hop: 20 students\n- Classical Music: 10 students",
        visualType: "pie",
        chartData: [
          { label: "Pop", value: 45 },
          { label: "Rock", value: 25 },
          { label: "Rap", value: 20 },
          { label: "Classical", value: 10 }
        ],
        questionStem: "Which of the following statements is CORRECT according to the survey results above?",
        options: {
          A: "Classical music is the most popular music genre among teenagers.",
          B: "Nearly half of the students prefer listening to pop music.",
          C: "Teens listen to rap music more than rock music.",
          D: "None of the students are fond of rock music."
        },
        correctAnswer: "B",
        explanationTurkish: "100 öğrenciden 45'i pop müzik seçmiştir, bu da neredeyse yarısıdır (nearly half). Diğer seçenekler grafik verileriyle çelişmektedir.",
        keyVocabulary: ["nearly half", "survey", "prefer", "most popular"],
        kazanim: "E8.2.R1"
      }
    ]
  },
  {
    unitNumber: 3,
    id: "unit-3-in-the-kitchen",
    title: "In the Kitchen",
    turkishTitle: "Mutfakta",
    iconName: "Utensils",
    color: "from-emerald-500 to-teal-600",
    themeOverview: "Cooking methods, kitchen utensils, ingredients, step-by-step recipes, transition sequencing words (First, Second, Next, Then, After that, Finally).",
    learningOutcomes: [
      "E8.3.L1. Students will be able to understand the steps of a simple recipe.",
      "E8.3.S1. Students will be able to describe cooking processes and ingredients.",
      "E8.3.R1. Students will be able to understand recipes, cooking charts, and kitchen instructions."
    ],
    targetVocabulary: [
      {
        id: "k-1",
        word: "Chop / Dice / Slice",
        partOfSpeech: "Verb",
        turkishMeaning: "Doğramak / Küp küp doğramak / Dilimlemek",
        definition: "To cut food into pieces or thin slices.",
        exampleSentence: "First, chop the onions and slice two red tomatoes.",
        lgsFrequency: "Crucial"
      },
      {
        id: "k-2",
        word: "Boil / Bake / Roast / Grill / Fry",
        partOfSpeech: "Verb",
        turkishMeaning: "Kaynatmak / Fırında pişirmek / Fırında kızartmak (et vb.) / Izgara yapmak / Yağda kızartmak",
        definition: "Different culinary methods of cooking food.",
        exampleSentence: "Steaming or boiling vegetables is much healthier than frying them in oil.",
        lgsFrequency: "Crucial"
      },
      {
        id: "k-3",
        word: "Drain / Squeeze / Knead",
        partOfSpeech: "Verb",
        turkishMeaning: "Süzmek (makarna vb.) / Sıkmak (limon vb.) / Yoğurmak (hamur)",
        definition: "Specific preparation actions in cooking.",
        exampleSentence: "Knead the dough for five minutes and then let it rest.",
        lgsFrequency: "High"
      },
      {
        id: "k-4",
        word: "Sprinkle / Pour / Stir",
        partOfSpeech: "Verb",
        turkishMeaning: "Serpmek (tuz/baharat) / Dökmek (sıvı) / Karıştırmak (kaşıkla)",
        definition: "Adding seasonings or liquids into food.",
        exampleSentence: "Finally, sprinkle some black pepper over the soup and stir gently.",
        lgsFrequency: "Crucial"
      },
      {
        id: "k-5",
        word: "Ingredients / Utensils",
        partOfSpeech: "Noun",
        turkishMeaning: "Malzemeler / Mutfak alet ve gereçleri",
        definition: "Food items used in a recipe / Tools used for cooking.",
        exampleSentence: "Make sure you have all the necessary ingredients and utensils before starting to cook.",
        lgsFrequency: "Crucial"
      }
    ],
    grammarStructures: [
      {
        id: "g-k1",
        title: "Sequencing Words in Process Descriptions",
        turkishTitle: "Süreç ve Tarif Sıralama İfadeleri",
        explanation: "We use sequence markers to explain steps in a chronological order.",
        formula: "First, ... / Second, ... / Next, ... / Then, ... / After that, ... / Finally, ...",
        examples: [
          { english: "First, peel the potatoes. Next, slice them into thin pieces.", turkish: "İlk olarak patatesleri soyun. Ardından ince parçalar halinde dilimleyin." },
          { english: "Finally, serve it warm with fresh salad.", turkish: "Son olarak taze salata ile ılık servis edin." }
        ],
        lgsTrapTip: "LGS'de 'What is the step BEFORE frying the chicken?' veya 'Which tool is needed AFTER peeling?' sorularında 'BEFORE' (önceki adım) ve 'AFTER' (sonraki adım) sıralamasına çok dikkat edilmelidir!"
      }
    ],
    keyPhrases: [
      {
        category: "Recipe and Taste Descriptors",
        phrases: [
          { english: "Bon appétit! / Enjoy your meal!", turkish: "Afiyet olsun!" },
          { english: "It is delicious, crispy, and spicy.", turkish: "Lezzetli, çıtır çıtır ve baharatlı." },
          { english: "Serve it hot with some melted butter.", turkish: "Eritilmiş tereyağı ile sıcak servis yapın." }
        ]
      }
    ],
    lgsStrategyTips: [
      "Tarif sorularında görsel mutfak aletleri (grater/rende, baking tray/fırın tepsisi, strainer/süzgeç, saucepan/tencere, frying pan/tava, whisk/çırpıcı) çok sık sorulur.",
      "Cümlenin 'before' mu 'after' mı sorduğunu mutlaka altını çizerek kontrol edin."
    ],
    speakingPrompts: [
      "Explain your favorite breakfast dish and the steps to prepare it.",
      "Why is home-cooked food considered healthier than fast food?"
    ],
    sampleQuestions: [
      {
        id: "q-u3-1",
        unitNumber: 3,
        type: "Recipe/Steps",
        contextTitle: "How to Make Delicious Homemade Lemonade",
        contextBody: "Step 1: Wash four large fresh lemons and two oranges thoroughly.\nStep 2: Squeeze the juice of all lemons and oranges into a big glass bowl.\nStep 3: Add one cup of sugar and four cups of cold water into the bowl.\nStep 4: Stir the mixture well with a wooden spoon until the sugar dissolves completely.\nStep 5: Put some fresh mint leaves and ice cubes into the pitcher before serving.",
        visualType: "text",
        questionStem: "Which of the following kitchen tools DO YOU NOT NEED to prepare this lemonade?",
        options: {
          A: "A juicer / squeezer",
          B: "A baking tray",
          C: "A wooden spoon",
          D: "A glass bowl or pitcher"
        },
        correctAnswer: "B",
        explanationTurkish: "Limonata yapımında sıkacak (A), tahta kaşık (C) ve sürahi/kase (D) kullanılır; fırın tepsisine (B - baking tray) kesinlikle ihtiyaç yoktur.",
        keyVocabulary: ["squeeze", "dissolve", "stir", "pitcher"],
        kazanim: "E8.3.R1"
      }
    ]
  },
  {
    unitNumber: 4,
    id: "unit-4-on-the-phone",
    title: "On the Phone",
    turkishTitle: "Telefonda",
    iconName: "PhoneCall",
    color: "from-sky-500 to-blue-600",
    themeOverview: "Communication methods, making phone calls, taking/leaving messages, booking tickets, call center dialogues, polite telephone expressions.",
    learningOutcomes: [
      "E8.4.L1. Students will be able to understand phone conversations, flight bookings, and customer service calls.",
      "E8.4.S1. Students will be able to handle phone conversations politely and take/leave messages.",
      "E8.4.R1. Students will be able to read and understand phone notes, memos, and flight tickets."
    ],
    targetVocabulary: [
      {
        id: "p-1",
        word: "Hold on / Hang on",
        partOfSpeech: "Phrasal Verb",
        turkishMeaning: "Hatta beklemek",
        definition: "To wait for a short time on the phone.",
        exampleSentence: "Hold on a minute, please. I will put you through to Mr. Miller.",
        synonyms: ["Wait"],
        lgsFrequency: "Crucial"
      },
      {
        id: "p-2",
        word: "Put through / Connect",
        partOfSpeech: "Phrasal Verb",
        turkishMeaning: "Telefonda birini başkasına bağlamak",
        definition: "To connect a person by telephone to the person they want to speak to.",
        exampleSentence: "Could you please put me through to the customer service department?",
        synonyms: ["Connect"],
        lgsFrequency: "Crucial"
      },
      {
        id: "p-3",
        word: "Engaged / Busy line",
        partOfSpeech: "Adjective",
        turkishMeaning: "Meşgul hat",
        definition: "A phone line being used by someone else at that moment.",
        exampleSentence: "The line is engaged right now. Would you like to leave a message?",
        synonyms: ["Occupied"],
        antonyms: ["Available", "Free"],
        lgsFrequency: "Crucial"
      },
      {
        id: "p-4",
        word: "Hang up",
        partOfSpeech: "Phrasal Verb",
        turkishMeaning: "Telefonu kapatmak",
        definition: "To end a telephone conversation by putting down the receiver.",
        exampleSentence: "Don't hang up the phone yet; I have one more question.",
        synonyms: ["End call"],
        antonyms: ["Pick up", "Answer"],
        lgsFrequency: "Crucial"
      },
      {
        id: "p-5",
        word: "Available",
        partOfSpeech: "Adjective",
        turkishMeaning: "Müsait, uygun, ulaşılabilir",
        definition: "Free to talk, meet, or do something.",
        exampleSentence: "I am sorry, the manager is not available at the moment; he is in a conference.",
        synonyms: ["Free", "Accessible"],
        antonyms: ["Unavailable", "Busy"],
        lgsFrequency: "High"
      }
    ],
    grammarStructures: [
      {
        id: "g-p1",
        title: "Telephone Expressions & Modals (May I, Could I, Would you)",
        turkishTitle: "Telefon Kalıpları ve Nezaket İfadeleri",
        explanation: "Polite inquiries and requests in phone conversations.",
        formula: "May I speak to ...? / Could you please tell him that ...? / Would you like to leave a message?",
        examples: [
          { english: "May I speak to Mrs. Watson, please?", turkish: "Bayan Watson ile görüşebilir miyim lütfen?" },
          { english: "Could you tell him to call me back as soon as possible?", turkish: "Mümkün olan en kısa sürede beni geri aramasını söyler misiniz?" }
        ],
        lgsTrapTip: "Telefonda 'Ben Ali' demek için 'I am Ali' denmez; 'This is Ali calling' veya 'It is Ali speaking' kullanılır. Karşıdakine 'Sen kimsin?' demek için ise 'Who is calling / speaking?' denir."
      }
    ],
    keyPhrases: [
      {
        category: "Phone Conversation Essentials",
        phrases: [
          { english: "Could you speak louder, please? It's a bad line.", turkish: "Daha yüksek sesle konuşabilir misiniz? Hat çok kötü." },
          { english: "I will get back to you soon.", turkish: "Size yakında geri döneceğim." },
          { english: "Can I take your name and number?", turkish: "Adınızı ve numaranızı alabilir miyim?" }
        ]
      }
    ],
    lgsStrategyTips: [
      "Müşteri hizmetleri ve rezervasyon (Call Center / Booking) diyaloglarında 'Departure' (Kalkış), 'Destination' (Varış yeri), 'Round-trip' (Gidiş-dönüş), 'One-way' (Tek yön) ve 'Confirm' (Onaylamak) terimlerini iyi bilin.",
      "Sekreter ve arayan kişi (Caller) arasındaki mesaj bırakma kalıplarına dikkat edin."
    ],
    speakingPrompts: [
      "Role-play: Call a clinic to book a dentist appointment for tomorrow afternoon.",
      "Call a friend's house, speak to their mother, and leave an important message."
    ],
    sampleQuestions: [
      {
        id: "q-u4-1",
        unitNumber: 4,
        type: "Dialogue",
        contextTitle: "Secretary & Caller Conversation",
        contextBody: "Secretary: Tech Solutions, good morning. How may I help you?\nCustomer: Hello, could you put me through to Mr. Clark, please?\nSecretary: Hold on a second, please... I'm afraid his line is engaged at the moment. ____________________?\nCustomer: Yes, please. Could you ask him to call me back regarding the new order? My name is Robert Brown.",
        visualType: "dialogue",
        questionStem: "Which of the following completes the blank in the conversation BEST?",
        options: {
          A: "Would you like to leave a message",
          B: "Why don't you hang up the phone",
          C: "Who is speaking right now",
          D: "Can you call him back yesterday"
        },
        correctAnswer: "A",
        explanationTurkish: "Sekreter hattın meşgul olduğunu söylemiş ve müşteri de 'Yes, please. Could you ask him to call me back...' diyerek mesaj iletmiştir. Dolayısıyla sekreterin 'Mesaj bırakmak ister misiniz?' (Would you like to leave a message?) diye sorması gerekir.",
        keyVocabulary: ["put through", "engaged", "leave a message", "call back"],
        kazanim: "E8.4.L1"
      }
    ]
  },
  {
    unitNumber: 5,
    id: "unit-5-the-internet",
    title: "The Internet",
    turkishTitle: "İnternet",
    iconName: "Globe",
    color: "from-violet-500 to-purple-600",
    themeOverview: "Internet vocabulary, social networking habits, internet safety rules, online abbreviations/acronyms, download/upload, troubleshooting connection.",
    learningOutcomes: [
      "E8.5.L1. Students will be able to understand internet safety rules and guidelines.",
      "E8.5.S1. Students will be able to talk about their internet habits and online activities.",
      "E8.5.R1. Students will be able to read and understand safety tips, blog posts, and online forums."
    ],
    targetVocabulary: [
      {
        id: "int-1",
        word: "Internet Safety Rules",
        partOfSpeech: "Noun Phrase",
        turkishMeaning: "İnternet güvenlik kuralları",
        definition: "Guidelines to protect yourself and your personal information online.",
        exampleSentence: "Following internet safety rules protects you from online fraudsters and viruses.",
        lgsFrequency: "Crucial"
      },
      {
        id: "int-2",
        word: "Upload / Download",
        partOfSpeech: "Verb",
        turkishMeaning: "Yüklemek (internete) / İndirmek (cihaza)",
        definition: "To send data to the internet / To receive data from the internet to your device.",
        exampleSentence: "I uploaded my presentation video to the school portal, and my teacher downloaded it.",
        lgsFrequency: "Crucial"
      },
      {
        id: "int-3",
        word: "Confirm / Log in / Log out",
        partOfSpeech: "Verb",
        turkishMeaning: "Onaylamak / Giriş yapmak / Çıkış yapmak",
        definition: "To verify something / To gain access to or leave an account.",
        exampleSentence: "Click the confirmation link sent to your email to activate your account.",
        lgsFrequency: "High"
      },
      {
        id: "int-4",
        word: "Stranger / Personal info",
        partOfSpeech: "Noun",
        turkishMeaning: "Yabancı (tanınmayan kişi) / Kişisel bilgiler",
        definition: "Someone you don't know / Private data like password, address, phone.",
        exampleSentence: "Never share your password or home address with strangers on the net.",
        lgsFrequency: "Crucial"
      },
      {
        id: "int-5",
        word: "Search engine / Browser / Attachment",
        partOfSpeech: "Noun",
        turkishMeaning: "Arama motoru / Web tarayıcısı / E-posta eki",
        definition: "Digital tools and files sent via email.",
        exampleSentence: "Please check the attachment in my email for the assignment details.",
        lgsFrequency: "High"
      }
    ],
    grammarStructures: [
      {
        id: "g-int1",
        title: "Imperatives for Rules & Advice (Do / Don't)",
        turkishTitle: "Güvenlik Kurallarında Emir Cümleleri",
        explanation: "Using imperative sentences to state cyber safety rules.",
        formula: "Do + V1 (or simply V1) / Don't + V1 ...",
        examples: [
          { english: "Create strong passwords with letters and numbers.", turkish: "Harf ve sayılardan oluşan güçlü şifreler oluşturun." },
          { english: "Don't open attachments from people you don't know.", turkish: "Tanımadığınız kişilerden gelen dosya eklerini açmayın." }
        ],
        lgsTrapTip: "LGS'de 'Which of the following is NOT safe according to internet safety rules?' sorusunda 'Accepting unknown friend requests' veya 'Sharing your credit card info' her zaman güvensiz davranışlardır."
      }
    ],
    keyPhrases: [
      {
        category: "Internet Safety Golden Rules",
        phrases: [
          { english: "Refuse unknown friend requests.", turkish: "Tanımadığınız arkadaşlık isteklerini reddedin." },
          { english: "Keep your passwords secret from everyone except parents.", turkish: "Şifrelerinizi ebeveynleriniz dışında herkesten gizli tutun." },
          { english: "Do not meet in real life with people you met online.", turkish: "İnternette tanıştığınız kişilerle gerçek hayatta buluşmayın." }
        ]
      }
    ],
    lgsStrategyTips: [
      "İnternet güvenliği posteri sorularında 'Dos and Don'ts' (Yapılması ve yapılmaması gerekenler) tablosu en çok çıkan soru tipidir.",
      "Kısaltmalar (Acronyms/Abbreviations): BFN (Bye for now), LOL (Laugh out loud), BTW (By the way), ASAP (As soon as possible), GR8 (Great), PLS (Please)."
    ],
    speakingPrompts: [
      "How many hours a day do you spend on the internet and what do you do most?",
      "List 3 crucial safety tips for teenagers using social media."
    ],
    sampleQuestions: [
      {
        id: "q-u5-1",
        unitNumber: 5,
        type: "Poster",
        contextTitle: "Cyber Safety Rules for Students",
        contextBody: "Rules to stay safe on the net:\n1. Use complex passwords containing numbers, symbols, and letters.\n2. Do not share your address, phone number, or school name with strangers.\n3. Never agree to meet online contacts in person.\n4. Always ask your parents before downloading unknown files or apps.\n5. Tell an adult if you see something that makes you uncomfortable.",
        visualType: "poster",
        questionStem: "According to the poster above, which of the following students BEHAVES UNSAFELY online?",
        options: {
          A: "Melinda asks her father before installing a new strategy game.",
          B: "George creates a password with uppercase letters and digits.",
          C: "Sam agrees to meet a boy he met on an online gaming forum in a park.",
          D: "Alice refuses a message from a user she does not know in real life."
        },
        correctAnswer: "C",
        explanationTurkish: "Kuralların 3. maddesinde 'İnternette tanışılan kişilerle asla yüz yüze buluşmayın' (Never agree to meet online contacts in person) denmektedir. Sam'in parkta buluşmayı kabul etmesi güvensiz (unsafe) bir davranıştır.",
        keyVocabulary: ["in person", "uncomfortable", "stranger", "complex password"],
        kazanim: "E8.5.R1"
      }
    ]
  },
  {
    unitNumber: 6,
    id: "unit-6-adventures",
    title: "Adventures",
    turkishTitle: "Maceralar & Ekstrem Sporlar",
    iconName: "Compass",
    color: "from-rose-500 to-red-600",
    themeOverview: "Extreme sports, adrenaline seekers, safety equipment/gear, comparative & superlative preference expressions (prefer, would rather, than).",
    learningOutcomes: [
      "E8.6.L1. Students will be able to understand conversations about extreme sports and outdoor adventures.",
      "E8.6.S1. Students will be able to express preferences between different adventurous sports.",
      "E8.6.R1. Students will be able to read texts about adventurers, dangerous sports, and required safety gear."
    ],
    targetVocabulary: [
      {
        id: "adv-1",
        word: "Adrenaline junkie / seeker",
        partOfSpeech: "Noun",
        turkishMeaning: "Adrenalin tutkunu, macera düşkünü",
        definition: "A person who has an extreme passion for thrilling and dangerous activities.",
        exampleSentence: "Bungee jumping is ideal for adrenaline junkies who love dangerous excitement.",
        lgsFrequency: "Crucial"
      },
      {
        id: "adv-2",
        word: "Challenging / Risky / Dangerous",
        partOfSpeech: "Adjective",
        turkishMeaning: "Zorlu, meydan okuyucu / Riskli / Tehlikeli",
        definition: "Difficult, demanding, or involving potential harm.",
        exampleSentence: "Climbing Mount Everest in winter is extremely challenging and risky.",
        synonyms: ["Daring", "Hazardous"],
        antonyms: ["Safe", "Easy"],
        lgsFrequency: "Crucial"
      },
      {
        id: "adv-3",
        word: "Safety equipment / Helmet / Life jacket",
        partOfSpeech: "Noun",
        turkishMeaning: "Güvenlik ekipmanı / Kask / Can yeleği",
        definition: "Gear worn to prevent injury in extreme sports.",
        exampleSentence: "You must wear a helmet and a life jacket before going white-water rafting.",
        lgsFrequency: "Crucial"
      },
      {
        id: "adv-4",
        word: "Paragliding / Skydiving / Caving",
        partOfSpeech: "Noun",
        turkishMeaning: "Yamaç paraşütü / Gökyüzü dalışı / Mağaracılık",
        definition: "Popular extreme sports in LGS questions.",
        exampleSentence: "Fethiye is one of the most famous destinations in the world for paragliding.",
        lgsFrequency: "High"
      }
    ],
    grammarStructures: [
      {
        id: "g-adv1",
        title: "Expressing Preferences: WOULD RATHER vs PREFER",
        turkishTitle: "WOULD RATHER ve PREFER Karşılaştırması",
        explanation: "Comparative structures used for sports preferences.",
        formula: "Subject + WOULD RATHER + V1 + THAN + V1  vs  Subject + PREFER + V_ing + TO + V_ing",
        examples: [
          { english: "I would rather try scuba diving than go bungee jumping.", turkish: "Tüplü dalış yapmayı bungee jumping yapmaya tercih ederim." },
          { english: "She prefers canoeing to rafting because it is less risky.", turkish: "Kano yapmayı rafting yapmaya tercih eder çünkü daha az risklidir." }
        ],
        lgsTrapTip: "WOULD RATHER'dan sonra fiil yalın gelir ve araya 'THAN' konur. PREFER'dan sonra ise '-ing' gelir ve araya 'TO' konur."
      }
    ],
    keyPhrases: [
      {
        category: "Extreme Sports Comparisons",
        phrases: [
          { english: "In my opinion, paragliding is more exciting than trekking.", turkish: "Bana göre yamaç paraşütü doğa yürüyüşünden daha heyecan vericidir." },
          { english: "I'm fascinated by high altitude sports.", turkish: "Yüksek irtifa sporları beni büyülüyor." },
          { english: "It is an eye-catching and unforgettable experience.", turkish: "Göz alıcı ve unutulmaz bir deneyim." }
        ]
      }
    ],
    lgsStrategyTips: [
      "Spor - Ekipman eşleştirmelerine çok dikkat edin: Scuba diving -> Wetsuit, Oxygen cylinder, Flippers / Paragliding -> Parachute, Helmet / Rafting -> Paddle, Life jacket, Helmet.",
      "Karakter profili sorularında kimin cesur (daring, courageous) kimin sakin (cautious, quiet) olduğu bilgisi ipucudur."
    ],
    speakingPrompts: [
      "Which extreme sport would you dare to try and why?",
      "Compare rafting and canoeing in terms of difficulty, fun, and safety."
    ],
    sampleQuestions: [
      {
        id: "q-u6-1",
        unitNumber: 6,
        type: "Table/Graphic",
        contextTitle: "Extreme Sports Preferences Table",
        contextBody: "Name: Liam | Preference: Skydiving | Reason: Loves high speed and adrenaline\nName: Noah | Preference: Scuba Diving | Reason: Fascinated by underwater sea creatures\nName: Emma | Preference: Trekking | Reason: Wants to be in quiet nature with zero risk\nName: Mia | Preference: Paragliding | Reason: Enjoys watching scenic views from the sky",
        visualType: "table",
        questionStem: "According to the table above, who is looking for a SAFE and RELAXING activity in nature without any danger?",
        options: {
          A: "Liam",
          B: "Noah",
          C: "Emma",
          D: "Mia"
        },
        correctAnswer: "C",
        explanationTurkish: "Tabloda Emma'nın tercihi 'Trekking' olup gerekçesi 'sıfır risk ile sessiz doğada olmak' (quiet nature with zero risk) şeklinde belirtilmiştir. Dolayısıyla güvenli ve sakin etkinlik arayan Emma'dır.",
        keyVocabulary: ["fascinated", "zero risk", "scenic views", "adrenaline"],
        kazanim: "E8.6.R1"
      }
    ]
  },
  {
    unitNumber: 7,
    id: "unit-7-tourism",
    title: "Tourism",
    turkishTitle: "Turizm",
    iconName: "MapPin",
    color: "from-amber-600 to-yellow-600",
    themeOverview: "Holiday types (cultural, beach, winter, historic), accommodation (all-inclusive, bed and breakfast), tourist attractions, architectural sites, climate.",
    learningOutcomes: [
      "E8.7.L1. Students will be able to understand descriptions of holiday destinations and historical places.",
      "E8.7.S1. Students will be able to describe their past vacation experiences and express preferences for holiday types.",
      "E8.7.R1. Students will be able to understand travel brochures, guidebooks, and postcards."
    ],
    targetVocabulary: [
      {
        id: "tour-1",
        word: "Accommodation / All-inclusive",
        partOfSpeech: "Noun / Adjective",
        turkishMeaning: "Konaklama / Her şey dahil (otel)",
        definition: "A place to live or stay / A resort where food, drinks, and activities are included in price.",
        exampleSentence: "We booked an all-inclusive five-star hotel by the seaside in Antalya.",
        lgsFrequency: "Crucial"
      },
      {
        id: "tour-2",
        word: "Historic site / Ancient ruins",
        partOfSpeech: "Noun",
        turkishMeaning: "Tarihi mekan / Antik kalıntılar",
        definition: "Old places of great cultural or historical significance.",
        exampleSentence: "Ephesus is one of the most remarkable ancient ruins in the Mediterranean.",
        synonyms: ["Archaeological site", "Heritage site"],
        lgsFrequency: "Crucial"
      },
      {
        id: "tour-3",
        word: "Attraction / Sights",
        partOfSpeech: "Noun",
        turkishMeaning: "Gezilip görülecek yer, turistik cazibe merkezi",
        definition: "Interesting places that tourists visit.",
        exampleSentence: "Pamukkale's white travertine terraces are a world-famous tourist attraction.",
        lgsFrequency: "Crucial"
      },
      {
        id: "tour-4",
        word: "Climate / Weather condition",
        partOfSpeech: "Noun",
        turkishMeaning: "İklim / Hava durumu koşulları",
        definition: "The general weather conditions prevailing in an area over a long period.",
        exampleSentence: "The Mediterranean region has a hot and dry climate during summer.",
        lgsFrequency: "High"
      }
    ],
    grammarStructures: [
      {
        id: "g-tour1",
        title: "Present Perfect vs Simple Past for Experiences",
        turkishTitle: "Tatil Deneyimlerinde Zaman Yapıları (Have you ever...?)",
        explanation: "Asking about visited destinations and life experiences.",
        formula: "Have you ever been to ...? Yes, I went there last summer.",
        examples: [
          { english: "Have you ever seen Cappadocia before?", turkish: "Daha önce Kapadokya'yı gördün mü?" },
          { english: "I stayed in a boutique hotel in Safranbolu two years ago.", turkish: "İki yıl önce Safranbolu'da bir butik otelde kaldım." }
        ],
        lgsTrapTip: "Genel deneyim sorulurken 'Have you ever visited...?', belirli bir geçmiş zaman belirtilmişse (e.g. last year, in 2022) Past Simple kullanılır."
      }
    ],
    keyPhrases: [
      {
        category: "Talking About Destinations",
        phrases: [
          { english: "It is definitely worth seeing.", turkish: "Kesinlikle görülmeye değer." },
          { english: "The local cuisine is truly mouth-watering.", turkish: "Yöresel mutfak gerçekten ağız sulandırıcı." },
          { english: "I prefer a cultural tour to a seaside holiday.", turkish: "Kültürel bir turu deniz tatiline tercih ederim." }
        ]
      }
    ],
    lgsStrategyTips: [
      "Broşür sorularında Konum (Location), İklim (Climate), Konaklama (Accommodation), Gezilecek Yerler (Attractions/Sights) ve Ulaşım (Transportation) başlıklarını inceleyin.",
      "Kültür meraklısı turist (Historic places/Museums) ile deniz/kum meraklısı turist (Beach/Resort) farkını ayırt edin."
    ],
    speakingPrompts: [
      "Describe the best vacation you have ever had. Where did you stay and what did you visit?",
      "Would you prefer visiting historic museums or relaxing at an all-inclusive seaside resort?"
    ],
    sampleQuestions: [
      {
        id: "q-u7-1",
        unitNumber: 7,
        type: "Paragraph",
        contextTitle: "Travel Brochure: Visiting Trabzon",
        contextBody: "Trabzon is located on the Black Sea coast of Turkey. It is famous for its lush green plateaus, fresh rainy climate, and rich historical heritage. Visitors can explore the ancient Sumela Monastery carved into steep cliffs, taste delicious local corn bread with freshwater trout, and stay in authentic wooden highland chalets.",
        visualType: "text",
        questionStem: "In the passage above, there is NO information about Trabzon's ____________.",
        options: {
          A: "Transportation prices and flight details",
          B: "Famous historic places to explore",
          C: "Local traditional dishes and cuisine",
          D: "Climate and geographic location"
        },
        correctAnswer: "A",
        explanationTurkish: "Metinde konum ve iklim (D), Sümela Manastırı gibi tarihi yerler (B) ve mısır ekmeği, alabalık gibi yöresel yemekler (C) anlatılmıştır. Ulaşım ücretleri ve uçuş detayları (A) hakkında hiçbir bilgi yoktur.",
        keyVocabulary: ["historical heritage", "highland", "carved into", "cuisine"],
        kazanim: "E8.7.R1"
      }
    ]
  },
  {
    unitNumber: 8,
    id: "unit-8-chores",
    title: "Chores",
    turkishTitle: "Ev İşleri ve Sorumluluklar",
    iconName: "Home",
    color: "from-green-600 to-emerald-700",
    themeOverview: "Household chores, family responsibilities, school/classroom rules, expressing obligations (must, have to, responsible for, in charge of).",
    learningOutcomes: [
      "E8.8.L1. Students will be able to understand conversations about household chores and duties.",
      "E8.8.S1. Students will be able to express obligations and responsibilities at home and school.",
      "E8.8.R1. Students will be able to understand chore duty charts, family rules, and classroom agreements."
    ],
    targetVocabulary: [
      {
        id: "ch-1",
        word: "Responsible for / In charge of",
        partOfSpeech: "Adjective phrase",
        turkishMeaning: "Bir şeyden sorumlu olmak",
        definition: "Having an obligation or duty to take care of something.",
        exampleSentence: "My brother is responsible for taking out the garbage every evening.",
        synonyms: ["In charge of", "Accountable for"],
        lgsFrequency: "Crucial"
      },
      {
        id: "ch-2",
        word: "Do the laundry / Iron the clothes",
        partOfSpeech: "Phrase",
        turkishMeaning: "Çamaşır yıkamak / Kıyafetleri ütülemek",
        definition: "Washing and smoothing out clothes.",
        exampleSentence: "My mother washes the laundry on Saturdays and irons the clothes on Sundays.",
        lgsFrequency: "Crucial"
      },
      {
        id: "ch-3",
        word: "Set the table / Clear the table",
        partOfSpeech: "Phrase",
        turkishMeaning: "Masayı kurmak / Masayı toplamak",
        definition: "Preparing plates/cutlery for a meal / Cleaning plates after a meal.",
        exampleSentence: "I always set the table before dinner and my sister clears it afterwards.",
        lgsFrequency: "Crucial"
      },
      {
        id: "ch-4",
        word: "Mop the floor / Vacuum the carpets",
        partOfSpeech: "Phrase",
        turkishMeaning: "Yerleri paspaslamak / Halıları süpürmek",
        definition: "Cleaning floor surfaces with water or electric suction machine.",
        exampleSentence: "We vacuum the living room carpets twice a week to keep the house clean.",
        lgsFrequency: "Crucial"
      },
      {
        id: "ch-5",
        word: "Dust the furniture / Weed the garden",
        partOfSpeech: "Phrase",
        turkishMeaning: "Mobilyaların tozunu almak / Bahçedeki yabani otları ayıklamak",
        definition: "Cleaning dust off shelves / Removing unwanted plants from garden.",
        exampleSentence: "On weekends, David helps his grandfather weed the garden and water the plants.",
        lgsFrequency: "High"
      }
    ],
    grammarStructures: [
      {
        id: "g-ch1",
        title: "Expressing Obligation & Necessity (Must, Have to, Need to)",
        turkishTitle: "Zorunluluk ve Sorumluluk Kalıpları (Must, Have to)",
        explanation: "Modal verbs expressing family duties and school rules.",
        formula: "Subject + MUST / HAVE TO / HAS TO + V1",
        examples: [
          { english: "We have to keep our classroom clean and tidy.", turkish: "Sınıfımızı temiz ve düzenli tutmak zorundayız." },
          { english: "You must return library books on time.", turkish: "Kütüphane kitaplarını zamanında iade etmelisin." }
        ],
        lgsTrapTip: "'Must' genellikle kural veya içsel zorunlulukları; 'have to/has to' ise dışarıdan konulan kural ve zorunlulukları ifade eder. 'Responsible for' sonrasında ise fiil -ing alır (He is responsible for washING the dishes)."
      }
    ],
    keyPhrases: [
      {
        category: "Dividing Household Chores",
        phrases: [
          { english: "It is my duty to feed the dog.", turkish: "Köpeği beslemek benim görevimdir." },
          { english: "Sharing chores makes our family life much easier.", turkish: "Ev işlerini paylaşmak aile hayatımızı çok daha kolaylaştırır." },
          { english: "Who is in charge of washing the car?", turkish: "Arabayı yıkamaktan kim sorumlu?" }
        ]
      }
    ],
    lgsStrategyTips: [
      "Aile bireyleri görev dağılımı tablosu (Chore Chart) sorularında: 'Who does indoor chores?', 'Who does outdoor chores (mowing lawn, washing car)?', 'Who is responsible for kitchen duties?' ayrımlarını dikkatle yapın.",
      "Tidy / Neat (düzenli) ve Messy / Untidy (dağınık) sıfatlarını unutmayın."
    ],
    speakingPrompts: [
      "What household duties are you responsible for in your family?",
      "Do you think sharing household chores equally is important? Why?"
    ],
    sampleQuestions: [
      {
        id: "q-u8-1",
        unitNumber: 8,
        type: "Table/Graphic",
        contextTitle: "The Miller Family Weekly Chore Chart",
        contextBody: "Family Member: Father (Jack) | Chores: Washing the car, mowing the lawn (Outdoor)\nFamily Member: Mother (Susan) | Chores: Cooking meals, doing the grocery shopping\nFamily Member: Son (Leo) | Chores: Taking out the trash, walking the family dog\nFamily Member: Daughter (Chloe) | Chores: Loading/emptying the dishwasher, setting the table",
        visualType: "table",
        questionStem: "According to the chore chart above, which of the following is CORRECT?",
        options: {
          A: "Jack is in charge of kitchen duties and cooking.",
          B: "Chloe is responsible for chores related to food and dining.",
          C: "Leo does all the outdoor garden maintenance chores.",
          D: "Susan never leaves the house for any household responsibility."
        },
        correctAnswer: "B",
        explanationTurkish: "Chloe bulaşık makinesini doldurup boşaltmaktan ve sofrayı kurmaktan sorumludur; bunların her ikisi de yemek ve mutfakla (food and dining) ilgilidir.",
        keyVocabulary: ["in charge of", "responsible for", "dishwasher", "outdoor chores"],
        kazanim: "E8.8.R1"
      }
    ]
  },
  {
    unitNumber: 9,
    id: "unit-9-science",
    title: "Science",
    turkishTitle: "Bilim ve İcatlar",
    iconName: "FlaskConical",
    color: "from-cyan-500 to-blue-700",
    themeOverview: "Scientific discoveries, inventions, famous scientists (Tesla, Curie, Aziz Sancar), laboratory equipment, conducting experiments, breakthroughs.",
    learningOutcomes: [
      "E8.9.L1. Students will be able to understand texts about scientific discoveries, experiments, and famous scientists.",
      "E8.9.S1. Students will be able to describe scientific actions and discuss current inventions.",
      "E8.9.R1. Students will be able to read biographies of scientists and scientific articles."
    ],
    targetVocabulary: [
      {
        id: "sc-1",
        word: "Invent / Discover / Invention",
        partOfSpeech: "Verb / Noun",
        turkishMeaning: "İcat etmek / Keşfetmek / İcat (Buluş)",
        definition: "To create something completely new / To find something that already existed.",
        exampleSentence: "Alexander Graham Bell invented the telephone, while Columbus discovered America.",
        synonyms: ["Create", "Pioneer"],
        lgsFrequency: "Crucial"
      },
      {
        id: "sc-2",
        word: "Conduct / Do an experiment",
        partOfSpeech: "Phrase",
        turkishMeaning: "Deney yapmak, deney yürütmek",
        definition: "To perform a scientific test in order to learn something.",
        exampleSentence: "The researchers are conducting an experiment in the chemistry lab to develop a new vaccine.",
        synonyms: ["Carry out a test"],
        lgsFrequency: "Crucial"
      },
      {
        id: "sc-3",
        word: "Vaccine / Cure / Treatment",
        partOfSpeech: "Noun",
        turkishMeaning: "Aşı / Tedavi, şifa / Tıbbi tedavi",
        definition: "Medical substances used to stimulate antibodies or heal diseases.",
        exampleSentence: "Dr. Jonas Salk developed the polio vaccine to protect children from paralysis.",
        lgsFrequency: "Crucial"
      },
      {
        id: "sc-4",
        word: "Test tube / Microscope / Lab equipment",
        partOfSpeech: "Noun",
        turkishMeaning: "Deney tüpü / Mikroskop / Laboratuvar ekipmanı",
        definition: "Tools used in scientific research.",
        exampleSentence: "Scientists examine bacteria samples under a high-power electron microscope.",
        lgsFrequency: "High"
      },
      {
        id: "sc-5",
        word: "Breakthrough / Milestone",
        partOfSpeech: "Noun",
        turkishMeaning: "Büyük buluş, çığır açan gelişme / Dönüm noktası",
        definition: "An important discovery or development that helps to solve a problem.",
        exampleSentence: "The discovery of DNA structure was a major scientific breakthrough in biology.",
        lgsFrequency: "High"
      }
    ],
    grammarStructures: [
      {
        id: "g-sc1",
        title: "Talking About Past Scientific Achievements & Discoveries",
        turkishTitle: "Geçmiş Bilimsel Başarıları İfade Etme (Past Simple & Passive voice recognition)",
        explanation: "Describing who invented what and when.",
        formula: "Scientist + invented/discovered/conducted + Object + in Year",
        examples: [
          { english: "Marie Curie discovered radium and won two Nobel Prizes.", turkish: "Marie Curie radyumu keşfetti ve iki Nobel Ödülü kazandı." },
          { english: "Professor Aziz Sancar received the Nobel Prize for his research on DNA repair.", turkish: "Prof. Dr. Aziz Sancar, DNA onarımı araştırmalarıyla Nobel Ödülü aldı." }
        ],
        lgsTrapTip: "'Invent' (olmayan bir şeyi sıfırdan icat etmek - e.g. printing press, telephone) ile 'Discover' (doğada zaten var olan bir şeyi ilk kez keşfetmek - e.g. gravity, radium, electricity) farkını asla karıştırmayın!"
      }
    ],
    keyPhrases: [
      {
        category: "Scientific Discussion",
        phrases: [
          { english: "It will change the future of humanity.", turkish: "İnsanlığın geleceğini değiştirecek." },
          { english: "He dedicated his entire life to scientific research.", turkish: "Bütün hayatını bilimsel araştırmalara adadı." },
          { english: "They are testing the safety of the new solar powered car.", turkish: "Güneş enerjili yeni arabanın güvenliğini test ediyorlar." }
        ]
      }
    ],
    lgsStrategyTips: [
      "Biyografi metinlerinde kronolojik sıralama (timeline: birth, education, early experiments, major discovery, awards, death) sorularına dikkat edin.",
      "Laboratuvar deney adımları sorularında malzemeleri (chemicals, substance, liquid, temperature) takip edin."
    ],
    speakingPrompts: [
      "Who is your favorite scientist in history and what did they achieve?",
      "Which scientific invention has made our daily lives easiest?"
    ],
    sampleQuestions: [
      {
        id: "q-u9-1",
        unitNumber: 9,
        type: "Paragraph",
        contextTitle: "Biography: Nikola Tesla",
        contextBody: "Nikola Tesla was born in 1856. He was an extraordinary inventor, electrical engineer, and futurist. He is best known for his contributions to the design of the modern alternating current (AC) electricity supply system. He patented dozens of inventions, including the Tesla coil and wireless radio transmission principles. Throughout his life, he conducted hundreds of experiments to provide free wireless electrical power to the whole world.",
        visualType: "text",
        questionStem: "According to the passage about Nikola Tesla, which of the following questions DOES NOT have an answer?",
        options: {
          A: "When was Nikola Tesla born?",
          B: "What is his most famous contribution to electrical engineering?",
          C: "How much money did Tesla earn from all his patents?",
          D: "What did he aim to achieve with his wireless electricity experiments?"
        },
        correctAnswer: "C",
        explanationTurkish: "Metinde doğum yılı 1856 (A), en bilinen katkısı AC alternatif akım sistemi (B) ve kablosuz elektrik deneyiyle neyi hedeflediği (D) anlatılmıştır. Patentlerinden kaç para kazandığı (C) metinde yer almamaktadır.",
        keyVocabulary: ["alternating current", "inventor", "patented", "contributions"],
        kazanim: "E8.9.R1"
      }
    ]
  },
  {
    unitNumber: 10,
    id: "unit-10-natural-forces",
    title: "Natural Forces",
    turkishTitle: "Doğal Afetler ve Çevre",
    iconName: "Flame",
    color: "from-orange-600 to-rose-700",
    themeOverview: "Natural disasters (earthquake, flood, drought, avalanche, tsunami, volcanic eruption, landslide), global warming, ecological threats, precautions, emergency kits.",
    learningOutcomes: [
      "E8.10.L1. Students will be able to understand news reports and talks about natural disasters and environmental problems.",
      "E8.10.S1. Students will be able to give reasons and results for environmental issues and suggest precautions.",
      "E8.10.R1. Students will be able to read disaster news, warning brochures, and climate change articles."
    ],
    targetVocabulary: [
      {
        id: "nf-1",
        word: "Drought / Famine / Deforestation",
        partOfSpeech: "Noun",
        turkishMeaning: "Kuraklık / Kıtlık (açlık) / Ormansızlaşma (ağaçların yok edilmesi)",
        definition: "Major environmental issues caused by climate change and human impact.",
        exampleSentence: "Because of severe drought, farmers could not harvest any wheat this season.",
        lgsFrequency: "Crucial"
      },
      {
        id: "nf-2",
        word: "Earthquake / Landslide / Avalanche",
        partOfSpeech: "Noun",
        turkishMeaning: "Deprem / Heyelan (toprak kayması) / Çığ (kar kayması)",
        definition: "Sudden violent natural forces causing destruction.",
        exampleSentence: "The heavy rainfall caused a massive landslide that blocked the main highway.",
        lgsFrequency: "Crucial"
      },
      {
        id: "nf-3",
        word: "Flood / Tsunami / Hurricane",
        partOfSpeech: "Noun",
        turkishMeaning: "Sel / Dev tsunami dalgası / Kasırga",
        definition: "Water and wind-based destructive disasters.",
        exampleSentence: "The underground earthquake in the ocean triggered a gigantic tsunami wave.",
        lgsFrequency: "Crucial"
      },
      {
        id: "nf-4",
        word: "Precaution / Emergency kit",
        partOfSpeech: "Noun",
        turkishMeaning: "Önlem, tedbir / Acil durum deprem çantası",
        definition: "Action taken in advance to prevent harm / A bag with survival supplies.",
        exampleSentence: "Every household must prepare an emergency kit with a flashlight, whistle, and canned food.",
        synonyms: ["Measure", "Safety precaution"],
        lgsFrequency: "Crucial"
      },
      {
        id: "nf-5",
        word: "Global warming / Glacier melting",
        partOfSpeech: "Noun Phrase",
        turkishMeaning: "Küresel ısınma / Buzulların erimesi",
        definition: "The gradual increase in the overall temperature of the earth's atmosphere.",
        exampleSentence: "Glaciers are melting rapidly at the poles due to greenhouse gas emissions and global warming.",
        lgsFrequency: "High"
      }
    ],
    grammarStructures: [
      {
        id: "g-nf1",
        title: "Expressing Future Predictions & Warnings (Will, Won't, Be going to)",
        turkishTitle: "Geleceğe Dair Tahminler ve Uyarılar",
        explanation: "Making predictions about climate change and environmental problems.",
        formula: "Subject + WILL / WON'T + V1 ... If we don't take precautions, ...",
        examples: [
          { english: "If we waste water, there will be serious water shortages in the future.", turkish: "Eğer suyu israf edersek gelecekte ciddi su kıtlıkları olacak." },
          { english: "Scientists predict that global temperatures will rise by 2 degrees.", turkish: "Bilim insanları küresel sıcaklıkların 2 derece artacağını öngörüyor." }
        ],
        lgsTrapTip: "Doğal afet eşleştirmelerinde sebep-sonuç bağlaçlarına (Because, As a result of, Therefore, If) çok dikkat edilmelidir."
      }
    ],
    keyPhrases: [
      {
        category: "Eco-friendly Actions & Precautions",
        phrases: [
          { english: "Plant more trees and protect forests.", turkish: "Daha fazla ağaç dikin ve ormanları koruyun." },
          { english: "Turn off the taps while brushing your teeth.", turkish: "Dişlerinizi fırçalarken muslukları kapatın." },
          { english: "Use renewable energy sources like wind and solar power.", turkish: "Rüzgar ve güneş gibi yenilenebilir enerji kaynakları kullanın." }
        ]
      }
    ],
    lgsStrategyTips: [
      "Doğal afet haber bülteni (News Flash) sorularında: 'What caused the disaster?', 'How many people were rescued/injured?', 'Which city was struck?' bilgilerini arayın.",
      "Afet çantası (Emergency Bag) gereçlerini öğrenin: Whistle (düdük), Flashlight/Torch (el feneri), First aid kit (ilk yardım çantası), Canned food (konserve yiyecek), Bottled water."
    ],
    speakingPrompts: [
      "What can we do in our school to reduce plastic waste and save water?",
      "Explain the items that should be in an earthquake emergency bag."
    ],
    sampleQuestions: [
      {
        id: "q-u10-1",
        unitNumber: 10,
        type: "Poster",
        contextTitle: "Earthquake Preparedness & Emergency Kit",
        contextBody: "Things to put in your home emergency kit:\n- Bottled water (at least 3 liters per person)\n- Canned food and energy bars (non-perishable)\n- A flashlight with extra batteries\n- A first-aid kit with bandages and medicine\n- A whistle to signal for help if trapped",
        visualType: "poster",
        questionStem: "According to the emergency guide above, which item is used to MAKE NOISE and CALL FOR HELP if you are trapped under debris?",
        options: {
          A: "A whistle",
          B: "A flashlight",
          C: "Canned food",
          D: "A first-aid kit"
        },
        correctAnswer: "A",
        explanationTurkish: "Metinde düdüğün (whistle) mahsur kalındığında ses çıkarıp yardım çağırmak için ('signal for help if trapped') konulması gerektiği belirtilmiştir.",
        keyVocabulary: ["whistle", "signal for help", "trapped", "emergency kit"],
        kazanim: "E8.10.R1"
      }
    ]
  }
];
