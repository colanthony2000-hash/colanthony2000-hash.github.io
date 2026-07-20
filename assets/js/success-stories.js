(function () {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const run = (el) => {
    const target = Number(el.dataset.count || '0');
    const suffix = el.dataset.suffix || '';
    if (reduceMotion) { el.textContent = target + suffix; return; }
    let start = null;
    const duration = 900;
    const tick = (time) => {
      if (!start) start = time;
      const progress = Math.min((time - start) / duration, 1);
      el.textContent = Math.round(target * progress) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { run(entry.target); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.4 });
  counters.forEach((counter) => observer.observe(counter));
}());
