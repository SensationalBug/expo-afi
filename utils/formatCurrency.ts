export const formatNumber = (
  value: number | string,
  notation = true,
): string => {
  const num = typeof value === 'string' ? parseFloat(value) : value;

  return num.toLocaleString('es-DO', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true, // Esto añade los separadores de miles
  });
};