import React from 'react';
import { render, screen } from '@testing-library/react';
import FilterArray from '../../components/filterArray/FilterArray';

describe('FilterArray component', () => {
    test('renders example 1 correctly', () => {
        render(<FilterArray />);
        const example1Output = screen.getByText('Output: [20,30]');

        expect(example1Output).toBeInTheDocument();
    });

    test('renders example 2 correctly', () => {
        render(<FilterArray />);
        const example2Output = screen.getByText('Output: [1]');

        expect(example2Output).toBeInTheDocument();
    });

    test('renders example 3 correctly', () => {
        render(<FilterArray />);
        const example3Output = screen.getByText('Output: [-2,0,1,2]');

        expect(example3Output).toBeInTheDocument();
    });
});
