# Timeliner

Timeliner is a reimplementation of [Variations Audio Timeliner](http://variations.sourceforge.net/vat/index.html) as a web application, using the [IIIF Presentation API 3.0](https://iiif.io/api/presentation/3.0/).

## Installation

Node 18+ and `yarn` are required.

```
yarn install
```

## Development

Start the main application at at [http://localhost:5173/](http://localhost:5173/) with hot-reload using,

```
yarn start
```

Start the documentation site in development mode at [http://localhost:3000/](http://localhost:3000/) using,

```
yarn docz:dev
```

## Building

Build the main application,

```
yarn build
```

Build the main application and documentation together,

```
yarn build:all
```

Preview the production build (main app + docs) at [http://localhost:5173/](http://localhost:5173/) and docs at [http://localhost:5173/docs](http://localhost:5173/docs) using,

```
yarn preview
```

## Testing

```
yarn test
```

To test the latest Timeliner code in Avalon follow these steps,

1. Pull the latest code from the `main` branch in GitHub
1. Run `yarn build` create a new build from the code
2. Copy contents of `/dist/assets/main-**.css` and `/dist/assets/app-**.css` into
`/app/javascript/iiif-timeliner-styles.css` in Avalon
3. Copy contents of `/dist/assets/main-**.js` and `/dist/assets/app-**.js` into `/app/javascript/iiif-timeliner.js` in
Avalon
4. Search and remove the `import "./main-**.js"; ` statement in the copied JS content in Avalon


## Links

[Documentation](https://timeliner.dlib.indiana.edu/docs) | [User stories](https://github.com/digirati-co-uk/timeliner/issues?q=is%3Aissue+is%3Aopen+label%3A"%3Abusts_in_silhouette%3A+user+story") | [UX Wireframe](https://preview.uxpin.com/874bd44d74fc6062565cd95dc2dfc9e694b6ed4f#/pages/92279172/simulate/no-panels?mode=i) | [Original timeliner](http://variations.indiana.edu/use/timelines.html) | [Demo site](https://timeliner.dlib.indiana.edu/) | [Changelog](https://github.com/digirati-co-uk/timeliner/issues?q=is%3Aissue+is%3Aclosed+milestone%3A"UI+Components+1.0") 
