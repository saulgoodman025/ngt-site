/* NGT page behaviour below the film: the language menu, reveals, the statement's word highlight,
   the facts' count-up, the industry panels and the cards' pointer light. No dependencies. */
(function () {
  const html = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const LANG = window.NGT_LANG || 'ko';

  /* ----- language menu: the choice is saved, the page reloads in that language ----- */
  const lang = document.querySelector('.lang');
  if (lang) {
    const btn = lang.querySelector('.lang__btn'), opts = [...lang.querySelectorAll('.lang__opt')];
    const names = { ko: '한국어', en: 'English', ja: '日本語', zh: '中文' };
    lang.querySelector('.lang__name').textContent = names[LANG];
    lang.querySelector('.lang__code').textContent = LANG.toUpperCase();
    opts.forEach(o => o.setAttribute('aria-checked', String(o.dataset.lang === LANG)));
    const open = v => { lang.classList.toggle('is-open', v); btn.setAttribute('aria-expanded', String(v)); };
    btn.addEventListener('click', e => { e.stopPropagation(); const v = !lang.classList.contains('is-open'); open(v); if (v) (opts.find(o => o.dataset.lang === LANG) || opts[0]).focus(); });
    document.addEventListener('click', e => { if (!lang.contains(e.target)) open(false); });
    lang.addEventListener('keydown', e => {
      if (e.key === 'Escape') { open(false); btn.focus(); }
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault(); const i = opts.indexOf(document.activeElement);
        opts[(i + (e.key === 'ArrowDown' ? 1 : -1) + opts.length) % opts.length].focus();
      }
    });
    opts.forEach(o => o.addEventListener('click', () => {
      const l = o.dataset.lang; open(false);
      if (l === LANG) return;
      try { localStorage.setItem('ngt-lang', l); } catch (e) {}
      const u = new URL(location.href);
      if (l === 'ko') u.searchParams.delete('lang'); else u.searchParams.set('lang', l);
      u.hash = '';
      location.assign(u.toString());
    }));
  }

  /* ----- reveal on scroll ----- */
  const rv = [...document.querySelectorAll('[data-rv], .tl')];
  if ('IntersectionObserver' in window && !reduced) {
    html.classList.add('rv-on');
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    rv.forEach(n => io.observe(n));
    setTimeout(() => rv.forEach(n => { const r = n.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) n.classList.add('is-in'); }), 1200);
  } else rv.forEach(n => n.classList.add('is-in'));

  /* ----- the statement: words turn to ink as it crosses the screen ----- */
  const st = document.querySelector('.about__text');
  if (st) {
    const perChar = LANG === 'ja' || LANG === 'zh';
    const wrap = node => {
      [...node.childNodes].forEach(c => {
        if (c.nodeType === 3) {
          const parts = perChar ? [...c.textContent] : c.textContent.split(/(\s+)/);
          const f = document.createDocumentFragment();
          parts.forEach(p => { if (!p) return; if (/^\s+$/.test(p)) { f.appendChild(document.createTextNode(p)); return; } const s = document.createElement('span'); s.className = 'w'; s.textContent = p; f.appendChild(s); });
          c.replaceWith(f);
        } else if (c.nodeType === 1) wrap(c);
      });
    };
    wrap(st);
    const ws = [...st.querySelectorAll('.w')];
    if (reduced) ws.forEach(w => w.classList.add('is-on'));
    else {
      let n = -1, tick = false;
      const run = () => {
        tick = false;
        const r = st.getBoundingClientRect(), vh = innerHeight, a = vh * 0.86, b = vh * 0.42;
        const t = Math.min(1, Math.max(0, (a - r.top) / Math.max(1, (a - b) + r.height)));
        const k = Math.round(t * ws.length);
        if (k === n) return; n = k;
        ws.forEach((w, i) => w.classList.toggle('is-on', i < k));
      };
      addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(run); } }, { passive: true });
      addEventListener('resize', run); run();
    }
  }

  /* ----- facts count up once ----- */
  const nums = [...document.querySelectorAll('[data-count]')];
  if (nums.length && 'IntersectionObserver' in window && !reduced) {
    const io2 = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return; io2.unobserve(e.target);
      const el = e.target, to = +el.dataset.count, from = +(el.dataset.from || 0), t0 = performance.now(), d = 1500;
      const step = now => { const p = Math.min(1, (now - t0) / d), k = 1 - Math.pow(1 - p, 4); el.textContent = Math.round(from + (to - from) * k); if (p < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    }), { threshold: 0.6 });
    nums.forEach(n => io2.observe(n));
  }

  /* ----- industry panels: the one under the pointer (or tapped, or focused) opens ----- */
  const inds = [...document.querySelectorAll('.ind')];
  const pick = el => inds.forEach(i => { const on = i === el; i.classList.toggle('is-on', on); i.setAttribute('aria-expanded', String(on)); });
  inds.forEach(i => {
    i.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') pick(i); });
    i.addEventListener('click', () => pick(i));
    i.addEventListener('focus', () => pick(i));
    i.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(i); } });
  });

  /* ----- a soft light follows the pointer across a card ----- */
  document.querySelectorAll('.tcard').forEach(c => c.addEventListener('pointermove', e => {
    const r = c.getBoundingClientRect(); c.style.setProperty('--mx', (e.clientX - r.left) + 'px'); c.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }));
})();

/* the contact button: go to the footer's contact block and mark it for a moment */
(function () {
  const box = document.getElementById('contact-info'); if (!box) return;
  let t;
  const flash = () => { clearTimeout(t); box.classList.add('is-flash'); t = setTimeout(() => box.classList.remove('is-flash'), 2600); };
  document.querySelectorAll('a.ask').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    box.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
    setTimeout(flash, 500);
  }));
  if (location.hash === '#contact') setTimeout(() => { box.scrollIntoView({ block: 'center' }); flash(); }, 600);
})();
