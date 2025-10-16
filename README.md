# osu! Collections
Sharing your osu! Beatmap Collections!  
This project is a responsive beatmap collections web application for osu!, supporting light/dark themes.

## 🧰 What's inside

This project comes with:

### frameworks

- [Svelte 5](https://svelte.dev) [SvelteKit](https://svelte.dev/docs/kit) [TailwindCSS 4](https://tailwindcss.com)

### Database & Search Engine

- [Drizzle ORM](https://orm.drizzle.team/) [PostgreSQL](https://www.postgresql.org/) [Meilisearch](https://www.meilisearch.com/)

### Type checking

- [TypeScript](https://www.typescriptlang.org): JavaScript with syntax for types.

### Formatting & Linting

- [Prettier](https://prettier.io): An opinionated code formatter.
- [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss): Prettier plugin for Tailwind CSS that automatically sorts classes based on the official recommended class order.
- [Eslint](https://eslint.org): Find and fix problems in your JavaScript code.

### i18n

- [@inlang/paraglide-sveltekit](https://github.com/opral/inlang-paraglide-js): Tree-shakable i18n library build on the inlang ecosystem.

### Testing

- [Playwright](https://playwright.dev): Fast and reliable end-to-end testing for modern web apps.
- [Vitest](https://vitest.dev/): Blazing Fast Unit Test Framework.

## 📦 Installation

Download the repository and install the dependencies:

```bash
pnpm install
```

## 🛠️ Developing

Once you've installed dependencies with `pnpm install`, start a development server:

```bash
pnpm run dev

# or start the server and open the app in a new browser tab
pnpm run dev -- --open
```

## 🚀 Building

To create a production version of your app:

```bash
pnpm run build
```

You can preview the production build with `pnpm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## 🤝 Contributing

Contributions, issues and feature requests are welcome!
<br />
Feel free to check the [issues page](https://github.com/zeee2/jahkon_collections/issues).

## License

MIT
