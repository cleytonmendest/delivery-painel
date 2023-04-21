"use client"
import { api } from '@/libs/api'
import { Box, Button, TextField, Typography, Alert } from '@mui/material'
import React, { FormEvent, useState } from 'react'

const Page = () => {
    const [error, setError] = useState('');
    const [info, setInfo] = useState('');
    const [loading, setLoading] = useState(false);
    const [passwordField, setPasswordField] = useState('')
    const [passwordFieldConfi, setPasswordFieldConfi] = useState('')

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!passwordField || !passwordFieldConfi) return setError('Preencha a senha')

        if(passwordField !== passwordFieldConfi) return setError('As senhas não são iguais')
        

        setError('')
        setInfo('')
        setLoading(true)

        const result = await api.redefinePassword(passwordField, '123')
        setLoading(false)

        if (result.error) {
            setError(result.error)
        }else{
            setInfo('Nova senha cadastrada!')
            setPasswordField('')
            setPasswordFieldConfi('')
        }
    }

    return (
        <>
            <Typography
                component='p'
                sx={{ textAlign: 'center', mt: 2, color: '#555' }}
            >
                Olá **USUARIO** defina sua nova senha abaixo
            </Typography>
            <Box
                component='form'
                sx={{ mt: 3 }}
                onSubmit={handleSubmit}
            >
                <TextField
                    label="Digite sua nova senha"
                    name='password'
                    type='password'
                    fullWidth
                    autoFocus
                    sx={{ mb: 2 }}
                    onChange={(e) => setPasswordField(e.target.value)}
                    value={passwordField}
                    disabled={loading}
                />
                <TextField
                    label="Confirme sua nova senha"
                    name='password2'
                    type='password'
                    fullWidth
                    sx={{ mb: 2 }}
                    onChange={(e) => setPasswordFieldConfi(e.target.value)}
                    value={passwordFieldConfi}
                    disabled={loading}
                />
                <Button
                    type='submit'
                    variant='contained'
                    fullWidth
                    disabled={loading}
                >
                    {loading ? 'Carregando...' : 'Definir nova senha'}
                </Button>

                {error &&
                    <Alert
                        variant='filled'
                        severity='error'
                        sx={{ mt: 3 }}
                    >{error}</Alert>
                }
                {info &&
                    <Alert
                        variant='filled'
                        severity='success'
                        sx={{ mt: 3 }}
                    >{info}</Alert>
                }
            </Box>
        </>
    )
}

export default Page