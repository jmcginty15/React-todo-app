import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';

// smoke test
it('renders without crashing', function () {
    render(<TodoList />);
});

// snapshot test
it('matches snapshot', function () {
    const { asFragment } = render(<TodoList />);
    expect(asFragment()).toMatchSnapshot();
});

it('adds a new item on form submit', function () {
    const { queryByText, queryByTestId } = render(<TodoList />);
    const inputField = queryByTestId('new-todo-input');
    const submitButton = queryByText('Add');
    fireEvent.change(inputField, { target: { value: 'feed dog' } });
    fireEvent.click(submitButton);

    const newItem = queryByText('feed dog');
    expect(newItem).toBeInTheDocument();
});

it('removes an item on button click', function () {
    const { queryByText, queryByTestId } = render(<TodoList />);
    const inputField = queryByTestId('new-todo-input');
    const submitButton = queryByText('Add');
    fireEvent.change(inputField, { target: { value: 'feed dog' } });
    fireEvent.click(submitButton);

    const newItem = queryByText('feed dog');
    expect(newItem).toBeInTheDocument();

    const removeButton = queryByText('X');
    fireEvent.click(removeButton);
    expect(newItem).not.toBeInTheDocument();
});

it('marks an item complete or incomplete', function () {
    const { queryByText, queryByTestId } = render(<TodoList />);
    const inputField = queryByTestId('new-todo-input');
    const submitButton = queryByText('Add');
    fireEvent.change(inputField, { target: { value: 'feed dog' } });
    fireEvent.click(submitButton);

    const markButton = queryByText('Mark Complete');
    fireEvent.click(markButton);
    const todoText = queryByTestId('todo-text');
    expect(queryByText('Mark Complete')).not.toBeInTheDocument();
    expect(queryByText('Mark Incomplete')).toBeInTheDocument();
    expect(todoText.className).toBe('Todo-complete');

    fireEvent.click(markButton);
    expect(queryByText('Mark Complete')).toBeInTheDocument();
    expect(queryByText('Mark Incomplete')).not.toBeInTheDocument();
    expect(todoText.className).toBe('');
});

it('edits an item through the edit form', function () {
    const { queryByText, queryByTestId } = render(<TodoList />);
    const inputField = queryByTestId('new-todo-input');
    const submitButton = queryByText('Add');
    fireEvent.change(inputField, { target: { value: 'feed dog' } });
    fireEvent.click(submitButton);

    const editButton = queryByText('Edit');
    fireEvent.click(editButton);
    const editInputField = queryByTestId('edit-todo-input');
    const editSubmitButton = queryByText('Submit');
    expect(editInputField).toBeInTheDocument();
    expect(editSubmitButton).toBeInTheDocument();
    fireEvent.change(editInputField, { target: { value: 'feed cat' } });
    fireEvent.click(editSubmitButton);
    expect(queryByText('feed dog')).not.toBeInTheDocument();
    expect(queryByText('feed cat')).toBeInTheDocument();
});

it('shows original item when edit is canceled', function () {
    const { queryByText, queryByTestId } = render(<TodoList />);
    const inputField = queryByTestId('new-todo-input');
    const submitButton = queryByText('Add');
    fireEvent.change(inputField, { target: { value: 'feed dog' } });
    fireEvent.click(submitButton);

    const editButton = queryByText('Edit');
    fireEvent.click(editButton);
    const editCancelButton = queryByText('Cancel');
    fireEvent.click(editCancelButton);
    expect(queryByText('feed dog')).toBeInTheDocument();
});