document.addEventListener("DOMContentLoaded", () => {
  const started = Date.now();
  const time = document.getElementById("sessionTime");
  const state = document.getElementById("connectionState");

  setInterval(() => {
    const sec = Math.floor((Date.now() - started) / 1000);
    const m = String(Math.floor(sec / 60)).padStart(2,"0");
    const s = String(sec % 60).padStart(2,"0");
    time.textContent = `${m}:${s}`;
  }, 1000);

  document.querySelectorAll("[data-action]").forEach(btn => {
    btn.addEventListener("click", () => {
      const action = btn.dataset.action;
      if (action === "rotate") {
        document.querySelector(".phone-frame").classList.toggle("rotated");
        CloudDroid.toast("Demo: rotation requested");
      } else if (action === "keyboard") {
        CloudDroid.toast("Demo: keyboard input requested");
      } else if (action === "screenshot") {
        CloudDroid.toast("Demo: screenshot requested");
      } else {
        CloudDroid.toast(`Demo: ${action} command sent`);
      }
    });
  });

  document.getElementById("uploadBtn")?.addEventListener("click", () => document.getElementById("fileInput").click());
  document.getElementById("fileInput")?.addEventListener("change", e => {
    if (e.target.files[0]) CloudDroid.toast(`${e.target.files[0].name} selected. Connect the upload API to send it.`);
  });
  document.getElementById("stopBtn")?.addEventListener("click", () => {
    state.textContent = "Disconnected";
    CloudDroid.toast("Demo: stop-device request sent.");
  });
});