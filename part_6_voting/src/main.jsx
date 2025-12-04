import ReactDOM from 'react-dom/client'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import App from './App'
import anecodteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'

const store = createStore(combineReducers({
  anecdotes: anecodteReducer,
  filter: filterReducer
}))

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
