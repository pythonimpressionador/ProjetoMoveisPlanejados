/* Ícones do site (SVG sprite). Uso no HTML: <svg><use href="#i-nome"/></svg> */
(function () {
  var L = 'fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"';
  var F = 'fill="currentColor"';
  var icones = {
    "i-whats": [F, '<path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.42.25-.7.25-1.29.18-1.41-.08-.13-.27-.2-.57-.35m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.37l-.36-.22-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89a11.82 11.82 0 0 0-3.48-8.41z"/>'],
    "i-star": [F, '<path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z"/>'],
    "i-facebook": [F, '<path d="M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.2c-.3 0-1.3-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.3v2.2H7.5V12h2.8v10H14V12h2.8l.4-3.5z"/>'],
    "i-instagram": [L, '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/>'],
    "i-ruler": [L, '<path d="M3 17 17 3l4 4L7 21z"/><path d="m7 13 2 2m1-5 2 2m1-5 2 2"/>'],
    "i-cube": [L, '<path d="M12 2.5 3.5 7v10l8.5 4.5 8.5-4.5V7z"/><path d="m3.5 7 8.5 4.5L20.5 7M12 11.5v10"/>'],
    "i-factory": [L, '<path d="M3 21V10l5 3v-3l5 3V8l8 4v9z"/><path d="M3 21h18M8 17h1m3 0h1m3 0h1"/>'],
    "i-layers": [L, '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>'],
    "i-wrench": [L, '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94z"/>'],
    "i-calendar": [L, '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18m-13 4h2m3 0h2"/>'],
    "i-shield": [L, '<path d="M12 3 4.5 6v6c0 4.6 3.2 7.8 7.5 9 4.3-1.2 7.5-4.4 7.5-9V6z"/><path d="m9 12 2.2 2.2L15.5 10"/>'],
    "i-pin": [L, '<path d="M12 21.5s7-6.1 7-11.5a7 7 0 1 0-14 0c0 5.4 7 11.5 7 11.5z"/><circle cx="12" cy="10" r="2.5"/>'],
    "i-clock": [L, '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'],
    "i-mail": [L, '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 7 8.5 6 8.5-6"/>'],
    "i-zoom": [L, '<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>'],
    "i-chev-left": [L, '<path d="m15 18-6-6 6-6"/>'],
    "i-chev-right": [L, '<path d="m9 18 6-6-6-6"/>'],
    "i-close": [L, '<path d="M18 6 6 18M6 6l12 12"/>'],
    "i-arrows": [L, '<path d="m9 7-5 5 5 5m6-10 5 5-5 5"/>'],
    "i-chat": [L, '<path d="M21 12a8.5 8.5 0 0 1-12.4 7.5L3 21l1.5-5.4A8.5 8.5 0 1 1 21 12z"/>'],
    "i-house": [L, '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9v11.5h14V9"/><path d="M10 20.5V14h4v6.5"/>'],
    "i-grid": [L, '<rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/>'],
  };
  var html = '<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true">';
  for (var id in icones) {
    html += '<symbol id="' + id + '" viewBox="0 0 24 24" ' + icones[id][0] + ">" + icones[id][1] + "</symbol>";
  }
  html += "</svg>";
  document.body.insertAdjacentHTML("afterbegin", html);
})();
