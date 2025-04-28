import React, { useState, useEffect } from "react";
import Hot from "../images/hot.png";
import Cold from "../images/cold.png";

const Notifications = ({ onClose }) => {
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationTime, setNotificationTime] = useState({ date: "", time: "" });
  const [status, setStatus] = useState("");

  //เป็นค่าที่สมมติขึ้นมา
  useEffect(() => {
    const temp = 25;
    const hum = 50;
    const now = new Date();

    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

    setTemperature(temp);
    setHumidity(hum);
    setNotificationTime({ date, time });

    let message = "";
    if (temp < 21) {
      setStatus("Cold");
      message += "⚠️ อุณหภูมิต่ำเกินไป";
    } else if (temp > 31) {
      setStatus("Hot");
      message += "⚠️ อุณหภูมิสูงเกินไป";
    }

    if (hum < 48) {
      message += " | ความชื้นต่ำเกินไป";
    } else if (hum > 67) {
      message += " | ความชื้นสูงเกินไป";
    }

    setNotificationMessage(message);
  }, []);


  {/* การเชื่อมต่อกับ Firebase Realtime Database

    useEffect(() => {
  const unsubscribe = onSnapshot(doc(db, "your-collection", "your-doc-id"), (doc) => {
    if (doc.exists()) {
      const data = doc.data();
      setTemperature(data.temperature);
      setHumidity(data.humidity);

      const now = new Date();
      setNotificationTime({ 
        date: now.toLocaleDateString(), 
        time: now.toLocaleTimeString() 
      });

      let message = "";
      if (data.temperature < 22) {
        setStatus("Cold");
        message += "⚠️ อุณหภูมิต่ำเกินไป";
      } else if (data.temperature > 28) {
        setStatus("Hot");
        message += "⚠️ อุณหภูมิสูงเกินไป";
      }

      if (data.humidity < 48) {
        message += " | ความชื้นต่ำเกินไป";
      } else if (data.humidity > 67) {
        message += " | ความชื้นสูงเกินไป";
      }

      setNotificationMessage(message);
    }
  });

  return () => unsubscribe(); // ปิดการฟังเมื่อ component ถูก unmount
}, []);

*/}

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <h1 style={styles.title}>Notification</h1>
        {notificationMessage ? (
          <div style={styles.notificationBox}>
            <div style={styles.notificationHeader}>
              <p style={styles.notificationDate}>Date: {notificationTime.date}</p>
              <p style={styles.notificationTiming}>Time: {notificationTime.time}</p>
            </div>

            <div style={styles.contentRow}>
              <div style={styles.messageColumn}>
                <p style={styles.notificationMessage}>{notificationMessage}</p>
                <div style={styles.values}>
                  <p>Temperature: {temperature}°C</p>
                  <p>Humidity: {humidity}%</p>
                </div>
              </div>
              {status === "Hot" && <img src={Hot} alt="Hot" style={styles.icon} />}
              {status === "Cold" && <img src={Cold} alt="Cold" style={styles.icon} />}
            </div>
          </div>
        ) : (
          <p style={{ color: "#555" }}>Notifications</p>
        )}
        <button onClick={onClose} style={styles.closeButton}>Close</button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  popup: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "15px",
    width: "600px", // กว้างขึ้น
    maxWidth: "90%",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.25)",
    textAlign: "center",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#2D336B",
    marginBottom: "20px",
  },
  notificationBox: {
    backgroundColor: "#f9f9f9",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
  },
  notificationHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "15px",
  },
  notificationDate: {
    fontSize: "18px",
    color: "#2D336B",
  },
  notificationTiming: {
    fontSize: "18px",
    color: "#2D336B",
  },
  contentRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  messageColumn: {
    flex: 1,
    textAlign: "left",
  },
  notificationMessage: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#ff5c5c",
    marginBottom: "10px",
  },
  values: {
    fontSize: "16px",
    color: "#000",
  },
  icon: {
    width: "150px",
    height: "150px",
    marginLeft: "20px",
  },
  closeButton: {
    marginTop: "20px",
    padding: "12px 24px",
    fontSize: "18px",
    backgroundColor: "#2D336B",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default Notifications;
