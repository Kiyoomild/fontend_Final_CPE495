import React, { useEffect, useState } from "react";
import CardInfo from "./CardInfo";
import WeatherStatus from "./WeatherStatus";
import Forecast from "./Forecast";
import Notifications from "./Notifications"; 

// 👉 เพิ่ม Firebase
// import { database, ref, onValue } from "./firebase";

const Dashboard = () => {
    const [selectedDate, setSelectedDate] = useState("");
    const [temperature, setTemperature] = useState(0);  
    const [humidity, setHumidity] = useState(0);        
    const [showPopup, setShowPopup] = useState(false);
    const [selectedForecast, setSelectedForecast] = useState(null);  
    const [currentTime, setCurrentTime] = useState(""); 

    // ฟังก์ชันดึงค่าปัจจุบัน
    const getCurrentTemperature = () => 10; // สามารถเปลี่ยนเป็นการดึงจาก sensor หรือ API
    const getCurrentHumidity = () => 20;

    useEffect(() => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, "0");
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const year = String(today.getFullYear());
        const formattedDate = `${day}/${month}/${year}`;
        setSelectedDate(formattedDate);
    }, []);

    // อัปเดตข้อมูล mock ทุก 10 นาที
    useEffect(() => {
        const interval = setInterval(() => {
            const forecastData = {
                temperature: getCurrentTemperature(),
                humidity: getCurrentHumidity(),
                time: new Date().toLocaleTimeString()
            };
            setTemperature(forecastData.temperature);  
            setHumidity(forecastData.humidity);        
            setCurrentTime(forecastData.time);         
        }, 600000); 

        return () => clearInterval(interval); 
    }, []);

    const handleSelectForecast = (forecast) => {
        if (!forecast) {
            // ถ้า forecast เป็น null = ไม่มีเลือก
            setSelectedForecast(null);
            setTemperature(20);        
            setHumidity(87);           
            setCurrentTime(new Date().toLocaleTimeString()); 
        } else {
            setSelectedForecast(forecast);
            setTemperature(forecast.temperature); 
            setHumidity(forecast.humidity);
            setCurrentTime(forecast.time); 
        }
    };

    useEffect(() => {
        if (temperature > 30 || temperature < 20) {
            setShowPopup(true);
            const timer = setTimeout(() => {
                setShowPopup(false); 
            }, 5000);
            return () => clearTimeout(timer); 
        }
    }, [temperature]);

    // อัปเดตเวลา
    useEffect(() => {
        if (selectedForecast) {
            setCurrentTime(selectedForecast.time);
        } else {
            const interval = setInterval(() => {
                const now = new Date();
                const time = now.toLocaleTimeString();
                setCurrentTime(time);
            }, 1000);
    
            return () => clearInterval(interval); 
        }
    }, [selectedForecast]);

    // 🔥 ใช้ Firebase Realtime Database เพื่อรับค่าอัปเดต
    {/*useEffect(() => {
        const sensorRef = ref(database, "sensor/data");
        const unsubscribe = onValue(sensorRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setTemperature(data.temperature);
                setHumidity(data.humidity);
            }
        });

        return () => unsubscribe(); // cleanup
    }, []);*/}

    return (
        <div style={styles.container}>
            <div style={styles.header}>Dashboard</div>

            <div style={styles.dateContainer}>
                <label htmlFor="date-display" style={styles.dateLabel}>วันที่:</label>
                <span id="date-display" style={styles.dateText}>{selectedDate}</span>
            </div>

            <div style={styles.cardWrapper}>
                <div style={styles.leftSection}>
                    {/* แสดงข้อมูลจาก forecast หรือปัจจุบัน */}
                    <CardInfo
                        title="Classroom 05-0406"
                        value={`${temperature}°C`}
                        description="Normal"
                        currentTime={currentTime} // ส่งเวลาปัจจุบัน
                    />
                </div>

                <div style={styles.rightSection}>
                    <div style={styles.cardContent}>
                        <div style={styles.cardIcon}>
                            <WeatherStatus temperature={temperature} />
                        </div>
                        <div style={styles.cardText}>
                            <CardInfo
                                icons={[{ icon: "../src/images/raindrops.png", text: `${humidity}%` }]}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* ส่งฟังก์ชัน setSelectedForecast ให้ Forecast */}
            <Forecast onSelectForecast={handleSelectForecast} />

            {/* ส่ง onClose ไปยัง Notifications */}
            {showPopup && <Notifications onClose={() => setShowPopup(false)} />}
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
    dateContainer: {
        marginBottom: "16px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
    },
    dateLabel: {
        fontSize: "26px",
        color: "#000000",
    },
    dateText: {
        fontSize: "24px",
        color: "#2D336B",
        fontWeight: "bold",
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
    cardForecast: {
        backgroundColor: "#fff",
        borderRadius: "20px",
        padding: "24px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        marginTop: "24px",
    },
    timeWrapper: {
        marginTop: "10px", 
        fontSize: "18px", 
        color: "#2D336B",
        textAlign: "center"
    },
    timeText: {
        fontSize: "18px",
        fontWeight: "bold",
        color: "#2D336B"
    },
};

export default Dashboard;