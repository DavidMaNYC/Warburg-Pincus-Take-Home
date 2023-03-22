export const toTitleCase = (str: string) => {
  return str.toString().replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
  });
};
