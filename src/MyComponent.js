import React, {useState} from 'react';

function Counter({initialCount}) {
	const [count, setCount] = useState(initialCount);
	
	function increaseCount() {
		setCount(count + 1);
	}

	function decreaseCount() {
		setCount(count - 1);
	}

  return (
    <>
			Count: {count}
			<br></br>
      <button onClick={() => setCount(initialCount)}>Reset</button>
      <button onClick={decreaseCount}>-</button>
      <button onClick={increaseCount}>+</button>
    </>
  );
}

export default Counter;