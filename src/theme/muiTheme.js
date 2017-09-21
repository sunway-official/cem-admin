import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { deepOrange500 } from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: deepOrange500,
    pickerHeaderColor: deepOrange500,
    primary2Color: deepOrange500,
  },
});

export default muiTheme;