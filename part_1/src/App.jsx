import { useState } from 'react'

const Display = (props) => <div>{props.caption}: {props.value}</div>

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const Statistics = (props) => {
  const { good, neutral, bad } = props

  if (good + neutral + bad === 0) {
    return <div>No feedback given</div>
  }

  return (
    <div>
      <Display caption="good" value={good} />
      <Display caption="neutral" value={neutral} />
      <Display caption="bad" value={bad} /> 
      <Display caption="all" value={good + neutral + bad} />
      <Display caption="average" value={(good - bad) / (good + neutral + bad)} />
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good+1)} text="good" />
      <Button onClick={() => setNeutral(neutral+1)} text="neutral" />
      <Button onClick={() => setBad(bad+1)} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}


export default App