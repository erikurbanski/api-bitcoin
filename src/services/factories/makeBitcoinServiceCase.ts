import { BitcoinService } from '@/services/bitcoin'

export function makeBitcoinServiceCase () {
  return new BitcoinService()
}
