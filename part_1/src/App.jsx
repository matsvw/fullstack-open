import { useState } from 'react'

const Display = (props) => <tr><td>{props.caption}</td><td>{props.value}</td></tr>

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => <Display caption={props.text} value={props.value} />

const Statistics = (props) => {
  const { good, neutral, bad } = props

  if (good + neutral + bad === 0) {
    return <div>No feedback given!</div>
  }
  return (
    <table>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={good + neutral + bad} />
      <StatisticLine text="average" value={(good - bad) / (good + neutral + bad)} />
    </table>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [currentAnecdote, setCurrentAnecdote] = useState(0)
  const [selected, setSelected] = useState(0)

  function getRandomNumber(n) {
    return Math.floor(Math.random() * (n + 1));
  }

  function nextAnecdote() {
    const randomNumber = getRandomNumber(anecdotes.length - 1);
    setCurrentAnecdote(randomNumber);
    setSelected(randomNumber);
  } 

  function vote() {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  }

  return (
    <div>
      <div>
        {anecdotes[selected]}
        <div>has {votes[selected]} votes</div>
      </div>
      <button onClick={nextAnecdote}>
        next anecdote
      </button>
      <button onClick={vote}>
        vote
      </button>
    </div>
  )
}

export default App