"use client"
import React, { useEffect, useState } from 'react'
import { Box, Button, CircularProgress, Grid, InputAdornment, Skeleton, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Refresh, Search } from '@mui/icons-material';
import { Order } from '@/types/Order';
import { api } from '@/libs/api';
import OrderItem from '@/components/OrderItem';
import { OrderStatus } from '@/types/OrderStatus';
import { dateFormat } from '@/libs/dateFormat';

const Page = () => {
  const [loading, setLoading] = useState(false)


  const handleNewProduct = () =>{

  }
  return (
    <>
      <Box sx={{ my: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant='h5' component='h5' sx={{ color: '#555', mr: 2 }}>Produtos</Typography>
          <Button onClick={handleNewProduct}>Novo Produto</Button>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{width: 50, display:{xs: 'none', md: 'table-cell'}}}>ID:</TableCell>
              <TableCell>Imagem:</TableCell>
              <TableCell>Nome:</TableCell>
              <TableCell sx={{display:{xs: 'none', md: 'table-cell'}}}>Preço:</TableCell>
              <TableCell sx={{display:{xs: 'none', md: 'table-cell'}}}>Categoria:</TableCell>
              <TableCell sx={{xs: 50, md: 130}}>Ações:</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

          </TableBody>
        </Table>

      </Box>
    </>
  )
}

export default Page