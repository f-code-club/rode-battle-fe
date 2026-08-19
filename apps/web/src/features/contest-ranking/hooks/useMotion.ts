import { useEffect, useRef, useState } from 'react';

export function useMotion<T>(value: T, duration = 600): boolean {
  const prevValue = useRef(value);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (value !== prevValue.current) {
      setIsChanged(true);
      const timer = setTimeout(() => setIsChanged(false), duration);
      prevValue.current = value;
      return () => clearTimeout(timer);
    }
  }, [value, duration]);

  return isChanged;
}
