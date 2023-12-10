import { render, screen } from '@testing-library/react';
import HomeNotes from '../components/HomeNotes';

test('renders HomeNotes component', () => {
    render(<HomeNotes />);

    // Assert that the component renders without errors
    const homeNotesElement = screen.getByText('Notes');
    expect(homeNotesElement).toBeInTheDocument();
});

test('displays recent notes', () => {
    render(<HomeNotes />);

    // Assert that the recent notes are displayed
    const recentNotesElements = screen.getAllByRole('note');
    expect(recentNotesElements.length).toBe(10);
});

test('displays suggested notes', () => {
    render(<HomeNotes />);

    // Assert that the suggested notes are displayed
    const suggestedNotesElements = screen.getAllByRole('note');
    expect(suggestedNotesElements.length).toBe(10);
});