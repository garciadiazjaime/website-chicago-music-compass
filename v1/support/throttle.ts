export default function throttle(func: any, limit: number) {
  let inThrottle: boolean;
  return function () {
    const args = arguments;
    if (!inThrottle) {
      func(args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
