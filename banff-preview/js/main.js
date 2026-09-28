/* Banff Culture Collection
   Progressive enhancement only. The site reads without this file.
   - fits the wordmark lines to the page width
   - light parallax on the photograph inside the letters
   - mobile menu
   - floating image on hover in the catalogue index
   - text filters and expandable entries on the catalogue page
   - footer year */
(function () {
  "use strict";

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  var heroEl = $(".hero");
  var fontsReady = !(document.fonts && document.fonts.ready);

  /* ---- Fit text to the width of its box (footer wordmark) ---- */
  function fitWidth(el, w) {
    el.style.fontSize = "100px";
    var tw = el.getBoundingClientRect().width;
    if (!tw) return;
    el.style.fontSize = (100 * w / tw * 0.985).toFixed(2) + "px";
  }
  function fit() {
    $$("[data-fit]").forEach(function (el) {
      if (el.closest(".wordmark") || !el.getClientRects().length) return;
      var box = el.closest("[data-fit-box]") || el.parentElement;
      var cs = getComputedStyle(box);
      var w = box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      if (w > 0) fitWidth(el, w);
    });
    fitHero();
  }

  /* ---- Hero wordmark: fill the width, but never exceed the viewport height ---- */
  function fitHero() {
    $$(".wordmark").forEach(function (mark) {
      if (!mark.getClientRects().length) return;
      var w = mark.clientWidth;
      if (!w) return;
      var lines = $$(".wm-line", mark);
      lines.forEach(function (el) { fitWidth(el, w); });
      var header = $(".top");
      var pad = heroEl ? parseFloat(getComputedStyle(heroEl).paddingTop) || 0 : 0;
      var avail = window.innerHeight - (header ? header.offsetHeight : 0) - pad * 2;
      var h = mark.offsetHeight;
      var narrow = false;
      if (avail > 240 && h > avail) {
        var k = avail / h;
        lines.forEach(function (el) { el.style.fontSize = (parseFloat(el.style.fontSize) * k).toFixed(2) + "px"; });
        narrow = true;
      }
      mark.classList.toggle("is-narrow", narrow);
    });
    syncWordmark();
  }
  var fitTimer;
  function refit() { clearTimeout(fitTimer); fitTimer = setTimeout(fit, 80); }
  fit();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { fontsReady = true; fit(); });
  window.addEventListener("load", fit);
  window.addEventListener("resize", refit);

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Wordmark: photo through the letters ----
     The HTML lines are the source of truth for size and spacing. After each
     fit, the SVG clip text copies the line's font-size and baseline, and the
     photo is positioned like "background-size: cover; position: center 38%"
     across the whole block, so it reads as one image through all the lines. */
  function syncWordmark() {
    $$(".wordmark").forEach(function (mark) {
      if (!mark.getClientRects().length) return;
      var clips = $$(".wm-clip", mark);
      if (!clips.length) return;
      var markRect = mark.getBoundingClientRect();
      var H = mark.offsetHeight;
      var left = Infinity, right = 0;
      clips.forEach(function (c) {
        var r = $(".wm-line", c).getBoundingClientRect();
        left = Math.min(left, r.left - markRect.left);
        right = Math.max(right, r.right - markRect.left);
      });
      var W = right - left;
      if (!(W > 0) || !H) return;
      var first = $("img", mark);
      var iw = (first && first.naturalWidth) || 2500, ih = (first && first.naturalHeight) || 1667;
      var scale = Math.max(W / iw, H / ih) * 1.12;
      var bgW = iw * scale, bgH = ih * scale;
      var x = left + (W - bgW) / 2, y0 = (H - bgH) * 0.38;
      clips.forEach(function (clip) {
        var line = $(".wm-line", clip), bl = $(".wm-bl", clip), photo = $(".wm-photo", clip), img = $("img", clip);
        var def = document.getElementById(clip.getAttribute("data-clip") || "");
        var t = def && $("text", def);
        if (!line || !bl || !photo || !img || !t) return;
        var cr = clip.getBoundingClientRect();
        var baseline = bl.getBoundingClientRect().top - cr.top;
        var lineTop = cr.top - markRect.top;
        t.textContent = line.textContent.trim().toUpperCase();
        t.setAttribute("x", (line.getBoundingClientRect().left - cr.left).toFixed(2));
        t.setAttribute("y", baseline.toFixed(2));
        t.setAttribute("font-size", getComputedStyle(line).fontSize);
        t.style.setProperty("--rise", (cr.height * 1.05).toFixed(1) + "px");
        img.style.left = x.toFixed(1) + "px";
        img.style.top = (y0 - lineTop).toFixed(1) + "px";
        img.style.width = bgW.toFixed(1) + "px";
        img.style.height = bgH.toFixed(1) + "px";
        var ref = "url(#" + def.id + ")";
        photo.style.clipPath = ref;
        photo.style.webkitClipPath = ref;
      });
      if (fontsReady) mark.classList.add("is-ready");
    });
  }
  $$(".wordmark img").forEach(function (img) { img.addEventListener("load", function () { fit(); syncWordmark(); }); });

  /* ---- Scroll drift through the letters: composited, direct ---- */
  var wmImgs = $$(".wordmark img");
  if (wmImgs.length && heroEl && !reduce) {
    var driftTick = false;
    var drift = function () {
      if (driftTick) return;
      driftTick = true;
      requestAnimationFrame(function () {
        var y = Math.min(window.scrollY, 900) * -0.06;
        wmImgs.forEach(function (im) { im.style.transform = "translate3d(0," + y.toFixed(2) + "px,0)"; });
        driftTick = false;
      });
    };
    window.addEventListener("scroll", drift, { passive: true });
    drift();
  }

  /* ---- Mobile menu ---- */
  var menuBtn = $(".menu-btn");
  var menu = $("#menu");
  if (menuBtn && menu) {
    var setMenu = function (open) {
      menu.classList.toggle("open", open);
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.textContent = open ? "Close" : "Menu";
      document.body.classList.toggle("menu-open", open);
    };
    menuBtn.addEventListener("click", function () { setMenu(!menu.classList.contains("open")); });
    menu.addEventListener("click", function (e) { if (e.target.tagName === "A") setMenu(false); });
    window.addEventListener("resize", function () { if (window.innerWidth > 820 && menu.classList.contains("open")) setMenu(false); });
  }

  /* ---- Catalogue: hover image (index page) or sticky viewer (catalogue page) ---- */
  var rows = $$(".ix[data-img]");
  var hover = $(".hover-img");
  var viewerImg = $("#viewer-img");
  var viewerNo = $("#viewer-no");
  var viewerName = $("#viewer-name");
  var canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  function showInViewer(row) {
    if (!viewerImg) return;
    if (viewerImg.getAttribute("src") !== row.getAttribute("data-img")) viewerImg.src = row.getAttribute("data-img");
    if (viewerNo) viewerNo.textContent = "No. " + row.getAttribute("data-no");
    if (viewerName) viewerName.textContent = row.getAttribute("data-name");
  }

  if (rows.length && canHover) {
    if (hover) {
      /* A small pool of images so the last one can linger while the next appears.
         Each entry has its own size, shape, x position and tilt, cycling through
         a composed set so the page reads like a loose collage rather than a slideshow. */
      var recipes = [
        { x: 0.62, w: 24, ar: 4 / 3, rot: -2,   dy: -0.10 },
        { x: 0.44, w: 17, ar: 3 / 4, rot: 1.5,  dy: 0.15 },
        { x: 0.72, w: 21, ar: 1,     rot: -1,   dy: 0 },
        { x: 0.52, w: 28, ar: 3 / 2, rot: 2,    dy: -0.05 },
        { x: 0.38, w: 19, ar: 4 / 5, rot: -1.5, dy: 0.10 },
        { x: 0.66, w: 23, ar: 5 / 4, rot: 1,    dy: -0.15 },
        { x: 0.57, w: 16, ar: 1,     rot: -2.5, dy: 0.20 },
        { x: 0.75, w: 26, ar: 4 / 3, rot: 0.5,  dy: 0.05 }
      ];
      var pool = [hover];
      for (var k = 1; k < 3; k++) { var clone = hover.cloneNode(true); hover.parentNode.appendChild(clone); pool.push(clone); }
      var states = pool.map(function (el) {
        return { el: el, img: $("img", el), cx: 0, cy: 0, tx: 0, ty: 0, s: 1, rot: 0, w: 0, h: 0, raf: null, active: false };
      });
      var active = -1;
      var place = function (st) {
        st.el.style.transform = "translate(" + st.cx.toFixed(1) + "px," + st.cy.toFixed(1) + "px) translate(0,-50%) rotate(" + st.rot + "deg) scale(" + st.s.toFixed(3) + ")";
      };
      var tick = function (st) {
        st.cx += (st.tx - st.cx) * 0.22;
        st.cy += (st.ty - st.cy) * 0.22;
        st.s += (1 - st.s) * 0.18;
        place(st);
        var moving = Math.abs(st.tx - st.cx) > 0.3 || Math.abs(st.ty - st.cy) > 0.3 || Math.abs(1 - st.s) > 0.002;
        if (st.active && moving) st.raf = requestAnimationFrame(function () { tick(st); }); else st.raf = null;
      };
      var retire = function (st) {
        if (!st.active) return;
        st.active = false;
        st.el.classList.remove("on");
        st.el.classList.add("trail");
        if (st.raf) { cancelAnimationFrame(st.raf); st.raf = null; }
      };
      var preloaded = false;
      var preload = function () {
        if (preloaded) return;
        preloaded = true;
        rows.forEach(function (row, i) {
          setTimeout(function () { var im = new Image(); im.src = row.getAttribute("data-img"); }, i * 60);
        });
      };
      rows.forEach(function (row, i) {
        var r = recipes[i % recipes.length];
        row.addEventListener("mouseenter", function (e) {
          preload();
          if (active >= 0) retire(states[active]);
          active = (active + 1) % states.length;
          var st = states[active];
          var vw = window.innerWidth;
          st.w = Math.round(Math.min(Math.max(vw * r.w / 100, 150), 460));
          st.h = Math.round(st.w / r.ar);
          st.rot = r.rot;
          st.img.src = row.getAttribute("data-img");
          st.el.style.width = st.w + "px";
          st.el.style.height = st.h + "px";
          var gutter = Math.max(24, vw * 0.035);
          var name = $(".ix-name", row);
          var minX = gutter;
          if (name) {
            var range = document.createRange();
            range.selectNodeContents(name);
            minX = range.getBoundingClientRect().right + 24;
          }
          st.tx = Math.min(Math.max(vw * r.x - st.w / 2, minX), vw - st.w - gutter);
          st.ty = e.clientY + r.dy * st.h;
          st.cx = st.tx; st.cy = st.ty; st.s = 0.94;
          place(st);
          st.el.classList.remove("trail");
          void st.el.offsetWidth;
          st.el.classList.add("on");
          st.active = true;
          if (!st.raf) st.raf = requestAnimationFrame(function () { tick(st); });
        });
        row.addEventListener("mousemove", function (e) {
          var st = states[active];
          if (!st || !st.active) return;
          st.ty = e.clientY + r.dy * st.h;
          if (!st.raf) st.raf = requestAnimationFrame(function () { tick(st); });
        });
        row.addEventListener("mouseleave", function () {
          var st = states[active];
          if (st) retire(st);
        });
      });
    }
    if (viewerImg) {
      rows.forEach(function (row) {
        row.addEventListener("mouseenter", function () { showInViewer(row); });
      });
    }
  }

  /* ---- Expandable entries (catalogue page) ---- */
  var toggles = $$(".ix-row[aria-controls]");
  toggles.forEach(function (btn) {
    var cat = $(".ix-cat", btn), place = $(".ix-place", btn);
    var panel = document.getElementById(btn.getAttribute("aria-controls"));
    var body = panel && panel.lastElementChild;
    if (!body || !(cat || place)) return;
    var where = document.createElement("p");
    where.className = "credit ix-where";
    where.textContent = [cat && cat.textContent, place && place.textContent].filter(Boolean).join(" · ");
    var img = $(".ix-img", body);
    body.insertBefore(where, img ? img.nextSibling : body.firstChild);
  });
  function setOpen(btn, open, scroll) {
    var panel = document.getElementById(btn.getAttribute("aria-controls"));
    var li = btn.closest(".ix");
    btn.setAttribute("aria-expanded", String(open));
    if (panel) panel.hidden = !open;
    if (li) li.classList.toggle("open", open);
    if (open && li) {
      showInViewer(li);
      if (scroll) li.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
  }
  toggles.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") === "true";
      setOpen(btn, !open, false);
      var li = btn.closest(".ix");
      if (li && li.id) history.replaceState(null, "", open ? location.pathname + location.search : location.pathname + location.search + "#" + li.id);
    });
  });

  /* ---- Filters ---- */
  var filterLinks = $$("[data-filter]");
  var entries = $$(".ix[data-cat]");
  var countEl = $("#member-count");
  function applyFilter(f) {
    var n = 0;
    filterLinks.forEach(function (a) { a.setAttribute("aria-current", String(a.getAttribute("data-filter") === f)); });
    entries.forEach(function (li) {
      var show = f === "all" || li.getAttribute("data-cat").split(/\s+/).indexOf(f) !== -1;
      li.classList.toggle("is-hidden", !show);
      if (show) n += 1;
    });
    if (countEl) countEl.textContent = String(n);
    document.dispatchEvent(new CustomEvent("bcc:filter", { detail: f }));
  }
  if (filterLinks.length && entries.length) {
    filterLinks.forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        var f = a.getAttribute("data-filter");
        applyFilter(f);
        var url = location.pathname + (f === "all" ? "" : "?filter=" + encodeURIComponent(f)) + location.hash;
        history.replaceState(null, "", url);
      });
    });
    var initial = new URLSearchParams(location.search).get("filter");
    var ok = filterLinks.some(function (a) { return a.getAttribute("data-filter") === initial; });
    applyFilter(ok ? initial : "all");
  }

  /* ---- Open an entry from the URL hash ---- */
  if (location.hash && toggles.length) {
    var target = document.getElementById(location.hash.slice(1));
    var btn = target && $(".ix-row[aria-controls]", target);
    if (btn) {
      if (target.classList.contains("is-hidden")) applyFilter("all");
      setOpen(btn, true, true);
    }
  }

  /* ---- Gallery Hop: the wall ---- */
  var wall = $(".wall");
  if (wall) (function () {
    var sticky = $(".wall-sticky", wall), track = $(".wall-track", wall);
    var pieces = $$(".piece", wall);
    var bar = $(".wall-progress", wall), now = $(".wall-now", wall);
    var indexBtns = $$(".wall-index button", wall);
    var dlg = $("#walltext");
    var wide = window.matchMedia("(min-width: 821px)");
    var maxX = 0, centres = [], current = -1, horizontal = false, openIndex = -1, ticking = false;
    var pad = function (n) { return (n < 10 ? "0" : "") + n; };
    var headerH = function () { var h = $(".top"); return h ? h.offsetHeight : 0; };
    wall.classList.add("js-wall");

    function measure() {
      horizontal = wide.matches;
      wall.classList.toggle("is-horizontal", horizontal);
      if (!horizontal) { wall.style.height = ""; track.style.transform = ""; if (bar) bar.style.transform = ""; return; }
      var vw = sticky.clientWidth;
      maxX = Math.max(0, track.offsetWidth - vw);
      centres = pieces.map(function (p) { return p.offsetLeft + p.offsetWidth / 2; });
      wall.style.height = (sticky.offsetHeight + maxX) + "px";
      update();
    }
    function progress() {
      var run = wall.offsetHeight - sticky.offsetHeight;
      if (run <= 0) return 0;
      return Math.min(1, Math.max(0, (headerH() - wall.getBoundingClientRect().top) / run));
    }
    function setCurrent(i) {
      if (i === current || !pieces[i]) return;
      current = i;
      indexBtns.forEach(function (b, k) { b.setAttribute("aria-current", String(k === i)); });
      if (now) now.textContent = pad(i + 1) + " / " + pad(pieces.length) + "  \u00b7  " + $(".pl-title", pieces[i]).textContent + ", " + $(".pl-venue", pieces[i]).textContent;
    }
    function update() {
      ticking = false;
      if (!horizontal) return;
      sticky.scrollLeft = 0;
      var p = progress(), x = p * maxX;
      track.style.transform = "translate3d(" + (-x).toFixed(1) + "px,0,0)";
      if (bar) bar.style.transform = "scaleX(" + p.toFixed(4) + ")";
      var mid = x + sticky.clientWidth / 2, best = 0, bestD = Infinity;
      centres.forEach(function (c, k) { var d = Math.abs(c - mid); if (d < bestD) { bestD = d; best = k; } });
      setCurrent(best);
    }
    function scrollToPiece(i, smooth) {
      if (!pieces[i]) return;
      var behavior = smooth && !reduce ? "smooth" : "instant";
      if (!horizontal) { pieces[i].scrollIntoView({ behavior: behavior, block: "start" }); return; }
      var run = wall.offsetHeight - sticky.offsetHeight;
      var x = Math.min(maxX, Math.max(0, centres[i] - sticky.clientWidth / 2));
      var top = window.scrollY + wall.getBoundingClientRect().top - headerH() + (maxX ? x / maxX : 0) * run;
      window.scrollTo({ top: top, behavior: behavior });
    }

    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    var mTimer;
    window.addEventListener("resize", function () { clearTimeout(mTimer); mTimer = setTimeout(measure, 80); });
    if (wide.addEventListener) wide.addEventListener("change", measure);
    $$("img", wall).forEach(function (img) { img.addEventListener("load", measure); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    window.addEventListener("load", measure);
    measure();

    /* Keyboard and trackpad: focus follows the wall, sideways swipes walk it */
    track.addEventListener("focusin", function (e) {
      var p = e.target.closest(".piece");
      if (!p || !horizontal) return;
      sticky.scrollLeft = 0;
      scrollToPiece(pieces.indexOf(p), false);
    });
    sticky.addEventListener("wheel", function (e) {
      if (!horizontal || Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      window.scrollBy(0, e.deltaX);
      e.preventDefault();
    }, { passive: false });
    document.addEventListener("keydown", function (e) {
      if (!horizontal || (dlg && dlg.open) || (e.key !== "ArrowRight" && e.key !== "ArrowLeft")) return;
      var r = wall.getBoundingClientRect();
      if (r.top > headerH() + 4 || r.bottom < window.innerHeight - 4) return;
      scrollToPiece(Math.min(pieces.length - 1, Math.max(0, current + (e.key === "ArrowRight" ? 1 : -1))), true);
      e.preventDefault();
    });
    indexBtns.forEach(function (b, k) { b.addEventListener("click", function () { scrollToPiece(k, true); }); });

    /* Wall text panel */
    if (!dlg || typeof dlg.showModal !== "function") return;
    var wtImg = $(".wt-fig img", dlg), wtNo = $(".wt-no", dlg), wtTitle = $("#wt-title", dlg);
    var wtVenue = $(".wt-venue", dlg), wtBody = $(".wt-body", dlg);
    var wtPrev = $(".wt-prev", dlg), wtNext = $(".wt-next", dlg);
    function navLabel(btn, i) {
      btn.disabled = !pieces[i];
      if (!pieces[i]) return;
      $(".wt-nav-title", btn).textContent = pad(i + 1) + " " + $(".pl-title", pieces[i]).textContent;
    }
    function fill(i) {
      var p = pieces[i];
      openIndex = i;
      var src = $("img", p);
      wtNo.textContent = "Stop " + pad(i + 1) + " of " + pad(pieces.length);
      wtImg.src = src.currentSrc || src.src;
      wtImg.alt = src.alt;
      wtImg.setAttribute("width", src.getAttribute("width"));
      wtImg.setAttribute("height", src.getAttribute("height"));
      wtTitle.textContent = p.getAttribute("data-title") || $(".pl-title", p).textContent;
      wtVenue.textContent = $(".pl-venue", p).textContent;
      wtBody.innerHTML = "";
      $$(".piece-text > *", p).forEach(function (n) { wtBody.appendChild(n.cloneNode(true)); });
      navLabel(wtPrev, i - 1);
      navLabel(wtNext, i + 1);
      dlg.scrollTop = 0;
      history.replaceState(null, "", location.pathname + location.search + "#" + p.id);
    }
    function openStop(i) {
      if (!pieces[i]) return;
      fill(i);
      if (!dlg.open) { dlg.showModal(); document.body.classList.add("menu-open"); }
    }
    function step(d) {
      var k = openIndex + d;
      if (!pieces[k]) return;
      fill(k);
      scrollToPiece(k, false);
    }
    pieces.forEach(function (p, k) {
      var b = $(".piece-open", p);
      if (b) b.addEventListener("click", function () { openStop(k); });
    });
    $(".wt-close", dlg).addEventListener("click", function () { dlg.close(); });
    dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
    wtPrev.addEventListener("click", function () { step(-1); });
    wtNext.addEventListener("click", function () { step(1); });
    dlg.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    });
    dlg.addEventListener("close", function () {
      document.body.classList.remove("menu-open");
      history.replaceState(null, "", location.pathname + location.search);
      var b = pieces[openIndex] && $(".piece-open", pieces[openIndex]);
      if (b) b.focus({ preventScroll: true });
    });

    var m = /^#stop-(\d+)$/.exec(location.hash);
    if (m) {
      var k0 = parseInt(m[1], 10) - 1;
      requestAnimationFrame(function () { measure(); scrollToPiece(k0, false); openStop(k0); });
    }
  })();

  /* ---- Collection atlas: map + list + member panel ---- */
  var atlas = $(".atlas");
  if (atlas) (function () {
    var openMember;
    atlas.classList.add("js-atlas");
    var items = $$(".al", atlas);
    var pins = $$(".pin", atlas);
    var dlg = $("#member-panel");
    var pinOf = {};
    pins.forEach(function (p) { pinOf[p.getAttribute("data-id")] = p; });
    function hot(id, on) {
      var p = pinOf[id], li = document.getElementById(id);
      if (p) p.classList.toggle("is-hot", on);
      if (li) li.classList.toggle("is-hot", on);
    }
    function bindHot(el, id) {
      el.addEventListener("mouseenter", function () { hot(id, true); });
      el.addEventListener("mouseleave", function () { hot(id, false); });
      el.addEventListener("focus", function () { hot(id, true); });
      el.addEventListener("blur", function () { hot(id, false); });
    }
    items.forEach(function (li) {
      var b = $(".al-row", li);
      if (!b) return;
      bindHot(b, li.id);
      b.addEventListener("click", function () { openMember(li); });
    });
    pins.forEach(function (p) {
      var id = p.getAttribute("data-id");
      bindHot(p, id);
      p.addEventListener("click", function () { var li = document.getElementById(id); if (li) openMember(li); });
    });
    function syncPins() {
      pins.forEach(function (p) {
        var li = document.getElementById(p.getAttribute("data-id"));
        p.classList.toggle("is-dim", !!li && li.classList.contains("is-hidden"));
      });
    }
    document.addEventListener("bcc:filter", syncPins);
    syncPins();

    /* On phones the map is wider than the screen: start centred on downtown. */
    var sc = $(".map-scroll", atlas);
    var centreMap = function () { if (sc && sc.scrollWidth > sc.clientWidth) sc.scrollLeft = (sc.scrollWidth - sc.clientWidth) / 2; };
    centreMap();
    window.addEventListener("load", centreMap);

    if (!dlg || typeof dlg.showModal !== "function") { openMember = function () {}; return; }
    var current = null;
    var mpNo = $(".wt-no", dlg), mpImg = $(".wt-fig img", dlg), mpTitle = $("#mp-title", dlg);
    var mpPlace = $(".wt-venue", dlg), mpBody = $(".wt-body", dlg);
    var mpPrev = $(".wt-prev", dlg), mpNext = $(".wt-next", dlg);
    var shown = function () { return items.filter(function (li) { return !li.classList.contains("is-hidden"); }); };
    function setNav(btn, li) {
      btn.disabled = !li;
      btn._li = li || null;
      if (li) $(".wt-nav-title", btn).textContent = li.getAttribute("data-no") + " " + $(".al-name", li).textContent;
    }
    function fill(li) {
      if (current) hot(current.id, false);
      current = li;
      mpNo.textContent = "No. " + li.getAttribute("data-no") + "  \u00b7  " + li.getAttribute("data-kind");
      mpImg.src = li.getAttribute("data-img");
      mpImg.alt = "";
      mpTitle.innerHTML = $(".al-name", li).innerHTML;
      mpPlace.textContent = li.getAttribute("data-place");
      mpBody.innerHTML = "";
      $$(".al-text > *", li).forEach(function (n) { mpBody.appendChild(n.cloneNode(true)); });
      var list = shown(), k = list.indexOf(li);
      setNav(mpPrev, list[k - 1]);
      setNav(mpNext, list[k + 1]);
      hot(li.id, true);
      dlg.scrollTop = 0;
      history.replaceState(null, "", location.pathname + location.search + "#" + li.id);
    }
    openMember = function (li) {
      fill(li);
      if (!dlg.open) { dlg.showModal(); document.body.classList.add("menu-open"); }
    };
    mpPrev.addEventListener("click", function () { if (mpPrev._li) fill(mpPrev._li); });
    mpNext.addEventListener("click", function () { if (mpNext._li) fill(mpNext._li); });
    dlg.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight" && mpNext._li) fill(mpNext._li);
      if (e.key === "ArrowLeft" && mpPrev._li) fill(mpPrev._li);
    });
    $(".wt-close", dlg).addEventListener("click", function () { dlg.close(); });
    dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener("close", function () {
      document.body.classList.remove("menu-open");
      history.replaceState(null, "", location.pathname + location.search);
      if (current) {
        hot(current.id, false);
        var b = $(".al-row", current);
        if (b) b.focus({ preventScroll: true });
        hot(current.id, false);
      }
    });

    var target = location.hash && document.getElementById(location.hash.slice(1));
    if (target && target.classList.contains("al")) {
      if (target.classList.contains("is-hidden")) applyFilter("all");
      requestAnimationFrame(function () { openMember(target); });
    }
  })();

  /* ---- Home: collection overview lights the pins for a kind ---- */
  var overview = $(".overview");
  if (overview) (function () {
    var frame = $(".ov-frame", overview), dots = $$(".ov-dot", overview);
    if (!frame) return;
    $$(".ov-row", overview).forEach(function (row) {
      var cat = row.getAttribute("data-cat");
      var on = function () {
        frame.classList.add("is-filtering");
        dots.forEach(function (d) { d.classList.toggle("is-hot", (d.getAttribute("data-cat") || "").split(/\s+/).indexOf(cat) !== -1); });
      };
      var off = function () {
        frame.classList.remove("is-filtering");
        dots.forEach(function (d) { d.classList.remove("is-hot"); });
      };
      row.addEventListener("mouseenter", on);
      row.addEventListener("focus", on);
      row.addEventListener("mouseleave", off);
      row.addEventListener("blur", off);
    });
  })();

  /* ---- Year ---- */
  $$("[data-year]").forEach(function (el) { el.textContent = String(new Date().getFullYear()); });
})();
