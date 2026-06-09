import { createFileRoute } from "@tanstack/react-router";
import { HomeHero } from "@/components/home/HomeHero";
import { RoastJourney } from "@/components/home/RoastJourney";
import { ManifestoStrip } from "@/components/home/ManifestoStrip";
import { CoffeeFinder } from "@/components/home/CoffeeFinder";
import { HeimroesterTeaser } from "@/components/home/HeimroesterTeaser";
import { CommunityPreview } from "@/components/home/CommunityPreview";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Barista State — Frisch gerösteter Kaffee & Heimrösten" },
      {
        name: "description",
        content:
          "Specialty Coffee für zu Hause. Kuratierte Kaffees von 12 deutschen Röstereien und Heimröster — frisch geröstet, direkt geliefert.",
      },
      { property: "og:title", content: "Barista State — Specialty Coffee, endlich für zu Hause" },
      {
        property: "og:description",
        content: "Von der grünen Bohne bis in deine Tasse. Barista State.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <HomeHero />
      <RoastJourney />
      <ManifestoStrip />
      <CoffeeFinder />
      <HeimroesterTeaser />
      <CommunityPreview />
    </>
  );
}
