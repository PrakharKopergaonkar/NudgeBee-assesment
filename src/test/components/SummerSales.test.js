import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SummerSales from '../../components/summerSales/SummerSales';

describe('SummerSales', () => {
  test('renders input fields correctly', () => {
    render(<SummerSales />);
    const pricesInput = screen.getByLabelText('Enter prices of products (comma-separated) :');
    const discountInput = screen.getByLabelText('Enter discount percentage :');
    const calculateButton = screen.getByText('Calculate Total Price');

    expect(pricesInput).toBeInTheDocument();
    expect(discountInput).toBeInTheDocument();
    expect(calculateButton).toBeInTheDocument();
  });

  test('displays error message for invalid prices input', () => {
    render(<SummerSales />);
    const pricesInput = screen.getByLabelText('Enter prices of products (comma-separated) :');

    fireEvent.change(pricesInput, { target: { value: '10, abc, 30' } });

    expect(screen.getByText('Invalid input: Prices must be an array of positive numbers less than 100000.')).toBeInTheDocument();
  });

  test('displays error message for invalid discount percentage input', () => {
    render(<SummerSales />);
    const discountInput = screen.getByLabelText('Enter discount percentage :');

    fireEvent.change(discountInput, { target: { value: 'abc' } });

    expect(screen.getByText('Invalid input: Discount must be a number between 0 and 100.')).toBeInTheDocument();
  });

  test('disables calculate button when there are errors in input or no prices provided', () => {
    render(<SummerSales />);
    const pricesInput = screen.getByLabelText('Enter prices of products (comma-separated) :');
    const discountInput = screen.getByLabelText('Enter discount percentage :');
    const calculateButton = screen.getByText('Calculate Total Price');

    fireEvent.change(pricesInput, { target: { value: '10, abc, 30' } });
    fireEvent.change(discountInput, { target: { value: '20' } });

    expect(calculateButton).toBeDisabled();
  });

  test('enables calculate button when valid input is provided', () => {
    render(<SummerSales />);
    const pricesInput = screen.getByLabelText('Enter prices of products (comma-separated) :');
    const discountInput = screen.getByLabelText('Enter discount percentage :');
    const calculateButton = screen.getByText('Calculate Total Price');

    fireEvent.change(pricesInput, { target: { value: '10, 20, 30' } });
    fireEvent.change(discountInput, { target: { value: '20' } });

    expect(calculateButton).toBeEnabled();
  });

  test('calculates total price correctly after discount', () => {
    render(<SummerSales />);
    const pricesInput = screen.getByLabelText('Enter prices of products (comma-separated) :');
    const discountInput = screen.getByLabelText('Enter discount percentage :');
    const calculateButton = screen.getByText('Calculate Total Price');

    fireEvent.change(pricesInput, { target: { value: '100, 200, 300' } });
    fireEvent.change(discountInput, { target: { value: '20' } });
    fireEvent.click(calculateButton);

    expect(screen.getByText('540')).toBeInTheDocument();
  });
});
