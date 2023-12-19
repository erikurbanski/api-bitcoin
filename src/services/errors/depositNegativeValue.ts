export class DepositNegativeValue extends Error {
  constructor () {
    super("It's not possible to deposite negative values!")
  }
}
