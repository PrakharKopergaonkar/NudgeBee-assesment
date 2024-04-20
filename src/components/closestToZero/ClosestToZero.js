import React, { useCallback, useState } from 'react'

export default function ClosestToZero() {
  const [numbers, setNumbers] = useState([]);
  const [result, setResult] = useState(0);
  const [error, setError] = useState(false);

  const validate = useCallback((arr) => {
    if (arr.length === 0 ||
      arr.some(
        num => isNaN(num) ||
          num < -2147483647 ||
          num > 2147483647 ||
          num.trim() === ""
      )
    ) {
      setError('Invalid number. Please enter a number between -2147483647 and 2147483647.');
      return false
    } else {
      setError('');
      return true
    }
  }, [])

  const closestToZero = useCallback(() => {
    if (!validate(numbers)) {
      return;
    }

    let closest = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
      if (Math.abs(numbers[i]) < Math.abs(closest) || (Math.abs(numbers[i]) === Math.abs(closest) && numbers[i] > 0)) {
        closest = numbers[i];
      }
    }

    setResult(closest);
  }, [numbers, validate]);


  const handleChange = useCallback((e) => {
    let arr = e.target.value.split(",");
    validate(arr)
    setNumbers(arr)

  }, [validate])

  return (
    <div>
      <h2>{"1) Find Closest to Zero"}</h2>
      <input
        type="text"
        value={numbers.join(',')}
        onChange={handleChange}
        placeholder="Enter comma-separated numbers"
      /> &nbsp;
      <button
        onClick={closestToZero}
        disabled={error}
      >
        Find Closest to Zero
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div className='result-container'>
        <strong> Closest to zero : </strong> {result}
      </div>
    </div>
  )
}
