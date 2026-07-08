"use client";

import { useState } from "react";
import Image from "next/image";

export default function MapBlock({
  lat,
  lng,
  name,
  mapUrl,
}: {
  lat: number;
  lng: number;
  name: string;
  mapUrl: string;
}) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="space-y-4">
      <div className="border border-line bg-white p-2">
        <div className="relative w-full aspect-[4/3] bg-surface flex items-center justify-center overflow-hidden">
          {!hasError ? (
            <Image
              src={mapUrl}
              alt={`Map showing location of ${name}`}
              width={640}
              height={400}
              className="w-full h-full object-cover"
              unoptimized
              onError={() => setHasError(true)}
            />
          ) : (
            <iframe
              title={`Map showing location of ${name}`}
              loading="lazy"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.006},${lat - 0.004},${lng + 0.006},${lat + 0.004}&layer=mapnik&marker=${lat},${lng}`}
              className="w-full h-full border border-line rounded-none"
            />
          )}
        </div>
      </div>
      <a
        href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-full py-4 px-6 border-2 border-primary text-primary font-mono text-sm uppercase tracking-widest hover:bg-primary hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      >
        Get directions
      </a>
    </div>
  );
}
