import React, { useState, useEffect } from 'react';

export default function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  useEffect(() => {
    const response = fetch('http://localhost:3001/api/questions')
    .then(function(data) {
      return data.json();
    })
    .then(data => console.log(data))
  }, [])
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}