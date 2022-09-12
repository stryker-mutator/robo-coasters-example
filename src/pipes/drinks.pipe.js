/**
 * @param {number} amount
 * @return {string}
 */
export function drinks(amount) {
  return `${amount} drink${amount === 1 ? '' : 's'}`;
}
