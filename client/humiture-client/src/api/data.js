import { useState, useEffect } from "react";

import { useRangeErrorReducer } from "../reducers";
import { isMetricOutOfRange, getMetricAvgFromRange } from "../utils";

const useAPIReportData = () => {
  const [data, setData] = useState({
    temperatureData: [],
    humidityData: [],
  });

  useEffect(() => {
    fetchData();
    return () => {
      setData({});
    };
  }, []);

  /**
   * @TODO Handle data timestamp
   */

  const fetchData = () => {
    fetch(`/data.json`)
      .then((response) => response.json())
      .then((json) => {
        let temperatureFiltured = json.data
          .filter((r) => r.Temperature !== undefined)
          .map(({ Day, Temperature }) => ({ Day, Temperature }));

        let humidityFiltured = json.data
          .filter((r) => r.Humidity !== undefined)
          .map(({ Day, Humidity }) => ({ Day, Humidity }));

        let filteredData = {
          temperatureData: [...temperatureFiltured],
          humidityData: [...humidityFiltured],
        };

        console.log(filteredData);

        setData(filteredData);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return data;
};

/**
 *
 *   @returns
 *  {
 *   temperatureData: [], // {Day: "", Temperature: ""}
 *   humidityData: [], // {Day: "", Humidity: ""},
 *   temperatureIndexRange, // { start: 0, end: 0, avg: 0,}
 *   humidityIndexRange, // { start: 0, end: 0, avg: 0,}
 *   handleTemperatureIndexRangeChange,
 *   handleHumidityIndexRangeChange,
 *  };
 *
 */

const useReportData = () => {
  const { temperatureData = [], humidityData = [] } = useAPIReportData();

  const [rangeError, dispatchRangeError] = useRangeErrorReducer();

  const [temperatureIndexRange, setTemperatureIndexRange] = useState({
    start: 0,
    end: 0,
    avg: 0,
  });

  const [humidityIndexRange, setHumidityIndexRange] = useState({
    start: 0,
    end: 0,
    avg: 0,
  });

  useEffect(() => {
    let len = temperatureData.length;
    let s = Math.round(len * 0.45);
    let e = Math.round(len - 1);
    setTemperatureIndexRange({
      start: Math.round(len * 0.45),
      end: Math.round(len - 1),
      avg: getMetricAvgFromRange(temperatureData, s, e, "Temperature"),
    });
  }, [temperatureData]);

  useEffect(() => {
    let len = humidityData.length;
    let s = Math.round(len * 0.45);
    let e = Math.round(len - 1);
    setHumidityIndexRange({
      start: Math.round(len * 0.45),
      end: Math.round(len - 1),
      avg: getMetricAvgFromRange(humidityData, s, e, "Humidity"),
    });
  }, [humidityData]);

  useEffect(() => {
    if (temperatureIndexRange.start !== 0 && temperatureIndexRange.end !== 0) {
      dispatchRangeError({ type: "RESET" });

      let tempRange = isMetricOutOfRange(
        "TEMPERATURE",
        21,
        25,
        temperatureIndexRange.avg
      );

      if (tempRange.status !== "OK") {
        dispatchRangeError({
          type: "TEMPERATURE",
          payload: {
            status: tempRange.status,
            error: tempRange.error,
            reported: false,
          },
        });
      }
      // console.log(rangeError);
    }
  }, [temperatureIndexRange]);

  useEffect(() => {
    if (humidityIndexRange.start !== 0 && humidityIndexRange.end !== 0) {
      dispatchRangeError({ type: "RESET" });

      let humidityRange = isMetricOutOfRange(
        "HUMIDITY",
        40,
        60,
        humidityIndexRange.avg
      );
      if (humidityRange.status !== "OK") {
        dispatchRangeError({
          type: "HUMIDITY",
          payload: {
            status: humidityRange.status,
            error: humidityRange.error,
            reported: false,
          },
        });
      }
      // console.log(rangeError);
    }
  }, [humidityIndexRange]);

  function handleTemperatureIndexRangeChange({ startIndex, endIndex }) {
    setTemperatureIndexRange({
      start: Math.round(startIndex),
      end: Math.round(endIndex),
      avg: getMetricAvgFromRange(
        temperatureData,
        startIndex,
        endIndex,
        "Temperature"
      ),
    });
  }

  function handleHumidityIndexRangeChange({ startIndex, endIndex }) {
    setHumidityIndexRange({
      start: Math.round(startIndex),
      end: Math.round(endIndex),
      avg: getMetricAvgFromRange(
        humidityData,
        startIndex,
        endIndex,
        "Humidity"
      ),
    });
  }

  return {
    temperatureData, // {Day: "", Temperature: ""}
    humidityData, // {Day: "", Humidity: ""},
    temperatureIndexRange, // { start: 0, end: 0, avg: 0,}
    humidityIndexRange, // { start: 0, end: 0, avg: 0,}
    rangeError,
    handleRangeErrorReported: () => dispatchRangeError({ type: "REPORTED" }),
    handleTemperatureIndexRangeChange,
    handleHumidityIndexRangeChange,
  };
};

// const STORE = {
//   data: [],
//   status: "LOADING", // "LOADING", "ERROR", "SUCCESS"
//   error: {},
// };

// const useData = () => {
//   const [data, dispatch] = useReducer();
// };

export { useReportData };
