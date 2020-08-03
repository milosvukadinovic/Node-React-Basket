/**
 * Mocking client-server processing
 */
import _products from '../../server/products.json'

const TIMEOUT = 100

export default {
  getProducts: (callback, timeout) => setTimeout(() => callback(_products), timeout || TIMEOUT),
  buyProducts: (payload, callback, timeout) => setTimeout(() => callback(), timeout || TIMEOUT)
}