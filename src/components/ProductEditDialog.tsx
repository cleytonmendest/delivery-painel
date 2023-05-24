import { Category } from '@/types/Category'
import { Product } from '@/types/Product'
import { Box, Button, Dialog, DialogContent, DialogTitle, Input, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { FormEvent } from 'react'

type Props = {
    open: boolean
    onClose: () => void
    onSave: (event: FormEvent<HTMLFormElement>) => void
    categories: Category[]
    product?: Product
    disabled?: boolean
}

const ProductEditDialog = ({ open, onClose, onSave, categories, product, disabled }: Props) => {

    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        onSave(event)
    }
    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>{product ? 'Editar Produto' : 'Novo Produto'}</DialogTitle>
            <DialogContent>
                <Box component='form' encType='multipart/form-data' onSubmit={handleFormSubmit}>
                    <Box sx={{ mb: 2 }}>
                        <InputLabel htmlFor="imgField" variant='standard'>
                            Imagem:
                        </InputLabel>
                        <Input
                            id='imgField'
                            name='image'
                            type='file'
                            fullWidth
                            disabled={disabled}
                            inputProps={{ accept: 'image/*' }}
                        />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <InputLabel htmlFor="nameField" variant='standard'>
                            Nome:
                        </InputLabel>
                        <TextField
                            id='nameField'
                            variant='standard'
                            name='name'
                            defaultValue={product?.name}
                            fullWidth
                            disabled={disabled}
                            required
                        />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <InputLabel htmlFor="priceField" variant='standard'>
                            Preço (em R$):
                        </InputLabel>
                        <TextField
                            id='priceField'
                            variant='standard'
                            name='price'
                            defaultValue={product?.price}
                            fullWidth
                            disabled={disabled}
                            required
                        />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <InputLabel htmlFor="descField" variant='standard'>
                            Descrição:
                        </InputLabel>
                        <TextField
                            id='descField'
                            variant='standard'
                            name='description'
                            defaultValue={product?.description}
                            multiline
                            rows={4}
                            fullWidth
                            required
                            disabled={disabled}
                        />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <InputLabel htmlFor="catField" variant='standard'>
                            Categoria
                        </InputLabel>
                        <Select
                            id='catField'
                            variant='standard'
                            name='category'
                            defaultValue={product?.category.id || categories[0]?.id}
                            required
                            fullWidth
                            disabled={disabled}
                        >
                            {categories.map(item => (
                                <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                            ))}
                        </Select>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={onClose} disabled={disabled}>Cancelar</Button>
                        <Button disabled={disabled} type='submit'>Salvar</Button>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default ProductEditDialog