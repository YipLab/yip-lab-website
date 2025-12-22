import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Yip Lab title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Welcome to Yip Lab/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders about section', () => {
  render(<App />);
  const aboutElement = screen.getByRole('heading', { name: /About/i });
  expect(aboutElement).toBeInTheDocument();
});

test('renders research systems section', () => {
  render(<App />);
  const researchElement = screen.getByRole('heading', { name: /Research Systems and Projects/i });
  expect(researchElement).toBeInTheDocument();
});
