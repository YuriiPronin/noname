import { Box, Button, Fab, Typography } from '@mui/material';
import React, { useState } from 'react';
import './Bag.scss';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Products } from '../../types/Products';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

type Props = {
  bagList: Products[];
  setBagList: (value: Products[]) => void;
  setProductCount: (value: number) => void;
};

export const Bag: React.FC<Props> = ({
  bagList,
  setBagList,
  setProductCount,
}) => {
  const [deleteId, setDeleteId] = useState(0);

  const filteredBagList = bagList.filter((bag) => bag.id !== deleteId);

  console.log('new?', bagList);

  return (
    <>
      {filteredBagList.length === 0 ? (
        <Box>
          <Typography
            sx={{ fontSize: '45px', textAlign: 'center', color: 'blue' }}
          >
            The bag is empty
          </Typography>
        </Box>
      ) : (
        filteredBagList?.map((bag: Products) => (
          <Box key={bag.id} sx={{ mb: '10px' }}>
            <Box className="box">
              <img className="img" src={bag.image} alt="product photo" />
              <Typography sx={{ width: '30%', mr: '2%' }}>
                {bag.title}
              </Typography>
              <Typography sx={{ width: '30%', mr: '2%' }}>
                {Math.round(bag.price * bag.count)}$
              </Typography>
              <Box className="plusMinus">
                <Fab
                  color="secondary"
                  aria-label="add"
                  onClick={() => setProductCount(bag.count--)}
                >
                  <RemoveIcon />
                </Fab>
                <Typography id="counter">{bag.count}</Typography>
                <Fab
                  color="secondary"
                  aria-label="add"
                  onClick={() => setProductCount(bag.count++)}
                >
                  <AddIcon />
                </Fab>
                <Fab
                  onClick={() => {
                    setDeleteId(bag.id);
                    setBagList(filteredBagList);
                  }}
                >
                  <HighlightOffIcon sx={{ width: '2em', height: '2em' }} />
                </Fab>
              </Box>
            </Box>
          </Box>
        ))
      )}
      <Button variant="contained" color="success" sx={{ml: '2%'}}>
        Підтвердити замовлення
      </Button>
    </>
  );
};
