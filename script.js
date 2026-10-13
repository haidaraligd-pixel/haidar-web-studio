/* ============================================================
   HAIDARI WEB STUDIO — interactions
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  var nav = document.getElementById('nav');
  var burger = document.querySelector('.nav-burger');
  var menu = document.querySelector('.nav-menu');

  /* ---------- nav on scroll ---------- */
  function onScroll() {
    if (nav) nav.classList.toggle('stuck', window.scrollY > 16);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- mobile menu ---------- */
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(open));
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- smooth anchors ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = this.getAttribute('href');
      if (!id || id === '#' || id.length < 2) return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      var y = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: Math.max(y, 0), behavior: 'smooth' });
    });
  });

  /* ---------- scroll reveal ---------- */
  var targets = document.querySelectorAll(
    '.case, .svc, .price, .steps li, .faq, .sec-head, .start-form, .reach'
  );

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry, i) {
        if (!entry.isIntersecting) return;
        entry.target.style.transitionDelay = Math.min(i * 65, 300) + 'ms';
        entry.target.classList.add('in');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(function (el) {
      el.classList.add('rv');
      io.observe(el);
    });
  }

  /* ---------- enquiry form → WhatsApp ---------- */
  var form = document.getElementById('startForm');
  var out = document.getElementById('fMsgOut');
  var send = document.getElementById('fSend');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (out) { out.classList.remove('err'); out.textContent = ''; }

      var name = form.name.value.trim();
      var biz = form.business.value.trim();
      var contact = form.contact.value.trim();
      var type = form.type.value;
      var budget = form.budget.value;
      var msg = form.msg.value.trim();

      if (!name || !contact || !type || !msg) {
        if (out) {
          out.textContent = 'Please fill in your name, contact, project type and details.';
          out.classList.add('err');
        }
        return;
      }

      var original = send.innerHTML;
      send.disabled = true;
      send.textContent = 'Sending…';

      var lines = [
        'New website enquiry — Haidari Web Studio',
        '',
        'Name: ' + name
      ];
      if (biz) lines.push('Business: ' + biz);
      lines.push('Contact: ' + contact);
      lines.push('Needs: ' + type);
      if (budget) lines.push('Budget: ' + budget);
      lines.push('');
      lines.push(msg);

      var text = encodeURIComponent(lines.join('\n'));

      setTimeout(function () {
        send.disabled = false;
        send.innerHTML = original;
        if (out) out.textContent = 'Thanks, ' + name + '. Opening WhatsApp…';
        form.reset();
        window.open('https://wa.me/923010668408?text=' + text, '_blank');
      }, 700);
    });
  }

  /* ---------- year ---------- */
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

});
