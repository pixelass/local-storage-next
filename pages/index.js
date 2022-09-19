import {useCallback, useEffect, useState} from 'react';

/**
 * A hook to use localStorage with SSR.
 *
 * Make sure that localStorage and state do not conflict with each other.
 * Only update the state if no initialState was read from localStorage.
 *
 * @param {string} key
 * @param {unknown} initialState
 * @returns {[unknown, (value: unknown) => void]}
 */
function useLocalStorage(key, initialState) {
  // Set the desired initialState
  const [state, setState] = useState(initialState);

  // Provide a custom setter function that updates the state and writes to localStorage
  const setState_ = useCallback((value) => {
    setState(value)
    window.localStorage.setItem(key, value)
  }, [key]);

  // Read the localStorage from the client
  useEffect(() => {
    const stored = window.localStorage.getItem(key);
    // When the stored value === null
    // Then the key does not exist, and we don't want to perform an update
    if (stored !== null) {
      setState(JSON.parse(stored))
    }
  }, [key]);

  return [state, setState_]
}

export default function Home() {
  const [counter, setCounter] = useLocalStorage("counter", 10);

  return (
    <div>
      <button aria-label="decrement" onClick={() => {
        setCounter(counter - 1)
      }}>-</button>
      <span>{counter}</span>
      <button aria-label="increment" onClick={() => {
        setCounter(counter + 1)
      }}>+</button>
    </div>
  )
}
