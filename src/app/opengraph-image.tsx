import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Mobile apps that hold up in production";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ title: alt });
}
