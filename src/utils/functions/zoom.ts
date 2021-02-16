export const formatMeetingID = (id: string | number) => {
  const match = /^(.{3})(.{4})(.+)$/.exec(String(id));
  if (!match) return id;

  return match.slice(1).join(' ');
};
