import { Leaf } from "lucide-react";
import Link from "next/link";

export function Logo({ inSidebar = false }: { inSidebar?: boolean }) {
  return (
    <Link href="/dashboard" className="flex items-center gap-2">
      <Leaf className="h-6 w-6 text-primary" />
      <span
        className={`text-xl font-semibold font-headline transition-opacity duration-300 ${
          inSidebar
            ? "group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:w-0"
            : ""
        }`}
      >
        Breathe Easy
      </span>
    </Link>
  );
}
