import Container from "@/components/layout/Container";
import Skeleton from "@/components/ui/Skeleton";

export default function SearchLoading() {
  return (
    <main className="flex-1">
      <section className="bg-ink py-10 lg:py-14">
        <Container>
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 lg:flex-row lg:gap-2">
            <Skeleton className="h-14 bg-white/10 lg:flex-1" />
            <Skeleton className="h-14 bg-white/10 lg:w-56" />
            <Skeleton className="h-14 bg-white/10 lg:w-56" />
            <Skeleton className="h-14 w-full bg-white/10 lg:w-32" />
          </div>
        </Container>
      </section>

      <section className="py-12 lg:py-16">
        <Container>
          <Skeleton className="h-4 w-40" />
          <Skeleton className="mt-3 h-10 w-72" />
          <Skeleton className="mt-3 h-4 w-56" />
          <div className="mt-6 flex flex-wrap gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-9 w-28" />
            ))}
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-40" />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
