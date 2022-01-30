import dayjs from 'dayjs';

type DateTemplate = 'YYYY.MM.DD' | 'YYYY-MM-DD hh:mm:ss';

export const formatDate = (
  date: string | Date,
  template?: DateTemplate,
): string => dayjs(date).format(template ?? 'YYYY.MM.DD');
