---
layout: default
title: Julians vegane Rezeptsammlung
---

<div class="index-head">
    <h1>Rezepte</h1>
    <button type="button" id="filter-toggle" aria-pressed="false">Auch ungekochte zeigen</button>
</div>

{% assign categories = "vorspeise:Vorspeisen & Snacks,hauptgerichte:Hauptgerichte,desserts:Desserts,backrezepte:Backrezepte,getraenke:Getränke" | split: "," %}
{% for entry in categories %}
{% assign parts = entry | split: ":" %}
{% assign recipes = site.recipes | where: "category", parts[0] | sort: "title" %}
{% if recipes.size > 0 %}
<section class="category" data-category>
    <h2>{{ parts[1] }}</h2>
    <ul class="menu">
        {% for rezept in recipes %}
        <li data-cooked="{{ rezept.cooked | default: false }}">
            <a href="{{ rezept.url | relative_url }}">{{ rezept.title }}</a>
            {% unless rezept.cooked %}<span class="untested">noch nicht gekocht</span>{% endunless %}
        </li>
        {% endfor %}
    </ul>
</section>
{% endif %}
{% endfor %}

<script>
(function () {
    var showAll = false;
    var toggle = document.getElementById('filter-toggle');

    function update() {
        document.querySelectorAll('[data-cooked]').forEach(function (item) {
            item.hidden = !showAll && item.getAttribute('data-cooked') !== 'true';
        });
        document.querySelectorAll('[data-category]').forEach(function (section) {
            section.hidden = !section.querySelector('[data-cooked]:not([hidden])');
        });
        toggle.setAttribute('aria-pressed', showAll);
        toggle.textContent = showAll ? 'Nur gekochte zeigen' : 'Auch ungekochte zeigen';
    }

    toggle.addEventListener('click', function () {
        showAll = !showAll;
        update();
    });
    update();
})();
</script>
