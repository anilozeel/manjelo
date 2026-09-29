// Kaydırınca beliren bölümler: [data-anim] öğeleri ekrana girince .gorunur alır.
(function () {
  var ogeler = Array.prototype.slice.call(document.querySelectorAll('[data-anim]'));

  // Aynı kapsayıcıdaki kardeşler sırayla gelsin
  ogeler.forEach(function (el) {
    var kardesler = Array.prototype.filter.call(el.parentNode.children, function (k) {
      return k.hasAttribute('data-anim');
    });
    var sira = kardesler.indexOf(el);
    if (sira > 0) el.style.setProperty('--gecikme', Math.min(sira, 6) * 0.09 + 's');
  });

  if (!('IntersectionObserver' in window)) {
    ogeler.forEach(function (el) { el.classList.add('gorunur'); });
    return;
  }

  var gozlem = new IntersectionObserver(function (girdiler) {
    girdiler.forEach(function (g) {
      if (g.isIntersecting) {
        g.target.classList.add('gorunur');
        gozlem.unobserve(g.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

  ogeler.forEach(function (el) { gozlem.observe(el); });
})();
