import React, {useState} from 'react';

const Counter = () => {

	const [count, setCount] = useState(0);

	const increment = () => {
		setCount(count + 1);
	};

	return(
		<div className="mt-3">
			<button className="btn btn-info btn-lg btn-block" onClick={increment} type="submit">Counter {count}</button>
		</div>
	);
}

export default Counter;