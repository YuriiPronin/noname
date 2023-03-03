import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AccountPage } from './Pages/AccountPage/AccountPage';
import { Bag } from './Pages/Bag/Bag';
import { HomePage } from './Pages/HomePage/HomePage';
import { PageNotFound } from './Pages/PageNotFound/PageNotFound';
import { Products } from './types/Products';

function App() {
  const [productCount, setProductCount] = useState(1);
  const [bagList, setBagList] = useState<Products[]>([]);
  const setInBag = (args: Products[], arg: Products) => {
    setBagList([...args, arg]);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            bagList={bagList}
            setBagList={setInBag}
            productCount={productCount}
          />
        }
      />
      <Route
        path="/bag"
        element={
          <Bag
            bagList={bagList}
            setBagList={setBagList}
            setProductCount={setProductCount}
          />
        }
      />
      <Route path='/account' element={<AccountPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
