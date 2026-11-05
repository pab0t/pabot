/* data/groups.js — grupos de comandos y permisos.
   theme = nombre del color (ver .theme-* en base.css) */
(function (P) {
  'use strict';
  P.data = P.data || {};

  P.data.groups = [
    { id: 'pavocoins', title: 'Pavocoins', icon: '🪙', theme: 'gold',
      intro: 'La moneda del canal: se ganan, se guardan y se juegan. Cada comando tiene su explicación completa en la pavowiki.' },
    { id: 'info', title: 'Info y stats', icon: '📊', theme: 'aqua',
      intro: 'Datos de cuentas, seguidores y tiempo viendo el stream, y la galleta de la fortuna del día.' },
    { id: 'personalizados', title: 'Comandos personalizados', icon: '✏️', theme: 'leaf',
      intro: 'Cada canal puede tener sus propios comandos. Los mods los crean, los editan y los borran.' },
    { id: 'admin', title: 'Administración del bot', icon: '🛠️', theme: 'red',
      intro: 'Solo para el owner del bot. Los marcados funcionan únicamente en el canal del owner.' }
  ];

  P.data.permissions = {
    all:   { label: 'Cualquiera',   cls: 'b-all',   lock: false },
    mod:   { label: 'Mods y owner', cls: 'b-mod',   lock: false },
    owner: { label: 'Solo owner',   cls: 'b-owner', lock: true  }
  };
})(window.Pavo = window.Pavo || {});
