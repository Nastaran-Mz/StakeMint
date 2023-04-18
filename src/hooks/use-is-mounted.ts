import { useEffect, useState } from 'react';

export function useIsMounted() {
  const [mounted, setMounted] = useState<boolean | null>(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
