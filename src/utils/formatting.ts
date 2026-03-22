import {format, formatDistanceToNow, isToday, isYesterday} from 'date-fns';

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  if (isToday(date)) return 'Today';
  if (isYesterday(date)) return 'Yesterday';
  return format(date, 'MMM d');
};

export const formatTimestamp = (dateString: string): string => {
  const date = new Date(dateString);
  return format(date, 'h:mm a');
};

export const formatRelativeTime = (dateString: string): string => {
  return formatDistanceToNow(new Date(dateString), {addSuffix: true});
};

export const formatFoodName = (name: string): string => {
  return name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

export const getAgeLabel = (ageGroup: string): string => {
  const labels: Record<string, string> = {
    '0-2': 'Under 2',
    '2-4': '2–4 yrs',
    '5-7': '5–7 yrs',
    '8-10': '8–10 yrs',
  };
  return labels[ageGroup] || ageGroup;
};

export const getDietLabel = (diet: string): string => {
  return diet === 'vegetarian' ? 'Vegetarian' : 'Non-vegetarian';
};
