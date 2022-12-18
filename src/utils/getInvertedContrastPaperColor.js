import isDarkTheme from './isDarkTheme';

const getInvertedContrastPaperColor = theme => {
  return theme.palette.background[isDarkTheme(theme) ? 'paper' : 'default'];
};

export default getInvertedContrastPaperColor;
