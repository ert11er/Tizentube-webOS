(function () {
  const SCRIPT_URL = "https://jsdelivr.net";
  const CACHE_KEY = "tt_cached_userscript";

  function runScript(code) {
    try {
      (0, eval)(code);
    } catch (err) {
      console.error("[TT-webOS] Error running userScript:", err);
    }
  }

  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    runScript(cached);
  }

  fetch(SCRIPT_URL, { cache: "no-store" })
    .then((res) => {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.text();
    })
    .then((code) => {
      if (code && code !== cached) {
        localStorage.setItem(CACHE_KEY, code);
        if (!cached) {
          // Reload once on first launch so early JSON.parse hooks attach before YouTube boots
          location.reload();
        }
      }
    })
    .catch((err) => console.warn("[TT-webOS] Failed to fetch update from jsDelivr:", err));
})();
