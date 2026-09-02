/**
 * Central studio configuration.
 * Every business detail lives here so the studio can be updated in one place.
 */
export const siteConfig = {
  name: "Riddhi Dance Studio",
  tagline: "Move. Express. Inspire.",
  shortDescription:
    "A professional dance academy training kids, teens and adults across Bollywood, Hip-Hop, Contemporary, Classical and dance fitness.",
  phone: "+91 7024626760",
  whatsapp: "7024626760",
  whatsappMessage: "Hello Riddhi Dance Studio, I would like to know more about your dance classes.",
  email: "riddhshukla9706@gmail.com",
  address: {
    line1: "Ashok Vihar Colony Rajiv park ",
    line2: "Satna Madhya Pradesh 485001 ",
    mapsQuery: "Riddhi Dance Studio Satna ",
  },
  hours: [
    { days: "Monday – Friday", time: "9:00 AM – 9:00 PM" },
    { days: "Saturday", time: "8:00 AM – 8:00 PM" },
    { days: "Sunday", time: "9:00 AM – 2:00 PM (workshops only)" },
  ],
  social: {
    instagram:
      "https://www.instagram.com/rds_dance_studio_satna?igsh=czQ3ZzQ1cmN1azJj&igsi=czQ3ZzQ1cmN1azJj",
    facebook: "https://www.facebook.com/Rdsdancestudiosatna",
    youtube: "https://youtube.com/@riddhishukla9706?si=rlOftPpMqzwwKEl-",
  },
  stats: [
    { value: 200, suffix: "+", label: "Students Trained" },
    { value: 10, suffix: "+", label: "Dance Styles" },
    { value: 2, suffix: "+", label: "Professional Trainers" },
    { value: 50, suffix: "+", label: "Stage Performances" },
    { value: 50, suffix: "+", label: "Workshops Hosted" },
  ],
} as const;

export const whatsappLink = (message: string = siteConfig.whatsappMessage) =>
  `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;

export const mapsLink = () =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.address.mapsQuery)}`;

export const mapsEmbed = () =>
  `https://www.google.com/maps?q=${encodeURIComponent(siteConfig.address.mapsQuery)}&output=embed`;
