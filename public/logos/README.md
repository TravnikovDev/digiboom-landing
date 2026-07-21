# Platform logos

The platform wall (`components/Platforms.tsx`) renders a colored letter tile for each
platform until a real logo file is dropped in here.

## Adding a real logo

1. Download the mark from the platform's **official brand / press kit** — never from a
   logo-aggregator site. The official file is the correct shape and color, and the brand
   guidelines that come with it tell you what you're allowed to do.
2. Save it here as an SVG (preferred) or a transparent PNG, e.g. `etsy.svg`.
3. Point the platform at it in `components/Platforms.tsx`:

   ```ts
   { name: "Etsy", color: "#F56400", logo: "/logos/etsy.svg", stage: "launch" },
   ```

## Official brand asset pages

| Platform       | Where to get the mark                            |
| -------------- | ------------------------------------------------ |
| Etsy           | etsy.com press / brand assets                    |
| Shopify        | shopify.com/brand-assets                         |
| Gumroad        | gumroad.com press kit                            |
| WooCommerce    | woocommerce.com/style-guide                      |
| Envato         | envato.com/about/press                           |
| Patreon        | patreon.com/brand                                |
| Others         | search "<platform> brand assets" or "press kit"  |

## Usage rules worth knowing

Most marketplaces allow their logo to be shown to indicate a genuine integration
("works with X"), but nearly all of them prohibit:

- implying partnership, endorsement or sponsorship,
- altering the mark's colors, proportions or adding effects,
- using the logo more prominently than your own.

Some also require the integration to actually exist before you display the mark — worth
checking before the wall shows a logo for a platform that is still `planned` or
`exploring`. Until an integration ships, the letter tile is the safer default.
