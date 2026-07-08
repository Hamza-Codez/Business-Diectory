import Link from "next/link";
import Image from "next/image";
import type { Business } from "@/types";
import { getBusinessImage } from "@/lib/utils";

export default function BusinessOffsetCard({ business }: { business: Business }) {
  const imgSrc = getBusinessImage(business);

  return (
    <div className="group relative block w-full focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 rounded-sm">
      <Link href={`/business/${encodeURIComponent(business.id)}`} className="absolute inset-0 z-10 rounded-sm">
        <span className="sr-only">View details for {business.name}</span>
      </Link>

      {/* Container establishes height based on the red box */}
      <div className="relative flex items-center h-28 sm:h-32 w-full pointer-events-none">
        {/* Dark Box (Background) */}
        <div className="absolute right-0 top-2 bottom-2 sm:top-3 sm:bottom-3 left-6 sm:left-10 bg-ink z-0 flex flex-col justify-center pl-[5rem] sm:pl-[5.5rem] pr-4 rounded-r-sm transition-colors duration-300 group-hover:bg-[#1a1a1a]">
          <h3 className="text-white font-bold text-sm sm:text-base line-clamp-1 group-hover:text-primary-light transition-colors">
            {business.name}
          </h3>
          <div className="relative z-20 pointer-events-auto w-fit mt-1">
            <Link
              href={`/search?category=${business.category}`}
              className="text-white/80 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light text-xs capitalize line-clamp-1 transition-colors"
            >
              {business.category.replace(/-/g, " ")}
            </Link>
          </div>
          {business.address?.city && (
            <p className="text-white/50 text-[10px] mt-0.5 line-clamp-1">
              {business.address.city}
              {business.address.prefecture && `, ${business.address.prefecture}`}
            </p>
          )}
        </div>

        {/* Red Box (Foreground) */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-28 bg-primary p-2 z-10 shadow-lg rounded-sm transition-transform duration-300 group-hover:-translate-y-1">
          <div className="relative w-full h-full bg-white overflow-hidden shadow-inner">
            <Image
              src={imgSrc}
              alt=""
              fill
              sizes="(max-width: 640px) 96px, 112px"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
