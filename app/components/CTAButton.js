import { ArrowRightIcon } from "./Icons";

export default function CTAButton({ href, children }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
    >
      <ArrowRightIcon className="h-4 w-4" />
      {children}
    </a>
  );
}

