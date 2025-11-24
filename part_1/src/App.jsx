
const Header = (props) => {
  console.log(props)
  return (
    <h1>
      {props.course}
    </h1>
  )
}

const Part = (props) => {
  console.log(props);
  const { part } = props;
  return (
      <p>
        {part.name} {part.exercises}
      </p>
  )
}

const Content = (props) => {
  console.log(props);
  const { course } = props;
  return (
    <div>
      {course.parts.map((part, index) => (
        <p key={`part_${index}`}>
          {part.name} {part.exercises}
        </p>
      ))}
    </div>
  )
}

const Total = (props) => {
  console.log(props)
  const { course } = props;
  return (
    <p>
      Number of exercises {course.parts.reduce((accumulator, part) => accumulator + part.exercises, 0)}
    </p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}


export default App