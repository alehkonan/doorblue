const instagramUrl = "https://instagram.com/doorbluespace";

export const site = {
  name: "Door Blue Space",
  shortName: "Doorblue",
  description: "Creative space in Tbilisi for events and community.",
  address: "14 Luarsab Botsvadze Street, Tbilisi",
  directions:
    "Pass the construction site. Use the Valeo entrance near the barrier, go to the 4th floor, turn right, and find the blue door.",
  links: {
    instagram: instagramUrl,
    announcements: "https://t.me/doorbluespace",
    contact: import.meta.env.VITE_TELEGRAM_CONTACT?.trim() || instagramUrl,
  },
  sourceUrl: "https://t.me/s/doorbluespace",
} as const;
