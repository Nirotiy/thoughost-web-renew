import { useSyncExternalStore } from 'react';

// Match the existing narrow-layout boundary; desktop canvas coordinates stay intact.
const query = '(max-width: 900px)';
function subscribe(onChange: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
}
export function useMobileLayout() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false);
}
