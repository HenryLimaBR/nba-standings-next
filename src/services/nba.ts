import axios from 'axios'

export interface StandingsRaw {
  parameters: {
    LeagueID: string
    SeasonType: string
    SeasonYear: string
  }
  resource: string
  resultSets: [
    {
      headers: string[]
      name: string
      rowSet: string[][]
    }
  ]
}

export type TeamSet = {
  LeagueID: string
  SeasonID: string
  TeamID: number
  TeamCity: string
  TeamName: string
  TeamSlug: string
  Conference: string
  ConferenceRecord: string
  PlayoffRank: number
  ClinchIndicator: string
  Division: string
  DivisionRecord: string
  DivisionRank: number
  WINS: number
  LOSSES: number
  WinPCT: number
  LeagueRank: number
  Record: string
  HOME: string
  ROAD: string
  L10: string
  Last10Home: string
  Last10Road: string
  OT: string
  ThreePTSOrLess: string
  TenPTSOrMore: string
  LongHomeStreak: number
  strLongHomeStreak: string
  LongRoadStreak: number
  strLongRoadStreak: string
  LongWinStreak: number
  LongLossStreak: number
  CurrentHomeStreak: number
  strCurrentHomeStreak: string
  CurrentRoadStreak: number
  strCurrentRoadStreak: string
  CurrentStreak: number
  strCurrentStreak: string
  ConferenceGamesBack: number
  DivisionGamesBack: number
  ClinchedConferenceTitle: number
  ClinchedDivisionTitle: number
  ClinchedPlayoffBirth: number
  ClinchedPlayIn: number
  EliminatedConference: number
  EliminatedDivision: number
  AheadAtHalf: string
  BehindAtHalf: string
  TiedAtHalf: string
  AheadAtThird: string
  BehindAtThird: string
  TiedAtThird: string
  Score100PTS: string
  OppScore100PTS: string
  OppOver500: string
  LeadInFGPCT: string
  LeadInReb: string
  FewerTurnovers: string
  PointsPG: number
  OppPointsPG: number
  DiffPointsPG: number
  vsEast: string
  vsAtlantic: string
  vsCentral: string
  vsSoutheast: string
  vsWest: string
  vsNorthwest: string
  vsPacific: string
  vsSouthwest: string
  Jan: string | null
  Feb: string | null
  Mar: string | null
  Apr: string | null
  May: string | null
  Jun: string | null
  Jul: string | null
  Aug: string | null
  Sep: string | null
  Oct: string | null
  Nov: string | null
  Dec: string | null
  Score_80_Plus: string
  Opp_Score_80_Plus: string
  Score_Below_80: string
  Opp_Score_Below_80: string
  TotalPoints: number
  OppTotalPoints: number
  DiffTotalPoints: number
}

export interface Standings {
  parameters: {
    LeagueID: string
    SeasonType: string
    SeasonYear: string
  }
  resource: string
  resultSets: TeamSet[]
}

export async function getStandings() {
  // !This should be updated soon!!!
  /* const year = new Date().getFullYear().toString()
  const seasonNumber = parseInt(year.slice(year.length - 2)) + 1 */
  // * This fixes temporally
  const year = "2022"
  const seasonNumber = 23

  const data = (await axios.get(
    `https://stats.nba.com/stats/leaguestandingsv3?GroupBy=conf&LeagueID=00&Season=${year}-${seasonNumber}&SeasonType=Regular%20Season&Section=overall`,
    {
      headers: {
        "accept": "*/*",
        "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
        "if-modified-since": "Sat, 24 Dec 2022 05:10:46 GMT",
        "sec-ch-ua": "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"108\", \"Google Chrome\";v=\"108\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "Referer": "https://www.nba.com/",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
    }
  )).data

  const info: Record<string, unknown>[] = []

  for (const row in data.resultSets[0].rowSet) {
    const rowData: Record<string, unknown> = {}
    for (const header in data.resultSets[0].headers) {
      const key = data.resultSets[0].headers[header]
      const value = data.resultSets[0].rowSet[row][header]
      rowData[key] = value
    }
    info.push(rowData)
  }

  return {
    parameters: data.parameters,
    resource: data.resource,
    resultSets: (info as TeamSet[])
  }
}