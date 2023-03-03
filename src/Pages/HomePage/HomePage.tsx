import React, { useState } from 'react';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { ProductList } from '../../components/productList/ProductList';
import { Products } from '../../types/Products';

type Props = {
  bagList: Products[];
  setBagList: (args: Products[], arg: Products) => void;
  productCount: number;
}

export const HomePage: React.FC<Props> = ({
  bagList, 
  setBagList,
  productCount, 
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Products[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [sortValue, setSortValue] = useState('');
  return (
    <>
      <Header
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setSortValue={setSortValue}
      />
      <ProductList
        products={products}
        setProducts={setProducts}
        loading={loading}
        setLoading={setLoading}
        searchValue={searchValue}
        sortValue={sortValue}
        setSortValue={setSortValue}
        bagList={bagList}
        setBagList={setBagList}
        productCount={productCount}
      />
      <Footer />
    </>
  );
};
