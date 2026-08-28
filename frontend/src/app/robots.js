export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/portal/'],
      },
    ],
    sitemap: 'https://sirjay.co.ke/sitemap.xml',
  };
}
