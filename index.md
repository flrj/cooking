---
layout: default
title: Julian's vegane Rezeptsammlung
---

<link rel="stylesheet" href="/assets/css/style.css">

# Julian's vegane Rezeptsammlung

<button id="filter-toggle">Alle anzeigen</button>

## Inhaltsverzeichnis

### Vorspeisen & Snacks

### Hauptgerichte
- <span data-cooked="true">[Mapo Tofu](rezepte/hauptgerichte/mapo_tofu.md)</span>
- <span data-cooked="true">[Semmelknödel](rezepte/hauptgerichte/semmelknoedel.md)</span>
- <span data-cooked="true">[Spaghetti mit Ingwer Walnuss-Basilikum-Pesto](rezepte/hauptgerichte/ingwer_spaghetti.md)</span>

### Desserts
- <span data-cooked="true">[Chia Pudding Basis](rezepte/desserts/chia_pudding.md)</span>

### Backrezepte

### Getränke

<script>
(function() {
  var showAll = false;
  var toggle = document.getElementById('filter-toggle');

  function updateVisibility() {
    var items = document.querySelectorAll('[data-cooked]');
    items.forEach(function(item) {
      if (showAll) {
        item.style.display = '';
      } else {
        item.style.display = item.getAttribute('data-cooked') === 'true' ? '' : 'none';
      }
    });
    toggle.textContent = showAll ? 'Nur Gekochte anzeigen' : 'Alle anzeigen';
  }

  toggle.addEventListener('click', function() {
    showAll = !showAll;
    updateVisibility();
  });

  updateVisibility();
})();
</script>
