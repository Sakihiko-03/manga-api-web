'use client'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import React, { useState } from 'react'
import { decrement, increment, incrementByAmount } from '@/store/slices/counterSlice'
import { Provider } from 'react-redux'
import { RootState, store } from '@/store/store'

const App = () => {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  )
}

export default App

function Counter() {
  // The `state` arg is correctly typed as `RootState` already
  const count = useAppSelector((state: RootState) => state.counter.value)
  const dispatch = useAppDispatch()

  // omit rendering logic
  return (
    <div className='bg-gray-800 p-8 m-8'>
      <div className='text-gray-100 gap-8 flex flex-col items-center'>
        <button
          className='text-gray-100 bg-gray-300/50 p-1 rounded-md'
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          className='text-gray-100 bg-gray-300/50 p-1 rounded-md'
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <button
          className='text-gray-100 bg-gray-300/50 p-1 rounded-md'
          aria-label="Decrement value"
          onClick={() => dispatch(incrementByAmount(4))}
        >
          incrementByAmount +4
        </button>
      </div>
    </div>
  )
}