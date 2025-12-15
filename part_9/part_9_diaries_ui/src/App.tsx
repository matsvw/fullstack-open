import { useState, useEffect } from "react";
import axios from "axios";
import type { DiaryEntry, NewDiaryEntry, Weather, Visibility } from "./types";
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
      alert(error);
    }
  };

  return (
    <div>
      <form onSubmit={DiaryCreation}>
        <label htmlFor="diary-date">Date </label>
        <input
          name="diary-date"
          value={diaryDate}
          onChange={(event) => setDiaryDate(event.target.value)}
        />
        <br />
        <label htmlFor="diary-visibility">Visibility </label>
        <input
          name="diary-visibility"
          value={diaryVisibility}
          onChange={(event) => setDiaryVisibility(event.target.value)}
        />
        <br />
        <label htmlFor="diary-weather">Weather </label>
        <input
          name="diary-weather"
          value={diaryWeather}
          onChange={(event) => setDiaryWeather(event.target.value)}
        />
        <br />
        <label htmlFor="diary-comment">Comment </label>
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
