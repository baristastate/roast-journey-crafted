import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Variant = "rise" | "fade" | "blur" | "scale" | "left" | "right" | "mask";

const EASE = [0.22, 1, 0.36, 1] as const;

const VARIANTS: Record<Variant, Variants> = {
  rise: {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.7, ease: EASE } },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.9, ease: EASE } },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: EASE } },
  },
  left: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } },
  },
  right: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } },
  },
  mask: {
    hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
    visible: {
      opacity: 1, clipPath: "inset(0 0% 0 0)",
      transition: { duration: 0.95, ease: [0.77, 0, 0.18, 1] },
    },
  },
};

export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
  variant = "rise",
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "span" | "h1" | "h2" | "h3" | "p" | "li" | "article";
  variant?: Variant;
  once?: boolean;
}) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-15% 0px -10% 0px" }}
      variants={VARIANTS[variant]}
      transition={{ delay }}
      className={className}
    >
      {children}
    </Comp>
  );
}
