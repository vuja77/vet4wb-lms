"use client";
import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const data = [
  {
    country: "Montenegro",
    total: 25,
  },
  {
    country: "Bosna i Hercegovina",
    total: 1,
  },
  {
    country: "Albania",
    total: 0,
  },
  {
    country: "Kosovo",
    total: 0,
  },
];

export default function CountryChart() {
  const CustomTooltip = ({ active, payload, label }:{active?:boolean,payload?:any, label?:string}) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white rounded-lg border p-3">
          <p className="label">{`${label} : ${payload[0].value}`}</p>
        </div>
      );
    }

    return null;
  };
  return (
    // <ResponsiveContainer width="100%" height="100%">
    //   <BarChart
    //     width={500}
    //     height={300}
    //     data={data}
    //     margin={{
    //       top: 5,
    //       right: 30,
    //       left: 20,
    //       bottom: 5,
    //     }}
    //   >
    //     <XAxis dataKey="country" />
    //     <YAxis />
    //     <Tooltip />
    //     <Bar
    //       dataKey="total"
    //       fill="#104421"
    //       activeBar={<Rectangle fill="#104421" stroke="#104421" />}
    //     />
    //   </BarChart>
    // </ResponsiveContainer>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 40,
          left: 0,
          bottom: 2,
        }}
      >
        <XAxis dataKey="country" />
        <YAxis />
        <Tooltip content={<CustomTooltip  />} />
        <Line
          type="monotone"
          dataKey="total"
          stroke="#104421"
          activeDot={{ r: 8 }}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
