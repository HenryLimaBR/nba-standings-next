import type { NextApiRequest, NextApiResponse } from 'next'
import { getStandings } from '../../../services/nba'

export default async function Standings(req: NextApiRequest, res: NextApiResponse) {
  res.json(
    await getStandings()
  )
}