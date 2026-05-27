import { motion, useInView } from 'framer-motion';
import { useMemo, useRef } from 'react';

const ease = [0.16, 1, 0.3, 1] as const;

type WordsPullUpProps = {
  text: string;
  className?: string;
  wordClassName?: string;
  showAsterisk?: boolean;
};

export function WordsPullUp({
  text,
  className,
  wordClassName,
  showAsterisk = false,
}: WordsPullUpProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const words = useMemo(() => text.split(' '), [text]);

  return (
    <div ref={ref} className={className}>
      <div className="inline-flex flex-wrap">
        {words.map((word, index) => {
          const isLast = index === words.length - 1;

          return (
            <span key={`${word}-${index}`} className="overflow-hidden pb-[0.12em] pr-[0.12em]">
              <motion.span
                className={`relative inline-block ${wordClassName ?? ''}`.trim()}
                initial={{ y: 20, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.7, delay: index * 0.08, ease }}
              >
                {word}
                {showAsterisk && isLast ? (
                  <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em] leading-none">
                    *
                  </span>
                ) : null}
              </motion.span>{' '}
            </span>
          );
        })}
      </div>
    </div>
  );
}

type Segment = {
  text: string;
  className?: string;
};

type WordsPullUpMultiStyleProps = {
  segments: Segment[];
  className?: string;
};

export function WordsPullUpMultiStyle({
  segments,
  className,
}: WordsPullUpMultiStyleProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const words = useMemo(
    () =>
      segments.flatMap((segment) =>
        segment.text.split(' ').map((word) => ({ word, className: segment.className })),
      ),
    [segments],
  );

  return (
    <div ref={ref} className={className}>
      <div className="inline-flex flex-wrap justify-center">
        {words.map(({ word, className: segmentClass }, index) => (
          <span key={`${word}-${index}`} className="overflow-hidden pb-[0.12em] pr-[0.18em]">
            <motion.span
              className={`inline-block ${segmentClass ?? ''}`.trim()}
              initial={{ y: 20, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: index * 0.08, ease }}
            >
              {word}
            </motion.span>{' '}
          </span>
        ))}
      </div>
    </div>
  );
}
