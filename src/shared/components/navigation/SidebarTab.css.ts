import { style } from '@vanilla-extract/css';
import { textStyles, vars } from '@/app/styles/theme.css';

export const sidebarTab = style([
  textStyles.subtitle2,
  {
    display: 'flex',
    alignItems: 'center',
    gap: vars.space[3],
    width: '100%',
    height: '44px',
    padding: `0 ${vars.space[3]}`,
    borderRadius: vars.radius.lg,
    backgroundColor: 'transparent',
    color: vars.color.neutral[900],
    textDecoration: 'none',
    transition: 'background-color 150ms ease-in-out, color 150ms ease-in-out',
    textAlign: 'left',
    whiteSpace: 'nowrap',
    ':hover': {
      backgroundColor: vars.color.primary[100],
    },
    ':focus-visible': {
      outline: `2px solid ${vars.color.primary[700]}`,
      outlineOffset: 2,
    },
    selectors: {
      '&[data-collapsed]': {
        justifyContent: 'start',
        width: '100%',
        minWidth: '44px',
        height: '44px',
      },
      '&[data-active]': {
        backgroundColor: vars.color.primary[200],
        color: vars.color.primary[900],
      },
    },
  },
]);

export const icon = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
});
