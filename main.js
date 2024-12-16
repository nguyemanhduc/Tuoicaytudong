const esp32Url = "http://192.168.70.22";

// Hàm lấy dữ liệu cảm biến và cập nhật giao diện
async function getSensorData() {
  try {
    const response = await fetch(`${esp32Url}/sensor`);
    const data = await response.json();

    document.getElementById("humidity").innerText = `${data.humidity}%`;
    document.getElementById("temperature").innerText = `${data.temperature}°C`;
    document.getElementById(
      "soil-moisture"
    ).innerText = `${data.soil_moisture}%`;
    document.getElementById(
      "last-updated"
    ).innerText = `Cập nhật lần cuối: ${new Date().toLocaleTimeString()}`;
  } catch (error) {
    console.error("Error fetching sensor data:", error);
  }
}

// Điều khiển bơm nước (bật/tắt)
async function controlPump(status) {
  try {
    const response = await fetch(`${esp32Url}/control?status=${status}`);
    const data = await response.json();
    if (data.status === "success") {
      document.getElementById("pump-status").innerText = `Trạng thái: ${
        status === "on" ? "Đang bật" : "Đang tắt"
      }`;
    } else {
      alert("Error: " + data.message);
    }
  } catch (error) {
    alert("Failed to control the pump: " + error);
  }
}

// Bật/tắt chế độ tự động
async function toggleAutoMode() {
  const autoToggle = document.getElementById("auto-toggle");
  const mode = autoToggle.checked ? "on" : "off";

  try {
    const response = await fetch(`${esp32Url}/auto?mode=${mode}`);
    const data = await response.json();

    if (data.status === "success") {
      document.getElementById("auto-status").innerText = `Trạng thái: ${
        mode === "on" ? "Bật" : "Tắt"
      }`;
    } else {
      alert("Error: " + data.message);
    }
  } catch (error) {
    alert("Failed to toggle auto mode: " + error);
  }
}

// Lắng nghe sự kiện thay đổi của chế độ tự động
document
  .getElementById("auto-toggle")
  .addEventListener("change", toggleAutoMode);

// Lấy dữ liệu cảm biến ban đầu
getSensorData();

// Cập nhật dữ liệu cảm biến mỗi 5 giây
setInterval(getSensorData, 5000);
