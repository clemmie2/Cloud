(() => {
  const script = document.createElement("script");
  script.src = "js/config.js";
  script.onload = () => {
    window.CLOUDDROID_CONFIG = window.CLOUDDROID_CONFIG || {API_URL:"", DEMO_MODE:true};
  };
  document.head.appendChild(script);

  document.addEventListener("DOMContentLoaded", () => {
    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();

    const menuBtn = document.getElementById("menuBtn");
    if (menuBtn) {
      menuBtn.addEventListener("click", () => {
        document.querySelector(".sidebar")?.classList.toggle("open");
      });
    }
  });

  window.CloudDroid = {
    async api(path, options = {}) {
      const cfg = window.CLOUDDROID_CONFIG || {};
      if (!cfg.API_URL || cfg.DEMO_MODE) throw new Error("DEMO_MODE");
      const response = await fetch(`${cfg.API_URL.replace(/\/$/, "")}${path}`, {
        credentials: "include",
        headers: {"Content-Type":"application/json", ...(options.headers || {})},
        ...options
      });
      if (!response.ok) throw new Error(`API ${response.status}`);
      return response.status === 204 ? null : response.json();
    },
    toast(message) {
      let el = document.getElementById("toast");
      if (!el) {
        el = document.createElement("div");
        el.id = "toast";
        Object.assign(el.style, {
          position:"fixed",bottom:"22px",left:"50%",transform:"translateX(-50%)",
          background:"#171a23",border:"1px solid #303542",color:"#fff",
          padding:"11px 15px",borderRadius:"10px",zIndex:"9999",boxShadow:"0 15px 40px #0008"
        });
        document.body.appendChild(el);
      }
      el.textContent = message;
      clearTimeout(window.__toastTimer);
      window.__toastTimer = setTimeout(() => el.remove(), 2600);
    }
  };
})();
