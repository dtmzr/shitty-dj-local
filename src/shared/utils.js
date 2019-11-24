export const formatDuration = durationInMs => {
  const d = new Date(durationInMs);
  let seconds = d.getSeconds();

  if (10 > seconds) {
    seconds = "0" + seconds;
  }

  return `${d.getMinutes()}:${seconds}`;
};
