/**
 * Central studio configuration.
 * Every business detail lives here so the studio can be updated in one place.
 */
export const siteConfig = {
  name: "Riddhi Dance Studio",
  tagline: "Move. Express. Inspire.",
  shortDescription:
    "A professional dance academy training kids, teens and adults across Bollywood, Hip-Hop, Contemporary, Classical and dance fitness.",
  phone: "+91 98765 43210",
  whatsapp: "919876543210",
  whatsappMessage:
    "Hello Riddhi Dance Studio, I would like to know more about your dance classes.",
  email: "hello@riddhidancestudio.com",
  address: {
    line1: "2nd Floor, Rhythm Plaza, FC Road",
    line2: "Shivajinagar, Pune, Maharashtra 411005",
    mapsQuery: "Rhythm Plaza FC Road Shivajinagar Pune",
  },
  hours: [
    { days: "Monday – Friday", time: "9:00 AM – 9:00 PM" },
    { days: "Saturday", time: "8:00 AM – 8:00 PM" },
    { days: "Sunday", time: "9:00 AM – 2:00 PM (workshops only)" },
  ],
  social: {
    instagram: "https://instagram.com/riddhidancestudio",
    facebook: "https://facebook.com/riddhidancestudio",
    youtube: "https://youtube.com/@riddhidancestudio",
  },
  stats: [
    { value: 500, suffix: "+", label: "Students Trained" },
    { value: 10, suffix: "+", label: "Dance Styles" },
    { value: 5, suffix: "+", label: "Professional Trainers" },
    { value: 50, suffix: "+", label: "Stage Performances" },
    { value: 100, suffix: "+", label: "Workshops Hosted" },
  ],
} as const;

export const whatsappLink = (message: string = siteConfig.whatsappMessage) =>
  `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;

export const mapsLink = () =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.address.mapsQuery)}`;

export const mapsEmbed = () =>
  `https://www.google.com/maps?q=${encodeURIComponent(siteConfig.address.mapsQuery)}&output=embed`;