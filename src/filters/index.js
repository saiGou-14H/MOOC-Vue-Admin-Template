import moment from 'moment'
export function formatTime(value) {
  return moment(value * 1000).format('YYYY-MM-DD HH:mm:ss')
}
