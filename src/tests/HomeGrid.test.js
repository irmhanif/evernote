import { render, screen, fireEvent } from '@testing-library/react';
import HomeGrid from '../components/HomeGrid';

test('renders HomeGrid component', () => {
    render(<HomeGrid />);

    // Assert that the component renders without errors
    const homeGridElement = screen.getByTestId('home-grid');
    expect(homeGridElement).toBeInTheDocument();
});

test('toggles draggable state on ReOrder button click', () => {
    render(<HomeGrid />);

    // Assert that the initial state of isDraggable is false
    const reOrderButton = screen.getByText('ReOrder');
    expect(reOrderButton).toBeInTheDocument();
    expect(screen.getByTestId('home-grid')).toHaveAttribute('data-draggable', 'false');

    // Click the ReOrder button
    fireEvent.click(reOrderButton);

    // Assert that the isDraggable state is toggled to true
    expect(screen.getByTestId('home-grid')).toHaveAttribute('data-draggable', 'true');
});

test('logs layout on Save button click', () => {
    render(<HomeGrid />);

    // Mock the console.log method
    console.log = jest.fn();

    // Click the Save button
    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    // Assert that the layout is logged to the console
    expect(console.log).toHaveBeenCalledWith(expect.any(Array));
});