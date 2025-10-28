self.addEventListener("install", (event) => {
    console.log("[SW] Installed");
});

self.addEventListener("activate", (event) => {
    console.log("[SW] Activated");
});

self.addEventListener("fetch", (event) => {
    // Можно кэшировать, если нужно офлайн-режим
});
