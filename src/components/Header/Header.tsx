import React from 'react';
import './Header.scss';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';

type Props = {
  searchValue: string;
  setSearchValue: (value: string) => void;
  setSortValue: (value: string) => void;
}

export const Header: React.FC<Props> = ({
  searchValue, 
  setSearchValue,
  setSortValue
}) => {
  return (
    <Box id="box" sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            MobShop
          </Typography>
          <TextField 
            label="Search" 
            size='small'
            value={searchValue}
            onChange={event => {
              const { value } = event.target;
              setSortValue('');
              setSearchValue(value);
            }}
          />
          <Link id='link' to='/account'>
            {'My account'}
          </Link>
          <Link id='link' to='/bag'>
            {'Bag'}
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
