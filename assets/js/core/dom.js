/* core/dom.js — ayudas de DOM y detección de "menos movimiento" */
(function (P) {
  'use strict';

  var SVG_NS = 'http://www.w3.org/2000/svg';

  P.dom = {
    byId: function (id) { return document.getElementById(id); },

    /* Crea un elemento SVG con atributos y lo agrega a `parent` si se indica. */
    svg: function (name, attrs, parent) {
      var node = document.createElementNS(SVG_NS, name);
      for (var key in attrs) node.setAttribute(key, attrs[key]);
      if (parent) parent.appendChild(node);
      return node;
    },

    reduceMotion: !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)
  };
})(window.Pavo = window.Pavo || {});
