// Page scrolling that goes through Lenis when it's running, so programmatic scrolls
// don't fight the smooth-scroll loop. SmoothScroll registers the instance.

type Scroller = { scrollTo: (target: number, options?: { immediate?: boolean }) => void };

let lenis: Scroller | undefined;

export function setLenis(instance: Scroller | undefined) {
  lenis = instance;
}

export function scrollToY(y: number, { immediate = false } = {}) {
  if (lenis) {
    lenis.scrollTo(y, { immediate });
    return;
  }
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: y, behavior: immediate || reduce ? "instant" : "smooth" });
}
