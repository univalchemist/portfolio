import moment from 'moment-timezone'

import { IVisit, KeyValue } from '@root/types'
import { localToUTCTime, UTCToLocalTime } from '@utils/index'

export interface ILineChartUser {
  name: string
  color: string
}

export interface ILineChartData {
  data: KeyValue<string | number>[]
  users: ILineChartUser[]
}

export interface IPieChartData {
  name: string
  value: number
}

export const getInitialDateRange = (
  isLocal = false,
  days = 7,
): [string, string] => {
  const end = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
  const start = moment()
    .subtract(days, 'days')
    .startOf('day')
    .format('YYYY-MM-DD HH:mm:ss')

  if (isLocal) {
    return [start, end]
  }
  return [localToUTCTime(start), localToUTCTime(end)]
}

export const buildLineChartData = (
  visits: IVisit[],
  days = 7,
): ILineChartData => {
  const colors = ['#07bc0c', '#3498db', '#ffffff', '#5856d6', '#bb86fc']
  const res: KeyValue<string | number>[] = []
  const temp: KeyValue<KeyValue<number>> = {}
  const allUsers: KeyValue<number> = {}
  const platforms: KeyValue<any> = {}

  visits.forEach(v => {
    const date = UTCToLocalTime(v.createdAt, 'MM-DD')
    if (!temp[date]) temp[date] = {}
    if (!temp[date][v.userSeen]) temp[date][v.userSeen] = 0
    if (allUsers[v.userSeen] === undefined) allUsers[v.userSeen] = 0 // gather all users in order to avoid undefined chart data
    temp[date][v.userSeen] += 1

    if (!platforms[date]) platforms[date] = {}
    if (!platforms[date][`${v.userSeen}_from`]) {
      platforms[date][`${v.userSeen}_from`] = {}
    }
    if (!platforms[date][`${v.userSeen}_from`][v.from]) {
      platforms[date][`${v.userSeen}_from`][v.from] = 0
    }
    platforms[date][`${v.userSeen}_from`][v.from] += 1
  })

  const end = moment()
  const start = moment().subtract(days, 'days')
  for (let m = start; m.diff(end, 'days') <= 0; m.add(1, 'days')) {
    const date = m.format('MM-DD')
    res.push({
      date,
      ...allUsers,
      ...temp[date],
      ...platforms[date],
    })
  }

  const userColors = Object.keys(allUsers).map((a, index) => ({
    name: a,
    color: colors[index % colors.length],
  }))

  return { data: res, users: userColors }
}

export const buildPieChartData = (visits: IVisit[]): IPieChartData[] => {
  const temp: KeyValue<number> = {}

  visits.forEach(visit => {
    if (!temp[visit.from]) temp[visit.from] = 0
    temp[visit.from] += 1
  })

  return Object.entries(temp).map(([name, value]) => ({
    name,
    value,
  }))
}
