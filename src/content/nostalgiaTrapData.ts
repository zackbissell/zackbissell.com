export const heroContent = {
  title: "Nostalgia Trap",
  tagline: "A DJ Mix for the Emotionally Unstable",
  description: "Think of someone who left you wrecked. Hold that thought. Feel it in your chest. Now press play.",
  warning: "This experience is designed to evoke deep emotional responses. Please listen responsibly.",
};

export const emotionalJourney = {
  phases: [
    {
      id: "glow",
      title: "The Glow",
      emoji: "💜",
      description: "Happy reminiscing phase - the warm memories that make you smile",
      timeRange: "0:00 - 15:00",
      tracks: [
        "Golden memories that still sparkle",
        "The way they used to laugh",
        "Dancing in their kitchen at 2am",
      ]
    },
    {
      id: "ecstasy",
      title: "The Ecstasy", 
      emoji: "🎵",
      description: "Dizzy high of longing - when missing them feels almost euphoric",
      timeRange: "15:00 - 35:00",
      tracks: [
        "The rush of their name in a text",
        "Phantom touches on your skin",
        "Dreams where they come back",
      ]
    },
    {
      id: "crash",
      title: "The Crash",
      emoji: "⚠️", 
      description: "Painful come-down - reality hits and the hurt floods back",
      timeRange: "35:00 - 55:00",
      tracks: [
        "Empty bed, cold sheets",
        "Their stuff still in your closet",
        "The final goodbye you never said",
      ]
    }
  ]
};

export const moodOptions = [
  {
    id: "missing",
    label: "Missing Them 💔",
    emoji: "💔",
    description: "That ache of absence that sits heavy in your chest"
  },
  {
    id: "dancing",
    label: "Dancing It Off 💃", 
    emoji: "💃",
    description: "Moving through the pain, letting music heal you"
  },
  {
    id: "over-it",
    label: "Over It ✨",
    emoji: "✨", 
    description: "Ready to let go and embrace what's next"
  },
  {
    id: "confused",
    label: "Confused AF 🌀",
    emoji: "🌀",
    description: "Not sure what you feel - just need something to feel"
  }
];

export const tracklist = [
  {
    number: 1,
    title: "Don't Think Twice, It's All Right",
    artist: "Bob Dylan (Four Tet Remix)",
    timestamp: "0:00",
    phase: "glow",
    narrative: "Starting with something that feels like forgiveness"
  },
  {
    number: 2,
    title: "Golden",
    artist: "Jill Scott (Kaytranada Remix)",
    timestamp: "4:23",
    phase: "glow", 
    narrative: "When their memory still shimmers"
  },
  {
    number: 3,
    title: "Say My Name",
    artist: "Destiny's Child (Crazy P Remix)",
    timestamp: "8:45",
    phase: "glow",
    narrative: "Remember when they used to say your name like a prayer?"
  },
  {
    number: 4,
    title: "I Need a Girl",
    artist: "P. Diddy (Purple Disco Machine Edit)",
    timestamp: "13:20",
    phase: "ecstasy",
    narrative: "The yearning starts to build..."
  },
  {
    number: 5,
    title: "Adorn",
    artist: "Miguel (Disclosure Remix)",
    timestamp: "17:10",
    phase: "ecstasy",
    narrative: "How they used to look at you like you were art"
  },
  {
    number: 6,
    title: "Come Through and Chill",
    artist: "Miguel ft. J. Cole (ODESZA Remix)",
    timestamp: "21:30",
    phase: "ecstasy",
    narrative: "Those 3am conversations that felt like coming home"
  },
  {
    number: 7,
    title: "Redbone",
    artist: "Childish Gambino (Toro y Moi Edit)",
    timestamp: "26:45",
    phase: "ecstasy",
    narrative: "The paranoia creeps in - were the signs always there?"
  },
  {
    number: 8,
    title: "Someone You Loved",
    artist: "Lewis Capaldi (Jamie xx Rework)",
    timestamp: "31:15",
    phase: "crash",
    narrative: "The drop hits different when it's about real loss"
  },
  {
    number: 9,
    title: "Breathe Me",
    artist: "Sia (Bonobo Remix)",
    timestamp: "36:00",
    phase: "crash",
    narrative: "Vulnerable and raw, like 4am crying in the shower"
  },
  {
    number: 10,
    title: "Mad World",
    artist: "Gary Jules (Burial Edit)",
    timestamp: "41:30",
    phase: "crash",
    narrative: "When everything familiar feels foreign"
  },
  {
    number: 11,
    title: "Hurt",
    artist: "Johnny Cash (Thom Yorke Rework)",
    timestamp: "46:20",
    phase: "crash",
    narrative: "The weight of what you've lost to yourself"
  },
  {
    number: 12,
    title: "The Night We Met",
    artist: "Lord Huron (Emancipator Remix)",
    timestamp: "51:45",
    phase: "crash",
    narrative: "If you could go back, would you change it all?"
  }
];

export const audioData = {
  soundcloudId: "example-nostalgia-trap-mix",
  duration: "55:32",
  description: "An emotional journey through heartbreak, longing, and eventual acceptance",
  tags: ["emotional house", "future garage", "downtempo", "healing", "vulnerability"]
};
