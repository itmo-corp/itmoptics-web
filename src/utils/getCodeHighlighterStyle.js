import {
  a11yDark,
  a11yLight,
  androidstudio,
  idea,
  atomOneDark,
  darcula,
  docco,
  dracula,
  far,
  github,
  gruvboxDark,
  gruvboxLight,
  monokai,
  obsidian,
  ocean,
  railscasts,
  vs,
  vs2015,
  xcode,
  xt256,
  zenburn,
} from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default colorSchemeName => {
  switch (colorSchemeName) {
    case 'a11y Dark':
      return a11yDark;
    case 'a11y Light':
      return a11yLight;
    case 'Android Studio':
      return androidstudio;
    case 'IDEA':
      return idea;
    case 'Atom One Dark':
      return atomOneDark;
    case 'Darcula':
      return darcula;
    case 'Docco':
      return docco;
    case 'Dracula':
      return dracula;
    case 'FAR':
      return far;
    case 'Github':
      return github;
    case 'Gruvbox Dark':
      return gruvboxDark;
    case 'Gruvbox Light':
      return gruvboxLight;
    case 'Monokai':
      return monokai;
    case 'Obsidian':
      return obsidian;
    case 'Ocean':
      return ocean;
    case 'Railscasts':
      return railscasts;
    case 'VS':
      return vs;
    case 'VS2015':
      return vs2015;
    case 'XCode':
      return xcode;
    case 'xt256':
      return xt256;
    case 'Zenburn':
      return zenburn;
    default:
      return monokai;
  }
};
