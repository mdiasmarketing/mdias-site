// MDIAS · motor de animação do site: mede a rolagem, suaviza (efeito de rolagem macia) e chama o desenho de cada página.
(function () {
  "use strict";
  var menosMovimento = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var seg = function (x, a, b) { return Math.min(1, Math.max(0, (x - a) / (b - a))); };
  var ease = function (x) { return 1 - Math.pow(1 - x, 3); };
  var r = function (x) { return Math.round(x * 1000) / 1000; };

  // aplica "surgir": opacidade, subida e desfoque, conforme k (0 a 1)
  function surge(el, k, sobe, desf) {
    if (!el) return;
    sobe = sobe == null ? 0.3 : sobe; desf = desf == null ? 10 : desf;
    el.style.opacity = r(k);
    el.style.transform = "translateY(" + r((1 - k) * sobe) + "em)";
    el.style.filter = menosMovimento || k >= 1 ? "none" : "blur(" + r((1 - k) * desf) + "px)";
  }
  function surgePx(el, k, px, desf) {
    if (!el) return;
    el.style.opacity = r(k);
    el.style.transform = "translateY(" + r((1 - k) * px) + "px)";
    el.style.filter = menosMovimento || k >= 1 ? "none" : "blur(" + r((1 - k) * desf) + "px)";
  }
  function some(el, k, esc) {
    if (!el) return;
    el.style.opacity = r(1 - k);
    el.style.transform = "scale(" + r(1 - (esc || 0.06) * k) + ")";
    el.style.filter = menosMovimento || k <= 0 ? "none" : "blur(" + r(k * 12) + "px)";
  }

  // cfg.medidas: { nome: { el, tipo: "palco" | "entra" | "rodape" } }; cfg.desenhar(estado)
  window.MDIAS_ANIM = function (cfg) {
    var alvo = {}, atual = {}, t0 = 0, raf = 0;
    Object.keys(cfg.medidas).forEach(function (k) { alvo[k] = 0; atual[k] = 0; });
    function medir() {
      var vh = window.innerHeight || 800;
      Object.keys(cfg.medidas).forEach(function (k) {
        var m = cfg.medidas[k]; var el = m.el; if (!el) return;
        var b = el.getBoundingClientRect(); var v = 0;
        if (m.tipo === "palco") { var span = b.height - vh; v = span > 0 ? (-b.top / span) : 0; }
        else if (m.tipo === "entra") v = (vh - b.top) / vh;
        else v = (vh - b.top) / b.height;
        alvo[k] = Math.min(1, Math.max(0, v));
      });
      rodar();
    }
    function passo(t) {
      raf = 0;
      if (!t0) t0 = t;
      var intro = menosMovimento ? 1 : Math.min(1, (t - t0) / 1500);
      var mexeu = intro < 1;
      Object.keys(alvo).forEach(function (k) {
        var d = alvo[k] - atual[k];
        atual[k] = menosMovimento || Math.abs(d) < 0.0004 ? alvo[k] : atual[k] + d * 0.1;
        if (atual[k] !== alvo[k]) mexeu = true;
      });
      var e = { intro: intro, vw: window.innerWidth || 1440 };
      Object.keys(atual).forEach(function (k) { e[k] = atual[k]; });
      cfg.desenhar(e);
      if (mexeu) rodar();
    }
    function rodar() { if (!raf) raf = requestAnimationFrame(passo); }
    window.addEventListener("scroll", medir, { passive: true });
    window.addEventListener("resize", medir);
    medir();
  };
  window.MDIAS_ANIM.util = { seg: seg, ease: ease, r: r, surge: surge, surgePx: surgePx, some: some, menosMovimento: menosMovimento };
})();
