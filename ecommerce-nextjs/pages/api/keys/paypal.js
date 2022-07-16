import nc from 'next-connect';
import { isAuth } from '../../../utils/auth';

// using next-connect instead of express. because it is 5 times faster than express
const handler = nc({});
handler.use(isAuth);
handler.get(async (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

export default handler;
