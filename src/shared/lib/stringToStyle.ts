export const stringToStyle = (
  styleString: string | undefined
): Record<string, string> => {
  if (!styleString) return {};

  return styleString.split(';').reduce(
    (acc, style) => {
      const pair = style.split(':');
      if (pair.length !== 2) return acc;

      const [key, value] = pair;
      acc[key.trim()] = value.trim();
      return acc;
    },
    {} as Record<string, string>
  );
};
