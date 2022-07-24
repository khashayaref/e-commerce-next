import {
  Button,
  Card,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import { getError } from '../utils/error';
import { Store } from '../utils/Store';
import styles from './profile.module.css';
import NextLink from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import Cookies from 'js-cookie';

const Profile = () => {
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [isSSR, setIsSSR] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setIsSSR(false);
  }, []);
  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
      return;
    }
    setValue('name', userInfo.name);
    setValue('email', userInfo.email);
  }, []);

  const submitHandler = async ({ name, email, password, confirmPassword }) => {
    closeSnackbar();
    if (password !== confirmPassword) {
      enqueueSnackbar('password does not match', { variant: 'error' });
      return;
    }
    try {
      const { data } = await axios.put(
        '/api/users/profile',
        {
          email,
          password,
          name,
        },
        { headers: { authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({ type: 'USER_LOGIN', payload: data });
      Cookies.set('userInfo', JSON.stringify(data));
      enqueueSnackbar('Profile Updated Successfully', { variant: 'success' });
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };
  return (
    !isSSR && (
      <Layout title="Profile">
        <Grid container spacing={1}>
          <Grid item md={3} xs={12}>
            <Card className={styles.section}>
              <List>
                <NextLink href="/profile" passHref>
                  <ListItemButton selected component="a">
                    <ListItemText primary="User Profile"></ListItemText>
                  </ListItemButton>
                </NextLink>
                <NextLink href="/order-history" passHref>
                  <ListItemButton component="a">
                    <ListItemText primary="Order History"></ListItemText>
                  </ListItemButton>
                </NextLink>
              </List>
            </Card>
          </Grid>
          <Grid item md={9} xs={12}>
            <Card className={styles.section}>
              <List>
                <ListItem>
                  <Typography component="h1" variant="h1">
                    Profile
                  </Typography>
                </ListItem>
                <ListItem>
                  <form
                    onSubmit={handleSubmit(submitHandler)}
                    className={styles.form}
                  >
                    <List>
                      <ListItem>
                        <Controller
                          name="name"
                          control={control}
                          defaultValue=""
                          rules={{
                            required: true,
                            minLength: 2,
                          }}
                          render={({ field }) => (
                            <TextField
                              variant="outlined"
                              id="name"
                              fullWidth
                              label="Name"
                              type="text"
                              error={Boolean(errors.name)}
                              helperText={
                                errors.name
                                  ? errors.name.type === 'minLength'
                                    ? 'Name Must Be More Than 1'
                                    : 'Name Is Required'
                                  : ''
                              }
                              {...field}
                            ></TextField>
                          )}
                        ></Controller>
                      </ListItem>
                      <ListItem>
                        <Controller
                          name="email"
                          control={control}
                          defaultValue=""
                          rules={{
                            required: true,
                            pattern:
                              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          }}
                          render={({ field }) => (
                            <TextField
                              variant="outlined"
                              id="email"
                              fullWidth
                              label="Email"
                              type="email"
                              error={Boolean(errors.email)}
                              helperText={
                                errors.email
                                  ? errors.email.type === 'pattern'
                                    ? 'Email Is Not Valid'
                                    : 'Email Is Required'
                                  : ''
                              }
                              {...field}
                            ></TextField>
                          )}
                        ></Controller>
                      </ListItem>
                      <ListItem>
                        <Controller
                          name="password"
                          control={control}
                          defaultValue=""
                          rules={{
                            validate: (value) =>
                              value === '' ||
                              value.length > 5 ||
                              'Passwor length is more than 5',
                          }}
                          render={({ field }) => (
                            <TextField
                              variant="outlined"
                              id="password"
                              fullWidth
                              label="Password"
                              type="password"
                              error={Boolean(errors.password)}
                              helperText={
                                errors.password
                                  ? 'Password Must Be More Than 5'
                                  : ''
                              }
                              {...field}
                            ></TextField>
                          )}
                        ></Controller>
                      </ListItem>
                      <ListItem>
                        <Controller
                          name="confirmPassword"
                          control={control}
                          defaultValue=""
                          rules={{
                            validate: (value) =>
                              value === '' ||
                              value.length > 5 ||
                              'Confirm Password length is more than 5',
                          }}
                          render={({ field }) => (
                            <TextField
                              variant="outlined"
                              id="confirmPassword"
                              fullWidth
                              label="Confirm Password"
                              type="password"
                              error={Boolean(errors.confirmPassword)}
                              helperText={
                                errors.confirmPassword
                                  ? 'Confirm Password Must Be More Than 5'
                                  : ''
                              }
                              {...field}
                            ></TextField>
                          )}
                        ></Controller>
                      </ListItem>
                      <ListItem>
                        <Button
                          variant="contained"
                          type="submit"
                          fullWidth
                          color="primary"
                        >
                          Update
                        </Button>
                      </ListItem>
                    </List>
                  </form>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      </Layout>
    )
  );
};

export default Profile;
