import {
  Button,
  Link,
  List,
  ListItem,
  TextField,
  Typography,
} from '@mui/material';
import Layout from '../components/layout/Layout';
import classes from './login.module.css';
import NextLink from 'next/link';

const Login = ({}) => {
  return (
    <Layout title="Login">
      <form className={classes.form}>
        <Typography component="h1" variant="h1">
          Login
        </Typography>
        <List>
          <ListItem>
            <TextField
              variant="outlined"
              id="email"
              fullWidth
              label="Email"
              type="email"
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              id="password"
              fullWidth
              label="Password"
              type="password"
            ></TextField>
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Login
            </Button>
          </ListItem>
          <ListItem>
            Don't have an account?&nbsp;
            <NextLink href="/register" passHref>
              <Link>Register</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
};

export default Login;
