export const Converter = {
  date2Unix: (date: Date): number | null =>
    date === null ? null : date.getTime() / 1000,
  unix2Date: (unix: number): Date | null =>
    unix === null ? null : new Date(unix * 1000),
};
