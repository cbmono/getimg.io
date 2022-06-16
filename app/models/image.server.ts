import puppeteer from "puppeteer";


export async function getImages(url: URL): Promise<Array<any>> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url.origin);

  // Fetch all link-tags and filter by `icon`
  const linkTags = await page.evaluate(() => [...document?.head?.querySelectorAll('link')]
    .map(elem => ({
      rel: elem?.getAttribute('rel'),
      sizes: elem?.getAttribute('sizes'),
      type: elem?.getAttribute('type'),
      href: elem?.getAttribute('href'),
      dimension: 0,
    }))
    // Fetch icons only
    .filter(elem => /icon/i.test(elem.rel || ''))
    // Compute absolute icons dimension
    .map(elem => {
      if (elem.sizes) {
        const [w, h] = elem.sizes.split('x');
        elem.dimension = parseInt(w) * parseInt(h);
      }
  
      return elem;
    })
    // Sort by dimension descending
    .sort((a, b) => a.dimension > b.dimension ? -1 : 1)
  );


  await browser.close();
  return linkTags;
}