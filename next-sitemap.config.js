/**
 * Configuración personalizada para next-sitemap con rutas multilenguaje y rutas dinámicas.
 */
const locales = ['es', 'en'];

const dynamicIds = ['1'];

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mcworldcompressor.vercel.app';

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  
  additionalPaths: async (config) => {
    const paths = [];
    locales.forEach((locale) => {

      paths.push({ loc: `/${locale}` });
      paths.push({ loc: `/${locale}/upload` });

      
      dynamicIds.forEach((id) => {
        paths.push({ loc: `/${locale}/download/${id}` });
        paths.push({ loc: `/${locale}/status/${id}` });
      });
    });
    return paths;
  },
};
