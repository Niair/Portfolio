"use client";

import { motion } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  delay?: number;
}

export function TextReveal({
  text,
  className,
  as: Component = "span",
  delay = 0,
}: TextRevealProps) {
  const words = text.split(" ");

  return (
    <Component className={className}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          initial={{ y: "100%", opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            delay: delay + index * 0.04,
            duration: 0.35,
            ease: "easeOut",
          }}
          className="inline-block mr-1 align-baseline"
        >
          {word}
        </motion.span>
      ))}
    </Component>
  );
}
