/**
 * Deterministic 21x21 decorative pattern shaped like a QR code (finder squares + pseudo-random modules).
 * It is an illustration of the example address only, not a scannable code.
 */
export function qrPattern(n = 21): boolean[] {
  const out: boolean[] = [];
  let s = 11;
  const rnd = () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
  const finders = [
    [0, 0],
    [n - 7, 0],
    [0, n - 7]
  ];
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      let v = -1;
      for (const [fx, fy] of finders) {
        const dx = x - fx;
        const dy = y - fy;
        if (dx >= 0 && dx < 7 && dy >= 0 && dy < 7) {
          v = dx === 0 || dx === 6 || dy === 0 || dy === 6 || (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4) ? 1 : 0;
          break;
        }
        if (dx >= -1 && dx <= 7 && dy >= -1 && dy <= 7) {
          v = 0;
          break;
        }
      }
      out.push(v === -1 ? rnd() > 0.5 : v === 1);
    }
  }
  return out;
}
