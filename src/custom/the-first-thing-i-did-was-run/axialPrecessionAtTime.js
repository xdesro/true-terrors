export default function axialPrecessionAtTime(dateTimeString) {
  const date = new Date(dateTimeString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const totalHours = hours + minutes / 60 + seconds / 3600;
  const hoursFromNoon = (totalHours - 12 + 24) % 24;
  const precessionInRadians = (hoursFromNoon / 12) * Math.PI;
  return precessionInRadians;
}
