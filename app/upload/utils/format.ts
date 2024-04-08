function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const format = (word: string) => {
  return capitalize(word.replace(/([a-z])([A-Z])/g, "$1 $2"));
};

export default format;
