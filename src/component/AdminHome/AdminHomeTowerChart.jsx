import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from "recharts";

const AdminHomeTowerChart = ({soldData}) => {
   
  const colors = ["#FF5733", "#26ff35", "#FFC0CB", "#FFA500"];

  const data = [
    {
      name: soldData[0]._id,
      uv: soldData[0].quantity,
      pv: 2400,
      amt: 2400,
    },
    {
      name: soldData[1]._id,
      uv: soldData[1].quantity,
      pv: 1398,
      amt: 2210,
    },
    {
      name: soldData[2]._id,
      uv: soldData[2].quantity,
      pv: 9800,
      amt: 2290,
    },
    {
      name: soldData[3]._id,
      uv: soldData[3].quantity,
      pv: 3908,
      amt: 2000,
    },
   
   
  ];

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
  Z`;
  };

  const TriangleBar = props => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };
  return (
    <div>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Bar
          dataKey="uv"
          fill="#8884d8"
          shape={<TriangleBar />}
          label={{ position: "top" }}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % 20]} />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
};

export default AdminHomeTowerChart;
