(function () {
    var box = document.querySelector('.servings');
    if (!box) return;

    var base = parseFloat(box.getAttribute('data-base'));
    var count = base;
    var output = box.querySelector('.servings-count');
    var unit = box.querySelector('.servings-unit');
    var items = document.querySelectorAll('.ingredients li');
    var MIN = 1, MAX = 99;

    // Enhance: show stepper, hide static number
    box.querySelector('.servings-controls').hidden = false;
    box.querySelector('.servings-static').hidden = true;

    var originals = Array.prototype.map.call(items, function (li) {
        var raw = li.getAttribute('data-amount');
        var label = li.querySelector('.amount');
        var text = label.textContent;
        var unitText = '';
        if (raw !== null) {
            // keep everything after the amount (non-breaking space + unit)
            var idx = text.indexOf(String(raw));
            unitText = idx === 0 ? text.slice(String(raw).length) : '';
        }
        return { raw: raw, label: label, unit: unitText };
    });

    var FRACTIONS = [
        [0.25, '¼'], [1 / 3, '⅓'], [0.5, '½'], [2 / 3, '⅔'], [0.75, '¾']
    ];

    function formatNumber(n) {
        if (n <= 0) return '0';
        if (n >= 10) return String(Math.round(n));
        var whole = Math.floor(n + 1e-9);
        var frac = n - whole;
        if (frac < 0.05) return String(whole);
        if (frac > 0.95) return String(whole + 1);
        for (var i = 0; i < FRACTIONS.length; i++) {
            if (Math.abs(frac - FRACTIONS[i][0]) < 0.06) {
                return (whole ? whole : '') + FRACTIONS[i][1];
            }
        }
        // no clean fraction: one decimal with German comma
        return (Math.round(n * 10) / 10).toString().replace('.', ',');
    }

    function scale(raw, factor) {
        // supports "3-4" ranges and plain numbers; anything else is left alone
        var parts = String(raw).split('-');
        var nums = parts.map(function (p) { return parseFloat(p.replace(',', '.')); });
        if (nums.some(isNaN)) return null;
        return nums.map(function (n) { return formatNumber(n * factor); }).join('–');
    }

    function render() {
        var factor = count / base;
        originals.forEach(function (o) {
            if (o.raw === null) return;
            var scaled = factor === 1 ? o.raw.replace('-', '–').replace('.', ',') : scale(o.raw, factor);
            if (scaled === null) return;
            o.label.textContent = scaled + o.unit;
        });
        output.textContent = count;
        unit.textContent = count === 1 ? 'Person' : 'Personen';
    }

    box.addEventListener('click', function (e) {
        var btn = e.target.closest('.servings-step');
        if (!btn) return;
        count = Math.min(MAX, Math.max(MIN, count + parseInt(btn.getAttribute('data-step'), 10)));
        render();
    });

    render();
})();
