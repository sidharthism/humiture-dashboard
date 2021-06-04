// import moment from "moment";

// COLORS

const COLORS = {
  primary: "#f9fafb",
  lightGrey: "#cccccc",
  grey: "#777777ca",
  lightBlue: " #000ee6ba",
  lightBlue2: "#000fe682",
  blue: "#000ee6",
  red: "#e94e4e",
  aqua: "#59aacd",
  black: "#373737",
  white: "#ffffff",
};

const getMetricAvg = (arr, key) => {
  if (arr.length === 0) return 0;
  let avg =
    arr.reduce((sum, { [key]: t }) => {
      return sum + Number(t);
    }, 0) / arr.length;
  return avg;
};

const getMetricAvgFromRange = (arr = [], start = 0, end = 0, metric = "") => {
  if (arr.length === 0) return 0;
  let sum = 0,
    avg = 0;
  start = Math.abs(start);
  end = Math.abs(end);
  // console.log(start, end);
  if (start === end) {
    if (metric !== "") return Number(arr[start][metric]);
    return Number(arr[start]);
  }
  if (start > end) {
    let temp = start;
    start = end;
    end = temp;
  }
  for (let i = start; i <= end; i++) {
    if (metric !== "") sum += Number(arr[i][metric]);
    else sum += Number(arr[i]);
  }
  avg = arr.length > 0 ? sum / (Math.abs(start - end) + 1) : 0;
  return avg.toFixed(1);
};

const CustomTooltip = ({
  datakey,
  payload,
  label,
  textTooltip,
  tooltipLabel = "Label",
}) => {
  const dateTip = ""; // moment(label).format("").slice();
  const formattedDate = dateTip;
  if (payload === null) return;
  if (datakey)
    return (
      <div className="custom-tooltip">
        <p className="label-tooltip">{`${formattedDate}`}</p>
        <p className="desc-tooltip">
          <span className="value-tooltip">
            {tooltipLabel} {payload[0].value.toLocaleString()}
          </span>
        </p>
      </div>
    );
  return null;
};

const CustomizedAxisTick = ({ x, y, payload }) => {
  const dateTip = ""; // moment(payload.value).format("").slice();
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={23}
        y={0}
        dy={14}
        fontSize="0.90em"
        fontFamily="bold"
        textAnchor="end"
        fill="#363636"
      >
        {dateTip}
      </text>
    </g>
  );
};

const xAxisTickFormatter = (timestamp_measured) => {
  return; //moment(timestamp_measured).format("").slice();
};

export {
  COLORS,
  getMetricAvg,
  getMetricAvgFromRange,
  CustomTooltip,
  CustomizedAxisTick,
  xAxisTickFormatter,
};
