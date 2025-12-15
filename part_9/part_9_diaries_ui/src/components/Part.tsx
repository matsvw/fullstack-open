import type {
  CoursePart,
  CoursePartBase,
  CoursePartGroup,
  CoursePartSpecial,
  CoursePartBackground,
  CoursePartDescription,
} from "../types";
import { assertNever } from "../utils";

export interface PartProps {
  coursePart: CoursePart;
}

const BasePart = (props: { part: CoursePartBase }) => {
  return (
    <p>
      <b>
        {props.part.name} {props.part.exerciseCount}
      </b>
    </p>
  );
};

const DescriptionPart = (props: { part: CoursePartDescription }) => {
  return (
    <>
      <BasePart part={props.part} />
      <p>
        <i>{props.part.description}</i>
      </p>
    </>
  );
};

const GroupPart = (props: { part: CoursePartGroup }) => {
  return (
    <>
      <BasePart part={props.part} />
      <p>project exercises: {props.part.groupProjectCount}</p>
    </>
  );
};

const BackgroundPart = (props: { part: CoursePartBackground }) => {
  return (
    <>
      <DescriptionPart part={props.part} />
      <p>{props.part.backgroundMaterial}</p>
    </>
  );
};

const SpecialPart = (props: { part: CoursePartSpecial }) => {
  return (
    <>
      <BasePart part={props.part} />
      <p>
        {props.part.description} required skills: [
        {props.part.requirements.join(",")}]
      </p>
    </>
  );
};

const Part = (props: PartProps) => {
  switch (props.coursePart.kind) {
    case "basic":
      return <DescriptionPart part={props.coursePart} />;
    case "group":
      return <GroupPart part={props.coursePart} />;
    case "background":
      return <BackgroundPart part={props.coursePart} />;
    case "special":
      return <SpecialPart part={props.coursePart} />;
    default:
      assertNever(props.coursePart);
      break;
  }
};

export default Part;
