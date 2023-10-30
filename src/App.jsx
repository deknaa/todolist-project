import React, { useState } from 'react'
import InputTodo from './components/InputTodo'
import TodoList from './components/TodoList'
import FilterTodo from './components/FilterTodo'

const App = () => {

  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <>
      <h1 className='text-center pt-10 font-bold text-3xl'><span className='text-blue-700'>To Do List</span> App</h1>
      <p className='text-center pt-2 pb-10'>An To Do List application that can make it easier for you to manage your daily plans.</p>
      <InputTodo />
      <FilterTodo />
      <TodoList activeFilter={activeFilter} />
    </>
  )
}

export default App