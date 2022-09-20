import useLocalStorage from '../hooks/useLocalStorage';



export default function Home() {
  const [counter, setCounter] = useLocalStorage("counter", 10);

  return (
    <div>
      <button aria-label="decrement" onClick={() => {
        // Testing the default method
        setCounter(counter - 1)
      }}>-</button>
      <span>{counter}</span>
      <button aria-label="increment" onClick={() => {
        // Testing the callback method
        setCounter(previousValue =>previousValue + 1 )
      }}>+</button>
    </div>
  )
}
