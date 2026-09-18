This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Styling

- Pages, feature components, and shared layouts use Tailwind CSS v4.
- Shared UI components in src/shared/components keep their vanilla-extract recipes.
- src/app/styles/theme.css.ts owns the design tokens for both systems.
- src/app/styles/tailwind.css registers those tokens with @theme reference, without emitting duplicate CSS variables. Use text-primary-900, bg-neutral-100, border-primary-300, and rounded-lg (12px), for example.
- Typography utilities match the existing textStyles names: text-headline1, text-title3, text-subtitle2, text-body1, text-caption3, etc.
- Tailwind Preflight is deliberately omitted to preserve the existing reset and shared component appearance.
- Tailwind utilities are layered while vanilla-extract recipes are unlayered. For an intentional override of a shared component property, use a targeted important utility such as px-1! or whitespace-normal!. Layout properties not set by the recipe do not need this.
- Panel responsiveness uses container queries (@container and @max-[1100px]) so the layout also responds to sidebar expansion.
