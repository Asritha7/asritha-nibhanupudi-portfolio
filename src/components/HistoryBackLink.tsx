import type { MouseEvent } from "react";

type HistoryBackLinkProps = {
  href: string;
  label: string;
  className?: string;
};

export function HistoryBackLink({
  href,
  label,
  className = "mono-label hover:!text-terra focus-visible:!text-terra rounded-[3px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra",
}: HistoryBackLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey
    ) {
      return;
    }

    if (typeof window !== "undefined" && window.history.length > 1) {
      event.preventDefault();
      window.history.back();
    }
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {label}
    </a>
  );
}