import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'

import type { Standings, TeamSet } from '../services/nba'
import { ordinalNumber } from '../utils/ordinal'
import Head from 'next/head'

const HomePage: NextPage = () => {
  const [standings, setStandings] = useState<TeamSet[]>()

  useEffect(() => {
    axios.get<Standings>('/api/nba/standings')
      .then(({ data }) => {
        setStandings(data.resultSets)
      })
  }, [])

  return (
    <>
      <Head>
        <title>
          NBA Team Standings
        </title>
      </Head>

      <div className='bg-c-blue-900 min-h-screen w-full relative text-c-blue-100'>
        {/* <header className='bg-c-blue-700 h-12' /> */}

        <main className='flex w-full p-4 gap-4 portrait:flex-col'>
          <DivisionList conference='West' teamsInfo={standings?.filter(teamData => teamData.Conference == 'West')} />
          <DivisionList conference='East' teamsInfo={standings?.filter(teamData => teamData.Conference == 'East')} />
        </main>
      </div>
    </>
  )
}

const DivisionList: React.FC<{ teamsInfo?: TeamSet[], conference: 'West' | 'East' }> = ({ teamsInfo, conference }) => {
  return (
    <div className='flex-1'>
      <h3 className='text-xl mb-4'>
        {conference} Conference
      </h3>
      <table className='table-auto border-collapse w-full font-mono rounded-md overflow-hidden'>
        <thead>
          <tr className='divide-x bg-c-blue-700 divide-c-blue-500 text-sm [&>th]:py-2'>
            <th>Pos</th>
            <th>Logo</th>
            <th>Team</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Win Ratio %</th>
          </tr>
        </thead>

        <tbody>
          {teamsInfo && teamsInfo.map(team => <TeamItem key={team.TeamID} team={team} />)}
        </tbody>
      </table>
    </div>

  )
}

const TeamItem: React.FC<{ team: TeamSet }> = ({ team }) => {
  return (
    <tr className='odd:bg-c-blue-500 even:bg-c-blue-600 rounded-md text-center select-none divide-x even:divide-c-blue-500 odd:divide-c-blue-600'>
      <td title='PlayOff Conference Rank'>
        <span>
          {ordinalNumber(team.PlayoffRank)}
        </span>
      </td>

      <td
        title='Team Logo'
        className='flex justify-center items-center'
      >
        <Image
          src={`https://cdn.nba.com/logos/nba/${team.TeamID}/global/L/logo.svg`}
          width={48}
          height={48}
          alt={`${team.TeamCity} ${team.TeamName}'s Logo`}
        />
      </td>

      <td title='Team City and Name'>
        <span>
          <Link href={`/${team.TeamSlug}`}>
            {team.TeamCity} {team.TeamName}
          </Link>
        </span>
      </td>

      <td title='Team Wins'>
        <span>
          {team.WINS}
        </span>
      </td>

      <td title='Team Losses'>
        <span>
          {team.LOSSES}
        </span>
      </td>

      <td title='Team Win Ratio'>
        <span>
          {(team.WinPCT * 100).toPrecision(3)}%
        </span>
      </td>
    </tr>
  )
}

export default HomePage