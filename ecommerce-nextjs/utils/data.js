import bcrypt from 'bcryptjs';

let salt = bcrypt.genSaltSync(5);
const data = {
  users: [
    {
      name: 'khashayar',
      email: 'khashi@gmail.com',
      password: bcrypt.hashSync('1234', salt),
      isAdmin: true,
    },
    {
      name: 'ardeshir',
      email: 'ardi@gmail.com',
      password: bcrypt.hashSync('1234', salt),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: 'Free Shoe',
      slug: 'free-shoe',
      category: 'Shoe',
      image: '/images/shoe1.jpg',
      price: 119,
      brand: 'Puma',
      rating: 4,
      numReviews: 10,
      countInStock: 40,
      description: 'A beautiful shoe',
    },
    {
      name: 'Amazing Shoe',
      slug: 'amazing-shoe',
      category: 'Shoe',
      image: '/images/shoe2.jpg',
      price: 130,
      brand: 'Nike',
      rating: 4,
      numReviews: 10,
      countInStock: 40,
      description: 'very comfortable',
    },
    {
      name: 'Fantastic Shoe',
      slug: 'fantastic-shoe',
      category: 'Shoe',
      image: '/images/shoe3.jpg',
      price: 120,
      brand: 'Addidas',
      rating: 4,
      numReviews: 10,
      countInStock: 40,
      description: 'Very light',
    },
    {
      name: 'Working Shoe',
      slug: 'working-shoe',
      category: 'Shoe',
      image: '/images/shoe4.jpg',
      price: 80,
      brand: 'Puma',
      rating: 4,
      numReviews: 10,
      countInStock: 40,
      description: 'Incredibly resononable',
    },
    {
      name: 'Walking Shoe',
      slug: 'walking-shoe',
      category: 'Shoe',
      image: '/images/shoe5.jpg',
      price: 159,
      brand: 'Puma',
      rating: 4,
      numReviews: 10,
      countInStock: 40,
      description: 'A great shoe',
    },
  ],
};

export default data;
