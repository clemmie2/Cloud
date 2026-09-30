document.addEventListener("DOMContentLoaded", () => {
  const devices = window.CLOUDDROID_DEMO_DEVICES || [];
  const list = document.getElementById("deviceList");
  if (!list) return;

  list.innerHTML = devices.map(deviceCard).join("");
  document.getElementById("deviceCount").textContent = devices.length;
  document.getElementById("runningCount").textContent = devices.filter(d => d.status === "running").length;

  document.getElementById("demoBtn")?.addEventListener("click", () => {
    location.href = `device.html?id=${encodeURIComponent(devices[0]?.id || "demo-android-1")}`;
  });

  function deviceCard(d) {
    const running = d.status === "running";
    return `<article class="device-card">
      <div class="device-head"><div class="device-icon">▯</div><span class="status ${running ? "running" : "offline"}"><span class="dot ${running ? "online" : ""}"></span> ${running ? "Running" : "Offline"}</span></div>
      <p class="device-name">${escapeHtml(d.name)}</p>
      <div class="device-meta"><div>Android<strong>${escapeHtml(d.android)}</strong></div><div>Storage<strong>${escapeHtml(d.storage)}</strong></div></div>
      <div class="device-actions"><a class="btn primary" href="device.html?id=${encodeURIComponent(d.id)}">${running ? "Open" : "View"} device</a><button class="btn secondary" onclick="CloudDroid.toast('${running ? "Stopping device…" : "Starting device…"}')">${running ? "Stop" : "Start"}</button></div>
    </article>`;
  }
  function escapeHtml(v){return String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
});