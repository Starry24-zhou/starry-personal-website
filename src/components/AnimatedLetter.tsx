import { motion, type MotionValue, useTransform } from 'framer-motion';

type AnimatedLetterProps = {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
};

export function AnimatedLetter({ char, index, total, progress }: AnimatedLetterProps) {
  const charProgress = index / total;
  const opacity = useTransform(progress, [charProgress - 0.1, charProgress + 0.05], [0.2, 1]);

  return <motion.span style={{ opacity }}>{char === ' ' ? '\u00A0' : char}</motion.span>;
}
