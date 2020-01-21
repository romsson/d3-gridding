export function constant(x) {
  return function() {
    return x;
  };
}