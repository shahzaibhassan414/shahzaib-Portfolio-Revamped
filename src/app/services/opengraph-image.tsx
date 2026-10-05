import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Flutter app development, rescue, and maintenance";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ title: alt, eyebrow: "Services" });
}
