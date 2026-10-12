/* ============================================================
   InfyCortex Solution — script.js
   Mobile menu, scroll effects, reveal animations, back-to-top,
   hero neural-network canvas, footer year and static contact
   form (mailto fallback).
   ============================================================ */
(function () {
  'use strict';

  var header = document.querySelector('.site-header');
  var navToggle = document.querySelector('.nav-toggle');
  var mainNav = document.querySelector('.main-nav');
  var backToTop = document.querySelector('.back-to-top');

  /* ---------- Mobile menu ---------- */
  function closeMenu() {
    if (!mainNav || !navToggle) return;
    mainNav.classList.remove('open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
  }

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('open');
      navToggle.classList.toggle('active', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    // Close the menu when a navigation link is clicked
    mainNav.addEventListener('click', function (event) {
      var link = event.target.closest('a');
      if (!link) return;
      var parentDropdown = link.closest('.has-dropdown');

      if (link.parentElement.classList.contains('has-dropdown') ||
          (parentDropdown && link === parentDropdown.querySelector(':scope > a'))) {
        // Toggle the submenu instead of navigating away
        event.preventDefault();
        parentDropdown.classList.toggle('open');
        var subToggle = parentDropdown.querySelector(':scope > a');
        if (subToggle) {
          subToggle.setAttribute('aria-expanded',
            String(parentDropdown.classList.contains('open')));
        }
        return;
      }
      closeMenu();
    });

    // Close on escape / resize to desktop
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeMenu();
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 992) closeMenu();
    });
  }

  /* ---------- Header shadow + back-to-top visibility ---------- */
  function onScroll() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 8);
    if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 500);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Scroll reveal animations ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (revealEls.length && 'IntersectionObserver' in window && !prefersReduced) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll('.js-year').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Hero neural-network canvas (home) ---------- */
  var heroVisual = document.querySelector('.hero-visual');

  if (heroVisual) {
    var canvas = heroVisual.querySelector('canvas');
    var ctx = canvas ? canvas.getContext('2d') : null;

    if (ctx) {
      var NODE_COLORS = ['#2563EB', '#00B8D9', '#5B8CFF'];
      var LINK_DIST = 130;
      var nodes = [];
      var animId = null;
      var running = false;
      var inView = true;
      var pageVisible = !document.hidden;
      var reduceMotionHero = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      function rgbaFromHex(hex, alpha) {
        return 'rgba(' + parseInt(hex.slice(1, 3), 16) + ','
          + parseInt(hex.slice(3, 5), 16) + ','
          + parseInt(hex.slice(5, 7), 16) + ',' + alpha + ')';
      }

      function buildNodes(w, h) {
        nodes = [];
        var count = Math.max(26, Math.min(52, Math.round((w * h) / 5200)));
        for (var i = 0; i < count; i++) {
          nodes.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
            r: 1.6 + Math.random() * 2.2,
            color: NODE_COLORS[i % NODE_COLORS.length]
          });
        }
      }

      function drawFrame() {
        var w = canvas.clientWidth;
        var h = canvas.clientHeight;
        if (!w || !h) return;
        ctx.clearRect(0, 0, w, h);

        for (var i = 0; i < nodes.length; i++) {
          var a = nodes[i];
          for (var j = i + 1; j < nodes.length; j++) {
            var b = nodes[j];
            var dx = a.x - b.x;
            var dy = a.y - b.y;
            var dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < LINK_DIST) {
              ctx.strokeStyle = 'rgba(91, 140, 255, ' + ((1 - dist / LINK_DIST) * 0.5).toFixed(3) + ')';
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }

        for (var k = 0; k < nodes.length; k++) {
          var n = nodes[k];
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 3.4, 0, Math.PI * 2);
          ctx.fillStyle = rgbaFromHex(n.color, 0.12);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fillStyle = n.color;
          ctx.fill();
        }
      }

      function step() {
        var w = canvas.clientWidth;
        var h = canvas.clientHeight;
        for (var i = 0; i < nodes.length; i++) {
          var n = nodes[i];
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < -20) n.x = w + 20; else if (n.x > w + 20) n.x = -20;
          if (n.y < -20) n.y = h + 20; else if (n.y > h + 20) n.y = -20;
        }
        drawFrame();
        animId = requestAnimationFrame(step);
      }

      function setRunning() {
        var should = !reduceMotionHero && inView && pageVisible;
        if (should && !running) {
          running = true;
          animId = requestAnimationFrame(step);
        } else if (!should && running) {
          running = false;
          cancelAnimationFrame(animId);
        }
      }

      function resizeCanvas() {
        var w = heroVisual.clientWidth;
        var h = heroVisual.clientHeight;
        if (!w || !h) return;
        var dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        buildNodes(w, h);
        if (reduceMotionHero) drawFrame();
      }

      heroVisual.classList.remove('no-js');
      resizeCanvas();
      if (!reduceMotionHero) setRunning();

      window.addEventListener('resize', resizeCanvas);
      document.addEventListener('visibilitychange', function () {
        pageVisible = !document.hidden;
        setRunning();
      });
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (entries) {
          inView = entries[0].isIntersecting;
          setRunning();
        }, { threshold: 0 }).observe(heroVisual);
      }
    }
  }

  /* ---------- Contact form (static — mailto fallback) ---------- */
  var form = document.querySelector('#enquiryForm');
  if (!form) return;

  var statusBox = form.querySelector('.form-status');

  function setError(field, message) {
    var errorEl = form.querySelector('[data-error-for="' + field.id + '"]');
    if (message) {
      field.classList.add('error');
      field.setAttribute('aria-invalid', 'true');
      if (errorEl) errorEl.textContent = message;
      return false;
    }
    field.classList.remove('error');
    field.removeAttribute('aria-invalid');
    if (errorEl) errorEl.textContent = '';
    return true;
  }

  function validate() {
    var ok = true;
    var name = form.querySelector('#name');
    var email = form.querySelector('#email');
    var phone = form.querySelector('#phone');
    var service = form.querySelector('#service');
    var message = form.querySelector('#message');

    if (name) ok = setError(name, name.value.trim().length >= 2 ? '' : 'Please enter your full name.') && ok;
    if (email) ok = setError(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()) ? '' : 'Please enter a valid email address.') && ok;
    if (phone) {
      var digits = phone.value.replace(/\D/g, '');
      ok = setError(phone, digits.length >= 10 && digits.length <= 15 ? '' : 'Please enter a valid phone number.') && ok;
    }
    if (service) ok = setError(service, service.value ? '' : 'Please select a service.') && ok;
    if (message) ok = setError(message, message.value.trim().length >= 10 ? '' : 'Please write a short message (at least 10 characters).') && ok;
    return ok;
  }

  ['input', 'change'].forEach(function (evt) {
    form.addEventListener(evt, function (event) {
      if (event.target.classList && event.target.classList.contains('error')) validate();
    });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!validate()) {
      var firstError = form.querySelector('.error');
      if (firstError) firstError.focus();
      return;
    }

    // GitHub Pages has no backend — hand the enquiry to the visitor's
    // email client so it reaches the InfyCortex inbox.
    var name = form.querySelector('#name').value.trim();
    var email = form.querySelector('#email').value.trim();
    var phone = form.querySelector('#phone').value.trim();
    var service = form.querySelector('#service').value;
    var message = form.querySelector('#message').value.trim();

    var subject = 'Website Enquiry — ' + service + ' (' + name + ')';
    var body = 'Name: ' + name + '\n'
      + 'Email: ' + email + '\n'
      + 'Phone: ' + phone + '\n'
      + 'Service Required: ' + service + '\n\n'
      + 'Message:\n' + message + '\n\n'
      + '— Sent from the InfyCortex Solution website';

    window.location.href = 'mailto:infycortex@gmail.com'
      + '?subject=' + encodeURIComponent(subject)
      + '&body=' + encodeURIComponent(body);

    if (statusBox) {
      statusBox.textContent = 'Thank you, ' + name.split(' ')[0]
        + '. Your email app should now open with your enquiry — press Send there to reach us. '
        + 'You can also write to us directly at infycortex@gmail.com.';
      statusBox.classList.add('success');
      statusBox.setAttribute('role', 'status');
    }
    form.reset();
  });
})();
