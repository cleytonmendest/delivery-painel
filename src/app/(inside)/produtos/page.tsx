"use client"
import React, { FormEvent, useEffect, useState } from 'react'
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, InputAdornment, Skeleton, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Refresh, Search } from '@mui/icons-material';
import { Order } from '@/types/Order';
import { api } from '@/libs/api';
import OrderItem from '@/components/OrderItem';
import { OrderStatus } from '@/types/OrderStatus';
import { dateFormat } from '@/libs/dateFormat';
import { Product } from '@/types/Product';
import { Category } from '@/types/Category';
import ProductTableSkeleton from '@/components/ProductTableSkeleton';
import ProductTableItem from '@/components/ProductTableItem';
import ProductEditDialog from '@/components/ProductEditDialog';

const Page = () => {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [categorys, setCategorys] = useState<Category[]>([])

  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [productToDelete, setProductToDelete] = useState<Product>()
  const [loadingDelete, setLoadingDelete] = useState(false)

  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [productoEdit, setProductToEdit] = useState<Product>()
  const [loadingEditDialog, setLoadingEditDialog] = useState(false)

  useEffect(() => {
    getProducts()
  }, [])


  const getProducts = async () => {
    setLoading(true)
    setProducts(await api.getProducts())
    setCategorys(await api.getCategories())
    setLoading(false)
  }

  //Delete Product
  const handleDeleteProduct = (product: Product) => {
    setShowDeleteDialog(true)
    setProductToDelete(product)
  }

  const handleConfirmDelete = async () => {
    if (productToDelete) {
      setLoadingDelete(true)
      await api.deleteProduct(productToDelete.id)
      setLoadingDelete(false)
      setShowDeleteDialog(false)
      getProducts()

    }
  }

  // New/edit product

  const handleNewProduct = () => {
    setProductToEdit(undefined)
    setEditDialogOpen(true)
  }

  const handleEditProduct = (product: Product) => {
    setProductToEdit(product)
    setEditDialogOpen(true)
  }

  const handleSaveEditDialog = async (event: FormEvent<HTMLFormElement>) => {
    let form = new FormData(event.currentTarget)

    setLoadingEditDialog(true)
    if(productoEdit){
      form.append('id', productoEdit.id.toString())
      await api.updateProduct(form)
    }else{
      await api.createProduct(form)
    }
    setLoadingEditDialog(false)
    setEditDialogOpen(false)

    getProducts()
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
              <TableCell sx={{ width: 50, display: { xs: 'none', md: 'table-cell' } }}>ID:</TableCell>
              <TableCell>Imagem:</TableCell>
              <TableCell>Nome:</TableCell>
              <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>Preço:</TableCell>
              <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>Categoria:</TableCell>
              <TableCell sx={{ width: { xs: 50, md: 130 } }}>Ações:</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading &&
              <>
                <ProductTableSkeleton />
                <ProductTableSkeleton />
                <ProductTableSkeleton />
                <ProductTableSkeleton />
              </>
            }
            {!loading && products?.map((item) => (
              <ProductTableItem
                key={item.id}
                item={item}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
              />
            ))}
          </TableBody>
        </Table>
        <Dialog open={showDeleteDialog} onClose={() => !loadingDelete ? setShowDeleteDialog(false) : null}>
          <DialogTitle>Tem certeza que deseja deletar este produto?</DialogTitle>
          <DialogContent>
            <DialogContentText>Esta ação é irreversível</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button disabled={loadingDelete} onClick={() => setShowDeleteDialog(false)}>Não</Button>
            <Button disabled={loadingDelete} onClick={handleConfirmDelete}>Sim</Button>
          </DialogActions>
        </Dialog>
        <ProductEditDialog
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          onSave={handleSaveEditDialog}
          disabled={loadingEditDialog}
          product={productoEdit}
          categories={categorys}
        />
      </Box>
    </>
  )
}

export default Page