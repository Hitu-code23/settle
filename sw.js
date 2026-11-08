// QELVO moved into /app. This retires the old offline worker that lived at the site root.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil((async () => {
  const keys = await caches.keys();
  await Promise.all(keys.filter(k => k.startsWith('settle-')).map(k => caches.delete(k)));
  await self.registration.unregister();
  const tabs = await self.clients.matchAll({ type:'window' });
  tabs.forEach(t => t.navigate(t.url));
})()));
