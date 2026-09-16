import { style } from '@vanilla-extract/css';
import { textStyles, vars } from '@/app/styles/theme.css';

export const chip = style([
  textStyles.caption2,
  {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `${vars.space[1]} ${vars.space[3]}`,
    border: `1px solid ${vars.color.neutral[400]}`,
    borderRadius: vars.radius['3xl'],
    backgroundColor: vars.color.neutral[100],
    color: vars.color.neutral[800],
    whiteSpace: 'nowrap',
  },
]);
