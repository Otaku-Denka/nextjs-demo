import moment from 'moment';

export function getLastUpdated(time: string) {
  return moment(time).fromNow();
}
