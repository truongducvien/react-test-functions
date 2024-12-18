import { useEffect, useMemo } from "react";
import NeedleIcon from "./NeedleIcon";

const DEFAULT_RANGE = [
  {
    key: "red",
    label: "Red",
    arcLength: 2,
    fill: "#FF5C4D",
    stroke: null,
  },
  {
    key: "orange",
    label: "Orange",
    arcLength: 2.5,
    fill: "#FEB13E",
    stroke: null,
  },
  {
    key: "yellow",
    label: "Yellow",
    arcLength: 0.5,
    fill: "#FFD700",
    stroke: null,
  },
  {
    key: "green",
    label: "Green",
    arcLength: 2,
    fill: "#5AC25A",
    stroke: null,
  },
];

export default function GaugeChart({
  data = DEFAULT_RANGE,
  percent,
  radius = 105,
  thick = 40,
}) {
  // Calculate chart data from range:
  const chartData = useMemo(() => {
    let accumulationAngle = 0;
    const totalValue = data.reduce((p, c) => p + c.arcLength, 0);
    return data.map((segment) => {
      // const segmentPercent = ()
    });
  }, [data]);

  useEffect(() => {
    if (thick > radius) {
      console.error('The "thick" prop must be lower than "radius".');
    }
  }, [thick, radius]);

  return (
    <div
      style={{ display: "flex", position: "relative" }}
      height={`${radius}px`}
    >
      <svg width={radius * 2} height={radius}>
        <g>
          {[...new Array(16)].map((_, index) => (
            <path
              key={index}
              strokeWidth={0.5}
              stroke="#8080805e"
              d={`M0,${index * 20} H300`}
            />
          ))}
          {[...new Array(16)].map((_, index) => (
            <path
              key={index}
              strokeWidth={0.5}
              stroke="#8080805e"
              d={`M${index * 20},0 V300`}
            />
          ))}
          <circle r={4} cx={radius} cy={radius} fill="green" />
          {/* <circle r={60} cx={60} cy={60} stroke="brown" fill="none" /> */}
        </g>
        <g>
          <GaugeSegment
            rIn={radius - thick}
            rOut={radius}
            startAngle={0}
            endAngle={90}
            fill={"red"}
          />
          <GaugeSegment
            rIn={radius - thick}
            rOut={radius}
            startAngle={90}
            endAngle={130}
            fill={"orange"}
          />
          <GaugeSegment
            rIn={radius - thick}
            rOut={radius}
            startAngle={130}
            endAngle={150}
            fill={"yellow"}
          />
          <GaugeSegment
            rIn={radius - thick}
            rOut={radius}
            startAngle={150}
            endAngle={180}
            fill={"green"}
          />
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          left: "calc(50% - 7px)",
          top: "calc(100% - 9px)",
        }}
      >
        <NeedleIcon />
      </div>
    </div>
  );
}

const GaugeSegment = ({
  rIn,
  rOut,
  startAngle = 0,
  endAngle = 0,
  fill,
  stroke,
  strokeWidth = 1,
}) => {
  if (!rIn || !rOut) return null;

  const startIn = {
    x: rOut - rIn * Math.cos((startAngle * Math.PI) / 180).toFixed(2),
    y: rOut - rIn * Math.sin((startAngle * Math.PI) / 180).toFixed(2),
  };

  const startOut = {
    x: rOut - rOut * Math.cos((startAngle * Math.PI) / 180).toFixed(2),
    y: rOut - rOut * Math.sin((startAngle * Math.PI) / 180).toFixed(2),
  };

  const endIn = {
    x: rOut - rIn * Math.cos((endAngle * Math.PI) / 180).toFixed(2),
    y: rOut - rIn * Math.sin((endAngle * Math.PI) / 180).toFixed(2),
  };

  const endOut = {
    x: rOut - rOut * Math.cos((endAngle * Math.PI) / 180).toFixed(2),
    y: rOut - rOut * Math.sin((endAngle * Math.PI) / 180).toFixed(2),
  };

  return (
    <path
      strokeWidth={strokeWidth}
      stroke={stroke}
      fill={fill}
      d={`
          M ${startOut.x} ${startOut.y} A ${rOut} ${rOut} 0 0 1 ${endOut.x} ${endOut.y}
          L ${endIn.x} ${endIn.y}
          M ${endIn.x} ${endIn.y} A ${rIn} ${rIn} 0 0 0 ${startIn.x} ${startIn.y}
          L ${startOut.x} ${startOut.y}
        `}
    ></path>
  );
};
