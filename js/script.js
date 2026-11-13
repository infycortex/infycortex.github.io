/* ============================================================
   InfyCortex Solution — script.js
   Mobile menu, scroll effects, reveal animations, back-to-top,
   hero neural-network canvas, footer year, project link slots and
   the contact form (fetch submission with mailto fallback).
   ============================================================ */
(function () {
  'use strict';

  var header = document.querySelector('.site-header');
  var navToggle = document.querySelector('.nav-toggle');
  var mainNav = document.querySelector('.main-nav');
  var backToTop = document.querySelector('.back-to-top');
  var dropdownItem = mainNav ? mainNav.querySelector('.has-dropdown') : null;
  var dropdownTrigger = dropdownItem ? dropdownItem.querySelector(':scope > a') : null;

  /* ---------- Services dropdown ---------- */
  var dropdownOpening = true;

  function setDropdown(open) {
    if (!dropdownItem || !dropdownTrigger) return;
    dropdownItem.classList.toggle('open', open);
    dropdownTrigger.setAttribute('aria-expanded', String(open));
  }

  if (dropdownItem && dropdownTrigger) {
    // The trigger opens the submenu; the "All Services" item inside it is the page link.
    dropdownTrigger.addEventListener('click', function (event) {
      event.preventDefault();
      setDropdown(!dropdownItem.classList.contains('open'));
    });

    dropdownTrigger.addEventListener('keydown', function (event) {
      if (event.key === ' ' || event.key === 'Spacebar') {
        event.preventDefault();
        setDropdown(!dropdownItem.classList.contains('open'));
      }
    });

    dropdownItem.addEventListener('focusin', function () {
      if (dropdownOpening) setDropdown(true);
    });

    dropdownItem.addEventListener('focusout', function (event) {
      if (!dropdownItem.contains(event.relatedTarget)) setDropdown(false);
    });

    document.addEventListener('click', function (event) {
      if (!dropdownItem.contains(event.target)) setDropdown(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape' || !dropdownItem.classList.contains('open')) return;
      // Returning focus to the trigger must not re-open the submenu.
      dropdownOpening = document.activeElement === dropdownTrigger;
      setDropdown(false);
      dropdownTrigger.focus();
      dropdownOpening = true;
    });
  }

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
      if (!isOpen) setDropdown(false);
    });

    // Close the menu when a navigation link is clicked
    mainNav.addEventListener('click', function (event) {
      var link = event.target.closest('a');
      if (!link || link === dropdownTrigger) return;
      closeMenu();
      setDropdown(false);
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

  /* ---------- Project cards: show demo / source links only when configured ---------- */
  var projectCards = document.querySelectorAll('.project-card[data-demo-url], .project-card[data-repo-url]');
  projectCards.forEach(function (card) {
    var slot = card.querySelector('.project-links');
    if (!slot) return;
    [
      { attr: 'data-demo-url', label: 'Live Demo', className: 'btn btn-primary btn-sm' },
      { attr: 'data-repo-url', label: 'Source Code', className: 'btn btn-outline btn-sm' }
    ].forEach(function (item) {
      var url = (card.getAttribute(item.attr) || '').trim();
      if (!url) return;
      var link = document.createElement('a');
      link.href = url;
      link.className = item.className;
      link.textContent = item.label;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      slot.appendChild(link);
    });
    if (slot.children.length) slot.hidden = false;
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

  /* ---------- Contact form ---------- */
  // Form endpoint — replace the placeholder with your Formspree (or similar) URL.
  // While the placeholder is present, the form falls back to a pre-filled email.
  var FORM_ENDPOINT = 'https://formspree.io/f/[[OWNER TO PROVIDE: FORMSPREE FORM ID]]';

  // Maps ?project= / ?service= query values to the dropdown options.
  var SERVICE_ALIASES = {
    'complaint-management': 'College Project',
    'safehaven-iot': 'IoT Project',
    'careq': 'College Project',
    'hydroponics': 'IoT Project',
    'college-project': 'College Project',
    'college-projects': 'College Project',
    'website': 'Website Development',
    'website-development': 'Website Development',
    'websites': 'Website Development',
    'software': 'Software Development',
    'software-development': 'Software Development',
    'ai-ml': 'AI/ML Project',
    'ai-ml-project': 'AI/ML Project',
    'iot': 'IoT Project',
    'iot-project': 'IoT Project'
  };

  var form = document.querySelector('#enquiryForm');
  if (!form) return;

  var statusBox = form.querySelector('.form-status');
  var submitBtn = form.querySelector('#formSubmit');
  var submitLabel = submitBtn ? submitBtn.querySelector('.btn-label') : null;

  (function preselectService() {
    var service = form.querySelector('#service');
    if (!service) return;
    var params = new URLSearchParams(window.location.search);
    var requested = (params.get('project') || params.get('service') || '').trim().toLowerCase();
    if (!requested) return;
    var match = SERVICE_ALIASES[requested] || '';
    if (!match) {
      Array.prototype.forEach.call(service.options, function (option) {
        if (option.value.toLowerCase() === requested) match = option.value;
      });
    }
    if (match) service.value = match;
  })();

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

  function setStatus(message, type) {
    if (!statusBox) return;
    statusBox.textContent = message;
    statusBox.className = 'form-status ' + type;
    statusBox.setAttribute('role', type === 'error' ? 'alert' : 'status');
  }

  function setSending(sending) {
    if (!submitBtn) return;
    submitBtn.disabled = sending;
    submitBtn.setAttribute('aria-busy', String(sending));
    if (submitLabel) submitLabel.textContent = sending ? 'Sending…' : 'Send Enquiry';
  }

  function openMailto() {
    var field = function (selector) {
      var el = form.querySelector(selector);
      return el ? el.value.trim() : '';
    };
    var name = field('#name');
    var subject = 'Website Enquiry — ' + (field('#service') || 'General') + ' (' + name + ')';
    var body = 'Name: ' + name + '\n'
      + 'Email: ' + field('#email') + '\n'
      + 'Phone: ' + field('#phone') + '\n'
      + 'Service Required: ' + field('#service') + '\n\n'
      + 'Message:\n' + field('#message') + '\n\n'
      + '— Sent from the InfyCortex Solution website';

    window.location.href = 'mailto:infycortex@gmail.com'
      + '?subject=' + encodeURIComponent(subject)
      + '&body=' + encodeURIComponent(body);
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!validate()) {
      var firstError = form.querySelector('.error');
      if (firstError) firstError.focus();
      return;
    }

    var honeypot = form.querySelector('[name="_gotcha"]');
    if (honeypot && honeypot.value.trim()) return;

    var endpoint = FORM_ENDPOINT.trim();
    if (!endpoint || endpoint.indexOf('[[OWNER TO PROVIDE') !== -1) {
      console.warn('InfyCortex: contact form endpoint is not configured yet — falling back to a pre-filled email. Set FORM_ENDPOINT in js/script.js.');
      openMailto();
      setStatus('Your email app is opening with the enquiry filled in. If nothing happens, email infycortex@gmail.com or message us on WhatsApp at +91 90214 96257.', 'pending');
      return;
    }

    setSending(true);
    setStatus('Sending your enquiry…', 'pending');

    fetch(endpoint, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    }).then(function (response) {
      if (!response.ok) throw new Error('HTTP ' + response.status);
      form.reset();
      setStatus('Thank you. We have received your enquiry and will reply within 24 hours.', 'success');
    }).catch(function () {
      setStatus('Sorry — your enquiry could not be sent. Please email infycortex@gmail.com or message us on WhatsApp at +91 90214 96257.', 'error');
    }).then(function () {
      setSending(false);
    });
  });
})();
