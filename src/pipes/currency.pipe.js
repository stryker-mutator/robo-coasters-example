/**
 * @param {number} amount
 * @returns {string}
 */
export function currency(amount) {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'EUR',
  });
}
