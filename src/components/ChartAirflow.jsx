import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";


const ChartAirflow = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // สำหรับจัดการข้อผิดพลาดจากการเรียก API

  // ดึงข้อมูลจาก API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://exampleclientapp1.com https://exampleclientapp2.com");
        if (!response.ok) {
          throw new Error("Network response was not ok"); // ตรวจสอบว่าคำขอสำเร็จหรือไม่
        }
        const result = await response.json(); // แปลงข้อมูล JSON
        setData(result.data || []); // ใช้ข้อมูลจาก API (ถ้าไม่มีข้อมูล result.data ให้ใช้ค่าเริ่มต้นเป็น array ว่าง)
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message); // เก็บข้อความข้อผิดพลาดใน state
        setLoading(false);
      }
    };

    fetchData();
  }, []); // [] หมายถึงจะทำงานแค่ครั้งเดียวเมื่อคอมโพเนนต์โหลด

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Typography variant="h6">Airflow</Typography>
        {loading ? (
          <Typography variant="body2">Loading...</Typography> // แสดงข้อความระหว่างโหลด
        ) : error ? (
          <Typography variant="body2" color="error">
            Error: {error} {/* แสดงข้อความข้อผิดพลาดถ้ามี */}
          </Typography>
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="airflow" fill="#3f51b5" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default ChartAirflow;