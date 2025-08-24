export const stringToStyle = (
  styleString: string | undefined
): Record<string, string> => {
  if (!styleString) return {};

  return styleString.split(';').reduce(
    (acc, style) => {
      const firstColonIndex = style.indexOf(':');
      if (firstColonIndex === -1) return acc;

      const key = style.substring(0, firstColonIndex);
      const value = style.substring(firstColonIndex + 1);

      acc[key.trim()] = value.trim();
      return acc;
    },
    {} as Record<string, string>
  );
};
