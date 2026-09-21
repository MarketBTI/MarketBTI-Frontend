import { style } from '@vanilla-extract/css';
import { textStyles, vars } from '@/app/styles/theme.css';

export const sectionNavStyles = style([
  textStyles.subtitle1,
  {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'start',
    gap: '8px',
    height: '40px',
    color: vars.color.black,
    whiteSpace: 'nowrap',
    flexShrink: 0,
    padding: 0,
  },
]);

export const icon = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  lineHeight: 0,
});
