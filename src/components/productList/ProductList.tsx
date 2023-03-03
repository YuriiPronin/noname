import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Box,
  FormControl,
} from '@mui/material';
import React, { useEffect } from 'react';
import { Products } from '../../types/Products';
import './ProductList.scss';
import { SortValues } from '../../types/SortValues';
import { getAllProducts } from '../../API/API';
import { Loader } from '../Loader/Loader';

type Props = {
  products: Products[];
  setProducts: (value: Products[]) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  searchValue: string;
  sortValue: string;
  setSortValue: (value: string) => void;
  bagList: Products[];
  setBagList: (args: Products[], arg: Products) => void;
  productCount: number;
};

export const ProductList: React.FC<Props> = ({
  products,
  setProducts,
  loading,
  setLoading,
  searchValue,
  sortValue,
  setSortValue,
  bagList,
  setBagList,
  productCount,
}) => {
  async function setAllProducts() {
    try {
      const allProducts = await getAllProducts();
      setProducts(allProducts);
    } catch (error) {
      throw new Error('error');
    }
  }

  useEffect(() => {
    setAllProducts();
    setLoading(false);
  }, []);

  let filteredProducts;

  switch (sortValue) {
  case SortValues.SMALL:
    filteredProducts = products.sort((a, b) => a.price - b.price);
    break;

  case SortValues.BIG:
    filteredProducts = products.sort((a, b) => b.price - a.price);
    break;

  case SortValues.POPULAR:
    filteredProducts = products.sort((a, b) => b.rating.rate - a.rating.rate);
    break;

  default:
    filteredProducts = products.filter(
      (product) =>
        product.title
          .toLowerCase()
          .includes(searchValue.toLowerCase().trim()) ||
        product.description
          .toLowerCase()
          .includes(searchValue.toLowerCase().trim()),
    );
    break;
  }

  const onAdd = (product: Products) => {
    const bagProduct = {
      id: product.id,
      title: product.title,
      price: product.price,
      category: product.category,
      description: product.description,
      image: product.image,
      count: productCount,
      rating: {
        count: product.rating.count,
        rate: product.rating.rate,
      },
    };

    setBagList(bagList, bagProduct);
  };

  return (
    <>
      <Box className="box">
        <FormControl className="form">
          <InputLabel id="demo-simple-select-label">Sort</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Sort"
            value={sortValue}
            onChange={(event) => {
              const { value } = event.target;
              setSortValue(value);
            }}
          >
            <MenuItem value={SortValues.SMALL}>Від дешевих до дорогих</MenuItem>
            <MenuItem value={SortValues.BIG}>Від дорогих до дешевих</MenuItem>
            <MenuItem value={SortValues.POPULAR}>По популярності</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <div className="renderCards">
        {loading ? (
          <Loader />
        ) : (
          filteredProducts.map((product) => (
            <Card className="card" key={product.id} sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt="green iguana"
                height="250"
                image={product.image}
              />
              <CardContent>
                <Typography
                  className="cardTitle"
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  {product.title.slice(0, 35)}
                </Typography>
                <Typography
                  className="cardPrice"
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  {`Price: ${product.price}$`}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  className="cardButton"
                  size="small"
                  onClick={() => onAdd(product)}
                >
                  Add to bag
                </Button>
              </CardActions>
            </Card>
          ))
        )}
      </div>
    </>
  );
};
