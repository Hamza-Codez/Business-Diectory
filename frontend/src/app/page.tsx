import Hero from "@/components/sections/Hero";
import FeaturedCategories from "@/components/sections/FeaturedCategories";
import SearchBand from "@/components/sections/SearchBand";
import RandomCategoryGrid from "@/components/sections/RandomCategoryGrid";
import ListedBusinesses from "@/components/sections/ListedBusinesses";
import ConnectCta from "@/components/sections/ConnectCta";
import PopularCategories from "@/components/sections/PopularCategories";
import RecentArticles from "@/components/sections/RecentArticles";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import { getLang } from "@/lib/i18n";

export default async function Home() {
  const lang = await getLang();
  return (
    <main className="flex-1">
      <Hero />
      <FeaturedCategories />
      <SearchBand />
      <RandomCategoryGrid lang={lang} />
      <ListedBusinesses />
      <ConnectCta />
      <PopularCategories />
      <RecentArticles />
      <WhyChooseUs />
    </main>
  );
}
