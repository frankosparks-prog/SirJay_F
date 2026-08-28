export default function sitemap() {
  const baseUrl = 'https://sirjay.co.ke';
  const routes = [
    '',
    '/about',
    '/academics',
    '/admissions',
    '/contact',
    '/events',
    '/gallery',
    '/staff',
    '/student-life',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
