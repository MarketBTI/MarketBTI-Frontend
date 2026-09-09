import { recipe } from '@vanilla-extract/recipes';
import { textStyles, vars } from '@/app/styles/theme.css';
import { style } from '@vanilla-extract/css';

const buttonSizeStyles = {
  sm: style([textStyles.body2, { height: '36px' }]),
  md: style([textStyles.subtitle2, { height: '44px' }]),
  lg: style([textStyles.title3, { minHeight: '52px' }]),
};

export const buttonRecipe = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: vars.space[2],
    border: '1px solid transparent',
    borderRadius: vars.radius.lg,
    padding: `${vars.space[2]} ${vars.space[3]}`,
    transition:
      'background-color 150ms ease-in-out, border-color 150ms ease-in-out, color 150ms ease-in-out',
    whiteSpace: 'nowrap',

    selectors: {
      '&:disabled': {
        borderColor: vars.color.neutral[600],
        backgroundColor: vars.color.neutral[600],
        color: vars.color.white,
      },
    },
  },

  variants: {
    variant: {
      primary: {
        backgroundColor: vars.color.primary[700],
        borderColor: vars.color.primary[700],
        color: vars.color.white,

        selectors: {
          '&:not(:disabled):hover': {
            backgroundColor: vars.color.primary[800],
            borderColor: vars.color.primary[800],
          },
          '&:not(:disabled):active': {
            backgroundColor: vars.color.primary[900],
            borderColor: vars.color.primary[900],
          },
        },
      },

      outline: {
        backgroundColor: vars.color.white,
        borderColor: vars.color.primary[600],
        color: vars.color.primary[800],

        selectors: {
          '&:not(:disabled):hover': {
            backgroundColor: vars.color.primary[200],
            borderColor: vars.color.primary[600],
            color: vars.color.primary[900],
          },
          '&:not(:disabled):active': {
            backgroundColor: vars.color.primary[300],
            borderColor: vars.color.primary[600],
            color: vars.color.primary[900],
          },
        },
      },

      selection: {
        backgroundColor: vars.color.white,
        borderColor: vars.color.neutral[500],
        color: vars.color.neutral[900],

        selectors: {
          '&:not(:disabled):hover': {
            borderColor: vars.color.primary[500],
            backgroundColor: vars.color.primary[100],
            color: vars.color.neutral[900],
          },
        },
      },
    },

    size: {
      sm: buttonSizeStyles.sm,
      md: buttonSizeStyles.md,
      lg: buttonSizeStyles.lg,
    },
  },
});
