export interface OGPOptions {
  title: string;
  description?: string;
  author?: string;
  theme?: "light" | "dark";
}

export function generateOGPImageURL(options: OGPOptions): string {
  const params = new URLSearchParams({
    title: options.title,
    description: options.description || "",
    author: options.author || "",
    theme: options.theme || "light",
  });

  // In a real application, you might use a service like Vercel OG or similar
  // For now, we'll return the static image
  return `/og-image.svg?${params.toString()}`;
}

export function generateOGPImageSVG(options: OGPOptions): string {
  const { title, description = "", theme = "light" } = options;

  const isDark = theme === "dark";
  const textColor = isDark ? "#ffffff" : "#1f2937";
  const subtitleColor = isDark ? "#d1d5db" : "#6b7280";

  return `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          ${
            isDark
              ? '<stop offset="0%" style="stop-color:#1f2937;stop-opacity:1" /><stop offset="100%" style="stop-color:#111827;stop-opacity:1" />'
              : '<stop offset="0%" style="stop-color:#667eea;stop-opacity:1" /><stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />'
          }
        </linearGradient>
        <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          ${
            isDark
              ? '<stop offset="0%" style="stop-color:#374151;stop-opacity:0.95" /><stop offset="100%" style="stop-color:#1f2937;stop-opacity:0.95" />'
              : '<stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.95" /><stop offset="100%" style="stop-color:#f8fafc;stop-opacity:0.95" />'
          }
        </linearGradient>
      </defs>

      <rect width="1200" height="630" fill="url(#bgGradient)"/>

      <circle cx="100" cy="100" r="50" fill="rgba(255,255,255,0.1)"/>
      <circle cx="1100" cy="530" r="80" fill="rgba(255,255,255,0.1)"/>
      <circle cx="200" cy="500" r="30" fill="rgba(255,255,255,0.15)"/>
      <circle cx="1000" cy="150" r="40" fill="rgba(255,255,255,0.1)"/>

      <rect x="150" y="100" width="900" height="430" rx="20" fill="url(#cardGradient)" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>

      <g transform="translate(200, 150)">
        <rect x="0" y="0" width="80" height="60" rx="8" fill="#374151" stroke="#6b7280" stroke-width="2"/>
        <text x="40" y="35" text-anchor="middle" fill="white" font-family="monospace" font-size="14" font-weight="bold">MD</text>
      </g>

      <g transform="translate(320, 170)">
        <path d="M0 10 L40 10 M30 0 L40 10 L30 20" stroke="#6366f1" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      </g>

      <g transform="translate(400, 150)">
        <circle cx="40" cy="30" r="30" fill="#00ab6c"/>
        <text x="40" y="38" text-anchor="middle" fill="white" font-family="serif" font-size="20" font-weight="bold">M</text>
      </g>

      <text x="600" y="280" text-anchor="middle" fill="${textColor}" font-family="system-ui, -apple-system, sans-serif" font-size="48" font-weight="bold">
        ${title.length > 30 ? `${title.substring(0, 30)}...` : title}
      </text>

      ${
        description
          ? `
        <text x="600" y="320" text-anchor="middle" fill="${subtitleColor}" font-family="system-ui, -apple-system, sans-serif" font-size="24">
          ${description.length > 60 ? `${description.substring(0, 60)}...` : description}
        </text>
      `
          : ""
      }

      <g transform="translate(250, 380)">
        <circle cx="0" cy="0" r="4" fill="#10b981"/>
        <text x="15" y="5" fill="${textColor}" font-family="system-ui, -apple-system, sans-serif" font-size="18">Intuitive Editor</text>
      </g>

      <g transform="translate(450, 380)">
        <circle cx="0" cy="0" r="4" fill="#10b981"/>
        <text x="15" y="5" fill="${textColor}" font-family="system-ui, -apple-system, sans-serif" font-size="18">Real-time Preview</text>
      </g>

      <g transform="translate(650, 380)">
        <circle cx="0" cy="0" r="4" fill="#10b981"/>
        <text x="15" y="5" fill="${textColor}" font-family="system-ui, -apple-system, sans-serif" font-size="18">Easy Export</text>
      </g>

      <rect x="0" y="580" width="1200" height="50" fill="rgba(255,255,255,0.1)"/>
      <text x="600" y="610" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-family="system-ui, -apple-system, sans-serif" font-size="16">
        markdown-to-medium.com
      </text>
    </svg>
  `.trim();
}

export function downloadOGPImage(
  options: OGPOptions,
  filename = "og-image.svg",
): void {
  const svgContent = generateOGPImageSVG(options);
  const blob = new Blob([svgContent], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
