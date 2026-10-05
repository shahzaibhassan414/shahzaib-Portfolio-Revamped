"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * A screenshot that only starts downloading when its frame is near the viewport. The
 * browser's own lazy loading uses a margin of up to 2500px on slow connections, which
 * pulled every rail and tile image into the first page load. Cards scrolled sideways in
 * the rail wait until the rail brings them close. The tinted frame shows until then.
 */
export function ScreenImage({ src, alt, sizes }: { src: string; alt: string; sizes: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [near, setNear] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setNear(true);
        io.disconnect();
      },
      { rootMargin: "800px 400px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span ref={ref} className="absolute inset-0">
      {near && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          onLoad={() => setLoaded(true)}
          className={`object-cover transition-opacity duration-300 motion-reduce:transition-none ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element -- no-JS fallback */}
        <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
      </noscript>
    </span>
  );
}
