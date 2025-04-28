import React from "react";

const WeatherStatus = ({ temperature }) => {
  // ฟังก์ชันที่จะใช้ตรวจสอบอุณหภูมิและแสดงสถานะ
  const getWeatherStatus = () => {
    if (temperature < 23) {
      return { status: "Cold", suggestion: "Freezing" }; // หนาว
    } else if (temperature >= 23 && temperature <= 27) {
      return { status: "Warm", suggestion: "Normal" }; // ปกติ
    } else {
      return { status: "Hot", suggestion: "Hot" }; // ร้อน
    }
  };

  const { status, suggestion } = getWeatherStatus();

  return (
    <div style={styles.card}>
      <div style={styles.iconContainer}>
        {/* ใช้รูปภาพหรือไอคอนตามสถานะ */}
        {status === "Hot" && <img src="../src/images/hot.png" style={styles.icon} />}
        {status === "Cold" && <img src="../src/images/cold.png" style={styles.icon} />}
        {status === "Warm" && <img src="../src/images/happy.png" style={styles.icon} />}
      </div>
    </div>
  );
};

const styles = {
  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    //padding: "16px",
    //backgroundColor: "#f8f9fa",
    //borderRadius: "100px",
    //boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  iconContainer: {
    marginRight: "16px", // ระยะห่างระหว่างรูปภาพกับข้อความ
  },
  icon: {
    width: "250px", // ขนาดของรูปภาพ
    height: "250px",
  },
};

export default WeatherStatus;
