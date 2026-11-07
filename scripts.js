(function () {
    var root = document.documentElement;
    // cursor glow
    var glow = document.getElementById('glow');
    window.addEventListener('pointermove', function (e) {
        glow.style.setProperty('--mx', e.clientX + 'px');
        glow.style.setProperty('--my', e.clientY + 'px');
    }, { passive: true });

    // scroll spy
    var links = Array.prototype.slice.call(document.querySelectorAll('nav a'));
    var secs = links.map(function (a) { return document.querySelector(a.getAttribute('href')); });
    function spy() {
        var y = window.innerHeight * 0.35, cur = 0;
        secs.forEach(function (s, i) { if (s && s.getBoundingClientRect().top <= y) cur = i; });
        if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) cur = secs.length - 1;
        links.forEach(function (a, i) { a.classList.toggle('active', i === cur); });
    }
    window.addEventListener('scroll', spy, { passive: true });
    window.addEventListener('resize', spy);
    spy();

    // theme toggle: auto -> light -> dark
    var btn = document.getElementById('theme');
    var modes = ['auto', 'light', 'dark'], mode = 0;
    try { var saved = localStorage.getItem('pf-theme'); if (saved && modes.indexOf(saved) > -1) mode = modes.indexOf(saved); } catch (e) { }
    function apply() {
        if (modes[mode] === 'auto') root.removeAttribute('data-theme'); else root.setAttribute('data-theme', modes[mode]);
        btn.textContent = 'Theme: ' + modes[mode];
    }
    btn.addEventListener('click', function () {
        mode = (mode + 1) % 3;
        try { localStorage.setItem('pf-theme', modes[mode]); } catch (e) { }
        apply();
    });
    apply();
})();