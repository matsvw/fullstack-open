import Header from './Header';
import Content from './Content';

const Course = (props) => {
  console.log(props); 
  const { course } = props;
  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <p><b>total of {course.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</b></p>
    </>
  )
}

export default Course