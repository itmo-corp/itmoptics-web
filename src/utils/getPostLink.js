export default exhibit => {
  if (!exhibit) return '';
  return `/exhibits/${exhibit.id}`;
};
