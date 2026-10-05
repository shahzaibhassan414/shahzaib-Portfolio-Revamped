import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Tell me about your app";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ title: alt, eyebrow: "Contact" });
}
