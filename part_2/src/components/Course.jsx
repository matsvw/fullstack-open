import Header from './Header';
import Content from './Content';

const Course = (props) => {
  console.log(props); 
  const { course } = props;
  return (
    <>
      <Header course={course} />
      <Content course={course} />
    </>
  )
}

export default Course