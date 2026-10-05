import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "The developer behind the apps";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ title: alt, eyebrow: "About" });
}
