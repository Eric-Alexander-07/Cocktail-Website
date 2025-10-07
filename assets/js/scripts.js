const recipes = {
  'whiskey-sour': {
    name: 'Whiskey Sour',
    ingredients: {
      'Bourbon Whiskey': 50,
      'Zitronensaft': 25,
      'Zuckersirup': 15,
      'Eiweiß (optional)': 15
    }
  },
  'espresso-martini': {
    name: 'Espresso Martini',
    ingredients: {
      'Vodka': 40,
      'Kaffeelikör': 20,
      'Espresso': 30,
      'Zuckersirup': 10
    }
  },
  'french-75': {
    name: 'French 75',
    ingredients: {
      'Gin': 30,
      'Zitronensaft': 15,
      'Zuckersirup': 10,
      'Champagner': 60
    }
  },
  'negroni': {
    name: 'Negroni',
    ingredients: {
      'Gin': 30,
      'Campari': 30,
      'Roter Vermouth': 30
    }
  },
  'mojito-royal': {
    name: 'Mojito Royal',
    ingredients: {
      'Rum': 40,
      'Limettensaft': 20,
      'Zuckersirup': 15,
      'Champagner': 80
    }
  },
  'virgin-mojito': {
    name: 'Virgin Mojito',
    ingredients: {
      'Limettensaft': 20,
      'Zuckersirup': 15,
      'Soda': 100
    }
  },
  'nojito-royale': {
    name: 'Nojito Royale',
    ingredients: {
      'Limettensaft': 20,
      'Zuckersirup': 15,
      'Alkoholfreier Prickler': 100
    }
  },
  'champagner-mocktail': {
    name: 'Champagner‑Mocktail',
    ingredients: {
      'Alkoholfreier Schaumwein': 100,
      'Verjus': 20
    }
  },
  'berry-bliss': {
    name: 'Berry Bliss',
    ingredients: {
      'Beerenpüree': 40,
      'Zitronensaft': 20,
      'Kräutersirup': 15,
      'Soda': 90
    }
  }
};
const form = document.getElementById('calculator-form');
const select = document.getElementById('cocktail-select');
const countInput = document.getElementById('drink-count');
const resultsList = document.getElementById('results-list');

if (form && select && countInput && resultsList) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const recipe = recipes[select.value];
    const servings = parseInt(countInput.value, 10);

    if (!recipe || Number.isNaN(servings) || servings < 1) {
      resultsList.innerHTML = '<li>Bitte gebt eine gÃ¼ltige Anzahl an Drinks ein.</li>';
      return;
    }

    const formatter = new Intl.NumberFormat('de-DE');
    const ingredientsHtml = Object.entries(recipe.ingredients)
      .map(([ingredient, ml]) => {
        const total = ml * servings;
        return `<li><span>${ingredient}</span><span>${formatter.format(total)} ml</span></li>`;
      })
      .join('');

    resultsList.innerHTML = ingredientsHtml;
  });
}

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach((el) => io.observe(el));

// Subtle card tilt without blur
const tiltEls = document.querySelectorAll('.hover-tilt');
tiltEls.forEach((el) => {
  el.addEventListener('mousemove', (event) => {
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const maxTilt = 4;
    const tiltX = ((y / rect.height) - 0.5) * -maxTilt;
    const tiltY = ((x / rect.width) - 0.5) * maxTilt;
    el.style.setProperty('--tiltX', `${tiltX.toFixed(2)}deg`);
    el.style.setProperty('--tiltY', `${tiltY.toFixed(2)}deg`);
  });

  el.addEventListener('mouseleave', () => {
    el.style.removeProperty('--tiltX');
    el.style.removeProperty('--tiltY');
  });
});

// Ingredient toggles
const toggleButtons = document.querySelectorAll('.ingredient-toggle');
toggleButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const list = button.nextElementSibling;
    if (!list) return;
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    button.textContent = expanded ? 'Zutaten anzeigen' : 'Zutaten verbergen';
    if (expanded) {
      list.setAttribute('hidden', '');
    } else {
      list.removeAttribute('hidden');
    }
    const card = button.closest('.cocktail-card');
    if (card) {
      card.classList.toggle('is-open', !expanded);
    }
  });
});

// Carousel controls
const carousels = document.querySelectorAll('[data-carousel]');

const getScrollAmount = (track) => Math.min(track.clientWidth * 0.85, 420);

