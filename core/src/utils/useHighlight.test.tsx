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
