import { useState, useEffect } from "react";

import { useRangeErrorReducer } from "../reducers";

import { API_ROOT } from "./config";

import { isMetricOutOfRange, getMetricAvgFromRange } from "../utils";

const useAPIReportData = () => {
  const INITIAL_DATA = {
    temperatureData: [],
    humidityData: [],
  };
  const [data, setData] = useState(INITIAL_DATA);

  useEffect(() => {
    fetchData();
    return () => {
      setData(INITIAL_DATA);
    };
  }, []);

  /**
   * @TODO Handle data timestamp
   * @TODO Refactor obtaining data into another function
   */

  const fetchData = async () => {
    try {
      const res = await fetch(`${API_ROOT}/metrics/`, {
        headers: {
          Authorization: `Token ${
            JSON.parse(localStorage.getItem("USER")).token || ""
          }`,
        },
      });
      const json = await res.json();

      let temperatureFiltured = json
        .filter((r) => r.Temperature !== "")
        .map(({ Day, Temperature }) => ({ Day, Temperature }));

      let humidityFiltured = json
        .filter((r) => r.Humidity !== "")
        .map(({ Day, Humidity }) => ({ Day, Humidity }));

      let filteredData = {
        temperatureData: [...temperatureFiltured],
        humidityData: [...humidityFiltured],
      };

      console.log(filteredData);
      setData(filteredData);
    } catch (err) {
      console.error(err);
      setData(INITIAL_DATA);
    }
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

const fetchNotes = async () => {
  try {
    const res = await fetch(`${API_ROOT}/notes/`, {
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("USER")).token || ""
        }`,
      },
    });
    if (res.status !== 200) {
      throw new Error("Error fetching notes!");
    } else {
      const notes = await res.json();
      return notes;
    }
  } catch (err) {
    console.log(err.message);
    return [];
  }
};

const useNotesData = () => {
  const [noteList, setNoteList] = useState([]);
  useEffect(() => {
    fetchNotes()
      .then((notes) => setNoteList(notes))
      .catch((err) => console.log(err));
    return () => setNoteList([]);
  }, []);

  const handleAddNote = async (note) => {
    try {
      const res = await fetch(`${API_ROOT}/notes/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${
            JSON.parse(localStorage.getItem("USER")).token || ""
          }`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: note }),
      });
      if (res.status !== 201) {
        throw new Error("Error adding note!");
      } else {
        const notes = await fetchNotes();
        if (notes.length !== 0) setNoteList(notes);
      }
    } catch (err) {
      console.log(err.message);
      //handle error
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      const res = await fetch(`${API_ROOT}/note/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${
            JSON.parse(localStorage.getItem("USER")).token || ""
          }`,
        },
      });
      if (res.status !== 204) {
        throw new Error("Error deleting note!");
      } else {
        const notes = await fetchNotes();
        if (notes.length !== 0) setNoteList(notes);
      }
    } catch (err) {
      console.log(err.message);
      // handle error
    }
  };
  return { noteList, handleAddNote, handleDeleteNote };
};

export { useReportData, useNotesData };
