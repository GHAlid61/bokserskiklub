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
});
