import type { CoursePart } from "../types";
import Part from "./Part";
export interface ContentProps {
  courseName: string;
  exerciseCount: number;
}

export interface ContentListProps {
  courseList: CoursePart[];
}

const ContentList = (props: ContentListProps) => {
  return (
    <div>
      {props.courseList.map((c) => (
        <div>
          <Part key={`${c.name}_${c.exerciseCount}`} coursePart={c} />
          <br />
        </div>
      ))}
    </div>
  );
};

export default ContentList;
