export const formatDate = (
  date: string,
  locale: string = 'es-PE',
  options: Intl.DateTimeFormatOptions={
    day: '2-digit',
    month: 'short',
    year: '2-digit'
  }
) => {
  const formatter = new Intl.DateTimeFormat(locale, options);

  return formatter.format(new Date(date));
};

export const formatCurrency = (
  amount: string,
  locale: string = 'es-PE',
  options: Intl.NumberFormatOptions={
    style: 'currency',
    currency: 'PEN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }
) => {
  const formatter = new Intl.NumberFormat(locale, options);

  return formatter.format(amount);
};