// Banff Culture Collection — mockup V3. Small, independent behaviours; the pages work without it.
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Header: hairline once the page has scrolled; mobile menu
  var head = document.querySelector('.site-head');
  if (head) {
    var stuck = function () { head.classList.toggle('is-stuck', window.scrollY > 8); };
    stuck();
    window.addEventListener('scroll', stuck, { passive: true });
    var btn = head.querySelector('.menu-btn');
    btn.addEventListener('click', function () {
      var open = head.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
      btn.textContent = open ? 'Close' : 'Menu';
    });
  }

  // Fade sections up once as they arrive
  var items = document.querySelectorAll('.reveal');
  var show = function (el) { el.classList.add('is-in'); };
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(show);
  }
  // A link straight to a member shows it at once
  if (location.hash) {
    var target = document.getElementById(location.hash.slice(1));
    if (target && target.classList.contains('reveal')) show(target);
  }

  // Member strip arrows
  var strip = document.querySelector('.strip');
  document.querySelectorAll('[data-strip]').forEach(function (b) {
    b.addEventListener('click', function () {
      var card = strip.querySelector('li');
      var step = card ? card.getBoundingClientRect().width * 2 : 400;
      strip.scrollBy({ left: step * Number(b.dataset.strip), behavior: reduce ? 'auto' : 'smooth' });
    });
  });

  // Collection filter: ?filter=museums or the buttons. Visible rows keep the tint / flip rhythm.
  var filterBtns = document.querySelectorAll('[data-filter]');
  if (filterBtns.length) {
    var rows = document.querySelectorAll('.member');
    var empty = document.querySelector('.empty');
    var apply = function (fam, push) {
      var shown = 0;
      rows.forEach(function (r) {
        var on = fam === 'all' || r.dataset.fam === fam;
        r.hidden = !on;
        if (on) {
          r.classList.toggle('tinted', shown % 2 === 0);
          r.classList.toggle('flip', shown % 2 === 1);
          if (push) show(r);
          shown++;
        }
      });
      filterBtns.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.filter === fam)); });
      if (empty) empty.hidden = shown > 0;
      if (push) {
        var url = new URL(location.href);
        if (fam === 'all') url.searchParams.delete('filter'); else url.searchParams.set('filter', fam);
        url.hash = '';
        history.replaceState(null, '', url);
      }
    };
    filterBtns.forEach(function (b) {
      b.addEventListener('click', function () { apply(b.dataset.filter, true); });
    });
    var start = new URLSearchParams(location.search).get('filter');
    if (start && document.querySelector('[data-filter="' + start + '"]')) apply(start, false);
  }

  // Gallery Hop: on wide screens the wall pins and vertical scroll walks it sideways
  var wall = document.querySelector('.wall');
  if (wall) (function () {
    var $ = function (s, r) { return (r || document).querySelector(s); };
    var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
    var sticky = $('.wall-sticky', wall), track = $('.wall-track', wall);
    var pieces = $$('.piece', wall);
    var bar = $('.wall-progress', wall), now = $('.wall-now', wall);
    var indexBtns = $$('.wall-index button', wall);
    var dlg = $('#walltext');
    var wide = window.matchMedia('(min-width: 861px)');
    var maxX = 0, centres = [], current = -1, horizontal = false, openIndex = -1, ticking = false;
    var pad = function (n) { return (n < 10 ? '0' : '') + n; };
    var headerH = function () { return head ? head.offsetHeight : 0; };
    wall.classList.add('js-wall');

    function measure() {
      horizontal = wide.matches;
      wall.classList.toggle('is-horizontal', horizontal);
      if (!horizontal) { wall.style.height = ''; track.style.transform = ''; if (bar) bar.style.transform = ''; return; }
      maxX = Math.max(0, track.offsetWidth - sticky.clientWidth);
      centres = pieces.map(function (p) { return p.offsetLeft + p.offsetWidth / 2; });
      wall.style.height = (sticky.offsetHeight + maxX) + 'px';
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
      indexBtns.forEach(function (b, k) { b.setAttribute('aria-current', String(k === i)); });
      if (now) now.textContent = pad(i + 1) + ' / ' + pad(pieces.length) + '  ·  ' + $('.pl-title', pieces[i]).textContent + ', ' + $('.pl-venue', pieces[i]).textContent;
    }
    function update() {
      ticking = false;
      if (!horizontal) return;
      sticky.scrollLeft = 0;
      var p = progress(), x = p * maxX;
      track.style.transform = 'translate3d(' + (-x).toFixed(1) + 'px,0,0)';
      if (bar) bar.style.transform = 'scaleX(' + p.toFixed(4) + ')';
      var mid = x + sticky.clientWidth / 2, best = 0, bestD = Infinity;
      centres.forEach(function (c, k) { var d = Math.abs(c - mid); if (d < bestD) { bestD = d; best = k; } });
      setCurrent(best);
    }
    function scrollToPiece(i, smooth) {
      if (!pieces[i]) return;
      var behavior = smooth && !reduce ? 'smooth' : 'instant';
      if (!horizontal) { pieces[i].scrollIntoView({ behavior: behavior, block: 'start' }); return; }
      var run = wall.offsetHeight - sticky.offsetHeight;
      var x = Math.min(maxX, Math.max(0, centres[i] - sticky.clientWidth / 2));
      var top = window.scrollY + wall.getBoundingClientRect().top - headerH() + (maxX ? x / maxX : 0) * run;
      window.scrollTo({ top: top, behavior: behavior });
    }

    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    var mTimer;
    window.addEventListener('resize', function () { clearTimeout(mTimer); mTimer = setTimeout(measure, 80); });
    if (wide.addEventListener) wide.addEventListener('change', measure);
    $$('img', wall).forEach(function (img) { img.addEventListener('load', measure); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    window.addEventListener('load', measure);
    measure();

    // Keyboard and trackpad: focus follows the wall, sideways swipes walk it
    track.addEventListener('focusin', function (e) {
      var p = e.target.closest('.piece');
      if (!p || !horizontal) return;
      sticky.scrollLeft = 0;
      scrollToPiece(pieces.indexOf(p), false);
    });
    sticky.addEventListener('wheel', function (e) {
      if (!horizontal || Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      window.scrollBy(0, e.deltaX);
      e.preventDefault();
    }, { passive: false });
    document.addEventListener('keydown', function (e) {
      if (!horizontal || (dlg && dlg.open) || (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft')) return;
      var r = wall.getBoundingClientRect();
      if (r.top > headerH() + 4 || r.bottom < window.innerHeight - 4) return;
      scrollToPiece(Math.min(pieces.length - 1, Math.max(0, current + (e.key === 'ArrowRight' ? 1 : -1))), true);
      e.preventDefault();
    });
    indexBtns.forEach(function (b, k) { b.addEventListener('click', function () { scrollToPiece(k, true); }); });

    // Wall-text panel
    if (!dlg || typeof dlg.showModal !== 'function') return;
    var wtImg = $('.wt-fig img', dlg), wtNo = $('.wt-no', dlg), wtTitle = $('#wt-title', dlg);
    var wtVenue = $('.wt-venue', dlg), wtBody = $('.wt-body', dlg);
    var wtPrev = $('.wt-prev', dlg), wtNext = $('.wt-next', dlg);
    function navLabel(b, i) {
      b.disabled = !pieces[i];
      if (pieces[i]) $('.wt-nav-title', b).textContent = pad(i + 1) + ' ' + $('.pl-title', pieces[i]).textContent;
    }
    function fill(i) {
      var p = pieces[i], src = $('img', p);
      openIndex = i;
      wtNo.textContent = 'Stop ' + pad(i + 1) + ' of ' + pad(pieces.length);
      wtImg.src = src.currentSrc || src.src;
      wtImg.alt = src.alt;
      wtImg.setAttribute('width', src.getAttribute('width'));
      wtImg.setAttribute('height', src.getAttribute('height'));
      wtTitle.textContent = p.getAttribute('data-title') || $('.pl-title', p).textContent;
      wtVenue.textContent = $('.pl-venue', p).textContent;
      wtBody.innerHTML = '';
      $$('.piece-text > *', p).forEach(function (n) { wtBody.appendChild(n.cloneNode(true)); });
      navLabel(wtPrev, i - 1);
      navLabel(wtNext, i + 1);
      dlg.scrollTop = 0;
      history.replaceState(null, '', location.pathname + location.search + '#' + p.id);
    }
    function openStop(i) {
      if (!pieces[i]) return;
      fill(i);
      if (!dlg.open) { dlg.showModal(); document.body.classList.add('panel-open'); }
    }
    function step(d) {
      if (!pieces[openIndex + d]) return;
      fill(openIndex + d);
      scrollToPiece(openIndex, false);
    }
    pieces.forEach(function (p, k) {
      $('.piece-open', p).addEventListener('click', function () { openStop(k); });
    });
    // Map pins and the route list open the same panel
    $$('[data-stop]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var k = pieces.indexOf(document.getElementById(a.getAttribute('data-stop')));
        if (k < 0) return;
        e.preventDefault();
        openStop(k);
      });
    });
    $('.wt-close', dlg).addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
    wtPrev.addEventListener('click', function () { step(-1); });
    wtNext.addEventListener('click', function () { step(1); });
    dlg.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    });
    dlg.addEventListener('close', function () {
      document.body.classList.remove('panel-open');
      history.replaceState(null, '', location.pathname + location.search);
      var b = pieces[openIndex] && $('.piece-open', pieces[openIndex]);
      if (b) b.focus({ preventScroll: true });
    });

    var m = /^#stop-(\d+)$/.exec(location.hash);
    if (m) {
      var k0 = parseInt(m[1], 10) - 1;
      requestAnimationFrame(function () { measure(); scrollToPiece(k0, false); openStop(k0); });
    }
  })();

  // Sign-up is not connected in the mockup
  document.querySelectorAll('.signup').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.querySelector('.note').textContent = 'Sign-up will connect to the mailing list on the live site.';
    });
  });
})();
