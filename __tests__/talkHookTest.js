import { useCallback, useState } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import faker from 'faker';

// Example of a counter hook
const useCustomCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue);
  const increment = useCallback(() => setCount(x => x + 1), []);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);
  return { count, increment, reset };
};

test('Basics: Testing hooks', () => {
  const initialFakeValue = faker.random.number();
  const { result } = renderHook(({ initialValue }) => useCustomCounter(initialValue), {
    initialProps: { initialValue: initialFakeValue }
  });

  // Hook API test
  expect(result.current.count).toBe(initialFakeValue);
  expect(typeof result.current.increment).toBe('function');
  expect(typeof result.current.reset).toBe('function');

  // Functionality
  act(() => {
    result.current.increment();
  });
  expect(result.current.count).toBe(initialFakeValue + 1);

  act(() => {
    result.current.reset();
  });
  expect(result.current.count).toBe(initialFakeValue);
});
