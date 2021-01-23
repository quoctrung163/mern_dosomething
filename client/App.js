import React from 'react';
import MainRouter from './components/routing/MainRouter';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import theme from './themes';
import { hot } from 'react-hot-loader';

const App = () => {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <MainRouter />
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default hot(module)(App);