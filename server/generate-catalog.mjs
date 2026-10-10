import { writeFile } from 'node:fs/promises'
import { createServer } from 'vite'

const vite = await createServer({
  configFile: 'vite.config.ts',
  server: { middlewareMode: true },
  appType: 'custom',
})

try {
  const menu = await vite.ssrLoadModule('/src/components/productData.ts')
  const products = Object.entries(menu)
    .filter(([, value]) => Array.isArray(value))
    .flatMap(([, value]) => value)
  const seenIds = new Set()
  const catalog = products.map((product) => {
    if (seenIds.has(product.id)) {
      throw new Error(`Duplicate product ID in menu catalog: ${product.id}`)
    }
    seenIds.add(product.id)
    return {
      id: product.id,
      name: product.name,
      variations: menu.getProductVariations(product).map((variation) => ({
        id: variation.id,
        name: variation.name,
        priceCents: Math.round(variation.price * 100),
      })),
    }
  })

  await writeFile(
    new URL('./catalog.json', import.meta.url),
    `${JSON.stringify({ products: catalog }, null, 2)}\n`,
    'utf8',
  )
  console.log(`Generated server price catalog for ${catalog.length} menu items.`)
} finally {
  await vite.close()
}
