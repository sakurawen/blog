import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn'; // 中文

export function initDayjs() {
  dayjs.locale('zh-cn');
  dayjs.extend(relativeTime);
}
