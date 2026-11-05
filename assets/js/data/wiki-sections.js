/* data/wiki-sections.js — secciones de la pavowiki (plumas del pavo y botones de salto).
   id debe coincidir con el id de la <section> en pavowiki.html. */
(function (P) {
  'use strict';
  P.data = P.data || {};

  P.data.wikiSections = [
    { id: 'ganar',  icon: '🪙',  theme: 'gold',   label: 'Ganar pavocoins',    short: 'Ganar' },
    { id: 'saldo',  icon: '🏆',  theme: 'aqua',   label: 'Saldo y ranking',    short: 'Saldo y ranking' },
    { id: 'juegos', icon: '🎰',  theme: 'red',    label: 'Juegos',             short: 'Juegos' },
    { id: 'banco',  icon: '🏦',  theme: 'bronze', label: 'Banco y préstamos',  short: 'Banco' },
    { id: 'dar',    icon: '🎁',  theme: 'leaf',   label: 'Dar pavocoins',      short: 'Dar' },
    { id: 'raffle', icon: '🎟️', theme: 'sky',    label: 'Raffle',             short: 'Raffle' }
  ];
})(window.Pavo = window.Pavo || {});