const setupCarousel = (carousel) => {
  const track = carousel.querySelector('[data-carousel-track]');
  if (!track) return;
  if (!track.hasAttribute('tabindex')) {
    track.setAttribute('tabindex', '0');
  }

  const prev = carousel.querySelector('[data-carousel-prev]');
  const next = carousel.querySelector('[data-carousel-next]');

  const updateNavState = () => {
    const maxScroll = track.scrollWidth - track.clientWidth - 1;
    const atStart = track.scrollLeft <= 1;
    const atEnd = track.scrollLeft >= maxScroll;
    if (prev) prev.disabled = atStart;
    if (next) next.disabled = atEnd;
    carousel.classList.toggle('no-nav', track.scrollWidth <= track.clientWidth + 1);
  };

  const handleScroll = (direction) => {
    track.scrollBy({
      left: direction * getScrollAmount(track),
      behavior: 'smooth'
    });
  };

  prev?.addEventListener('click', () => handleScroll(-1));
  next?.addEventListener('click', () => handleScroll(1));

  track.addEventListener('scroll', () => updateNavState(), { passive: true });

  if ('ResizeObserver' in window) {
    const ro = new ResizeObserver(updateNavState);
    ro.observe(track);
  } else {
    window.addEventListener('resize', updateNavState);
  }

  updateNavState();
};

carousels.forEach(setupCarousel);

// Hero parallax
const heroSection = document.getElementById('hero');
let ticking = false;

const updateParallax = () => {
  if (!heroSection) return;
  const offset = window.scrollY * 0.08;
  heroSection.style.setProperty('--parallax', offset.toFixed(2));
  ticking = false;
};

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }
});

updateParallax();

// Header background: soften at top, darken on scroll
const headerEl = document.querySelector('header');
const updateHeaderTone = () => {
  if (!headerEl) return;
  const scrolled = window.scrollY > 16;
  headerEl.classList.toggle('is-scrolled', scrolled);
};
window.addEventListener('scroll', updateHeaderTone, { passive: true });
updateHeaderTone();

// Lightbox for images with class .media
(() => {
  const images = Array.from(document.querySelectorAll('img.media'));
  const lightbox = document.getElementById('lightbox');
  if (!images.length || !lightbox) return;
  const imgEl = lightbox.querySelector('.lightbox__img');
  const closeBtn = lightbox.querySelector('.lightbox__close');

  const open = (src, alt) => {
    imgEl.src = src;
    imgEl.alt = alt || '';
    lightbox.hidden = false;
    // Force a reflow so the transition plays when class is added
    // eslint-disable-next-line no-unused-expressions
    lightbox.offsetHeight; 
    lightbox.classList.add('is-open');
    document.documentElement.style.overflow = 'hidden';
  };
  const close = () => {
    lightbox.classList.remove('is-open');
    document.documentElement.style.overflow = '';
    setTimeout(() => { lightbox.hidden = true; imgEl.removeAttribute('src'); }, 180);
  };

  images.forEach((img) => {
    img.addEventListener('click', () => open(img.currentSrc || img.src, img.alt));
    img.addEventListener('keydown', (e) => { if (e.key === 'Enter') open(img.currentSrc || img.src, img.alt); });
    img.setAttribute('tabindex', '0');
  });

  closeBtn?.addEventListener('click', close);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !lightbox.hidden) close(); });
})();

// Brand logo click → smooth scroll to page top
(() => {
  const brand = document.querySelector('nav .logo');
  if (!brand) return;
  const toTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  brand.addEventListener('click', toTop);
  brand.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') toTop(e);
  });
})();

// Animated FAQ height for smoother open/close
(() => {
  const detailsEls = document.querySelectorAll('.faq details');
  if (!detailsEls.length) return;

  detailsEls.forEach((d) => {
    const answer = d.querySelector('.answer');
    if (!answer) return;

    const setMax = () => {
      const h = answer.scrollHeight;
      d.style.setProperty('--answer-max', `${h}px`);
    };

    // Set once for correct height on load and on open
    if (d.open) setMax();

    d.addEventListener('toggle', () => {
      if (d.open) setMax();
    });

    // Recalculate on viewport changes
    if ('ResizeObserver' in window) {
      const ro = new ResizeObserver(setMax);
      ro.observe(answer);
    } else {
      window.addEventListener('resize', setMax);
    }
  });
})();

// Feedback marquee: duplicate content for seamless loop
(() => {
  const marquee = document.querySelector('#feedback [data-marquee]');
  if (!marquee) return;
  const clone = marquee.cloneNode(true);
  clone.setAttribute('aria-hidden', 'true');
  marquee.parentElement.appendChild(clone);
})();

