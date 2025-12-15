import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import {
  type DiaryEntry,
  type NewDiaryEntry,
  type Weather,
  type Visibility,
  VISIBILITY_VALUES,
  WEATHER_VALUES,
} from "./types";
import { apiBaseUrl } from "./constants";

import diaryService from "./services/diaries";

const App = () => {
  const [diaryDate, setDiaryDate] = useState("");
  const [diaryWeather, setDiaryWeather] = useState("");
  const [diaryVisibility, setDiaryVisibility] = useState("");
  const [diaryComment, setDiaryComment] = useState("");

  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchDiaryList = async () => {
      const diaryList = await diaryService.getAll();
      setDiaries(diaryList);
    };

    void fetchDiaryList();
  }, []);

  const DiaryCreation = async (event: React.SyntheticEvent) => {
    try {
      event.preventDefault();
      const newDiaryEntry: NewDiaryEntry = {
        date: diaryDate,
        weather: diaryWeather as Weather,
        visibility: diaryVisibility as Visibility,
        comment: diaryComment,
      };

      const addedDiaryEntry = await diaryService.create(newDiaryEntry);

      if (addedDiaryEntry) {
        setDiaries(diaries.concat(addedDiaryEntry));

        setDiaryDate("");
        setDiaryVisibility("");
        setDiaryWeather("");
        setDiaryComment("");
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        alert(error?.response?.data ?? error);
      } else {
        alert(error);
      }
    }
  };

  return (
    <div>
      <form onSubmit={DiaryCreation}>
        <label htmlFor="diary-date">Date: </label>
        <input
          name="diary-date"
          type="date"
          value={diaryDate}
          onChange={(event) => {
            //console.log(event.target.value.toString());
            setDiaryDate(event.target.value.toString());
          }}
        />
        <br />
        <label htmlFor="diary-visibility">Visibility: </label>
        {VISIBILITY_VALUES.map((v, i) => (
          <div key={`r_v_${i}`} style={{ display: "inline" }}>
            <input
              type="radio"
              id={v}
              name="diary-visibility"
              value={v}
              onChange={() => setDiaryVisibility(v)}
            />
            <label htmlFor={v}>{v}</label>
          </div>
        ))}
        <br />
        <label htmlFor="diary-weather">Weather: </label>
        {WEATHER_VALUES.map((v, i) => (
          <div key={`r_w_${i}`} style={{ display: "inline" }}>
            <input
              type="radio"
              id={v}
              name="diary-weather"
              value={v}
              onChange={() => setDiaryWeather(v)}
            />
            <label htmlFor={v}>{v}</label>
          </div>
        ))}
        <br />
        <label htmlFor="diary-comment">Comment: </label>
        <input
          name="diary-comment"
          value={diaryComment}
          onChange={(event) => setDiaryComment(event.target.value)}
        />
        <br />
        <button type="submit">add</button>
      </form>
      <ul>
        {diaries.map((d) => (
          <li key={d.id}>
            <p>Date: {d.date}</p>
            <p>Visibility: {d.visibility}</p>
            <p>Weather: {d.weather}</p>
            <p>Comment: {d.comment}</p>
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
