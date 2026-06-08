export function add(a: number, b: number): number {
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    throw new TypeError("add only accepts finite numbers");
  }

  return a + b;
}
