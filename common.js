document.addEventListener('DOMContentLoaded', function () {
  var navToggle = document.getElementById('navToggle');
  var navList = document.getElementById('navList');
  if (navToggle && navList) {
    navToggle.addEventListener('click', function () {
      navList.classList.toggle('open');
    });
    document.querySelectorAll('nav a').forEach(function (a) {
      a.addEventListener('click', function () {
        navList.classList.remove('open');
      });
    });
  }

  document.querySelectorAll('.year').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Floating "Dođi na trening" CTA: fades in once the visitor scrolls past
  // the hero, and fades out again once the contact section (if present on
  // this page) is close to view, so it never sits on top of the map/info.
  var cta = document.getElementById('floatCta');
  if (cta) {
    var hero = document.querySelector('.hero');
    var kontakt = document.getElementById('kontakt');
    var onScroll = function () {
      var pastHero = window.scrollY > (hero ? hero.offsetHeight * 0.6 : 300);
      var nearContact = kontakt && kontakt.getBoundingClientRect().top < window.innerHeight * 0.8;
      cta.classList.toggle('show', pastHero && !nearContact);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Homepage hero: the title splits in two and swings open in 3D as the
  // visitor scrolls, revealing "Upoznaj klub" underneath. Skipped entirely
  // if the visitor has requested reduced motion.
  var splitHero = document.querySelector('.hero');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (splitHero && !reduceMotion) {
    var ticking = false;
    var updateSplit = function () {
      var scrollRoom = splitHero.offsetHeight - window.innerHeight;
      var progress = 0;
      if (scrollRoom > 0) {
        var scrolledIntoHero = -splitHero.getBoundingClientRect().top;
        progress = scrolledIntoHero / scrollRoom;
        progress = Math.min(Math.max(progress, 0), 1);
      }
      splitHero.style.setProperty('--p', progress.toFixed(3));
      ticking = false;
    };
    var requestSplitUpdate = function () {
      if (!ticking) {
        window.requestAnimationFrame(updateSplit);
        ticking = true;
      }
    };
    window.addEventListener('scroll', requestSplitUpdate, { passive: true });
    window.addEventListener('resize', requestSplitUpdate);
    updateSplit();
  }
});
