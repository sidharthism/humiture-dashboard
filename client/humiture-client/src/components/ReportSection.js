import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
  CartesianGrid,
} from "recharts";

import SectionHeader from "./SectionHeader";
import MetricCard from "./MetricCard";

import { COLORS } from "../utils";

import temperatureIcon from "../assets/temperature.svg";
import humidityIcon from "../assets/humidity.svg";

import styles from "./ReportSection.module.css";

import { useReportData } from "../api";

/**
 * @TODO _.debounce for onChange of Recharts brush slider
 */

function ReportSection() {
  const {
    temperatureData,
    humidityData,
    temperatureIndexRange,
    humidityIndexRange,
    handleTemperatureIndexRangeChange,
    handleHumidityIndexRangeChange,
  } = useReportData();

  return (
    <div className={styles.reportContainer}>
      <SectionHeader title="Report" />
      <div className={styles.metricsContainer}>
        <div className={styles.temperatureContainer}>
          <MetricCard
            title="Temperature"
            dtype="temperature"
            icon={temperatureIcon}
            faceValue={temperatureIndexRange.avg}
            unit="°C"
          >
            {temperatureData?.length > 0 && (
              <ResponsiveContainer width={"100%"} height={"90%"}>
                <LineChart
                  data={temperatureData}
                  margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
                >
                  <XAxis
                    dataKey="Day"
                    tickCount={10}
                    // tick={CustomizedAxisTick}
                    minTickGap={2}
                    tickSize={7}
                    dx={14}
                    allowDataOverflow={true}
                  />
                  <YAxis />
                  <Tooltip
                    // content={<CustomTooltip />}
                    animationDuration={0}
                  />
                  <Legend />
                  <Line
                    type="natural"
                    dataKey="Temperature"
                    stroke={COLORS.red}
                    dot={false}
                    strokeWidth={3}
                    travellerWidth={4}
                    activeDot={{
                      fill: "#000000",
                      stroke: "#FFFFFF",
                      strokeWidth: 1,
                      r: 5,
                    }}
                  />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <Brush
                    onChange={handleTemperatureIndexRangeChange}
                    dataKey="Day"
                    // tickFormatter={xAxisTickFormatter}
                    startIndex={temperatureIndexRange.start}
                    endIndex={temperatureIndexRange.end}
                    stroke={COLORS.black}
                  >
                    <LineChart>
                      <Line
                        fill={COLORS.lightBlue}
                        type="natural"
                        dataKey={"Temperature"}
                        stroke={COLORS.lightBlue}
                        strokeWidth={1}
                        name={"Temperature"}
                        dot={false}
                      />
                    </LineChart>
                  </Brush>
                </LineChart>
              </ResponsiveContainer>
            )}
          </MetricCard>
        </div>
        <div className={styles.humidityContainer}>
          <MetricCard
            title="Humidity"
            dtype="humidity"
            icon={humidityIcon}
            faceValue={humidityIndexRange.avg}
            unit="%"
          >
            {humidityData?.length > 0 && (
              <ResponsiveContainer width={"100%"} height={"90%"}>
                <LineChart
                  data={humidityData}
                  margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
                >
                  <XAxis
                    dataKey="Day"
                    tickCount={10}
                    // tick={CustomizedAxisTick}
                    minTickGap={2}
                    tickSize={7}
                    dx={14}
                    allowDataOverflow={true}
                  />
                  <YAxis />
                  <Tooltip
                    // content={<CustomTooltip />}
                    animationDuration={0}
                  />
                  <Legend />
                  <Line
                    type="natural"
                    dataKey={"Humidity"}
                    stroke={COLORS.aqua}
                    dot={false}
                    strokeWidth={3}
                    travellerWidth={4}
                    activeDot={{
                      fill: "#000000",
                      stroke: "#FFFFFF",
                      strokeWidth: 1,
                      r: 5,
                    }}
                  />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <Brush
                    dataKey="Day"
                    // tickFormatter={xAxisTickFormatter}
                    startIndex={humidityIndexRange.start}
                    endIndex={humidityIndexRange.end}
                    onChange={handleHumidityIndexRangeChange}
                    stroke={COLORS.black}
                  >
                    <LineChart>
                      <Line
                        fill={COLORS.lightBlue}
                        type="natural"
                        dataKey={"Humidity"}
                        stroke={COLORS.lightBlue}
                        strokeWidth={1}
                        name={"Humidity"}
                        dot={false}
                      />
                    </LineChart>
                  </Brush>
                </LineChart>
              </ResponsiveContainer>
            )}
          </MetricCard>
        </div>
      </div>
    </div>
  );
}

export default ReportSection;
