import bollywood from "@/assets/style-bollywood.jpg";
import hiphop from "@/assets/style-hiphop.jpg";
import contemporary from "@/assets/style-contemporary.jpg";
import classical from "@/assets/style-classical.jpg";
import kids from "@/assets/style-kids.jpg";
import zumba from "@/assets/style-zumba.jpg";
import studio from "@/assets/gallery-studio.jpg";
import competition from "@/assets/gallery-competition.jpg";
import wedding from "@/assets/gallery-wedding.jpg";
import workshop from "@/assets/gallery-workshop.jpg";
import trainer2 from "@/assets/trainer-2.jpeg";

export type Level = "Beginner" | "Intermediate" | "Advanced" | "All Levels";

export type DanceStyle = {
  slug: string;
  name: string;
  image: string;
  description: string;
  level: Level;
  ageGroup: string;
};

export const danceStyles: DanceStyle[] = [
  {
    slug: "bollywood",
    name: "Bollywood",
    image: bollywood,
    description:
      "Filmy energy, expressive storytelling and crisp formations set to the biggest Hindi tracks.",
    level: "All Levels",
    ageGroup: "8+ years",
  },
  {
    slug: "hip-hop",
    name: "Hip-Hop",
    image: hiphop,
    description:
      "Grooves, isolations, popping and freestyle foundations built on real street dance culture.",
    level: "Beginner",
    ageGroup: "13+ years",
  },
  {
    slug: "contemporary",
    name: "Contemporary",
    image: contemporary,
    description:
      "Breath, floor work and emotional movement for dancers who want to express, not just perform.",
    level: "Intermediate",
    ageGroup: "15+ years",
  },
  {
    slug: "classical",
    name: "Classical (Bharatanatyam)",
    image: classical,
    description:
      "Traditional adavus, mudras and abhinaya taught with authentic guru-shishya discipline.",
    level: "All Levels",
    ageGroup: "6+ years",
  },
  {
    slug: "kids-dance",
    name: "Kids Dance",
    image: kids,
    description:
      "Playful, confidence-first training that builds rhythm, coordination and stage presence.",
    level: "Beginner",
    ageGroup: "4–12 years",
  },
  {
    slug: "zumba-fitness",
    name: "Zumba & Dance Fitness",
    image: zumba,
    description:
      "High-energy cardio choreography that burns calories while you actually enjoy the workout.",
    level: "All Levels",
    ageGroup: "16+ years",
  },
];

export type DanceClass = {
  id: string;
  name: string;
  style: string;
  ageGroup: string;
  level: Level;
  duration: string;
  timing: string;
  trainer: string;
  description: string;
  price: number;
  image: string;
};

export const danceClasses: DanceClass[] = [
  {
    id: "kids-dance",
    name: "Kids Dance Foundation",
    style: "Kids / Freestyle",
    ageGroup: "4–12 years",
    level: "Beginner",
    duration: "60 min",
    timing: "Mon & Wed, 5:00 PM",
    trainer: "Ajeet Sir",
    description:
      "Rhythm games, basic technique and mini stage routines that make shy kids shine.",
    price: 700,
    image: kids,
  },
  {
    id: "bollywood",
    name: "Bollywood Batch",
    style: "Bollywood",
    ageGroup: "10+ years",
    level: "All Levels",
    duration: "75 min",
    timing: "Tue & Thu, 7:00 PM",
    trainer: "Ajeet Sir",
    description:
      "Trending song choreography with expressions, formations and performance polish.",
    price: 1000,
    image: bollywood,
  },
  {
    id: "hip-hop",
    name: "Hip-Hop Crew",
    style: "Hip-Hop",
    ageGroup: "13+ years",
    level: "Beginner",
    duration: "75 min",
    timing: "Tue & Fri, 6:30 PM",
    trainer: "Riddhi & Ajeet Sir",
    description:
      "Groove foundations, drills and battle-ready freestyle sessions every week.",
    price: 1000,
    image: hiphop,
  },
  {
    id: "contemporary",
    name: "Contemporary Lab",
    style: "Contemporary",
    ageGroup: "15+ years",
    level: "Intermediate",
    duration: "90 min",
    timing: "Wed & Sat, 7:00 PM",
    trainer: "Aarav Sharma",
    description:
      "Technique, improvisation and choreography creation for expressive movers.",
    price: 2600,
    image: contemporary,
  },
  {
    id: "classical",
    name: "Semi Classical",
    style: "Classical",
    ageGroup: "6+ years",
    level: "All Levels",
    duration: "90 min",
    timing: "Sat, 9:00 AM",
    trainer: "Riddhi Shukla",
    description:
      "Graded classical syllabus with adavus, theory and annual arangetram preparation.",
    price: 2500,
    image: classical,
  },
  {
    id: "zumba",
    name: "Zumba Fitness",
    style: "Dance Fitness",
    ageGroup: "16+ years",
    level: "All Levels",
    duration: "45 min",
    timing: "Mon–Fri, 7:00 AM",
    trainer: "Riddhi Shukla",
    description:
      "Morning cardio dance that torches calories with Latin and Bollywood beats.",
    price: 1500,
    image: zumba,
  },
  {
    id: "wedding",
    name: "Wedding Choreography",
    style: "Sangeet / Couple",
    ageGroup: "All ages",
    level: "All Levels",
    duration: "Custom",
    timing: "Flexible slots",
    trainer: "Riddhi Patel",
    description:
      "Couple, family and squad sangeet sets choreographed to your song and skill level.",
    price: 8000,
    image: wedding,
  },
  {
    id: "personal",
    name: "Personal Dance Training",
    style: "Any style",
    ageGroup: "All ages",
    level: "All Levels",
    duration: "60 min",
    timing: "By appointment",
    trainer: "Assigned trainer",
    description:
      "One-on-one coaching for auditions, reels, exams or fast-track learning.",
    price: 1200,
    image: studio,
  },
];

