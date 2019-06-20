import moment from 'moment';
import 'moment/locale/zh-tw';

moment.locale('zh-tw');

export function getLastUpdated(time: string) {
  return moment(time).fromNow();
}
