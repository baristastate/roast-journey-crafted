import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Variant = "rise" | "fade" | "blur" | "scale" | "left" | "right" | "mask";

const VARIANTS: Record<Variant, Variants> = {
  rise: {
    hidden: { opacity: 0, y: 60, filter: "blur(12px)", scale: 0.98 },
    visible: {
      opacity: 1, y: 0, filter: "blur(0px)", scale: 1,
      transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
    },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(18px)" },
    visible: { opacity: 1, filter: "blur(0px)", transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
  },
  left: {
    hidden: { opacity: 0, x: -80, filter: "blur(8px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
  },
  right: {
    hidden: { opacity: 0, x: 80, filter: "blur(8px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
  },
  mask: {
    hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
    visible: {
      opacity: 1, clipPath: "inset(0 0% 0 0)",
      transition: { duration: 1.1, ease: [0.77, 0, 0.18, 1] },
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
      viewport={{ once, margin: "-80px" }}
      variants={VARIANTS[variant]}
      transition={{ delay }}
      className={className}
    >
      {children}
    </Comp>
  );
}
