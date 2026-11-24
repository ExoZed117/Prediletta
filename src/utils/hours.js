// Horario habitual (hora de Bolivia). Los feriados pueden variar.
export function isOpenNow(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'America/La_Paz',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(now);
  const get = (type) => parts.find((p) => p.type === type).value;
  const minutes = Number(get('hour')) * 60 + Number(get('minute'));
  const opens = get('weekday') === 'Sun' ? 15 * 60 + 30 : 8 * 60 + 30;
  return minutes >= opens && minutes < 21 * 60 + 30;
}