export function normalizeClassImages(items: DanceClass[]): DanceClass[] {
  const localImages = new Map(danceClasses.map((item) => [item.id, item.image]));
  return items.map((item) => {
    const image = String(item.image ?? "");
    return image.includes("/") || image.startsWith("data:")
      ? item
      : { ...item, image: localImages.get(item.id) ?? bollywood };
  });
}

export type Trainer = {
  id: string;
  name: string;
  position: string;
  specialization: string;
  experience: string;
  achievements: string[];
  bio: string;
  image: string;
  instagram: string;
  youtube: string;
};

export const trainers: Trainer[] = [
  {
    id: "riddhi-shukla",
    name: "Riddhi Shukla",
    position: "Founder & Senior Trainer",
    specialization: "Bollywood, Fitness Zumba, Wedding Choreography, Hip-Hop, & Kids Training",
    experience: "4+ Years",
    achievements: [
      "Trained by Kings United India",
      "Trained 200+ students",
      "2+ years of fitness coaching experience", 
      "Social motivation for fitness and wellness",
      "Successfully organized and conducted Garba events"
    ],
    bio: "Riddhi Shukla is the Founder & Senior Instructor, passionate about dance, fitness, and wellness. With expertise in Hip-Hop, Bollywood, Semi-Classical, and Zumba, she brings together energetic movement, creative choreography, and fitness-focused training to create an engaging learning experience. She has trained 200+ students and continues to inspire people to embrace an active and healthy lifestyle. Her experience in conducting successful Garba events and promoting fitness and wellness reflects her dedication to building a vibrant and positive community through dance.",
    image: trainer2,
    instagram: "https://www.instagram.com/rds_dance_studio_satna/",
    youtube: "https://www.youtube.com/@riddhishukla9706",
  },
];

export type Batch = {
  id: string;
  day: string;
  time: string;
  className: string;
  style: string;
  ageGroup: string;
  trainer: string;
  level: Level;
  seatsLeft: number;
};

export const batches: Batch[] = [
  { id: "b1", day: "Monday", time: "5:00 PM", className: "Kids Dance Foundation", style: "Kids", ageGroup: "4–12", trainer: "Riddhi Patel", level: "Beginner", seatsLeft: 4 },
  { id: "b2", day: "Monday", time: "7:00 AM", className: "Zumba Fitness", style: "Dance Fitness", ageGroup: "16+", trainer: "Meera Iyer", level: "All Levels", seatsLeft: 9 },
  { id: "b3", day: "Tuesday", time: "6:30 PM", className: "Hip-Hop Crew", style: "Hip-Hop", ageGroup: "13+", trainer: "Aarav Sharma", level: "Beginner", seatsLeft: 6 },
  { id: "b4", day: "Tuesday", time: "7:00 PM", className: "Bollywood Batch", style: "Bollywood", ageGroup: "13+", trainer: "Riddhi Patel", level: "All Levels", seatsLeft: 3 },
  { id: "b5", day: "Wednesday", time: "5:00 PM", className: "Kids Dance Foundation", style: "Kids", ageGroup: "4–12", trainer: "Riddhi Patel", level: "Beginner", seatsLeft: 5 },
  { id: "b6", day: "Wednesday", time: "7:00 PM", className: "Contemporary Lab", style: "Contemporary", ageGroup: "15+", trainer: "Aarav Sharma", level: "Intermediate", seatsLeft: 2 },
  { id: "b7", day: "Thursday", time: "7:00 PM", className: "Bollywood Batch", style: "Bollywood", ageGroup: "13+", trainer: "Riddhi Patel", level: "All Levels", seatsLeft: 7 },
  { id: "b8", day: "Friday", time: "6:30 PM", className: "Hip-Hop Crew", style: "Hip-Hop", ageGroup: "13+", trainer: "Aarav Sharma", level: "Advanced", seatsLeft: 4 },
  { id: "b9", day: "Saturday", time: "9:00 AM", className: "Bharatanatyam Gurukul", style: "Classical", ageGroup: "6+", trainer: "Meera Iyer", level: "All Levels", seatsLeft: 8 },
  { id: "b10", day: "Saturday", time: "7:00 PM", className: "Contemporary Lab", style: "Contemporary", ageGroup: "15+", trainer: "Aarav Sharma", level: "Intermediate", seatsLeft: 5 },
];

