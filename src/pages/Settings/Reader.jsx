import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import OutsidePage from 'components/blocks/OutsidePage';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { MIN_WIDTH, READER_FONT_FAMILIES, READER_COLOR_SCHEMES } from 'config/constants';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  ListItem,
  ListItemText,
  Radio,
  RadioGroup,
  Switch,
  TextField,
  Typography,
  useTheme,
} from '@material-ui/core';
import { setSettings } from 'store/actions/settings';
import FormattedText from 'components/formatters/FormattedText';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(2),
  },
  section: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(1.5),
    [theme.breakpoints.up(MIN_WIDTH)]: {
      borderRadius: 8,
    },
    position: 'relative',
    overflow: 'hidden',
  },
  sectionHeader: {
    fontSize: 13,
    color: theme.palette.text.hint,
    textTransform: 'uppercase',
    fontWeight: 500,
    lineHeight: 'normal',
    fontFamily: 'Google Sans',
    paddingBottom: 0,
    padding: theme.spacing(1.8, 2),
  },
  previewBox: {
    background: theme.palette.background.default,
    margin: theme.spacing(1.8, 2),
    borderRadius: 8,
    padding: theme.spacing(1.8, 2),
    '& p': {
      margin: 0,
      fontSize: ({ readerSettings }) => readerSettings.fontSize,
      fontFamily: ({ readerSettings }) => readerSettings.fontFamily,
    },
    '& p+p': {
      marginTop: theme.spacing(3),
    },
  },
}));

const previewText = `
<h1>IT[M]Optics</h1>
<p>
  <u>Просто</u>. <em>Быстро</em>. <b>IT[M]Optics.</b>
</p>
<p>
  <blockquote>
  Дедлайн горит<br>
  Студенты плачут<br>
  Осталось пять<br>
  Часов до сдачи<br>
  Ответов нет!..
  </blockquote>
  Музейчик
</p>

<pre>Неформатированный текст</pre>
<code lang="java">public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}</code>
`;

const SwitchButton = ({ primary, secondary, checked, onChange }) => {
  return (
    <ListItem button onClick={() => onChange()}>
      <ListItemText primary={primary} secondary={secondary} />
      <Switch disableRipple checked={checked} color="primary" />
    </ListItem>
  );
};

