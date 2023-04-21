"use client"
import { api } from '@/libs/api'
import { Box, Button, TextField, Typography, Alert } from '@mui/material'
import React, { FormEvent, useState } from 'react'

const Page = () => {
    const [emailField, setEmailField] = useState('');
    const [error, setError] = useState('');
    const [info, setInfo] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!emailField) return setError('Preencha o seu e-mail')

        setError('')
        setLoading(true)

        const result = await api.forgotPassword(emailField)
        setLoading(false)

        if (result.error) {
            setError(result.error)
        }else{
            setInfo('Um e-mail foi enviado para recuperação da senha, caso não receba verifique a caixa de spam')
        }
    }

    return (
        <>
            <Typography
                component='p'
                sx={{ textAlign: 'center', mt: 2, color: '#555' }}
            >
                Deseja recuperar sua senha?
            </Typography>
            <Box
                component='form'
                sx={{ mt: 3 }}
                onSubmit={handleSubmit}
            >
                <TextField
                    label="Digite seu e-mail"
                    name='email'
                    fullWidth
                    autoFocus
                    sx={{ mb: 2 }}
                    onChange={(e) => setEmailField(e.target.value)}
                    value={emailField}
                    disabled={loading}
                />
                <Button
                    type='submit'
                    variant='contained'
                    fullWidth
                    disabled={loading}
                >
                    {loading ? 'Carregando...' : 'Recuperar senha'}
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