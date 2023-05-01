"use client"
import React, { useState } from 'react'
import { Box, Button, CircularProgress, Grid, InputAdornment, Skeleton, TextField, Typography } from "@mui/material";
import { Refresh, Search } from '@mui/icons-material';

const Page = () => {
  const [searchInput, setSearchInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSearchInput = () => {

  }

  const handleSearchKey = () => {

  }

  return (
    <Box sx={{ my: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant='h5' component='h5' sx={{ color: '#555', mr: 2 }}>Pedidos</Typography>
          {loading &&
            <CircularProgress size={24}/>
          }
          {!loading &&
            <Button size='small' sx={{ justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
              <Refresh />
              <Typography component='div' sx={{ color: '#555', display: { xs: 'none', sm: 'block' } }}>
                Atualizar
              </Typography>
            </Button>
          }

        </Box>
        <TextField
          value={searchInput}
          onChange={handleSearchInput}
          onKeyUp={handleSearchKey}
          placeholder='Pesquise um pedido'
          variant='standard'
          disabled={loading}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <Search />
              </InputAdornment>)
          }}
        />
      </Box>

      <Grid container spacing={3} columns={{xs: 1, sm: 2, md: 4}}>
        {loading &&
          <>
            <Grid item xs={1}>
              <Skeleton variant='rectangular' height={220}/>
            </Grid>
            <Grid item xs={1}>
              <Skeleton variant='rectangular' height={220}/>
            </Grid>
            <Grid item xs={1}>
              <Skeleton variant='rectangular' height={220}/>
            </Grid>
            <Grid item xs={1}>
              <Skeleton variant='rectangular' height={220}/>
            </Grid>
            <Grid item xs={1}>
              <Skeleton variant='rectangular' height={220}/>
            </Grid>
          </>
        }
      </Grid>
    </Box>
  )
}

export default Page