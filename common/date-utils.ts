const pluralize = (count: number, wordBase: string) => `${wordBase}${count > 1 ? 's' : ''}`;

export const getTimeBySeconds = (seconds: number, enableDays = true) => {
  if (seconds < 60) {
    return `${seconds} seconds`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} ${pluralize(minutes, 'minute')}`;
  } else if (seconds < 86400 || !enableDays) {
    const hours = Math.floor(seconds / 3600);
    return `${hours} ${pluralize(hours, 'hour')}`;
  } else {
    const days = Math.floor(seconds / 86400);
    return `${days} ${pluralize(days, 'day')}`;
  }
}

export const getFormattedDate = (seconds: number) => {
  const date = new Date(seconds * 1000);
  const convertedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return convertedDate;
}
