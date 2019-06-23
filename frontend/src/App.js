import React, { Component } from 'react'
import { Provider } from 'react-redux'
import {createStore} from 'redux';
import './App.css'
import reducer from './reducers'
import TodoList from './components/TodoList'

const store=createStore(reducer)


class App extends Component {

  render () {
    return (
      <Provider store={ store }>
        <div className="body">
          <TodoList />
        </div>
      </Provider>
    )
  }
}

export default App