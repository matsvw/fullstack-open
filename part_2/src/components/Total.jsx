const Total = (props) => {
    const {parts} = props.course;
    const total = parts.reduce((s, p) => {
        console.log('what is happening', s, p)
        return s + p.exercises
    },0)
    return <p><b>total of {total} exercises</b></p>
}

export default Total