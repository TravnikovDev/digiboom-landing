/**
 * Loads brand fonts for the generated share card.
 *
 * Fetched from Google Fonts at build time — no UA header, so the API serves TTF
 * rather than woff2 (satori can't read woff2). If the network is unavailable the
 * build still succeeds; the card falls back to the bundled default font.
 */
async function loadGoogleFont(family: string, weight?: number): Promise<ArrayBuffer | null> {
  try {
    const query = weight ? `${family.replace(/ /g, "+")}:wght@${weight}` : family.replace(/ /g, "+");
    const css = await fetch(`https://fonts.googleapis.com/css2?family=${query}&display=swap`).then((r) => r.text());
    const url = css.match(/src:\s*url\((.+?)\)/)?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export type OgFont = { name: string; data: ArrayBuffer; style: "normal"; weight: 400 | 500 | 700 };

/** Bebas for display, Rubik for everything else. */
export async function loadOgFonts(): Promise<{ fonts: OgFont[]; hasBebas: boolean }> {
  const [bebas, rubik, rubikBold] = await Promise.all([
    loadGoogleFont("Bebas Neue"),
    loadGoogleFont("Rubik", 400),
    loadGoogleFont("Rubik", 500),
  ]);

  const fonts: OgFont[] = [];
  if (rubik) fonts.push({ name: "Rubik", data: rubik, style: "normal", weight: 400 });
  if (rubikBold) fonts.push({ name: "Rubik", data: rubikBold, style: "normal", weight: 500 });
  if (bebas) fonts.push({ name: "Bebas", data: bebas, style: "normal", weight: 400 });

  return { fonts, hasBebas: Boolean(bebas) };
}
