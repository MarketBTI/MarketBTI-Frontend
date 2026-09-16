import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { textStyles, vars } from '@/app/styles/theme.css';

const slideUp = keyframes({
  from: {
    transform: `translate(-50%, calc(100% + ${vars.space[8]} + env(safe-area-inset-bottom, 0px)))`,
    opacity: 0,
  },
  to: { transform: 'translate(-50%, 0)', opacity: 1 },
});

export const toast = recipe({
  base: [
    textStyles.title2,
    {
      position: 'fixed',
      bottom: `calc(${vars.space[6]} + env(safe-area-inset-bottom, 0px))`,
      left: '50%',
      transform: 'translateX(-50%)',
      animation: `${slideUp} 300ms cubic-bezier(0.22, 1, 0.36, 1) both`,
      '@media': {
        '(prefers-reduced-motion: reduce)': { animation: 'none' },
      },
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      width: `min(460px, calc(100% - ${vars.space[8]}))`,
      height: '60px',
      padding: `${vars.space[4]} ${vars.space[5]}`,
      borderRadius: vars.radius.xl,
      color: vars.color.white,
      boxShadow: '0 4px 6px rgb(0 0 0 / 20%)',
    },
  ],
  variants: {
    variant: {
      success: { backgroundColor: vars.color.primary[500] },
      error: { backgroundColor: vars.color.semantic[600] },
    },
  },
});

export const icon = style({ flexShrink: 0 });

export const message = style({
  flex: 1,
  minWidth: 0,
  overflowWrap: 'anywhere',
});

export const closeButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: vars.space[8],
  height: vars.space[8],
  padding: 0,
  border: 0,
  borderRadius: vars.radius.sm,
  backgroundColor: 'transparent',
  color: 'inherit',
});
