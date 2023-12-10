import { render, screen, fireEvent } from '@testing-library/react';
import ScratchPad from '../components/ScratchPad';

test('renders ScratchPad component', () => {
    render(<ScratchPad />);

    // Assert that the component renders without errors
    const scratchPadElement = screen.getByText('Scratch Pad');
    expect(scratchPadElement).toBeInTheDocument();
});

test('updates text value on input change', () => {
    render(<ScratchPad />);

    // Get the textarea element
    const textareaElement = screen.getByPlaceholderText('Start typing...');

    // Simulate typing in the textarea
    fireEvent.change(textareaElement, { target: { value: 'Hello, World!' } });

    // Assert that the text value is updated
    expect(textareaElement.value).toBe('Hello, World!');
});