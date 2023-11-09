import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Calendar from '../client/components/Calendar';

describe('Calendar Component', () => {
  it('renders the title correctly', () => {
    render(<Calendar />);
    const titleElement = screen.getByText('Study Calendar');
    expect(titleElement).toBeInTheDocument();
  });

  it('renders day squares correctly', () => {
    render(<Calendar />);
    for (let day = 1; day <= 30; day++) {
      const daySquare = screen.getByText(day.toString());
      expect(daySquare).toBeInTheDocument();
    }
  });

  it('opens a card when a day square is clicked', () => {
    render(<Calendar />);
    const daySquare = screen.getByText('1');
    fireEvent.click(daySquare);
    const card = screen.getByTestId('card');
    expect(card).toBeInTheDocument();
  });

  it('closes a card when the close button is clicked', () => {
    render(<Calendar />);
    const daySquare = screen.getByText('1');
    fireEvent.click(daySquare);
    const closeBtn = screen.getByText('X');
    fireEvent.click(closeBtn);
    const card = screen.queryByTestId('card');
    expect(card).toBeNull();
  });

  it('fetches day content when a day square is clicked', async () => {
    const fetchMock = jest.fn().mockResolvedValue({ ok: true, json: () => ({ content: 'Day 1 content' }) });
    global.fetch = fetchMock;

    render(<Calendar />);
    const daySquare = screen.getByText('1');
    fireEvent.click(daySquare);

    await screen.findByText('Content for Day 1: Day 1 content');

    expect(fetchMock).toHaveBeenCalledWith('http://localhost:3000/calendar/1');
  });
});
