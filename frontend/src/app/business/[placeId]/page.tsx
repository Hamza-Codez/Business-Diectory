import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock, ExternalLink, MapPin, Phone } from "lucide-react";
import { getBusinessById, searchBusinesses } from "@/lib/api";
import { getStaticMapUrl } from "@/lib/adapters/geoapify";
import { getBusinessImage } from "@/lib/utils";
import Container from "@/components/layout/Container";
import BusinessCard from "@/components/cards/BusinessCard";
import MapBlock from "@/components/business/MapBlock";
import { CATEGORIES, categoryLabel } from "@/constants/categories";

export async function generateMetadata({ params }: { params: Promise<{ placeId: string }> }) {
  const { placeId } = await params;
  const business = await getBusinessById(decodeURIComponent(placeId));
  if (!business) return { title: "Not Found" };
  const catName = categoryLabel(CATEGORIES.find((c) => c.slug === business.category)!, "en");
  const city = business.address.city ? ` in ${business.address.city}` : "";
  const title = `${business.name} — ${catName}${city} | Business Directory`;
  const desc = [business.address.formatted, business.phone].filter(Boolean).join(" • ");
  
  return {
    title,
    description: desc || `Details for ${business.name}`,
  };
}

export default async function BusinessDetail({ params }: { params: Promise<{ placeId: string }> }) {
  const { placeId } = await params;
  const business = await getBusinessById(decodeURIComponent(placeId));
  if (!business) {
    notFound();
  }

  const categoryDef = CATEGORIES.find((c) => c.slug === business.category);
  const catName = categoryDef ? categoryLabel(categoryDef, "en") : business.category;

  // Nearby strip
  let nearby: typeof business[] = [];
  if (business.geo) {
    const res = await searchBusinesses({
      category: business.category,
      location: `${business.geo.lat},${business.geo.lng}`,
      limit: 8,
    });
    if (res.status === "ok") {
      nearby = res.businesses.filter(b => b.id !== business.id).slice(0, 4);
    }
  }

  return (
    <main className="flex-1 bg-surface py-8 lg:py-12">
      <Container>
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-body font-mono">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href={`/search?category=${business.category}`} className="hover:text-primary transition-colors capitalize">
            {catName}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{business.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 items-start">
          <div className="space-y-8">
            <header>
              <Link 
                href={`/search?category=${business.category}`}
                className="font-mono text-sm uppercase tracking-widest text-primary hover:text-primary-dark transition-colors inline-block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary mb-3"
              >
                {catName}
              </Link>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-ink leading-tight">
                {business.name}
              </h1>
              {(business.address.city || business.address.prefecture) && (
                <p className="mt-4 font-mono text-muted flex items-center gap-2">
                  <MapPin size={16} aria-hidden="true" />
                  {[business.address.city, business.address.prefecture].filter(Boolean).join(", ")}
                </p>
              )}
            </header>

            <div className="bg-white border border-line p-6 lg:p-8">
              <ul className="space-y-6">
                {business.address.formatted && (
                  <li className="flex gap-4">
                    <div className="mt-1 bg-surface p-2 shrink-0">
                      <MapPin size={20} aria-hidden="true" className="text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xs uppercase tracking-widest font-mono text-muted mb-1">Address</h2>
                      <p className="font-mono text-ink leading-relaxed">{business.address.formatted}</p>
                    </div>
                  </li>
                )}
                
                {business.phone && (
                  <li className="flex gap-4">
                    <div className="mt-1 bg-surface p-2 shrink-0">
                      <Phone size={20} aria-hidden="true" className="text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xs uppercase tracking-widest font-mono text-muted mb-1">Phone</h2>
                      <a href={`tel:${business.phone.replace(/[^\d+]/g, "")}`} className="font-mono text-ink hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                        {business.phone}
                      </a>
                    </div>
                  </li>
                )}

                {business.hours && (
                  <li className="flex gap-4">
                    <div className="mt-1 bg-surface p-2 shrink-0">
                      <Clock size={20} aria-hidden="true" className="text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xs uppercase tracking-widest font-mono text-muted mb-1">Hours</h2>
                      <p className="font-mono text-ink leading-relaxed">{business.hours}</p>
                    </div>
                  </li>
                )}

                {business.website && (
                  <li className="flex gap-4">
                    <div className="mt-1 bg-surface p-2 shrink-0">
                      <ExternalLink size={20} aria-hidden="true" className="text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xs uppercase tracking-widest font-mono text-muted mb-1">Website</h2>
                      <a 
                        href={business.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="font-mono text-ink hover:text-primary transition-colors flex items-center gap-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      >
                        Visit site <ExternalLink size={14} />
                      </a>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Map / Image Anchor Column */}
          {business.geo ? (
            <MapBlock 
              lat={business.geo.lat} 
              lng={business.geo.lng} 
              name={business.name} 
              mapUrl={getStaticMapUrl(business.geo.lat, business.geo.lng)} 
            />
          ) : (
            <div className="space-y-4">
              <div className="border border-line bg-white p-2">
                <div className="relative w-full aspect-[4/3] bg-surface flex items-center justify-center overflow-hidden">
                  <Image
                    src={getBusinessImage(business) || ""}
                    alt={`Image for ${business.name}`}
                    width={640}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.name + " " + business.address.formatted)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full py-4 px-6 border-2 border-primary text-primary font-mono text-sm uppercase tracking-widest hover:bg-primary hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                Get directions
              </a>
            </div>
          )}
        </div>

        {/* Nearby Strip */}
        {nearby.length >= 2 && (
          <div className="mt-24 pt-12 border-t border-line">
            <h2 className="text-2xl font-bold text-ink mb-8">
              More in {catName} {business.address.city ? `near ${business.address.city}` : "nearby"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {nearby.map((biz) => (
                <BusinessCard key={biz.id} business={biz} />
              ))}
            </div>
          </div>
        )}
      </Container>
      
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: business.name,
            ...(business.address.formatted && { address: business.address.formatted }),
            ...(business.phone && { telephone: business.phone }),
            ...(business.website && { url: business.website }),
            ...(business.geo && {
              geo: {
                "@type": "GeoCoordinates",
                latitude: business.geo.lat,
                longitude: business.geo.lng,
              },
            }),
          }),
        }}
      />
    </main>
  );
}
