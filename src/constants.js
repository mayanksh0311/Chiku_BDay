export const config = {
  name: "Chiku",
  nickname: "Chiku",
  ageFrom: 25,
  ageTo: 26,
  subtitle: "Cheers to 26 Years of Fabulous!",
  wishes: "Wishing you a year filled with endless laughter, boundless adventures, and pure magic!",
};

export const carouselPhotos = [
  { id: 1, src: "/images/pic1.jpeg", alt: "Memory 1", frame: "01A", label: "Golden Hour" },
  { id: 2, src: "/images/pic2.jpeg", alt: "Memory 2", frame: "02A", label: "Pure Joy" },
  { id: 3, src: "/images/pic3.jpeg", alt: "Memory 3", frame: "03A", label: "Sweet Smile" },
  { id: 4, src: "/images/pic4.jpeg", alt: "Memory 4", frame: "04A", label: "Adventure Time" },
  { id: 5, src: "/images/pic5.jpeg", alt: "Memory 5", frame: "05A", label: "Sunshine Vibe" },
  { id: 6, src: "/images/pic6.jpeg", alt: "Memory 6", frame: "06A", label: "Timeless" },
  { id: 7, src: "/images/pic7.jpeg", alt: "Memory 7", frame: "07A", label: "Happy Day" },
  { id: 8, src: "/images/pic8.jpeg", alt: "Memory 8", frame: "08A", label: "Cherished" },
  { id: 9, src: "/images/pic9.jpeg", alt: "Memory 9", frame: "09A", label: "Candid Magic" },
  { id: 10, src: "/images/pic10.jpeg", alt: "Memory 10", frame: "10A", label: "Forever Icon" },
];

export const polaroids = [
  { id: 1, src: "/images/pic11.jpeg", caption: "Cute 🥺", rotation: -7, x: 20, y: 35, pinColor: "#ef4444" },
  { id: 2, src: "/images/pic12.jpeg", caption: "Baddie 💅", rotation: 6, x: 160, y: 75, pinColor: "#3b82f6" },
  { id: 3, src: "/images/pic13.jpeg", caption: "Silly 🤪", rotation: -5, x: 30, y: 220, pinColor: "#10b981" },
  { id: 4, src: "/images/pic14.jpeg", caption: "Vibes ✨", rotation: 9, x: 165, y: 265, pinColor: "#f59e0b" },
  { id: 5, src: "/images/pic15.jpeg", caption: "Glow 💖", rotation: -3, x: 90, y: 395, pinColor: "#ec4899" },
];

export const defaultLetter = {
  salutation: "Hello ji....",
  paragraphs: [
    "Happy Birthday once again! Sorry thoda late ho gaya isko bhejne mein, interview mein busy the...",
    "Bahut acche aur better gifts mile honge aaj aapko, and ek chota sa digital gift meri taraf se... I know ki aapke paas aapke bahut loved ones hain, but for me you will always be that special person jo irreplaceable hai...",
    "Just wishing you a great year, and always be happy and keep smiling kyunki aap khaas ho and you deserve it...",
    "And aap toh waise bhi kuch batati nahi ho jab bhi koi pareshani hoti hai, and when you feel heavy... Koi ni, shayad hum samajh na paye but I can listen...",
    "Bahut kuch kehna chahte hain par you know na ki hum express nahi kar pate hain apni feelings ko, aur message par toh bilkul nahi... Shayad kabhi express kar paye...",
  ],
  signOff: "Btw... Again wishing you a happy wala birthday...... ❤️🎂",
  postscript: "P.S. Always be happy and keep smiling! ✨",
};

export const scrapbookPages = [
  {
    id: 1,
    type: "cover",
    title: "Sketchbook",
    subtitle: "Memories with Chiku",
    stickers: ["🦋", "✨", "🌸", "⭐"],
  },
  {
    id: 2,
    type: "page",
    title: "Golden Moments",
    date: "Treasured Days",
    note: "Every laugh, every silly adventure, and every warm memory with you is pure gold!",
    photos: [
      { src: "/images/pic16.jpeg", rotate: -3, label: "Sunshine ☀️", orientation: "portrait" },
      { src: "/images/pic17.jpeg", rotate: 2, label: "Unfiltered Joy", orientation: "portrait" },
    ],
    stickers: ["🌸", "💌", "✨"],
  },
  {
    id: 3,
    type: "page",
    title: "Forever Smiling",
    date: "Candid Vibes",
    note: "Your smile lights up every single room. Never stop radiating that infectious happiness!",
    photos: [
      { src: "/images/pic18.jpeg", rotate: 2, label: "Core Memory 🌿", orientation: "portrait" },
      { src: "/images/pic19.jpeg", rotate: -3, label: "Queen Behavior 👑", orientation: "portrait" },
    ],
    stickers: ["🌻", "🎀", "⭐"],
  },
  {
    id: 4,
    type: "page",
    title: "Sweet Adventures",
    date: "Milestones",
    note: "25 chapters of sheer awesomeness completed. Chapter 26 is about to be legendary!",
    photos: [
      { src: "/images/pic20.jpeg", rotate: -2, label: "Sweet Times 💫", orientation: "portrait" },
      { src: "/images/pic21.jpeg", rotate: 3, label: "Always Fabulous", orientation: "portrait" },
    ],
    stickers: ["🦋", "💖", "🌿"],
  },
  {
    id: 5,
    type: "page",
    title: "Happy 26th Birthday!",
    date: "Celebration Day",
    note: "Here is to another year of great health, boundless laughter, and making dreams come true! 🎂✨",
    photos: [
      { src: "/images/pic35.jpeg", rotate: 2, label: "Birthday Star ⭐", orientation: "portrait" },
      { src: "/images/pic40.jpeg", rotate: -2, label: "Cheers to 26! 🥂", orientation: "landscape" },
    ],
    stickers: ["🎉", "🎂", "🥂", "💖"],
  },
  {
    id: 6,
    type: "letter",
    title: "A Letter For You",
    date: "Chapter 26 💌",
    envelopeTitle: "For Chiku",
    envelopeSubtitle: "Tap wax seal to open ✉️",
    stickers: ["💌", "✨", "🌹", "💖"],
  },
  {
    id: 7,
    type: "backCover",
    title: "To Be Continued...",
    note: "Made with all our love for Chiku's 26th Birthday ❤️",
    stickers: ["✨", "💖", "🌟"],
  },
];

export const galaxyImages = [
  { id: 1, src: "/images/pic24.jpeg" },
  { id: 2, src: "/images/pic25.jpeg" },
  { id: 3, src: "/images/pic26.jpeg" },
  { id: 4, src: "/images/pic27.jpeg" },
  { id: 5, src: "/images/pic28.jpeg" },
  { id: 6, src: "/images/pic29.jpeg" },
  { id: 7, src: "/images/pic30.jpeg" },
  { id: 8, src: "/images/pic32.jpeg" },
  { id: 9, src: "/images/pic33.jpeg" },
  { id: 10, src: "/images/pic34.jpeg" },
  { id: 11, src: "/images/pic35.jpeg" },
  { id: 12, src: "/images/pic36.jpeg" },
  { id: 13, src: "/images/pic37.jpeg" },
  { id: 14, src: "/images/pic38.jpeg" },
  { id: 15, src: "/images/pic39.jpeg" },
  { id: 16, src: "/images/pic40.jpeg" },
  { id: 17, src: "/images/pic41.jpeg" },
  { id: 18, src: "/images/pic42.jpeg" },
  { id: 19, src: "/images/pic43.jpeg" },
  { id: 20, src: "/images/pic44.jpeg" },
];
