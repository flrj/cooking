---
layout: default
title: Julian's vegane Rezeptsammlung
---

<link rel="stylesheet" href="/assets/css/style.css">

<h1>Julian's vegane Rezeptsammlung</h1>

<button id="filter-toggle">Alle anzeigen</button>

<h2>Inhaltsverzeichnis</h2>

<h3>Vorspeisen & Snacks</h3>

<h3>Hauptgerichte</h3>
<ul>
{% for rezept in site.recipes %}
{% if rezept.category == "hauptgerichte" %}
<li data-cooked="{{ rezept.cooked }}"><a href="{{ rezept.url }}">{{ rezept.title }}</a></li>
{% endif %}
{% endfor %}
</ul>

<h3>Desserts</h3>
<ul>
{% for rezept in site.recipes %}
{% if rezept.category == "desserts" %}
<li data-cooked="{{ rezept.cooked }}"><a href="{{ rezept.url }}">{{ rezept.title }}</a></li>
{% endif %}
{% endfor %}
</ul>

<h3>Backrezepte</h3>
<ul>
{% for rezept in site.recipes %}
{% if rezept.category == "backrezepte" %}
<li data-cooked="{{ rezept.cooked }}"><a href="{{ rezept.url }}">{{ rezept.title }}</a></li>
{% endif %}
{% endfor %}
</ul>

<h3>Getränke</h3>
<ul>
{% for rezept in site.recipes %}
{% if rezept.category == "getraenke" %}
<li data-cooked="{{ rezept.cooked }}"><a href="{{ rezept.url }}">{{ rezept.title }}</a></li>
{% endif %}
{% endfor %}
</ul>

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
