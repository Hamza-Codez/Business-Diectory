import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { getFeaturedPool } from "@/lib/api";
import { MESSAGES } from "@/constants/messages";
import { getLang } from "@/lib/i18n";
import FeaturedListingsGrid from "./FeaturedListingsGrid";

export default async function ListedBusinesses() {
  const lang = await getLang();
  const m = MESSAGES[lang].listed;
  let pool: Awaited<ReturnType<typeof getFeaturedPool>>;
  try {
    pool = await getFeaturedPool();
  } catch (e) {
    // Pool couldn't be assembled this request (e.g. upstream rate limit) —
    // hide the section now; the next request retries since failures aren't cached.
    console.warn("ListedBusinesses: featured pool unavailable", e);
    return null;
  }

  if (!pool || pool.length < 3) {
    return null;
  }

  return (
    <section className="bg-surface py-12 lg:py-16 border-t border-line">
      <Container>
        <div className="mb-10 flex gap-2">
          <div className="size-4 bg-ink" aria-hidden="true" />
          <div className="size-4 bg-primary" aria-hidden="true" />
        </div>
        <SectionHeading
          eyebrow={m.eyebrow}
          title={m.title}
          subtitle={m.subtitle}
        />
        <FeaturedListingsGrid pool={pool} />

        <div className="mt-12 flex justify-center">
          <Button href="/search" variant="primary">
            {m.viewAll}
          </Button>
        </div>
      </Container>
    </section>
  );
}
