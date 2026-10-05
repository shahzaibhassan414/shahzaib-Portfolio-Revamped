import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Flutter App Projects and Case Studies";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ title: alt, eyebrow: "Work" });
}
