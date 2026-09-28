const C='vcs-v2';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html','manifest.webmanifest','icon-180.png','icon-192.png'])))});
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
// Mạng trước (để luôn có bản mới), mất mạng thì dùng bản đã lưu
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./'))))});
