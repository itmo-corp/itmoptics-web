import isDarkTheme from './isDarkTheme';

const getContrastPaperColor = theme => theme.palette.background[isDarkTheme(theme) ? 'default' : 'paper'];

export default getContrastPaperColor;
