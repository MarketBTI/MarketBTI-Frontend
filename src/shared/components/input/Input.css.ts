import { style } from '@vanilla-extract/css';
import { textStyles, vars } from '@/app/styles/theme.css';

export const wrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space[2],
  width: '100%',
  minWidth: 0,
  height: '44px',
  padding: `0 ${vars.space[3]}`,
  border: `1px solid ${vars.color.neutral[400]}`,
  borderRadius: vars.radius.xl,
  backgroundColor: vars.color.white,
  selectors: {
    '&:focus-within': { borderColor: vars.color.primary[500] },
  },
});

export const icon = style({
  flexShrink: 0,
  color: vars.color.neutral[800],
});

export const input = style([
  textStyles.body3,
  {
    flex: 1,
    width: '100%',
    minWidth: 0,
    height: '100%',
    padding: 0,
    border: 0,
    outline: 'none',
    backgroundColor: 'transparent',
    color: vars.color.neutral[900],
    '::placeholder': { color: vars.color.neutral[700], opacity: 1 },
    selectors: {
      '&::-webkit-search-cancel-button': { display: 'none' },
    },
  },
]);

export const clearButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: vars.space[4],
  height: vars.space[4],
  padding: 0,
  border: 0,
  borderRadius: vars.radius.xs,
  backgroundColor: 'transparent',
  color: vars.color.neutral[700],
  ':focus-visible': {
    outline: `2px solid ${vars.color.primary[700]}`,
    outlineOffset: 2,
  },
});
