import React, { useCallback, useState } from 'react'

export default function SummerSales() {
  const [prices, setPrices] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const [errorPrices, setErrorPrices] = useState("")
  const [errorDiscount, setErrorDiscount] = useState("");

  const handlePriceChange = useCallback((e) => {
    let value = e.target.value.split(",");

    if (!Array.isArray(value) || value.length === 0 || value.some(price => isNaN(price) || value <= 0 || value >= 100000)) {
      setErrorPrices('Invalid input: Prices must be an array of positive numbers less than 100000.');
    } else {
      setErrorPrices("")
    }

    setPrices(value)
  }, [])

  const handleDiscountPercentageChange = useCallback((e) => {
    const value  = parseFloat(e.target.value);
    if (isNaN(value) || value < 0 || value > 100) {
      setErrorDiscount('Invalid input: Discount must be a number between 0 and 100.');
    } else {
      setErrorDiscount("");
    }

    setDiscount(value);
  }, [])

  const calculateTotalPrice = useCallback(() => {
    const maxPrice = Math.max(...prices);

    //calculate Total
    let totalPrice = prices.map((value) => parseInt(value)).reduce((total, price) => {
      return total + price;
    }, 0);



    //Deduct discount from total price
    totalPrice -= maxPrice * (discount / 100);

    //round it to nearest integer and return
    setTotalPrice(Math.floor(totalPrice));
  }, [discount, prices])

  return (
    <div>
      <h2>{"2) Summer Sales (Calculate discounted price)"}</h2>
      <div>
        <label htmlFor="prices">Enter prices of products (comma-separated) :</label> &nbsp;
        <input
          type="text"
          id="prices"
          value={prices.join(',')}
          onChange={handlePriceChange}
          placeholder="e.g., 10,20,30"
          min={0}
          max={100000}
        />
      </div>
      {errorPrices && <div style={{ color: 'red' }}>{errorPrices}</div>}
      <br />
      <div>
        <label htmlFor="discount">Enter discount percentage :</label> &nbsp;
        <input
          type="number"
          id="discount"
          value={discount}
          onChange={handleDiscountPercentageChange}
          placeholder="0-100"
          min={0}
          max={100}
        /> &nbsp;
      </div>
      {errorDiscount && <div style={{ color: 'red' }}>{errorDiscount}</div>}
      <br />
      <button
        disabled={errorPrices || errorDiscount || prices.length === 0}
        onClick={calculateTotalPrice}
      >
        Calculate Total Price
      </button>
      {totalPrice > 0 && <div> <br/> <strong>Total Price after discount: </strong> {totalPrice} </div>}
    </div>
  );
}
