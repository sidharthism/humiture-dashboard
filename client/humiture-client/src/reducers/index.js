import { useReducer } from "react";

// RANGE ERROR REDUCER

const initialRangeErrorState = {
  //   temperatureStatus: "OK", // "LOW", "OK" (21 - 25), "HIGH"
  //   humidityStatus: "OK", // "LOW", "OK" (40 - 60), "HIGH"
  metric: "None",
  metricStatus: "OK",
  error: false,
  reported: false,
};

const rangeErrorReducer = (state, action) => {
  switch (action.type) {
    case "TEMPERATURE":
      return {
        ...state,
        metric: "Temperature",
        metricStatus: action.payload?.status || "OK",
        error: action.payload?.error || false,
        reported: action.payload.reported,
      };
    case "HUMIDITY":
      return {
        ...state,
        metric: "Humidity",
        metricStatus: action.payload?.status || "OK",
        error: action.payload?.error || false,
        reported: action.payload.reported,
      };
    case "REPORTED":
      return {
        ...state,
        reported: true,
      };
    case "RESET":
      return { ...initialRangeErrorState };
    default:
      return { ...state };
  }
};

/**
 *
 * @returns [rangeError, dispatchRangeError]
 * @params type: "TEMPERATURE"/"HUMIDITY"/"REPORTED"/"RESET" payload: {[status: "OK"/"LOW"/"HIGH"], error: true/false, [reported: boolean] }
 */

const useRangeErrorReducer = () => {
  return useReducer(rangeErrorReducer, initialRangeErrorState);
};

export { useRangeErrorReducer };
