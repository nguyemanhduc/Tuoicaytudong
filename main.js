const esp32IP = "http://192.168.*.**"; // Địa chỉ IP của ESP32

// Lấy dữ liệu cảm biến từ esp32
function fetchSensorData() {
  fetch(`${esp32IP}/sensor/latest`)
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        const { soil_moisture, temperature, humidity } = data.data;
        document.getElementById("soil-moisture").textContent =
          soil_moisture + "%";
        document.getElementById("Temperature").textContent = temperature + "°C";
        document.getElementById("Humidity").textContent = humidity + "%";
        const now = new Date();
        document.getElementById(
          "last-updated"
        ).textContent = `Cập nhật lần cuối: ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
      }
    })
    .catch((error) => console.error("Không thể kết nối tới server:", error));
}

// Điều khiển bơm nước
function controlPump(status) {
  fetch(`${esp32IP}/control?status=${status}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        document.getElementById(
          "pump-status"
        ).textContent = `Trạng thái: Đang ${status === "on" ? "bật" : "tắt"}`;
      } else {
        alert("Có lỗi xảy ra: " + data.message);
      }
    })
    .catch((error) => console.error("Không thể kết nối với server:", error));
}

// Cập nhật dữ liệu cảm biến mỗi 5 giây
setInterval(fetchSensorData, 5000);
fetchSensorData(); // Lấy dữ liệu ngay khi tải trang
