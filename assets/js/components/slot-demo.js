/* components/slot-demo.js — tragamonedas de prueba de la pavowiki (no gasta nada real) */
(function (P) {
  'use strict';

  var SYMBOLS = ['🦃', '🍗', '🌽', '🥧', '🍂'];

  function pick() { return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]; }

  function evaluate(r) {
    var unique = new Set(r).size;
    if (unique === 1) return r[0] === '🦃' ? 'Jackpot, cobras 20 veces tu apuesta.' : 'Triple, cobras 8 veces tu apuesta.';
    if (unique === 2) return 'Par, recuperas tu apuesta.';
    return 'Tres distintos, pierdes la apuesta.';
  }

  function init() {
    var reels = document.querySelectorAll('#reels span');
    var spin = P.dom.byId('spin');
    var msg = P.dom.byId('slot-msg');
    if (!spin || !reels.length) return;

    function settle() {
      var r = [pick(), pick(), pick()];
      reels.forEach(function (n, i) { n.textContent = r[i]; });
      msg.textContent = evaluate(r);
      spin.disabled = false;
    }

    spin.addEventListener('click', function () {
      spin.disabled = true;
      msg.textContent = 'Girando...';
      if (P.dom.reduceMotion) { settle(); return; }

      var ticks = 0;
      var timer = setInterval(function () {
        reels.forEach(function (n) { n.textContent = pick(); });
        ticks += 1;
        if (ticks >= 9) { clearInterval(timer); settle(); }
      }, 80);
    });
  }

  P.slotDemo = { init: init };
})(window.Pavo = window.Pavo || {});
