import Head from 'next/head';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Link,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Switch,
} from '@mui/material';
import { styled } from '@mui/system';
import NextLink from 'next/link';
import styles from './layout.module.css';
import { useContext } from 'react';
import { Store } from '../../utils/Store';
import Cookies from 'js-cookie';

const MyAppBar = styled(AppBar)`
  background-color: #203040;
  & a {
    color: #ffffff;
    marginleft: 10px;
    text-decoration: none;
  }
  & p {
    font-weight: bold;
    font-size: 24px;
  }
`;

const MyContainer = styled(Container)`
  min-height: 80vh;
`;

const MyFooter = styled('footer')`
  text-align: center;
  margin-top: 10px;
`;

const Layout = ({ title, description, children }) => {
  const { state, dispatch } = useContext(Store);
  const { darkMode } = state;
  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' });
    const newMode = !darkMode;
    Cookies.set('darkMode', newMode ? 'ON' : 'OFF');
  };
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      h2: {
        fontSize: '1.4rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
    },
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#f0c000',
      },
      secondary: {
        main: '#208080',
      },
    },
  });

  return (
    <div>
      <Head>
        <title>{title ? `${title} - Next Amazon` : 'Next Amazon'}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline></CssBaseline>
        <MyAppBar position="static">
          <Toolbar>
            <NextLink href="/" passHref>
              <Link>
                <Typography>amazona</Typography>
              </Link>
            </NextLink>
            <div className={styles.link_grow}></div>
            <div className={styles.card_login}>
              <Switch
                checked={darkMode}
                onChange={() => darkModeChangeHandler()}
              ></Switch>
              <NextLink href="/card" passHref>
                <Link>Cart</Link>
              </NextLink>
              <NextLink href="/login" passHref>
                <Link>Login</Link>
              </NextLink>
            </div>
          </Toolbar>
        </MyAppBar>
        <MyContainer>{children}</MyContainer>
        <MyFooter>
          <Typography>All Rights Reserved Next Shopping WebSite</Typography>
        </MyFooter>
      </ThemeProvider>
    </div>
  );
};

export default Layout;
