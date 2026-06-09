import { useScroll, useTransform, motion } from "framer-motion";

export function CupProgress() {
  const { scrollYProgress } = useScroll();
  const fill = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);
  return (
    <div className="fixed bottom-5 right-5 z-40 hidden md:block pointer-events-none">
      <div className="relative h-12 w-9 rounded-b-[18px] rounded-t-md border border-foreground/30 overflow-hidden bg-background/60 backdrop-blur">
        <motion.div className="absolute inset-x-0 bottom-0 bg-amber" style={{ top: fill }} />
      </div>
    </div>
  );
}
