import heroDesktopImage from "@/assets/hero-dance-desktop.webp";

const siteUrl = "https://www.riddhidancestudio.com";
const defaultImage = `${siteUrl}${heroDesktopImage}`;

export function createSeoHead({
  title,
  description,
  path,
  image = defaultImage,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
}) {
  const url = `${siteUrl}${path}`;

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:type", content: type },
      { property: "og:image", content: image },
      { property: "og:site_name", content: "Riddhi Dance Studio" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export { siteUrl };
