import Image from "next/image";
import { site } from "@/content/site";

// Placeholder until the homepage is built from design/home.html (see CLAUDE.md, build order step 2).
export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
      <Image src="/brand/logo-mark.svg" alt="" width={72} height={72} priority />
      <h1 className="text-4xl font-extrabold tracking-tight">{site.name}</h1>
      <p className="text-lg text-muted">{site.role}. New site in progress.</p>
    </main>
  );
}
