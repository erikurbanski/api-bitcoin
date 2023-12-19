import axios from 'axios'
import { ResourceNotFound } from './errors/resourceNotFound'

interface Ticker {
  high: string
  low: string
  vol: string
  last: string
  buy: string
  sell: string
  open: string
  date: number
}

interface Bitcoin {
  ticker: Ticker
}

interface GetBitcoinResponse {
  data: Bitcoin[]
}

export class BitcoinService {
  async execute () {
    try {
      const { data } = await axios.get<GetBitcoinResponse>(
        'https://www.mercadobitcoin.net/api/BTC/ticker/',
        {
          headers: {
            Accept: 'application/json'
          }
        }
      )

      return data
    } catch (error) {
      throw new ResourceNotFound()
    }
  }
}
