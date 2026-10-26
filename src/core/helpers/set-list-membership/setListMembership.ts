// Возвращает новый массив, в котором элемент присутствует (present=true) или отсутствует.
// Чистая функция: не мутирует вход.
const setListMembership = <T>(list: T[], item: T, present: boolean): T[] => {
  if (present) return list.includes(item) ? list : [...list, item];
  return list.filter(value => value !== item);
};

export default setListMembership;