SwitchButton.propTypes = {
  primary: PropTypes.node.isRequired,
  secondary: PropTypes.node,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

const Reader = () => {
  const theme = useTheme();
  const readerSettings = useSelector(store => store.settings.readerSettings);
  const classes = useStyles({ readerSettings });

  const fontSizeInputRef = useRef();
  const codeFontSizeInputRef = useRef();

  const [isFontSizeDialogOpen, setFontSizeDialogOpen] = useState(false);
  const [isCodeFontSizeDialogOpen, setCodeFontSizeDialogOpen] = useState(false);

  const [isFontFamilyDialogOpen, setFontFamilyDialogOpen] = useState(false);
  const [isColorSchemeDialogOpen, setColorSchemeDialogOpen] = useState(false);

  const [fontFamilyRadioValue, setFontFamilyRadioValue] = useState(readerSettings.fontFamily);
  const [colorSchemeRadioValue, setColorSchemeRadioValue] = useState(readerSettings.colorScheme);

  const fontFamilyRadioGroupRef = React.useRef(null);
  const colorSchemeRadioGroupRef = React.useRef(null);

  const dispatch = useDispatch();
  const setReaderSettings = (field, value) => {
    dispatch(
      setSettings({
        readerSettings: {
          ...readerSettings,
          [field]: value,
        },
      })
    );
  };

  const handleFontSizeDialogCancel = () => setFontSizeDialogOpen(false);
  const handleCodeFontSizeDialogCancel = () => setCodeFontSizeDialogOpen(false);

  const handleFontFamilyDialogCancel = () => setFontFamilyDialogOpen(false);
  const handleColorSchemeDialogCancel = () => setColorSchemeDialogOpen(false);

  const handleFontSizeDialogSubmit = () => {
    setReaderSettings(
      'fontSize',
      parseInt(fontSizeInputRef.current.value, 10) || readerSettings.fontSize
    );
    setFontSizeDialogOpen(false);
  };
  const handleCodeFontSizeDialogSubmit = () => {
    setReaderSettings(
      'codeFontSize',
      parseInt(codeFontSizeInputRef.current.value, 10) || readerSettings.codeFontSize
    );
    setCodeFontSizeDialogOpen(false);
  };

  const handleFontFamilyDialogSubmit = () => {
    setReaderSettings('fontFamily', fontFamilyRadioValue);
    setFontFamilyDialogOpen(false);
  };
  const handleFontFamilyRadioValueChange = event => {
    setFontFamilyRadioValue(event.target.value);
  };

  const handleColorSchemeDialogSubmit = () => {
    setReaderSettings('colorScheme', colorSchemeRadioValue);
    setColorSchemeDialogOpen(false);
  };
  const handleColorSchemeRadioValueChange = event => {
    setColorSchemeRadioValue(event.target.value);
  };

  const colorThemesLengthHalf = READER_COLOR_SCHEMES.length / 2;
  const colorThemesFirstRow = READER_COLOR_SCHEMES.slice(0, colorThemesLengthHalf);
  const colorThemesSecondRow = READER_COLOR_SCHEMES.slice(colorThemesLengthHalf);

  return (
    <OutsidePage
      headerText="Параметры чтения"
      disableShrinking
      backgroundColor={theme.palette.background.paper}
    >
      <div className={classes.root}>
        <div className={classes.section}>
          <Typography className={classes.sectionHeader}>Предпросмотр</Typography>
          <div className={classes.previewBox}>
            <FormattedText>{previewText}</FormattedText>
          </div>
        </div>
        <div className={classes.section}>
          <Dialog open={isFontSizeDialogOpen} onClose={handleFontSizeDialogCancel}>
            <DialogTitle>Размер шрифта</DialogTitle>
            <DialogContent>
              <TextField
                label="Размер в px"
                inputRef={fontSizeInputRef}
                defaultValue={readerSettings.fontSize}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleFontSizeDialogCancel} color="primary">
                Отмена
              </Button>
              <Button
                color="primary"
                variant="contained"
                disableElevation
                onClick={handleFontSizeDialogSubmit}
              >
                Сохранить
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog open={isCodeFontSizeDialogOpen} onClose={handleCodeFontSizeDialogCancel}>
            <DialogTitle>Размер шрифта кода</DialogTitle>
            <DialogContent>
              <TextField
                label="Размер в px"
                inputRef={codeFontSizeInputRef}
                defaultValue={readerSettings.codeFontSize}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCodeFontSizeDialogCancel} color="primary">
                Отмена
              </Button>
              <Button
                color="primary"
                variant="contained"
                disableElevation
                onClick={handleCodeFontSizeDialogSubmit}
              >
                Сохранить
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog open={isFontFamilyDialogOpen} onClose={handleFontFamilyDialogCancel}>
            <DialogTitle>Шрифт</DialogTitle>
            <DialogContent dividers>
              <RadioGroup
                ref={fontFamilyRadioGroupRef}
                aria-label="font-family"
                name="font-family"
                value={fontFamilyRadioValue}
                onChange={handleFontFamilyRadioValueChange}
              >
                {READER_FONT_FAMILIES.map(e => (
                  <FormControlLabel
                    value={e}
                    key={e}
                    control={<Radio color="primary" />}
                    label={e}
                  />
                ))}
              </RadioGroup>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleFontFamilyDialogCancel} color="primary">
                Отмена
              </Button>
              <Button
                color="primary"
                variant="contained"
                disableElevation
                onClick={handleFontFamilyDialogSubmit}
              >
                Сохранить
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog open={isColorSchemeDialogOpen} onClose={handleColorSchemeDialogCancel}>
            <DialogTitle>Цветовая схема кода</DialogTitle>
            <DialogContent dividers>
              <RadioGroup
                ref={colorSchemeRadioGroupRef}
                aria-label="color-scheme"
                name="color-scheme"
                value={colorSchemeRadioValue}
                onChange={handleColorSchemeRadioValueChange}
              >
                <Grid container spacing={4}>
                  <Grid container item xs={6} direction="column">
                    {colorThemesFirstRow.map(e => {
                      return (
                        <FormControlLabel
                          value={e}
                          key={e}
                          control={<Radio color="primary" />}
                          label={e}
                        />
                      );
                    })}
                  </Grid>
                  <Grid container item xs={6} direction="column">
                    {colorThemesSecondRow.map(e => {
                      return (
                        <FormControlLabel
                          value={e}
                          key={e}
                          control={<Radio color="primary" />}
                          label={e}
                        />
                      );
                    })}
                  </Grid>
                </Grid>
              </RadioGroup>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleColorSchemeDialogCancel} color="primary">
                Отмена
              </Button>
              <Button
                color="primary"
                variant="contained"
                disableElevation
                onClick={handleColorSchemeDialogSubmit}
              >
                Сохранить
              </Button>
            </DialogActions>
          </Dialog>

          <Typography className={classes.sectionHeader}>Текст</Typography>
          <ListItem button onClick={() => setFontSizeDialogOpen(true)}>
            <ListItemText primary="Размер шрифта" secondary={`${readerSettings.fontSize}px`} />
          </ListItem>
          <ListItem button onClick={() => setCodeFontSizeDialogOpen(true)}>
            <ListItemText
              primary="Размер шрифта кода"
              secondary={`${readerSettings.codeFontSize}px`}
            />
          </ListItem>
          <ListItem button onClick={() => setFontFamilyDialogOpen(true)}>
            <ListItemText primary="Шрифт" secondary={readerSettings.fontFamily} />
          </ListItem>
          <ListItem button onClick={() => setColorSchemeDialogOpen(true)}>
            <ListItemText primary="Цветовая схема кода" secondary={readerSettings.colorScheme} />
          </ListItem>
        </div>
        <div className={classes.section}>
          <Typography className={classes.sectionHeader}>Параметры</Typography>
          <SwitchButton
            primary="Скрыть изображения"
            secondary="Позволит уменьшить потребление трафика"
            checked={readerSettings.replaceImagesWithPlaceholder}
            onChange={() => {
              setReaderSettings(
                'replaceImagesWithPlaceholder',
                !readerSettings.replaceImagesWithPlaceholder
              );
            }}
          />
        </div>
      </div>
    </OutsidePage>
  );
};

export default React.memo(Reader);
