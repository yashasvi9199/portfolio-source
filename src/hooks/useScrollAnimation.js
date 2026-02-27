// Legacy hook — fullpage scroll system now handles section animations via CSS.
// Kept for backward compatibility if any component still references it.
import { useRef } from 'react';

export const useScrollAnimation = () => {
  return useRef([]);
};