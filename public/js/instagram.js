// Duvar bölümü: Behold (behold.so) JSON akışından son Instagram paylaşımlarını çeker.
(function () {
  var izgara = document.getElementById('instagram-akis');
  var feed = izgara && izgara.getAttribute('data-feed');
  if (!feed) return;

  fetch('https://feeds.behold.so/' + encodeURIComponent(feed))
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (veri) {
      var postlar = (Array.isArray(veri) ? veri : veri.posts || []).slice(0, 6);
      if (!postlar.length) return;
      izgara.textContent = '';
      postlar.forEach(function (p) {
        var gorsel = (p.sizes && p.sizes.medium && p.sizes.medium.mediaUrl) ||
          p.thumbnailUrl || p.mediaUrl;
        if (!gorsel) return;
        var a = document.createElement('a');
        a.className = 'foto';
        a.href = p.permalink;
        a.target = '_blank';
        a.rel = 'noopener';
        var img = document.createElement('img');
        img.src = gorsel;
        img.loading = 'lazy';
        img.alt = (p.prunedCaption || p.caption || 'Manjelo Burger Instagram paylaşımı').slice(0, 120);
        a.appendChild(img);
        izgara.appendChild(a);
      });
    })
    .catch(function () { /* akış yüklenemezse MJ kareleri kalır */ });
})();
