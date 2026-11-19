import { createRef, useContext } from 'react';
import { act, fireEvent, render, renderHook, screen, waitFor } from '@testing-library/react';
import JsonViewEditor from './';
import { Dispatch, useStore, useStoreReducer } from './store';

const longText = 'y'.repeat(40);

it('edits object keys and leaves array indexes as plain text', async () => {
  const onEdit = jest.fn(() => true);
  render(<JsonViewEditor value={{ name: 'ada', items: [1] }} onEdit={onEdit} />);

  const key = await screen.findByText('name');
  await waitFor(() => {
    expect(key.getAttribute('contenteditable')).toBe('false');
  });

  fireEvent.click(key);
  expect(key.getAttribute('contenteditable')).toBe('true');
  fireEvent.keyDown(key, { key: 'a' });
  expect(key.getAttribute('contenteditable')).toBe('true');
  fireEvent.keyDown(key, { key: 'Enter' });
  expect(key.getAttribute('contenteditable')).toBe('false');

  fireEvent.click(key);
  key.textContent = 'title';
  fireEvent.blur(key);
  expect(onEdit).toHaveBeenCalledWith({
    value: 'title',
    oldValue: 'ada',
    keyName: 'name',
  });
  expect(screen.getByText('title')).toBeTruthy();
  expect(screen.getByText('0').getAttribute('contenteditable')).toBeNull();
});

it('rejects an edit when onEdit returns false', async () => {
  const onEdit = jest.fn(() => false);
  render(<JsonViewEditor value={{ name: 'ada' }} onEdit={onEdit} />);
  const key = await screen.findByText('name');
  await waitFor(() => {
    expect(key.getAttribute('contenteditable')).toBe('false');
  });
  fireEvent.click(key);
  key.textContent = 'title';
  fireEvent.blur(key);
  expect(onEdit).toHaveBeenCalledWith({
    value: 'title',
    oldValue: 'ada',
    keyName: 'name',
  });
  expect(key.getAttribute('contenteditable')).toBe('false');
});

it('blurs a key when onEdit is omitted', async () => {
  render(<JsonViewEditor value={{ name: 'ada' }} />);
  const key = await screen.findByText('name');
  await waitFor(() => {
    expect(key.getAttribute('contenteditable')).toBe('false');
  });
  fireEvent.click(key);
  fireEvent.blur(key);
  expect(key.getAttribute('contenteditable')).toBe('false');
  expect(key.textContent).toBe('name');
});

it('skips key editing when editable is false and still renders children', async () => {
  const ref = createRef<HTMLDivElement>();
  render(
    <JsonViewEditor ref={ref} value={{ text: longText }} editable={false}>
      <em data-testid="child">child</em>
    </JsonViewEditor>,
  );
  expect(ref.current?.className).toContain('w-json-view-container');
  expect(screen.getByTestId('child').textContent).toBe('child');
  expect(screen.getByText(longText)).toBeTruthy();
  await act(async () => {
    await Promise.resolve();
  });
  expect(screen.getByText('text').getAttribute('contenteditable')).toBeNull();
});

it('updates the editor store and exposes the default context', () => {
  const onEdit = () => true;
  const next = () => false;
  const { result } = renderHook(() => useStoreReducer({ onEdit }));
  expect(result.current[0].onEdit).toBe(onEdit);
  act(() => {
    result.current[1]({ onEdit: next });
  });
  expect(result.current[0].onEdit).toBe(next);

  const defaults = renderHook(() => ({
    store: useStore(),
    dispatch: useContext(Dispatch),
  }));
  expect(defaults.result.current.store).toEqual({});
  expect(() => defaults.result.current.dispatch({})).not.toThrow();
});
