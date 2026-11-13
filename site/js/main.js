/* =============================================================
   CARPINTARIA — comportamento do site (JavaScript puro, sem bibliotecas)
   Os dados vêm de js/config.js (empresa) e js/dados.js (conteúdo).
   ============================================================= */
(function () {
  "use strict";

  var C = window.CONFIG || {};
  var PROJETOS = window.PROJETOS || [];
  var ANTES_DEPOIS = window.ANTES_DEPOIS || [];
  var DEPOIMENTOS = window.DEPOIMENTOS || [];
  var reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- utilitários ---------- */
  function $(sel, raiz) { return (raiz || document).querySelector(sel); }
  function $$(sel, raiz) { return Array.prototype.slice.call((raiz || document).querySelectorAll(sel)); }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function slug(s) {
    return String(s).normalize("NFD").replace(/[̀-ͯ]/g, "")
      .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function linkWhats(msg) {
    return "https://wa.me/" + String(C.whatsapp || "").replace(/\D/g, "") +
      "?text=" + encodeURIComponent(msg || C.mensagemPadrao || "");
  }

  function icone(id) { return '<svg aria-hidden="true"><use href="#' + id + '"/></svg>'; }

  // Executa cada parte isoladamente: um erro em uma não derruba as outras
  function seguro(fn) { try { fn(); } catch (e) { console.error(e); } }

  /* ---------- 1. dados da empresa ---------- */
  function preencherConfig() {
    var end = C.endereco || {};
    var g = C.google || {};
    var ano = new Date().getFullYear();
    var valores = {
      nome: C.nome,
      telefone: C.telefoneExibicao,
      email: C.email,
      endereco: [end.rua, end.bairro].filter(Boolean).join(" – "),
      cidade: [end.cidade, end.uf].filter(Boolean).join("/"),
      googleNota: g.nota,
      googleAvaliacoes: g.avaliacoes,
      ano: ano,
      anoFundacao: C.anoFundacao,
      anos: C.anoFundacao ? ano - C.anoFundacao : null,
      garantia: C.garantiaAnos,
      entregues: C.ambientesEntregues,
    };

    $$("[data-cfg]").forEach(function (el) {
      var v = valores[el.getAttribute("data-cfg")];
      if (v != null && v !== "") el.textContent = v;
    });

    $$("[data-cfg-list='horarios']").forEach(function (el) {
      el.innerHTML = (C.horarios || []).map(function (h) { return "<li>" + esc(h) + "</li>"; }).join("");
    });

    $$("[data-whats]").forEach(function (a) {
      a.href = linkWhats(a.getAttribute("data-whats") || C.mensagemPadrao);
      a.target = "_blank";
      a.rel = "noopener";
    });

    $$("[data-email]").forEach(function (a) { a.href = "mailto:" + C.email; });

    $$("[data-social]").forEach(function (a) {
      var url = C[a.getAttribute("data-social")];
      if (url) a.href = url; else a.remove();
    });

    $$("[data-google-link]").forEach(function (a) {
      if (g.link) a.href = g.link; else a.remove();
    });

    var mapa = $("[data-mapa]");
    if (mapa) {
      var busca = C.mapaBusca || [end.rua, end.bairro, end.cidade, end.uf].filter(Boolean).join(", ");
      mapa.src = "https://www.google.com/maps?q=" + encodeURIComponent(busca) + "&output=embed";
    }
  }

  /* ---------- 2. dados estruturados (Google) ---------- */
  function dadosEstruturados() {
    if (!$("[data-destaques]")) return; // só na home
    var end = C.endereco || {};
    var ld = {
      "@context": "https://schema.org",
      "@type": "FurnitureStore",
      name: C.nome,
      description: "Móveis planejados sob medida com projeto 3D, fabricação própria e montagem.",
      telephone: "+" + String(C.whatsapp || "").replace(/\D/g, ""),
      email: C.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: end.rua,
        addressLocality: end.cidade,
        addressRegion: end.uf,
        postalCode: end.cep,
        addressCountry: "BR",
      },
      sameAs: [C.instagram, C.facebook].filter(Boolean),
    };
    if (/^https?:/.test(location.protocol)) ld.url = location.origin + "/";
    var s = document.createElement("script");
    s.type = "application/ld+json";
    s.textContent = JSON.stringify(ld);
    document.head.appendChild(s);
  }

  /* ---------- 3. topo e menu ---------- */
  function topo() {
    var header = $("[data-header]");
    if (!header) return;

    if (!header.classList.contains("header--solid")) {
      var atualizar = function () { header.classList.toggle("is-solid", window.scrollY > 40); };
      atualizar();
      window.addEventListener("scroll", atualizar, { passive: true });
    }

    var botao = $("[data-menu-toggle]");
    if (!botao) return;
    function fechar() {
      document.body.classList.remove("menu-open");
      botao.setAttribute("aria-expanded", "false");
      botao.setAttribute("aria-label", "Abrir menu");
    }
    botao.addEventListener("click", function () {
      var aberto = document.body.classList.toggle("menu-open");
      botao.setAttribute("aria-expanded", String(aberto));
      botao.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
    });
    $$("#menu a").forEach(function (a) { a.addEventListener("click", fechar); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") fechar(); });
  }

  // Destaca no menu a seção que está na tela
  function menuAtivo() {
    if (!("IntersectionObserver" in window)) return;
    var links = $$('.nav__link[href^="#"]');
    var mapa = {};
    links.forEach(function (a) {
      var sec = document.getElementById(a.getAttribute("href").slice(1));
      if (sec) mapa[sec.id] = a;
    });
    // "Contato" fica dentro de "Orçamento": usa a seção inteira
    if (mapa.contato && document.getElementById("orcamento")) mapa.orcamento = mapa.contato;
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (!en.isIntersecting || !mapa[en.target.id]) return;
        links.forEach(function (a) { a.classList.remove("is-active"); });
        mapa[en.target.id].classList.add("is-active");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(mapa).forEach(function (id) {
      if (id !== "contato") obs.observe(document.getElementById(id));
    });
  }

  /* ---------- 4. janela de projeto (lightbox) ---------- */
  var lb = { el: null, lista: [], i: 0 };

  function iniciarLightbox() {
    lb.el = $("[data-lightbox]");
    if (!lb.el || typeof lb.el.showModal !== "function") { lb.el = null; return; }
    var d = lb.el;
    $("[data-lb-prev]", d).addEventListener("click", function () { mostrarProjeto(lb.i - 1); });
    $("[data-lb-next]", d).addEventListener("click", function () { mostrarProjeto(lb.i + 1); });
    $("[data-lb-close]", d).addEventListener("click", function () { d.close(); });
    d.addEventListener("click", function (e) { if (e.target === d) d.close(); }); // clique fora
    d.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") mostrarProjeto(lb.i - 1);
      if (e.key === "ArrowRight") mostrarProjeto(lb.i + 1);
    });
    // deslizar com o dedo no celular
    var x0 = null;
    var media = $("[data-lb-media]", d);
    media.addEventListener("pointerdown", function (e) { x0 = e.clientX; });
    media.addEventListener("pointerup", function (e) {
      if (x0 === null) return;
      var dx = e.clientX - x0;
      x0 = null;
      if (Math.abs(dx) > 50) mostrarProjeto(lb.i + (dx < 0 ? 1 : -1));
    });
  }

  function mostrarProjeto(i) {
    var n = lb.lista.length;
    if (!n) return;
    lb.i = (i + n) % n;
    var p = lb.lista[lb.i];
    var d = lb.el;
    var img = $("[data-lb-img]", d);
    img.src = "img/projetos/" + p.img + ".webp";
    img.alt = p.titulo + ": " + p.descricao;
    $("[data-lb-amb]", d).textContent = p.ambiente;
    $("[data-lb-titulo]", d).textContent = p.titulo;
    $("[data-lb-local]", d).textContent = p.local || "";
    $("[data-lb-local]", d).parentNode.hidden = !p.local;
    $("[data-lb-desc]", d).textContent = p.descricao;
    $("[data-lb-cta]", d).href = linkWhats('Olá! Vi o projeto "' + p.titulo + '" no site e gostaria de algo parecido. Podemos conversar?');
    $("[data-lb-count]", d).textContent = (lb.i + 1) + " de " + n + " projetos";
    $("[data-lb-prev]", d).hidden = n < 2;
    $("[data-lb-next]", d).hidden = n < 2;
    // pré-carrega a próxima foto
    var prox = lb.lista[(lb.i + 1) % n];
    if (prox) new Image().src = "img/projetos/" + prox.img + ".webp";
  }

  function abrirProjeto(lista, i) {
    if (!lb.el) return;
    lb.lista = lista;
    mostrarProjeto(i);
    lb.el.showModal();
  }

  /* ---------- 5. galeria ---------- */
  function cardProjeto(p, i) {
    return '<button class="proj" type="button" data-i="' + i + '" aria-label="Ver projeto: ' + esc(p.titulo) + '">' +
      '<img src="img/projetos/' + esc(p.img) + '-sm.webp" alt="" loading="lazy" decoding="async" width="800" height="600">' +
      '<span class="proj__info"><span class="proj__amb">' + esc(p.ambiente) + '</span>' +
      '<span class="proj__tit">' + esc(p.titulo) + "</span></span>" +
      '<span class="proj__zoom">' + icone("i-zoom") + "</span></button>";
  }

  function renderGaleria(el, lista) {
    el.innerHTML = lista.map(cardProjeto).join("");
    $$(".proj", el).forEach(function (b) {
      b.addEventListener("click", function () { abrirProjeto(lista, +b.getAttribute("data-i")); });
    });
  }

  function destaques() {
    var el = $("[data-destaques]");
    if (!el) return;
    var lista = PROJETOS.filter(function (p) { return p.destaque; });
    renderGaleria(el, lista.length ? lista : PROJETOS.slice(0, 6));
  }

  function paginaProjetos() {
    var galeria = $("[data-galeria]");
    var filtros = $("[data-filtros]");
    if (!galeria || !filtros) return;
    var contador = $("[data-contador]");

    var categorias = [];
    PROJETOS.forEach(function (p) { if (categorias.indexOf(p.ambiente) < 0) categorias.push(p.ambiente); });

    var ativo = new URLSearchParams(location.search).get("ambiente") || "todos";
    if (ativo !== "todos" && !categorias.some(function (c) { return slug(c) === ativo; })) ativo = "todos";

    var opcoes = [{ s: "todos", nome: "Todos", n: PROJETOS.length }].concat(categorias.map(function (c) {
      return { s: slug(c), nome: c, n: PROJETOS.filter(function (p) { return p.ambiente === c; }).length };
    }));
    filtros.innerHTML = opcoes.map(function (o) {
      return '<button class="filtro" type="button" data-f="' + o.s + '" aria-pressed="false">' + esc(o.nome) + "<span>" + o.n + "</span></button>";
    }).join("");

    function aplicar() {
      var lista = ativo === "todos" ? PROJETOS : PROJETOS.filter(function (p) { return slug(p.ambiente) === ativo; });
      renderGaleria(galeria, lista);
      $$(".filtro", filtros).forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-f") === ativo)); });
      if (contador) contador.textContent = lista.length + (lista.length === 1 ? " projeto" : " projetos");
      try { history.replaceState(null, "", ativo === "todos" ? location.pathname : "?ambiente=" + ativo); } catch (e) { /* file:// */ }
    }

    filtros.addEventListener("click", function (e) {
      var b = e.target.closest(".filtro");
      if (!b) return;
      ativo = b.getAttribute("data-f");
      aplicar();
    });
    aplicar();
  }

  /* ---------- 6. antes e depois ---------- */
  function antesDepois() {
    var raiz = $("[data-ba]");
    if (!raiz || !ANTES_DEPOIS.length) return;
    var fig = $("[data-ba-figure]", raiz);
    var imgA = $("[data-ba-antes]", raiz);
    var imgD = $("[data-ba-depois]", raiz);
    var range = $("[data-ba-range]", raiz);
    var abas = $("[data-ba-tabs]", raiz);
    var info = $("[data-ba-info]", raiz);
    var interagiu = false;

    function setPos(v) {
      v = Math.max(0, Math.min(100, v));
      fig.style.setProperty("--pos", v + "%");
      range.value = Math.round(v);
    }

    function mostrar(i) {
      var d = ANTES_DEPOIS[i];
      imgA.src = d.antes;
      imgA.alt = "Antes: " + d.titulo;
      imgD.src = d.depois;
      imgD.alt = "Depois: " + d.titulo;
      $$(".ba-tab", abas).forEach(function (b, j) {
        b.setAttribute("aria-selected", String(i === j));
        b.tabIndex = i === j ? 0 : -1;
      });
      info.innerHTML =
        '<span class="eyebrow">' + esc(d.ambiente) + "</span>" +
        "<h3>" + esc(d.titulo) + "</h3>" +
        '<ul class="ba-meta">' +
          (d.local ? "<li>" + icone("i-pin") + esc(d.local) + "</li>" : "") +
          (d.prazo ? "<li>" + icone("i-clock") + "Prazo: " + esc(d.prazo) + "</li>" : "") +
        "</ul>" +
        "<p>" + esc(d.descricao) + "</p>" +
        '<a class="btn btn--primary" href="#orcamento" data-pre-ambiente="' + esc(d.ambiente) + '">Quero transformar meu ambiente</a>';
      setPos(50);
    }

    abas.innerHTML = ANTES_DEPOIS.map(function (d, i) {
      return '<button class="ba-tab" type="button" role="tab" aria-selected="false" data-i="' + i + '">' + esc(d.ambiente) + "</button>";
    }).join("");
    abas.addEventListener("click", function (e) {
      var b = e.target.closest(".ba-tab");
      if (b) mostrar(+b.getAttribute("data-i"));
    });
    abas.addEventListener("keydown", function (e) {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      var tabs = $$(".ba-tab", abas);
      var i = tabs.indexOf(document.activeElement);
      if (i < 0) return;
      var j = (i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
      tabs[j].focus();
      mostrar(j);
    });

    // arrastar com mouse ou dedo
    var arrastando = false;
    function posDoEvento(e) {
      var r = fig.getBoundingClientRect();
      return ((e.clientX - r.left) / r.width) * 100;
    }
    function marcarInteracao() { interagiu = true; fig.classList.add("is-touched"); }
    fig.addEventListener("pointerdown", function (e) {
      arrastando = true;
      marcarInteracao();
      fig.classList.add("is-dragging");
      if (e.pointerType === "mouse") { setPos(posDoEvento(e)); e.preventDefault(); }
      try { fig.setPointerCapture(e.pointerId); } catch (err) { /* ok */ }
    });
    fig.addEventListener("pointermove", function (e) { if (arrastando) setPos(posDoEvento(e)); });
    ["pointerup", "pointercancel", "lostpointercapture"].forEach(function (t) {
      fig.addEventListener(t, function () { arrastando = false; fig.classList.remove("is-dragging"); });
    });
    range.addEventListener("input", function () { marcarInteracao(); setPos(+range.value); });

    // animação de dica: mostra que a barra se move (uma vez, ao aparecer na tela)
    if (!reduzMovimento && "IntersectionObserver" in window) {
      var obs = new IntersectionObserver(function (en) {
        if (!en[0].isIntersecting) return;
        obs.disconnect();
        var inicio = null;
        var dur = 1800;
        function passo(t) {
          if (interagiu) return;
          if (inicio === null) inicio = t;
          var k = Math.min(1, (t - inicio) / dur);
          setPos(50 + Math.sin(k * Math.PI * 2) * 18 * (1 - k * 0.3));
          if (k < 1) requestAnimationFrame(passo); else setPos(50);
        }
        setTimeout(function () { requestAnimationFrame(passo); }, 500);
      }, { threshold: 0.6 });
      obs.observe(fig);
    }

    mostrar(0);
    // pré-carrega os outros pares
    ANTES_DEPOIS.slice(1).forEach(function (d) { new Image().src = d.antes; new Image().src = d.depois; });
  }

  /* ---------- 7. depoimentos ---------- */
  function depoimentos() {
    var el = $("[data-depoimentos]");
    if (!el) return;
    var estrelas = new Array(6).join(icone("i-star"));
    el.innerHTML = DEPOIMENTOS.map(function (d) {
      // iniciais só das palavras com maiúscula ("Ricardo e Paula" → "RP")
      var iniciais = d.nome.split(/\s+/).filter(function (p) { return /^[A-ZÀ-Ý]/.test(p); })
        .map(function (p) { return p[0]; }).join("").slice(0, 2);
      return '<figure class="depo reveal">' +
        '<div class="stars" role="img" aria-label="5 de 5 estrelas">' + estrelas + "</div>" +
        "<blockquote>" + esc(d.texto) + "</blockquote>" +
        '<figcaption><span class="depo__avatar" aria-hidden="true">' + esc(iniciais) + "</span>" +
        '<span><span class="depo__nome">' + esc(d.nome) + '</span><span class="depo__det">' + esc(d.detalhe) + "</span></span></figcaption>" +
        "</figure>";
    }).join("");
  }

  /* ---------- 8. formulário → WhatsApp ---------- */
  function formulario() {
    var form = $("[data-form]");
    if (!form) return;
    var nome = form.elements.nome;
    var erro = $("#f-nome-erro");
    var ok = $("[data-form-ok]", form);
    var grupoAmbientes = $("[data-ambientes]", form);
    var texto = form.elements.mensagem;
    var dicaAmbientes = texto.placeholder;
    var dicaCasa = "Ex.: apartamento de 3 quartos, 90 m², recebo as chaves em março.";

    // "A casa toda" esconde a lista de ambientes (não precisa marcar um por um)
    function casaToda() { return form.elements.tipo.value === "casa"; }
    function atualizarTipo() {
      var casa = casaToda();
      grupoAmbientes.hidden = casa;
      texto.placeholder = casa ? dicaCasa : dicaAmbientes;
    }
    $$('input[name="tipo"]', form).forEach(function (r) { r.addEventListener("change", atualizarTipo); });
    atualizarTipo();

    nome.addEventListener("input", function () {
      if (nome.value.trim()) { nome.removeAttribute("aria-invalid"); erro.hidden = true; }
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var n = nome.value.trim();
      if (!n) {
        nome.setAttribute("aria-invalid", "true");
        erro.hidden = false;
        nome.focus();
        return;
      }
      var ambientes = $$('input[name="ambientes"]:checked', form).map(function (i) { return i.value; });
      var imovel = form.elements.imovel.value;
      var local = form.elements.local.value.trim();
      var msg = form.elements.mensagem.value.trim();

      var linhas = ["Olá! Vim pelo site da " + (C.nome || "empresa") + " e gostaria de um orçamento.", "", "*Nome:* " + n];
      if (casaToda()) linhas.push("*Projeto:* Casa completa (arquitetura e interiores de todos os ambientes)");
      else if (ambientes.length) linhas.push("*Ambientes:* " + ambientes.join(", "));
      if (imovel) linhas.push("*Imóvel:* " + imovel);
      if (local) linhas.push("*Bairro/cidade:* " + local);
      if (msg) linhas.push("*Sobre o projeto:* " + msg);

      var url = linkWhats(linhas.join("\n"));
      window.open(url, "_blank", "noopener");
      ok.hidden = false;
      ok.innerHTML = "Pronto! Abrimos o WhatsApp com a sua mensagem. Se ele não abriu, " +
        '<a href="' + esc(url) + '" target="_blank" rel="noopener">clique aqui</a>.';
    });

    // Botões "Quero transformar meu ambiente" já marcam o ambiente no formulário
    document.addEventListener("click", function (e) {
      var a = e.target.closest("[data-pre-ambiente]");
      if (!a) return;
      var alvo = a.getAttribute("data-pre-ambiente");
      form.elements.tipo.value = "ambientes";
      atualizarTipo();
      $$('input[name="ambientes"]', form).forEach(function (i) { if (i.value === alvo) i.checked = true; });
    });
  }

  /* ---------- 9. animação de entrada ---------- */
  function revelar() {
    var itens = $$(".reveal:not(.is-visible)");
    if (reduzMovimento || !("IntersectionObserver" in window)) {
      itens.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add("is-visible");
        obs.unobserve(en.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    itens.forEach(function (el) { obs.observe(el); });
  }

  /* ---------- início ---------- */
  function iniciar() {
    [preencherConfig, dadosEstruturados, topo, menuAtivo, iniciarLightbox, destaques,
      paginaProjetos, antesDepois, depoimentos, formulario].forEach(seguro);
    seguro(revelar); // por último, para incluir os blocos criados acima
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();
