import Layout from '../components/layout/Layout';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import data from '../utils/data';
import NextLink from 'next/link';

export default function Home() {
  return (
    <Layout>
      <div>
        <h1>Products</h1>
        <Grid container spacing={3}>
          {data.products.map((item) => (
            <Grid item md={4} key={item.name}>
              <Card>
                <NextLink href={`/product/${item.slug}`} passHref>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={item.image}
                      title={item.name}
                      width="368"
                      height="243"
                      style={{ objectFit: 'contain' }}
                    ></CardMedia>
                    <CardContent>
                      <Typography>{item.name}</Typography>
                    </CardContent>
                  </CardActionArea>
                </NextLink>
                <CardActions>
                  <Typography>${item.price}</Typography>
                  <Button size="small" color="primary">
                    Add To Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  );
}
