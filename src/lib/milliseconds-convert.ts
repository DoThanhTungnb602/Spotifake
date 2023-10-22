export function millisecondsToMinutesAndSeconds(millis: number) {
  const minutes = Math.floor(millis / 60000);
  const seconds = Number.parseInt(((millis % 60000) / 1000).toFixed(0));
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}
export function millisecondsToHoursAndMinutes(millis: number) {
  const hours = Math.floor(millis / 3600000);
  const minutes = Math.floor((millis % 3600000) / 60000);
  return hours > 0 ? hours + " hr " + minutes + " min " : minutes + " min ";
}
