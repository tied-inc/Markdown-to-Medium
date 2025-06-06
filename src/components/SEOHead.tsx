import { useEffect } from "react";

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export function SEOHead({
  title = "Markdown to Medium",
  description = "Convert markdown to medium format easily with our intuitive editor",
  image = "/og-image.svg",
  url = window.location.href,
  type = "website",
}: SEOHeadProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (property: string, content: string) => {
      let meta = document.querySelector(
        `meta[property="${property}"]`,
      ) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("property", property);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    const updateNameMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(
        `meta[name="${name}"]`,
      ) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    // Update Open Graph tags
    updateMetaTag("og:title", title);
    updateMetaTag("og:description", description);
    updateMetaTag("og:image", image);
    updateMetaTag("og:url", url);
    updateMetaTag("og:type", type);

    // Update Twitter Card tags
    updateNameMetaTag("twitter:title", title);
    updateNameMetaTag("twitter:description", description);
    updateNameMetaTag("twitter:image", image);

    // Update standard meta tags
    updateNameMetaTag("description", description);
  }, [title, description, image, url, type]);

  return null;
}
