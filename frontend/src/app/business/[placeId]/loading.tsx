import Container from "@/components/layout/Container";

export default function Loading() {
  return (
    <main className="flex-1 bg-surface py-8 lg:py-12 animate-pulse">
      <Container>
        {/* Breadcrumb Skeleton */}
        <div className="mb-6 h-4 w-48 bg-line rounded-sm" />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 items-start">
          <div className="space-y-8">
            <header>
              <div className="h-4 w-24 bg-line mb-3 rounded-sm" />
              <div className="h-10 md:h-12 w-3/4 bg-line mb-4 rounded-sm" />
              <div className="h-4 w-1/3 bg-line rounded-sm" />
            </header>

            <div className="bg-white border border-line p-6 lg:p-8">
              <ul className="space-y-6">
                {[...Array(4)].map((_, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="mt-1 size-9 bg-line shrink-0 rounded-sm" />
                    <div className="flex-1 space-y-2 py-1">
                      <div className="h-3 w-16 bg-line rounded-sm" />
                      <div className="h-4 w-1/2 bg-line rounded-sm" />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Map Column Skeleton */}
          <div className="space-y-4">
            <div className="border border-line bg-white p-2">
              <div className="w-full aspect-[4/3] bg-line rounded-sm" />
            </div>
            <div className="h-14 w-full bg-line rounded-sm" />
          </div>
        </div>
      </Container>
    </main>
  );
}
