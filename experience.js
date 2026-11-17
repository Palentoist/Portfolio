(function () {
  var root = document.querySelector(".exp");
  if (!root) return;

  var tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));
  var panels = Array.prototype.slice.call(root.querySelectorAll('[role="tabpanel"]'));

  function select(index, focus) {
    tabs.forEach(function (tab, i) {
      var on = i === index;
      tab.setAttribute("aria-selected", on ? "true" : "false");
      tab.tabIndex = on ? 0 : -1;
      panels[i].hidden = !on;
    });
    if (focus) tabs[index].focus();
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener("click", function () { select(i, false); });

    tab.addEventListener("keydown", function (e) {
      var vertical = window.matchMedia("(min-width: 641px)").matches;
      var prev = vertical ? "ArrowUp" : "ArrowLeft";
      var next = vertical ? "ArrowDown" : "ArrowRight";
      var target = null;

      if (e.key === next) target = (i + 1) % tabs.length;
      else if (e.key === prev) target = (i - 1 + tabs.length) % tabs.length;
      else if (e.key === "Home") target = 0;
      else if (e.key === "End") target = tabs.length - 1;

      if (target !== null) {
        e.preventDefault();
        select(target, true);
      }
    });
  });

  select(0, false);
})();