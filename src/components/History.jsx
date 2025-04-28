import React, { useEffect, useState } from "react";
import CardInfo from "./CardInfo";
import WeatherStatus from "./WeatherStatus";
import Forecast from "./Forecast";

const History = () => {
  const [selectedDate, setSelectedDate] = useState(""); // เก็บวันที่ที่เลือก
  const [weatherData, setWeatherData] = useState({});

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value); // อัปเดตวันที่เมื่อผู้ใช้เลือก
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  // จำลองการดึงข้อมูล
  const fetchWeatherData = async (date) => {
    // แทนที่ด้วยการดึงจาก API หรือ Database จริง
    // สมมุติข้อมูล dummy
    const dummyData = {
      date: date,
      temp: 30,
      humidity: 70,
      status: "Cloudy",
      forecast: [
        { time: "09:00", temp: 28 },
        { time: "12:00", temp: 30 },
        { time: "15:00", temp: 32 },
      ],
    };
    setWeatherData(dummyData);
  };

  useEffect(() => {
    if (selectedDate) {
      fetchWeatherData(selectedDate);
    }
  }, [selectedDate]);
  

  return (
    <div style={styles.container}>
      <div style={styles.header}>History</div>
      <div style={styles.datePickerContainer}>
        <label htmlFor="datePicker" style={styles.label}>เลือกวันที่:</label>
        <input
          id="datePicker"
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          style={styles.datePicker}
        />
      </div>
      {selectedDate && (
        <>
          <div style={styles.dateText}>วันที่: {formatDate(selectedDate)}</div>

          <div style={styles.cardWrapper}>
            <div style={styles.leftSection}>
              <CardInfo
                title="Classroom 05-0406"
                value={`${weatherData?.temp ?? "--"}°C`}
                description={weatherData?.status ?? "N/A"}
              />
            </div>

            <div style={styles.rightSection}>
              <div style={styles.cardContent}>
                <div style={styles.cardIcon}>
                  <WeatherStatus temperature={weatherData?.temp ?? 0} />
                </div>
                <div style={styles.cardText}>
                  <CardInfo
                    icons={[
                      { icon: "../src/images/raindrops.png", text: `${weatherData?.humidity ?? "--"}%` },
                      { icon: "../src/images/sun.png", text: "Low" },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>

          {weatherData.forecast && <Forecast forecast={weatherData.forecast} />}
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "24px",
    fontFamily: "Arial, sans-serif",
    height: "calc(100vh - 50px)",
    overflow: "auto",
  },
  header: {
    fontWeight: "bold",
    fontSize: "36px",
    color: "#2D336B",
  },
  datePickerContainer: {
    marginTop: "16px",
    marginBottom: "16px",
  },
  label: {
    marginRight: "10px",
    fontSize: "24px",
    color: "#2D336B",
  },
  datePicker: {
    padding: "10px",
    fontSize: "22px",
    borderRadius: "10px",
    border: "1px solid #ccc",
  },
  dateText: {
    fontSize: "24px",
    color: "#2D336B",
    fontWeight: "bold",
    marginBottom: "16px",
  },
  cardWrapper: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    gap: "24px",
    backgroundColor: "skyblue",
    borderRadius: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "100%",
    marginBottom: "24px",
  },
  leftSection: {
    flex: "1 1 300px",
    minWidth: "300px",
  },
  rightSection: {
    flex: "1 1 300px",
    minWidth: "300px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: "16px",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "20px",
    padding: "24px 32px",
    gap: "24px",
    width: "280px",
  },
  cardIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cardText: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: "16px",
    width: "100%",
  },
};

export default History;
