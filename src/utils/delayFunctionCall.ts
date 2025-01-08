export function delayFunctionCall(fn: () => void) {
  setTimeout(() => {
    fn();
  }, 5000);
}