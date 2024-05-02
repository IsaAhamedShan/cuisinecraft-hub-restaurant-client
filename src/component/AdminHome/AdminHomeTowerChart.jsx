import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const AdminHomeTowerChart = ({ soldData }) => {
  const colors = ["#0088FE", "#3282BD", "#9ECAE1", "#56B4E9"];

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

  // const getPath = (x, y, width, height) => {
  //   return `M${x},${y + height}C${x + width / 3},${y + height} ${
  //     x + width / 2
  //   },${y + height / 3}
  // ${x + width / 2}, ${y}
  // C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
  //     x + width
  //   }, ${y + height}
  // Z`;
  // };
//! rectable shape
  const getPath = (x, y, width, height) => {
    const centerX = x + width / 2;
    const centerY = y + height / 2;
    const radius = Math.min(width, height) / 2;
  
    // Calculate the coordinates for the points of a rounded rectangle
    const topLeft = { x: x, y: y };
    const topRight = { x: x + width, y: y };
    const bottomLeft = { x: x, y: y + height };
    const bottomRight = { x: x + width, y: y + height };
  
    // Define the radius of the rounded corners
    const cornerRadius = 10;
  
    // Construct the SVG path for a rounded rectangle
    const path = `
      M ${topLeft.x + cornerRadius},${topLeft.y}
      L ${topRight.x - cornerRadius},${topRight.y}
      Q ${topRight.x},${topRight.y} ${topRight.x},${topRight.y + cornerRadius}
      L ${bottomRight.x},${bottomRight.y - cornerRadius}
      Q ${bottomRight.x},${bottomRight.y} ${bottomRight.x - cornerRadius},${bottomRight.y}
      L ${bottomLeft.x + cornerRadius},${bottomLeft.y}
      Q ${bottomLeft.x},${bottomLeft.y} ${bottomLeft.x},${bottomLeft.y - cornerRadius}
      L ${topLeft.x},${topLeft.y + cornerRadius}
      Q ${topLeft.x},${topLeft.y} ${topLeft.x + cornerRadius},${topLeft.y}
      Z
    `;
  
    return path;
  };
  //!Circle shape
  // const getPath = (x, y, width, height) => {
  //   const centerX = x + width / 2;
  //   const centerY = y + height / 2;
  //   const radius = Math.min(width, height) / 2;
  
  //   // Construct the SVG path for a circle
  //   const path = `
  //     M ${centerX},${centerY}
  //     m ${-radius}, 0
  //     a ${radius},${radius} 0 1,0 ${radius * 2},0
  //     a ${radius},${radius} 0 1,0 ${-radius * 2},0
  //   `;
  
  //   return path;
  // };
  // const getPath = (x, y, width, height) => {
  //   // Define the coordinates of the shape
  //   const x1 = x + width / 2;
  //   const y1 = y;
  //   const x2 = x + width / 4;
  //   const y2 = y + height / 2;
  //   const x3 = x + (3 * width) / 4;
  //   const y3 = y + height / 2;
  
  //   // Construct the SVG path for a triangle
  //   const path = `
  //     M ${x1},${y1}
  //     L ${x2},${y2}
  //     L ${x3},${y3}
  //     Z
  //   `;
  
  //   return path;
  // };
  //! diamond shape
  // const getPath = (x, y, width, height) => {
  //   // Define the coordinates of the shape
  //   const x1 = x + width / 2;
  //   const y1 = y;
  //   const x2 = x;
  //   const y2 = y + height / 2;
  //   const x3 = x + width / 2;
  //   const y3 = y + height;
  //   const x4 = x + width;
  //   const y4 = y + height / 2;
  
  //   // Construct the SVG path for a diamond
  //   const path = `
  //     M ${x1},${y1}
  //     L ${x2},${y2}
  //     L ${x3},${y3}
  //     L ${x4},${y4}
  //     Z
  //   `;
  
  //   return path;
  // };
  
  

  const TriangleBar = props => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };
  return (
    <div className="w-[400px] h-[300px] md:w-[500px]">
      <BarChart
        width={400}
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
