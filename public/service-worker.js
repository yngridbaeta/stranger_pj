const CACHE_NAME = 'meu-app-cache-v2';
const URLS_TO_CACHE = [
  '/fallback-offline.html'
];

// INSTALAÇÃO
self.addEventListener('install', (event) => {
  console.log('[SW] Instalando service worker...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Cache aberto, adicionando fallback');
        return cache.addAll(URLS_TO_CACHE);
      })
      .catch((error) => {
        console.error('[SW] Erro ao cachear:', error);
      })
  );
  self.skipWaiting();
});

// ATIVAÇÃO
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// FETCH — versão corrigida
self.addEventListener('fetch', (event) => {
  const req = event.request;

  // ❌ NÃO INTERCEPTAR ARQUIVOS DE DESENVOLVIMENTO OU EXTENSÕES
  if (
    req.url.includes('/src/') || 
    req.url.includes('/@vite') ||
    req.url.includes('/@fs') ||
    req.url.includes('/@id') ||
    req.url.includes('.vite') ||
    req.url.includes('/@react-refresh') ||
    req.url.includes('node_modules') ||
    req.url.includes('?html-proxy') ||
    req.url.includes('.jpg') ||
    req.url.includes('.png') ||
    req.url.includes('.svg') ||
    req.url.includes('logo') ||
    (req.destination === 'script' && req.url.endsWith('.jsx')) ||
    req.url.includes('vite') ||
    req.url.includes('client') // evita interceptar hot reload do Vite
  ) {
    return; 
  }

  event.respondWith(
    fetch(req)
      .then((response) => {
        // Se for navegação HTML, cachear dinamicamente
        if (req.mode === 'navigate') {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(req, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        console.log('[SW] Offline, buscando no cache:', req.url);
        // Se for navegação HTML, retornar fallback
        if (req.mode === 'navigate' || req.headers.get('accept')?.includes('text/html')) {
          console.log('[SW] Retornando fallback offline');
          return caches.match('/fallback-offline.html');
        }
        // Para outros recursos, buscar no cache
        return caches.match(req);
      })
  );
});
