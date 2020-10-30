export const interpolation = (x1, y1, x2, y2, x) => {
  return y1 - (x1 - x) * ((y1 - y2) / (x1 - x2));
};
/**
 * For table interpolation
 *
 * |      |  x1  |  x2  |
 * ----------------------
 * |  y1  | z11  | z12  |
 * ----------------------
 * |  y2  | z21  | z22  |
 *
 */
export const tableInterpolation = (
  x1,
  x2,
  y1,
  y2,
  z11,
  z12,
  z21,
  z22,
  x,
  y
) => {
  //   console.log(
  //     `* |      |  ${x1}  |  ${x2}  |
  //     * ----------------------
  //     * |  ${y1}  | ${z11}  | ${z12}  |
  //     * ----------------------
  //     * |  ${y2}  | ${z21}  | ${z22}  |`
  //   );
  const result1 = interpolation(x1, z11, x2, z12, x);
  const result2 = interpolation(x1, z21, x2, z22, x);
  return interpolation(y1, result1, y2, result2, y);
};
