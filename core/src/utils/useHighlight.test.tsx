import { renderHook, act } from '@testing-library/react';
import { useHighlight } from './useHighlight';

it('renders <JsonView /> useHighlight test case', async () => {
  const highlightContainerRef = { current: { animate: jest.fn() } } as any;
  const { result, rerender } = renderHook(
    ({ value }) => useHighlight({ value, highlightUpdates: true, highlightContainer: highlightContainerRef }),
    {
      initialProps: { value: 'initial value' },
    },
  );

  // Initial render should not trigger animation
  expect(highlightContainerRef.current.animate).not.toHaveBeenCalled();
  // Update value and trigger re-render
  act(() => {
    rerender({ value: 'new value' });
  });
  // Animation should be triggered
  expect(highlightContainerRef.current.animate).toHaveBeenCalledWith(
    [{ backgroundColor: 'var(--w-rjv-update-color, #ebcb8b)' }, { backgroundColor: '' }],
    expect.objectContaining({ duration: 1000, easing: 'ease-in' }),
  );
  // Update value and trigger re-render
  act(() => {
    // @ts-ignore
    rerender({ value: [] });
  });
  // Animation should be triggered
  expect(highlightContainerRef.current.animate).toHaveBeenCalledWith(
    [{ backgroundColor: 'var(--w-rjv-update-color, #ebcb8b)' }, { backgroundColor: '' }],
    expect.objectContaining({ duration: 1000, easing: 'ease-in' }),
  );

  // Update value and trigger re-render
  act(() => {
    // @ts-ignore
    rerender({ value: 23 });
  });
  // Animation should be triggered
  expect(highlightContainerRef.current.animate).toHaveBeenCalledWith(
    [{ backgroundColor: 'var(--w-rjv-update-color, #ebcb8b)' }, { backgroundColor: '' }],
    expect.objectContaining({ duration: 1000, easing: 'ease-in' }),
  );
  // Update value and trigger re-render
  act(() => {
    // @ts-ignore
    rerender({ value: NaN });
  });
  // Animation should be triggered
  expect(highlightContainerRef.current.animate).toHaveBeenCalledWith(
    [{ backgroundColor: 'var(--w-rjv-update-color, #ebcb8b)' }, { backgroundColor: '' }],
    expect.objectContaining({ duration: 1000, easing: 'ease-in' }),
  );
});

it('renders <JsonView /> useHighlight Object test case', async () => {
  const highlightContainerRef = { current: { animate: jest.fn() } } as any;
  const { result, rerender } = renderHook(
    ({ value }) => useHighlight({ value, highlightUpdates: true, highlightContainer: highlightContainerRef }),
    {
      initialProps: { value: {} },
    },
  );

  // Initial render should not trigger animation
  expect(highlightContainerRef.current.animate).not.toHaveBeenCalled();
  // Update value and trigger re-render
  act(() => {
    // @ts-ignore
    rerender({ value: {} });
  });
  // Initial render should not trigger animation
  expect(highlightContainerRef.current.animate).not.toHaveBeenCalled();
});

it('renders <JsonView /> useHighlight Object test case', async () => {
  const highlightContainerRef = { current: { animate: jest.fn() } } as any;
  const { result, rerender } = renderHook(
    ({ value }) => useHighlight({ value, highlightUpdates: true, highlightContainer: highlightContainerRef }),
    {
      initialProps: { value: {} },
    },
  );

  // Initial render should not trigger animation
  expect(highlightContainerRef.current.animate).not.toHaveBeenCalled();
  // Update value and trigger re-render
  act(() => {
    // @ts-ignore
    rerender({ value: [23] });
  });
  // Animation should be triggered
  expect(highlightContainerRef.current.animate).toHaveBeenCalledWith(
    [{ backgroundColor: 'var(--w-rjv-update-color, #ebcb8b)' }, { backgroundColor: '' }],
    expect.objectContaining({ duration: 1000, easing: 'ease-in' }),
  );
});

it('renders <JsonView /> useHighlight Object test case', async () => {
  const highlightContainerRef = { current: { animate: jest.fn() } } as any;
  const { result, rerender } = renderHook(
    ({ value }) => useHighlight({ value, highlightUpdates: true, highlightContainer: highlightContainerRef }),
    {
      initialProps: { value: NaN },
    },
  );

  // Initial render should not trigger animation
  expect(highlightContainerRef.current.animate).not.toHaveBeenCalled();
  // Update value and trigger re-render
  act(() => {
    // @ts-ignore
    rerender({ value: NaN });
  });
  // Initial render should not trigger animation
  expect(highlightContainerRef.current.animate).not.toHaveBeenCalled();
});

it('highlights a changed number and skips an unchanged string', () => {
  const numberRef = { current: { animate: jest.fn() } } as any;
  const numbers = renderHook(
    ({ value }) => useHighlight({ value, highlightUpdates: true, highlightContainer: numberRef }),
    { initialProps: { value: 1 } },
  );
  act(() => {
    numbers.rerender({ value: 2 });
  });
  expect(numberRef.current.animate).toHaveBeenCalled();

  const stringRef = { current: { animate: jest.fn() } } as any;
  const strings = renderHook(
    ({ highlightUpdates }) => useHighlight({ value: 'same', highlightUpdates, highlightContainer: stringRef }),
    { initialProps: { highlightUpdates: false } },
  );
  act(() => {
    strings.rerender({ highlightUpdates: true });
  });
  expect(stringRef.current.animate).not.toHaveBeenCalled();
});

it('does not highlight when both numbers are NaN', () => {
  const highlightContainerRef = { current: { animate: jest.fn() } } as any;
  const { rerender } = renderHook(
    ({ highlightUpdates }) => useHighlight({ value: NaN, highlightUpdates, highlightContainer: highlightContainerRef }),
    { initialProps: { highlightUpdates: false } },
  );
  act(() => {
    rerender({ highlightUpdates: true });
  });
  expect(highlightContainerRef.current.animate).not.toHaveBeenCalled();
});
