'use client';

import { LodingBackgroundIcon, LodingMascotIcon } from '@/assets';
import { motion, useReducedMotion } from 'framer-motion';

const DiagnosingSection = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className='flex w-full flex-col items-center' aria-label='상권 위험 진단 중'>
      <div className='relative isolate h-80 w-full' aria-hidden='true'>
        <div className='absolute top-[68%] left-1/2 z-0 -translate-x-1/2 -translate-y-1/2'>
          <motion.div
            animate={
              shouldReduceMotion
                ? { x: 0, y: 0, opacity: 0.5 }
                : {
                    x: [80, -80],
                    y: [45, -45],
                    opacity: [0, 0, 0.4, 1, 1, 0.4, 0, 0],
                  }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : {
                    x: { duration: 4, ease: 'linear', repeat: Infinity },
                    y: { duration: 4, ease: 'linear', repeat: Infinity },
                    opacity: {
                      duration: 4,
                      ease: 'easeInOut',
                      repeat: Infinity,
                      times: [0, 0.0625, 0.22, 0.4, 0.65, 0.82, 0.9375, 1],
                    },
                  }
            }
          >
            <LodingBackgroundIcon className='block' />
          </motion.div>
        </div>
        <div className='absolute inset-0 z-10 flex items-center justify-center'>
          <motion.div
            animate={shouldReduceMotion ? { y: 0 } : { y: [0, -12, 0], scaleY: [1, 1.025, 1] }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.9, ease: 'easeInOut', repeat: Infinity }
            }
          >
            <LodingMascotIcon className='origin-bottom' />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DiagnosingSection;
