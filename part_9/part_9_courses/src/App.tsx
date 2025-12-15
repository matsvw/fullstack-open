import type { CourseDetails } from "./types";
import Header from "./components/Header";
import ContentList from "./components/Content";
import Total from "./components/Total";

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CourseDetails[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header courseName={courseName} />
      <ContentList courseList={courseParts} />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;