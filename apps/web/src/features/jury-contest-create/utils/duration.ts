import dayjs from 'dayjs';

export function computeDurationInfo(
  startStr?: string,
  endStr?: string,
): {
  valid: boolean;
  text: string;
} {
  if (!startStr || !endStr) return { valid: false, text: '' };

  const start = dayjs(startStr);
  const end = dayjs(endStr);
  if (!start.isValid() || !end.isValid()) return { valid: false, text: 'Invalid date format' };

  const diffMinutes = end.diff(start, 'minute');
  if (diffMinutes <= 0) return { valid: false, text: 'End time must be after start time' };

  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;

  const parts: string[] = [];
  if (hours > 0) parts.push(`${hours} ${hours === 1 ? 'hour' : 'hours'}`);
  if (minutes > 0) parts.push(`${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`);

  return {
    valid: true,
    text: parts.join(' ') || '0 minutes',
  };
}
