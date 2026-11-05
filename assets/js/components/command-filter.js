/* components/command-filter.js — buscador de texto + filtro por permiso */
(function (P) {
  'use strict';

  var norm = P.text.norm;

  /* opts: { total, input, chips (NodeList), count, empty, reset } */
  function init(opts) {
    var state = { text: '', perm: 'todos' };

    function apply() {
      var text = norm(state.text).replace(/^\$/, '').trim();
      var shown = 0;

      document.querySelectorAll('.sec').forEach(function (sec) {
        var visible = 0;
        sec.querySelectorAll('.cmd').forEach(function (card) {
          var ok = (state.perm === 'todos' || card.getAttribute('data-p') === state.perm) &&
                   (!text || card.getAttribute('data-s').indexOf(text) !== -1);
          card.hidden = !ok;
          if (ok) visible += 1;
        });
        sec.hidden = visible === 0;
        var small = sec.querySelector('.sec-head small');
        if (small) small.textContent = String(visible);
        shown += visible;
      });

      opts.count.textContent = 'Mostrando ' + shown + ' de ' + opts.total + ' comandos.';
      opts.empty.hidden = shown !== 0;
    }

    function pressChip(perm) {
      opts.chips.forEach(function (c) {
        c.setAttribute('aria-pressed', c.getAttribute('data-perm') === perm ? 'true' : 'false');
      });
    }

    opts.input.addEventListener('input', function () { state.text = opts.input.value; apply(); });

    opts.chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        state.perm = chip.getAttribute('data-perm');
        pressChip(state.perm);
        apply();
      });
    });

    opts.reset.addEventListener('click', function () {
      opts.input.value = '';
      state.text = '';
      state.perm = 'todos';
      pressChip('todos');
      apply();
      opts.input.focus();
    });

    apply();
  }

  P.commandFilter = { init: init };
})(window.Pavo = window.Pavo || {});
