import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, Typography } from "@mui/material";

const data = [
  { wavelength: 300, intensity: 50 },
  { wavelength: 600, intensity: 80 },
  { wavelength: 900, intensity: 60 },
  { wavelength: 1200, intensity: 40 },
];

const ChartHeatRadiation = () => {
  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Typography variant="h6">Heat Radiation</Typography>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <XAxis dataKey="wavelength" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="intensity" stroke="#FF5733" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ChartHeatRadiation;