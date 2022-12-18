import React from 'react';
import OutsidePage from 'components/blocks/OutsidePage';
import { makeStyles } from '@material-ui/core/styles';
import { LANGUAGES_INTERFACE, MIN_WIDTH } from 'config/constants';
import { FormControlLabel, Radio, RadioGroup, Typography, useTheme } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setSettings } from 'store/actions/settings';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  section: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(1.5),
    [theme.breakpoints.up(MIN_WIDTH)]: {
      borderRadius: 8,
    },
    position: 'relative',
    overflow: 'hidden',
    padding: theme.spacing(1.8, 2),
  },
  sectionHeader: {
    fontSize: 13,
    color: theme.palette.text.hint,
    textTransform: 'uppercase',
    fontWeight: 500,
    lineHeight: 'normal',
    fontFamily: 'Google Sans',
    paddingBottom: theme.spacing(1),
  },
}));

const Language = () => {
  const theme = useTheme();
  const classes = useStyles();
  const languageSettings = useSelector(store => store.settings.language);
  const dispatch = useDispatch();
  const setLanguageSettings = (field, value) => {
    dispatch(
      setSettings({
        language: {
          ...languageSettings,
          [field]: value,
        },
      })
    );
  };

  const handleInterfaceLanguageChange = (_event, value) => {
    setLanguageSettings('interface', value);
    // TODO Set i18n lang here
  };

  return (
    <OutsidePage
      headerText="Настройки языка"
      disableShrinking
      backgroundColor={theme.palette.background.paper}
    >
      <div className={classes.root}>
        <div className={classes.section}>
          <Typography className={classes.sectionHeader}>
            Интерфейс
          </Typography>
          <RadioGroup
            aria-label="language-interface"
            name="language-interface"
            value={languageSettings.interface}
            onChange={handleInterfaceLanguageChange}
          >
            {LANGUAGES_INTERFACE.map(({ name, type }) => (
              <FormControlLabel
                value={type}
                key={type}
                control={<Radio color="primary" />}
                label={name}
              />
            ))}
          </RadioGroup>
        </div>
      </div>
    </OutsidePage>
  );
};

export default React.memo(Language);
