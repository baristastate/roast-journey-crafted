import { createFileRoute } from "@tanstack/react-router";
import { HomeHero } from "@/components/home/HomeHero";
import { RoastJourney } from "@/components/home/RoastJourney";
import { CoffeeFinder } from "@/components/home/CoffeeFinder";
import { HeimroesterTeaser } from "@/components/home/HeimroesterTeaser";
import { CommunityPreview } from "@/components/home/CommunityPreview";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Barista State — Frisch gerösteter Kaffee & Heimrösten" },
      { name: "description", content: "Entdecke kuratierte Specialty-Kaffees von ausgewählten Röstereien und Heimröster, mit denen du Kaffee zuhause selbst röstest." },
      { property: "og:title", content: "Barista State — Roast Journey" },
      { property: "og:description", content: "Eine ruhige, moderne Coffee-Welt. Von der grünen Bohne bis in deine Tasse." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <HomeHero />
      <RoastJourney />
      <CoffeeFinder />
      <HeimroesterTeaser />
      <CommunityPreview />
    </>
  );
}
