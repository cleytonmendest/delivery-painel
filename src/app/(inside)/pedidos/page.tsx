"use client"
import React, { useEffect, useState } from 'react'
import { Box, Button, CircularProgress, Grid, InputAdornment, Skeleton, TextField, Typography } from "@mui/material";
import { Refresh, Search } from '@mui/icons-material';
import { Order } from '@/types/Order';
import { api } from '@/libs/api';
import OrderItem from '@/components/OrderItem';
import { OrderStatus } from '@/types/OrderStatus';

const Page = () => {
  const [searchInput, setSearchInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [orders, setOrders] = useState<Order[]>([])

  const getOrders = async () =>{
    setSearchInput('')
    setOrders([])

    setLoading(true)
    const orderList: Order[] = await api.getOrders()
    setOrders(orderList)
    setLoading(false)
  }

  useEffect(()=>{
    getOrders()
  },[])

  const handleSearchInput = () => {

  }

  const handleSearchKey = () => {

  }

  const handleChangeStatus = async (id: number, newStatus: OrderStatus) => {
    await api.changeOrderStatus(id, newStatus)
    getOrders()
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
            <Button onClick={getOrders} size='small' sx={{ justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
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
        {!loading && orders.map((item, index) =>(
          <Grid key={index} item xs={1}>
            <OrderItem
              item={item}
              onChangeStatus={handleChangeStatus}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Page