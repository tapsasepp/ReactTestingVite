import App from "./App";
import { test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/vitest';
import TodoTable from './TodoTable';

test("add todo", () => {
  render(<App />);
  const desc = screen.getByPlaceholderText("Description");
  fireEvent.change(desc, { target: { value: "Go to coffee" } });
  const date = screen.getByPlaceholderText("Date");
  fireEvent.change(date, { target: { value: "29.01.2023" } });
  const button = screen.getByText("Add");
  fireEvent.click(button);
  const table = screen.getByRole("table");
  expect(table).toHaveTextContent(/go to coffee/i);
});

test("renders App component", () => {
  render(<App />);
  const header = screen.getByText(/My Todolist/i);
  expect(header).toBeInTheDocument();
});

test('renders todotable', () => {
  const row = [
    {desc: 'Go to coffee', date: '24.01.2023'}
  ];
  render(<TodoTable todos={row} />);
  const table = screen.getByRole('table');
  expect(table).toHaveTextContent(/go to coffee/i);
});

// Clear testi
test('clear toDo', () => {
  render(<App />);
  const desc = screen.getByPlaceholderText("Description");
  fireEvent.change(desc, { target: { value: "Code React" } });
  const date = screen.getByPlaceholderText("Date");
  fireEvent.change(date, { target: { value: "21.10.2024" } });
  const button = screen.getByText("Add");
  fireEvent.click(button);
  const clearButton = screen.getByText("Clear");
  fireEvent.click(clearButton);
  expect(table).toHaveTextContent(/Code React/i);
  expect(table).toHaveTextContent("21.10.2024");
});