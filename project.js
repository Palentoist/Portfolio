// project.js — shared script for all pages inside /projects/

(function () {
    var root = document.documentElement;
    var KEY = "theme";
    var modes = ["auto", "light", "dark"];

    function read() {
        try { return localStorage.getItem(KEY) || "auto"; } catch (e) { return "auto"; }
    }

    function apply(mode) {
        if (mode === "auto") root.removeAttribute("data-theme");
        else root.setAttribute("data-theme", mode);
        var btn = document.getElementById("theme");
        if (btn) btn.textContent = "Theme: " + mode;
    }

    apply(read());

    var btn = document.getElementById("theme");
    if (btn) {
        btn.addEventListener("click", function () {
            var next = modes[(modes.indexOf(read()) + 1) % modes.length];
            try { localStorage.setItem(KEY, next); } catch (e) { }
            apply(next);
        });
    }

    // Click a gallery image to view it full size
    var box = document.createElement("div");
    box.className = "lightbox";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-label", "Image preview");
    var big = document.createElement("img");
    big.alt = "";
    box.appendChild(big);
    document.body.appendChild(box);

    function close() { box.classList.remove("open"); }

    document.addEventListener("click", function (e) {
        var img = e.target.closest && e.target.closest(".gallery img");
        if (img) {
            big.src = img.src;
            big.alt = img.alt;
            box.classList.add("open");
        } else if (box.classList.contains("open")) {
            close();
        }
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") close();
    });

    // Footer year
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
})();