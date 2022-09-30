export const MMSS = (time: any): string => {
  if (typeof time !== 'number') return '00:00'
  let m = 0,
    s = 0
  m = Math.floor(time / 60)
  s = Math.floor(time % 60)
  let res = ''
  if (m < 10) res += '0'
  res += m
  res += ':'
  if (s < 10) res += '0'
  res += s
  return res
}
