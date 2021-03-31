import { timestamp } from './firestore';

export function formatCardDate(fromDate) {
  if (!fromDate || !fromDate.seconds) {
    return;
  }

  const Timestamp = timestamp();

  const seconds = Math.round(Timestamp.now().seconds - fromDate.seconds);

  if (seconds < 60) {
    return `${seconds % 60}s`;
  }

  const minutes = Math.round(seconds / 60);

  if (minutes < 60) {
    return `${minutes}m`;
  }

  const hours = Math.round(minutes / 60);

  if (hours < 24) {
    return `${hours}h`;
  }

  const date = new Date(fromDate.toDate());
  const browserLanguage = navigator.language;
  const displayDate = date.toLocaleDateString(browserLanguage);

  return displayDate;
}

export function sortByDateCreated(dateArray) {
  if (!Array.isArray(dateArray)) {
    throw TypeError(`Invalid array`);
  }

  if (dateArray.length === 0) {
    return dateArray;
  }

  // Check if every object in the array has seconds to sort
  dateArray.forEach((dateObj, index) => {
    if (!dateObj.dateCreated || !dateObj.dateCreated.seconds) {
      throw TypeError(`Invalid array object , index: ${index}`);
    }
  });

  const sortedArray = [...dateArray];

  sortedArray.sort((a, b) => a.dateCreated.seconds - b.dateCreated.seconds);

  return sortedArray;
}
