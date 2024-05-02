import React, { PureComponent, useEffect } from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";

const RADIAN = Math.PI / 180;

export default class Example extends PureComponent {
  render() {
    const renderCustomizedLabel = ({
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      percent,
      index,
    }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return (
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    };
    const { soldData, totalRevenue } = this.props;
    const COLORS = ["#0088FE", "#3282BD", "#9ECAE1", "#56B4E9"];
    
      const data = soldData?.map(item => {
        return {
          name: item._id,
          value: Math.floor(totalRevenue / item.revenue),
        };
      });
   
    const dataa = [
      {
        name: "Pizza",
        value: totalRevenue / soldData[0]?.revenue,
        color: "#FF5733",
      },
      {
        name: "Salad",
        value: totalRevenue / soldData[1]?.revenue,
        color: "#26ff35",
      },
      {
        name: "Dessert",
        value: totalRevenue / soldData[2]?.revenue,
        color: "#FFC0CB",
      },
      {
        name: "Soup",
        value: totalRevenue / soldData[3]?.revenue,
        color: "#FFA500",
      },
    ];

    return (
      <div className="w-[300px] h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data &&
                data?.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
            </Pie>
            <Legend></Legend>
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
