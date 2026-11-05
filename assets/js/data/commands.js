/* data/commands.js — lista de comandos del bot.

   PARA AGREGAR UN COMANDO NUEVO: añade una línea en el grupo que corresponda.
   Campos:
     n    nombre sin $
     g    grupo (id de data/groups.js)
     a    alias
     d    descripción
     p    permiso: 'all', 'mod' u 'owner'
     cg   espera global en segundos
     cu   espera por usuario en segundos
     home true si solo funciona en el canal del owner
     w    id de la sección de la pavowiki (opcional)
     u    lista de usos (opcional)
*/
(function (P) {
  'use strict';
  P.data = P.data || {};

  P.data.commands = [
    /* ---- pavocoins ---- */
    { n: 'pavo',      g: 'pavocoins', a: ['reclamar', 'claim'], d: 'Reclama pavocoins cada 30 minutos. Puedes ganar, perder o no encontrar nada.', p: 'all', cg: 1, cu: 5, w: 'ganar' },
    { n: 'diario',    g: 'pavocoins', a: ['daily'], d: 'Bono diario de pavocoins que crece con la racha.', p: 'all', cg: 1, cu: 5, w: 'ganar' },
    { n: 'pavocoins', g: 'pavocoins', a: ['pavos', 'pc'], d: 'Tu saldo de pavocoins o el de otra persona.', p: 'all', cg: 1, cu: 5, w: 'saldo' },
    { n: 'top',       g: 'pavocoins', a: ['toppavos'], d: 'Los 5 usuarios con más pavocoins.', p: 'all', cg: 30, cu: 0, w: 'saldo' },
    { n: 'rank',      g: 'pavocoins', a: ['nivel', 'puesto'], d: 'Tu puesto, tu nivel y cuánto te falta para subir.', p: 'all', cg: 1, cu: 10, w: 'saldo' },
    { n: 'slots',     g: 'pavocoins', a: ['slot', 'tragaperras'], d: 'Tragamonedas de pavocoins.', p: 'all', cg: 2, cu: 15, w: 'juegos' },
    { n: 'duelo',     g: 'pavocoins', a: ['duel', 'retar'], d: 'Reta a alguien a un duelo de pavocoins.', p: 'all', cg: 1, cu: 3, w: 'juegos' },
    { n: 'banco',     g: 'pavocoins', a: ['bank'], d: 'Guarda pavocoins en el banco y gana interés.', p: 'all', cg: 1, cu: 3, w: 'banco' },
    { n: 'prestamo',  g: 'pavocoins', a: ['loan', 'deuda', 'prestamos'], d: 'Pide un préstamo al banco o paga tu deuda.', p: 'all', cg: 1, cu: 5, w: 'banco' },
    { n: 'dar',       g: 'pavocoins', a: ['give', 'transferir'], d: 'Da pavocoins a otro usuario.', p: 'all', cg: 1, cu: 10, w: 'dar' },
    { n: 'regalar',   g: 'pavocoins', a: [], d: 'Regala pavocoins a un usuario sin descontarlos de ningún saldo.', p: 'owner', cg: 0, cu: 0, w: 'dar' },
    { n: 'ticket',    g: 'pavocoins', a: ['tickets', 'boleto'], d: 'Info del raffle o compra de tickets.', p: 'all', cg: 1, cu: 5, w: 'raffle' },
    { n: 'raffle',    g: 'pavocoins', a: [], d: 'Abre, sortea o cancela el raffle.', p: 'mod', cg: 2, cu: 0, w: 'raffle' },
    { n: 'pavowiki',  g: 'pavocoins', a: ['pavoayuda', 'pavohelp'], d: 'Link con todos los comandos de pavocoins y cómo se usan.', p: 'all', cg: 5, cu: 10, w: 'ayuda' },

    /* ---- info y stats ---- */
    { n: 'accountage', g: 'info', a: ['aa', 'accage', 'age', 'edadcuenta'], d: 'Tiempo que lleva creada la cuenta de Kick de un usuario.', p: 'all', cg: 2, cu: 10 },
    { n: 'followage',  g: 'info', a: ['fa'], d: 'Tiempo que un usuario lleva siguiendo un canal.', p: 'all', cg: 2, cu: 10 },
    { n: 'watchtime',  g: 'info', a: ['wt', 'tiempo'], d: 'Tu tiempo viendo el stream.', p: 'all', cg: 1, cu: 5 },
    { n: 'galleta',    g: 'info', a: ['galletas', 'gallate', 'fortuna', 'cookie'], d: 'Galleta de la fortuna diaria (6 PM, global). También tiene stats y se puede regalar.', p: 'all', cg: 1, cu: 5 },
    { n: 'draftout',   g: 'info', a: ['dft', 'draftoutmc'], d: 'Leaderboard y stats de Draftout.', p: 'owner', cg: 2, cu: 10 },
    { n: 'comandos',   g: 'info', a: ['commands'], d: 'Link con todos los comandos disponibles.', p: 'all', cg: 5, cu: 10 },

    /* ---- comandos personalizados ---- */
    { n: 'addcom',  g: 'personalizados', a: ['addcmd'], d: 'Crea un comando personalizado en este canal.', p: 'mod', cg: 2, cu: 3 },
    { n: 'editcom', g: 'personalizados', a: ['editcmd'], d: 'Edita un comando personalizado de este canal.', p: 'mod', cg: 2, cu: 3 },
    { n: 'delcom',  g: 'personalizados', a: ['delcmd', 'removecom'], d: 'Borra un comando personalizado de este canal.', p: 'mod', cg: 2, cu: 3 },
    { n: 'listcom', g: 'personalizados', a: ['customcommands'], d: 'Link con los comandos personalizados de este canal.', p: 'all', cg: 5, cu: 10 },
    { n: 'allcom',  g: 'personalizados', a: [], d: 'Link con los comandos personalizados de todos los canales.', p: 'owner', cg: 5, cu: 10 },

    /* ---- administración del bot ---- */
    { n: 'automod',  g: 'admin', a: [], d: 'Activa, desactiva o pone en modo pasivo el AutoMod en un canal.', p: 'owner', cg: 2, cu: 0, home: true },
    { n: 'canales',  g: 'admin', a: ['channels'], d: 'Lista los canales donde está el bot.', p: 'owner', cg: 3, cu: 0 },
    { n: 'command',  g: 'admin', a: ['cmd'], d: 'Elige qué comandos responden cuando un canal está en modo silencio.', p: 'owner', cg: 0, cu: 0,
      u: ['$command active|inactive <comando> [#canal]', '$command list [#canal]'] },
    { n: 'join',     g: 'admin', a: ['unirse'], d: 'Une el bot a uno o varios canales.', p: 'owner', cg: 3, cu: 0, home: true },
    { n: 'mode',     g: 'admin', a: ['modo'], d: 'Pone al bot en silencio (online) o lo reactiva (offline).', p: 'owner', cg: 0, cu: 0,
      u: ['$mode online', '$mode offline', '$mode status'] },
    { n: 'part',     g: 'admin', a: ['salir'], d: 'Saca el bot de uno o varios canales.', p: 'owner', cg: 3, cu: 0, home: true },
    { n: 'ping',     g: 'admin', a: ['pong'], d: 'Estado completo del bot.', p: 'owner', cg: 5, cu: 0 },
    { n: 'say',      g: 'admin', a: ['decir'], d: 'El bot dice un mensaje, en este canal o en cualquier otro con #canal.', p: 'owner', cg: 2, cu: 0 }
  ];
})(window.Pavo = window.Pavo || {});