export type GalleryItem = {
  id: string;
  image: string;
  title: string;
  category: "Classes" | "Events" | "Performances" | "Workshops" | "Competitions";
};

export const galleryItems: GalleryItem[] = [
  { id: "g1", image: studio, title: "Our main studio floor", category: "Classes" },
  { id: "g2", image: kids, title: "Kids batch warm-up", category: "Classes" },
  { id: "g3", image: bollywood, title: "Annual Bollywood showcase", category: "Performances" },
  { id: "g4", image: competition, title: "Inter-city championship win", category: "Competitions" },
  { id: "g5", image: workshop, title: "Guest choreographer workshop", category: "Workshops" },
  { id: "g6", image: wedding, title: "Sangeet night choreography", category: "Events" },
  { id: "g7", image: contemporary, title: "Contemporary solo showcase", category: "Performances" },
  { id: "g8", image: hiphop, title: "Hip-hop freestyle cypher", category: "Classes" },
  { id: "g9", image: classical, title: "Arangetram debut", category: "Performances" },
  { id: "g10", image: zumba, title: "Morning Zumba session", category: "Classes" },
];

export type VideoItem = {
  id: string;
  title: string;
  category: string;
  youtubeId: string;
  thumbnail: string;
};

export const videos: VideoItem[] = [
  { id: "v1", title: "Annual Day — Bollywood Medley", category: "Performances", youtubeId: "dQw4w9WgXcQ", thumbnail: bollywood },
  { id: "v2", title: "Hip-Hop Crew Choreography", category: "Choreography", youtubeId: "dQw4w9WgXcQ", thumbnail: hiphop },
  { id: "v3", title: "Contemporary — 'Kabira' Solo", category: "Student Performance", youtubeId: "dQw4w9WgXcQ", thumbnail: contemporary },
  { id: "v4", title: "Bharatanatyam Arangetram Highlights", category: "Performances", youtubeId: "dQw4w9WgXcQ", thumbnail: classical },
  { id: "v5", title: "Workshop Behind The Scenes", category: "Behind The Scenes", youtubeId: "dQw4w9WgXcQ", thumbnail: workshop },
  { id: "v6", title: "Sangeet Choreography Reel", category: "Choreography", youtubeId: "dQw4w9WgXcQ", thumbnail: wedding },
];

export type StudioEvent = {
  id: string;
  name: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  instructor: string;
  description: string;
  image: string;
  status: "Open" | "Few Seats" | "Full";
};

