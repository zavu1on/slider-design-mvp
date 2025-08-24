export const getTargetId = (target: string): string | undefined => {
  const targetId = target.match(/data-id="([^"]*)"/);

  if (targetId && targetId[1]) return targetId[1];
};
