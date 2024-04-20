import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ClosestToZero from '../../components/closestToZero/ClosestToZero';


describe('ClosestToZero', () => {
  test('renders input field correctly', () => {
    render(<ClosestToZero />);
    const inputElement = screen.getByPlaceholderText('Enter comma-separated numbers');
    expect(inputElement).toBeInTheDocument();
  });

  test('updates input value correctly', () => {
    render(<ClosestToZero />);
    const inputElement = screen.getByPlaceholderText('Enter comma-separated numbers');
    fireEvent.change(inputElement, { target: { value: '1, 2, 3' } });
    expect(inputElement.value).toBe('1, 2, 3');
  });

  test('displays error message for invalid input', () => {
    render(<ClosestToZero />);
    const inputElement = screen.getByPlaceholderText('Enter comma-separated numbers');
    fireEvent.change(inputElement, { target: { value: '1, abc, 3' } });
    expect(screen.getByText('Invalid number. Please enter a number between -2147483647 and 2147483647.')).toBeInTheDocument();
  });

  test('disables button for invalid input', () => {
    render(<ClosestToZero />);
    const inputElement = screen.getByPlaceholderText('Enter comma-separated numbers');
    fireEvent.change(inputElement, { target: { value: '1, abc, 3' } });
    const buttonElement = screen.getByText('Find Closest to Zero');
    expect(buttonElement).toBeDisabled();
  });

  test('submit without adding input', () => {
    render(<ClosestToZero/>);
    const buttonElement = screen.getByText('Find Closest to Zero');
    fireEvent.click(buttonElement);
    expect(screen.getByText('Invalid number. Please enter a number between -2147483647 and 2147483647.')).toBeInTheDocument();
  })

  test('output for empty input', () => {
    render(<ClosestToZero/>);
    const inputElement = screen.getByPlaceholderText('Enter comma-separated numbers');
    fireEvent.change(inputElement, { target: { value: '2' } });
    fireEvent.change(inputElement, { target: { value: '' } });

    expect(screen.getByText('Invalid number. Please enter a number between -2147483647 and 2147483647.')).toBeInTheDocument()
  });

  test('output for valid input', () => {
    render(<ClosestToZero />);
    const inputElement = screen.getByPlaceholderText('Enter comma-separated numbers');
    fireEvent.change(inputElement, { target: { value: '2, 3, -1' } });

    const buttonElement = screen.getByText('Find Closest to Zero');
    fireEvent.click(buttonElement);
    expect(screen.getByText('-1')).toBeInTheDocument();
  })

});
