import type { MDXComponents } from "mdx/types";
import Link from "next/link";

// Article typography for MDX posts, using the site tokens.
const components: MDXComponents = {
  h2: (props) => (
    <h2 className="mt-14 mb-4 text-[clamp(26px,2.8vw,32px)] leading-[1.15] font-extrabold tracking-[-0.02em] text-text" {...props} />
  ),
  h3: (props) => <h3 className="mt-10 mb-3 text-[22px] leading-[1.25] font-bold text-text" {...props} />,
  p: (props) => <p className="my-5" {...props} />,
  ul: (props) => <ul className="my-5 flex list-disc flex-col gap-2 pl-6 marker:text-muted" {...props} />,
  ol: (props) => <ol className="my-5 flex list-decimal flex-col gap-2 pl-6 marker:text-muted" {...props} />,
  a: ({ href = "", ...props }) =>
    href.startsWith("/") ? (
      <Link href={href} className="font-semibold text-accent underline underline-offset-2 hover:no-underline" {...props} />
    ) : (
      <a href={href} className="font-semibold text-accent underline underline-offset-2 hover:no-underline" {...props} />
    ),
  strong: (props) => <strong className="font-bold text-text" {...props} />,
  blockquote: (props) => <blockquote className="my-8 border-l-2 border-accent pl-5 text-text" {...props} />,
  code: (props) => (
    <code className="rounded-md bg-surface-2 px-1.5 py-0.5 font-mono text-[0.88em] text-text [font-variant-ligatures:none]" {...props} />
  ),
  pre: (props) => (
    <pre
      className="my-8 overflow-x-auto rounded-2xl border border-line bg-surface p-5 font-mono text-[15px] leading-[1.6] [font-variant-ligatures:none] [&_code]:bg-transparent [&_code]:p-0"
      {...props}
    />
  ),
  hr: () => <hr className="my-12 border-line" />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
