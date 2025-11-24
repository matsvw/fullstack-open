
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
  const { parts, exercises } = props;
  return (
    <div>
      {parts.map((part, index) => (
        <p key={`part_${index}`}>
          {part} {exercises[index]}
        </p>
      ))}
    </div>
  )
}

const Total = (props) => {
  console.log(props)
  return (
    <p>
      Number of exercises {props.total}
    </p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Part part={part1} />
      <Part part={part2} />
      <Part part={part3} />  
      <Total total={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}


export default App