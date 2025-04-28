import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [selected, setSelected] = useState("Dashboard");
  const navigate = useNavigate(); // ใช้เพื่อเปลี่ยนเส้นทาง

  const handleSelect = (item, path) => {
    setSelected(item); // เปลี่ยนสถานะรายการที่เลือก
    navigate(path); // เปลี่ยนหน้าเมื่อเลือกเมนู
  };

  return (
    <div style={styles.sidebar}>
      <div style={styles.header}>
        <h6 style={styles.title}>CLIMATIC FLOW</h6>
      </div>
      <ul style={styles.list}>
        <h3 style={styles.menu}>MENU</h3>
        <li
          style={selected === "Dashboard" ? styles.selectedItem : styles.listItem}
          onClick={() => handleSelect("Dashboard", "/")}
        >
          <img src="../src/images/home.png" style={styles.icon} />
          <span>Dashboard</span>
        </li>
      </ul>
    </div>
  );
};

// Styles สำหรับคอมโพเนนต์ (ใส่สไตล์ที่เหมาะสม)
const styles = {
  sidebar: {
    width: 240,
    padding: '15px',
    margin: '25px',
    borderRadius: '15px',
    backgroundColor: '#2D336B',
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex", // ใช้ Flexbox
    justifyContent: "center", // จัดให้อยู่ตรงกลางแนวนอน
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: "center",
  },
  list: {
    listStyleType: 'none',
    paddingLeft: 0,
  },
  menu: {
    fontSize: '1.2rem',
    fontWeight: "normal",
    marginLeft: "10px",
    marginBottom: "20px",
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px',
    cursor: 'pointer',
    fontSize: '18px',
    borderRadius: '15px',
    transition: 'background-color 0.3s',
  },
  selectedItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px 15px',
    borderRadius: '15px',
    cursor: 'pointer',
    fontSize: '18px',
    backgroundColor: '#A9B5DF',
    color: '#fff',
  },
  icon: {
    marginRight: '15px',
    fontSize: '20px', // สำหรับ Material-UI Icons (ถ้าใช้)
    width: '24px', // กำหนดความกว้างของรูปภาพ
    height: '24px',
  },
  footerList: {
    marginTop: 'auto',
  },
};

export default Sidebar;