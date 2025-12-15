import type { CourseDetails } from "../types";

export interface ContentProps {
  courseName: string;
  exerciseCount: number;
}

export interface ContentListProps {
  courseList: CourseDetails[];
}

const Content = (props: ContentProps) => {
  return (
    <p>
      {props.courseName} {props.exerciseCount}
    </p>
  );
};

const ContentList = (props: ContentListProps) => {
  return (
    <div>
      {props.courseList.map((c) => (
        <Content
          key={`${c.name}_${c.exerciseCount}`}
          courseName={c.name}
          exerciseCount={c.exerciseCount}
        />
      ))}
    </div>
  );
};

export default ContentList;
