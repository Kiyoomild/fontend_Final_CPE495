import React from "react";
import PropTypes from "prop-types";
import WeatherStatus from "./WeatherStatus";

const CardInfo = ({ title, value, description, description2,  description3, 
  image, icons, temperature, unit, currentTime, // เพิ่ม unit เช่น "°C", "°F", "%", "m/s"
}) => {
  return (
    <div style={styles.card}>
      {/* ถ้ามี temperature แสดง WeatherStatus */}
      {typeof temperature === "number" ? (
        <WeatherStatus temperature={temperature} />
      ) : (
        image && <img src={image} alt="Card Icon" style={styles.image} />
      )}

      

      {/* แสดง title, value, descriptions */}
      {title?.trim() && <p style={styles.title}>{title}</p>}
      {/* แสดงเวลาปัจจุบัน */}
      {currentTime && (
        <p style={styles.currentTime}>{currentTime}</p>
      )}
      {value?.toString().trim() && (
        <p style={styles.value}>
          {value}
          {unit && <span style={styles.unit}> {unit}</span>}
        </p>
      )}
      {description?.trim() && <p style={styles.description}>{description}</p>}
      {description2?.trim() && <p style={styles.description2}>{description2}</p>}
      {description3?.trim() && <p style={styles.description3}>{description3}</p>}

      

      {/* แสดง icons ถ้ามี */}
      {icons?.length > 0 && (
        <div style={styles.iconContainer}>
          {icons.map((item, index) => (
            <div key={index} style={styles.iconItem}>
              <img src={item.icon} alt="Icon" style={styles.icon} />
              <span style={styles.iconText}>{item.text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  card: {
    padding: "5px",
    width: "500px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  image: {
    width: "400px",
    height: "400px",
    objectFit: "contain",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
  iconContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "4px",
    marginTop: "0px",
  },
  iconItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    width: "100%",
  },
  icon: {
    width: "30px",
    height: "30px",
  },
  iconText: {
    fontSize: "24px",
    fontWeight: "bold",
    marginLeft: "10px",
    color: "black",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "black",
  },
  value: {
    fontSize: "60px",
    fontWeight: "bold",
    color: "black",
    margin: "5px 0",
  },
  unit: {
    fontSize: "24px",
    marginLeft: "5px",
    color: "gray",
  },
  description: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "black",
    marginBottom: "2px",
  },
  description2: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "black",
    marginTop: "2px",
  },
  description3: {
    fontSize: "15px",
    color: "black",
    marginTop: "2px",
  },
  currentTime: {
    fontSize: "22px",
    color: "black",
    fontWeight: "bold",
    marginTop: "10px",
  },
};

CardInfo.propTypes = {
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  description: PropTypes.string,
  description2: PropTypes.string,
  description3: PropTypes.string,
  image: PropTypes.string,
  icons: PropTypes.array,
  temperature: PropTypes.number,
  unit: PropTypes.string, // เพิ่ม unit สำหรับค่าเช่น %, °C
  currentTime: PropTypes.string, // รับค่าเวลาปัจจุบัน
};

export default CardInfo;