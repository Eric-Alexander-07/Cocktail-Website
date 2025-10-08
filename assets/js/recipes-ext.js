// Unified recipe dataset and sorted calculator options
(function () {
  // Define all recipes in one place
  var recipes = {
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
      name: 'Champagner-Mocktail',
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
    },

    // New cocktails
    'aperol-spritz': {
      name: 'Aperol Spritz',
      ingredients: {
        'Prosecco': 90,
        'Aperol': 60,
        'Soda': 30
      }
    },
    'wild-berry-lillet': {
      name: 'Wild Berry Lillet',
      ingredients: {
        'Lillet Rosé': 50,
        'Wild Berry Tonic': 100,
        'Limettensaft': 10
      }
    },
    'campari-soda': {
      name: 'Campari Soda',
      ingredients: {
        'Campari': 50,
        'Soda': 100
      }
    },
    'vermouth-tonic': {
      name: 'Vermouth Tonic',
      ingredients: {
        'Weißer Vermouth': 60,
        'Tonic Water': 120
      }
    },
    'gin-tonic': {
      name: 'Gin & Tonic',
      ingredients: {
        'Gin': 50,
        'Tonic Water': 150
      }
    },
    'banana-joe': {
      name: 'Banana Joe',
      ingredients: {
        'Rum': 40,
        'Bananenlikör': 20,
        'Limettensaft': 20,
        'Ananassaft': 80
      }
    },
    'limoncello-spritz': {
      name: 'Limoncello Spritz (Pallini)',
      ingredients: {
        'Prosecco': 90,
        'Pallini Limoncello': 60,
        'Soda': 30
      }
    },
    'blue-lagoon': {
      name: 'Blue Lagoon',
      ingredients: {
        'Vodka': 40,
        'Blue Curaçao': 20,
        'Zitronensaft': 20,
        'Zitronenlimonade': 120
      }
    },
    'vespa-spritz': {
      name: 'Vespa Spritz',
      ingredients: {
        'Prosecco': 90,
        'Aperol': 30,
        'Limoncello': 30,
        'Soda': 30
      }
    },
    'aperol-spritz-zero': {
      name: 'Aperol-Style Spritz (alkoholfrei)',
      ingredients: {
        'Alkoholfreier Aperitif': 60,
        'Alkoholfreier Prickler': 90,
        'Soda': 30
      }
    },
    'limoncello-spritz-zero': {
      name: 'Limoncello-Style Spritz (alkoholfrei)',
      ingredients: {
        'Zitronensirup': 30,
        'Zitronensaft': 15,
        'Alkoholfreier Prickler': 120,
        'Soda': 30
      }
    },
    'caipirinha': {
      name: 'Caipirinha',
      ingredients: {
        'Cachaça': 50,
        'Limettensaft': 25,
        'Rohrzuckersirup': 12
      }
    },
    'blue-coconut-zero': {
      name: 'Blue Coconut (alkoholfrei)',
      ingredients: {
        'Kokoscreme': 30,
        'Ananassaft': 90,
        'Blue Curaçao Sirup': 20,
        'Limettensaft': 10
      }
    }
  };

  // expose globally
  if (typeof window !== 'undefined') {
    window.recipes = recipes;
  }

  // Build alphabetically sorted options for the calculator
  const buildCalculatorOptions = () => {
    const select = document.getElementById('cocktail-select');
    if (!select || !window.recipes) return;
    const previous = select.value;
    const options = Object.entries(window.recipes)
      .map(([value, obj]) => ({ value, label: obj.name || value }))
      .sort((a, b) => a.label.localeCompare(b.label, 'de', { sensitivity: 'base' }));

    select.innerHTML = options
      .map((o) => `<option value="${o.value}">${o.label}</option>`)
      .join('');

    if (previous && window.recipes[previous]) {
      select.value = previous;
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildCalculatorOptions);
  } else {
    buildCalculatorOptions();
  }
})();

