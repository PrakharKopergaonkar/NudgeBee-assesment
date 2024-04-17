import React, { useCallback } from 'react'

export default function FilterArray() {
  const filter = useCallback((arr, fn) => {
    if (!Array.isArray(arr) || typeof fn !== 'function') {
      return [];
    }

    const filteredArr = [];
    for (let i = 0; i < arr.length; i++) {
      if (fn(arr[i], i)) {
        filteredArr.push(arr[i]);
      }
    }
    return filteredArr;
  }, []);

  // Example 1
  const arr1 = [0, 10, 20, 30];
  const fn1 = (n) => n > 10;
  const filteredArray1 = filter(arr1, fn1);

  // Example 2
  const arr2 = [1, 2, 3];
  const fn2 = (n, i) => i === 0;
  const filteredArray2 = filter(arr2, fn2);

  // Example 3
  const arr3 = [-2, -1, 0, 1, 2];
  const fn3 = (n) => n + 1;
  const filteredArray3 = filter(arr3, fn3);

  return (
    <div>
      <h2>3) Filtered Arrays</h2>
      <div>
        <h3>Example 1:</h3>
        <div>Input: {JSON.stringify(arr1)}, fn = {fn1.toString()}</div>
        <div>Output: {JSON.stringify(filteredArray1)}</div>
      </div>
      <div>
        <h3>Example 2:</h3>
        <div>Input: {JSON.stringify(arr2)}, fn = {fn2.toString()}</div>
        <div>Output: {JSON.stringify(filteredArray2)}</div>
      </div>
      <div>
        <h3>Example 3:</h3>
        <div>Input: {JSON.stringify(arr3)}, fn = {fn3.toString()}</div>
        <div>Output: {JSON.stringify(filteredArray3)}</div>
      </div>
    </div>
  );
};

