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
  Badge,
  Button,
} from '@mui/material';
import { styled } from '@mui/system';
import NextLink from 'next/link';
import styles from './layout.module.css';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../../utils/Store';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

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
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { darkMode, cart, userInfo } = state;
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

  const [isSSR, setIsSSR] = useState(true);
  useEffect(() => {
    setIsSSR(false);
  }, []);

  const [open, setOpen] = useState(false);

  const logoutHandler = () => {
    setOpen(false);
    dispatch({ type: 'USER_LOGOUT' });
    Cookies.remove('userInfo');
    Cookies.remove('cartItems');
    Cookies.remove('paymentMethod');
    router.push('/');
  };

  const onClickHandler = (e, redirect) => {
    if (redirect) {
      router.push(redirect);
    }
  };
  return (
    !isSSR && (
      <div>
        <Head>
          <title>{title ? `${title} - Next Amazon` : 'Next Amazon'}</title>
          {description && (
            <meta name="description" content={description}></meta>
          )}
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline></CssBaseline>
          <MyAppBar position="static">
            <Toolbar>
              <NextLink href="/" passHref>
                <Link>
                  <Typography>Shoes Shopping</Typography>
                </Link>
              </NextLink>
              <div className={styles.link_grow}></div>
              <div className={styles.card_login}>
                <Switch
                  checked={darkMode}
                  onChange={() => darkModeChangeHandler()}
                ></Switch>
                <NextLink href="/card" passHref>
                  <Link>
                    {cart.cartItems.length > 0 ? (
                      <Badge
                        color="secondary"
                        badgeContent={cart.cartItems.length}
                      >
                        Cart
                      </Badge>
                    ) : (
                      'Cart'
                    )}
                  </Link>
                </NextLink>
                {userInfo ? (
                  <>
                    <Button
                      className={styles.navbar_button}
                      onClick={() => setOpen(!open)}
                    >
                      {userInfo.name}
                    </Button>
                    {open && (
                      <div className={styles.menu_navbar}>
                        <ul>
                          <li onClick={(e) => onClickHandler(e, '/profile')}>
                            Profile
                          </li>
                          <li
                            onClick={(e) => onClickHandler(e, '/order-history')}
                          >
                            Order History
                          </li>
                          <li onClick={logoutHandler}>Logout</li>
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <NextLink href="/login" passHref>
                    <Link>Login</Link>
                  </NextLink>
                )}
              </div>
            </Toolbar>
          </MyAppBar>
          <MyContainer>{children}</MyContainer>
          <MyFooter>
            <Typography>All Rights Reserved Next Shopping WebSite</Typography>
          </MyFooter>
        </ThemeProvider>
      </div>
    )
  );
};

export default Layout;
