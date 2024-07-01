"use client";
import { Card } from "@nextui-org/react";
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



export default function CourseChart({data}:{data:any}) {
  const CustomTooltip = ({ active, payload, label }:{active?:boolean,payload?:any, label?:string}) => {
    if (active && payload && payload.length) {
      return (
        <Card className="rounded-lg border p-3">
          <p className="text-xs">{`${label} : ${payload[0].value}`}</p>
        </Card>
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
        <XAxis dataKey="course.name" tick={{ fontSize: 5}} angle={-5} />
        <YAxis />
        <Tooltip content={<CustomTooltip  />} />
        <Line
          type="monotone"
          dataKey="count"
          stroke="#104421"
          activeDot={{ r: 8 }}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
