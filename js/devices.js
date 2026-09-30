document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("allDevices");
  const devices = window.CLOUDDROID_DEMO_DEVICES || [];
  list.innerHTML = devices.map(d => `<article class="device-card">
    <div class="device-head"><div class="device-icon">▯</div><span class="status offline"><span class="dot"></span> Offline</span></div>
    <p class="device-name">${d.name}</p>
    <div class="device-meta"><div>Android<strong>${d.android}</strong></div><div>Storage<strong>${d.storage}</strong></div></div>
    <div class="device-actions"><a class="btn primary" href="device.html?id=${encodeURIComponent(d.id)}">Open</a><button class="btn secondary" data-start="${d.id}">Start</button></div>
  </article>`).join("");

  document.getElementById("createDevice")?.addEventListener("click", () => {
    CloudDroid.toast("Device provisioning requires your backend API.");
  });
  document.querySelectorAll("[data-start]").forEach(btn => btn.addEventListener("click", () => CloudDroid.toast("Demo: device start request queued.")));
});