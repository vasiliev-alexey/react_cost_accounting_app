const weekdaysShort = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

const weekdaysLong = [
  'Воскресенье',
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
];

const firstDayOfWeek = 1;
const labels = {
  nextMonth: 'следующий месяц',
  previousMonth: 'предыдущий месяц',
};

export const dayPickerProps = {
  locale: 'ru',
  months,
  weekdaysLong,
  weekdaysShort,
  firstDayOfWeek,
  labels,
};