export const events: StudioEvent[] = [
  {
    id: "e1",
    name: "Bollywood Dance Workshop",
    date: "25 August 2026",
    time: "5:00 PM",
    duration: "2 Hours",
    location: "RDS Dance Studio,",
    instructor: "Riddhi Shukla",
    description:
      "Learn a full trending Bollywood routine in one high-energy session — open to all levels.",
    image: bollywood,
    status: "Open",
  },
  {
    id: "e2",
    name: "Hip-Hop Intensive",
    date: "7 September 2026",
    time: "4:00 PM",
    duration: "3 Hours",
    location: "RDS Dance Studio,Ashok vihar Colony Rajiv Park Satna MP ",
    instructor: "Riddhi Shukla",
    description:
      "Grooves, foundations and a freestyle cypher hosted with a visiting Mumbai crew.",
    image: hiphop,
    status: "Few Seats",
  },
  {
    id: "e3",
    name: "Navratri Garba Raas",
    date: "20 September 2026",
    time: "6:00 PM",
    duration: "90 Minutes",
    location: "KJS Park Bandhavghar Colony",
    instructor: "Riddhi Shukla",
    description:
      "Get festival-ready with traditional and fusion garba steps for the whole family.",
    image: classical,
    status: "Open",
  },
  {
    id: "e4",
    name: "Annual Showcase — Riddhi Rising",
    date: "12 December 2026",
    time: "6:00 PM",
    duration: "3 Hours",
    location: "RDS Dance Studio",
    instructor: "All Faculty",
    description:
      "Our yearly stage production featuring every batch, from kids to advanced crews.",
    image: competition,
    status: "Open",
  },
];

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  rating: number;
  quote: string;
  classAttended: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Sneha Kulkarni",
    role: "Student, 19",
    rating: 5,
    quote:
      "Riddhi Dance Studio has completely transformed my confidence and dancing skills. The trainers are extremely supportive and never let you feel like a beginner.",
    classAttended: "Contemporary Lab",
  },
  {
    id: "t2",
    name: "Rajesh Mehta",
    role: "Parent",
    rating: 5,
    quote:
      "My daughter joined the kids batch as a very shy child. Six months later she performed a solo on stage. That says everything about the coaching here.",
    classAttended: "Kids Dance Foundation",
  },
  {
    id: "t3",
    name: "Ankit & Pooja",
    role: "Sangeet couple",
    rating: 5,
    quote:
      "They choreographed our entire sangeet in three weeks around our travel schedule. Every guest asked which studio we trained with.",
    classAttended: "Wedding Choreography",
  },
  {
    id: "t4",
    name: "Farhan Qureshi",
    role: "Student, 24",
    rating: 5,
    quote:
      "The hip-hop batch feels like a crew, not a class. Structured drills, real freestyle practice and zero ego in the room.",
    classAttended: "Hip-Hop Crew",
  },
  {
    id: "t5",
    name: "Divya Raman",
    role: "Parent",
    rating: 5,
    quote:
      "Meera ma'am's classical training is authentic and disciplined. The syllabus and progress updates are genuinely professional.",
    classAttended: "Bharatanatyam Gurukul",
  },
];

export type Plan = {
  id: string;
  name: string;
  price: number;
  period: string;
  highlight?: boolean;
  features: string[];
};

export const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    price: 1800,
    period: "per month",
    features: ["8 classes / month", "1 dance style", "Beginner level", "Studio practice access"],
  },
  {
    id: "standard",
    name: "Standard",
    price: 2800,
    period: "per month",
    highlight: true,
    features: [
      "12 classes / month",
      "Up to 2 dance styles",
      "Performance opportunities",
      "Monthly progress feedback",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 4200,
    period: "per month",
    features: [
      "Unlimited classes",
      "All dance styles",
      "Personal guidance sessions",
      "Free workshop access",
      "Priority event registration",
    ],
  },
];

export const specialServices = [
  {
    id: "wedding",
    title: "Wedding Choreography",
    description: "Customised sangeet sets for couples, families and squads — any song, any skill level.",
  },
  {
    id: "corporate",
    title: "Corporate Events",
    description: "Performances, flash mobs and team dance workshops for offsites and annual days.",
  },
  {
    id: "schools",
    title: "School & College Workshops",
    description: "Structured dance programmes and competition training for institutions.",
  },
  {
    id: "personal",
    title: "Personal Training",
    description: "One-on-one coaching for auditions, reels, exams or fast-track learning.",
  },
  {
    id: "performances",
    title: "Event Performances",
    description: "Professional troupe performances for festivals, launches and private events.",
  },
];

export const faqs = [
  {
    q: "Do I need any prior dance experience to join?",
    a: "No. Most of our students start as complete beginners. Every style has a beginner-friendly batch where fundamentals are taught from scratch.",
  },
  {
    q: "How does the free trial class work?",
    a: "Pick a style, date and time on the trial booking page. We confirm your slot on WhatsApp, and you attend one full class with the regular batch at no cost.",
  },
  {
    q: "What is the minimum age for kids classes?",
    a: "Our kids programme starts at 4 years. Classes are grouped by age so training stays age-appropriate and safe.",
  },
  {
    q: "Can I learn more than one dance style?",
    a: "Yes. The Standard plan covers two styles and the Premium plan gives you unlimited access to every style on the timetable.",
  },
  {
    q: "Do you provide stage performance opportunities?",
    a: "Regular students perform at our annual showcase, competitions and community events. Standard and Premium members get priority casting.",
  },
  {
    q: "How are fees paid?",
    a: "Monthly fees are paid at the studio or via UPI. Quarterly and annual payments get a discount — ask us on WhatsApp for current offers.",
  },
  {
    q: "Do you choreograph weddings and private events?",
    a: "Yes. We handle sangeet, couple, family and corporate choreography with flexible rehearsal slots at the studio or your venue.",
  },
];

export const galleryCategories = [
  "All",
  "Classes",
  "Events",
  "Performances",
  "Workshops",
  "Competitions",
] as const;