// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

// const countReducer = (state, action) => ({ ...state, ...action })

const countReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT': {
      return { count: state.count + action.step }
    }
    default: {
      throw new Error(`Unsupported action type: ${action.type}`)
    }
  }
}

function Counter({initialCount = 0, step = 1}) {
  // 🐨 replace React.useState with React.useReducer.
  // const [count, setCount] = React.useState(initialCount)
  // const [count, setCount] = React.useReducer(countReducer, initialCount)
  // const [count, changeCount] = React.useReducer(countReducer, initialCount)
  const [state, dispatch] = React.useReducer(countReducer, {
    count: initialCount,
  })
  const {count} = state

  // 💰 you can write the countReducer function so you don't have to make any
  // changes to the next two lines of code! Remember:
  // The 1st argument is called "state" - the current value of count
  // The 2nd argument is called "newState" - the value passed to setCount
  // const increment = () => setCount(count + step)
  // const increment = () => changeCount(step)
  const increment = () => dispatch({ type: 'INCREMENT', step })
  return <button onClick={increment}>{count}</button>
}

function App() {
  return <Counter />
}

export default App
