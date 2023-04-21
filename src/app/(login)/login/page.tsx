"use client"
import { api } from '@/libs/api'
import { Box, Button, TextField, Typography, Link as MuiLink, Alert } from '@mui/material'
import Link from 'next/link'
import React, { FormEvent, useState } from 'react'

const Page = () => {
  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!emailField || !passwordField) return setError('Preencha e-mail e senha')

    setError('')
    setLoading(true)

    const result = await api.login(emailField, passwordField)
    setLoading(false)

    if(result.error){
      setError(result.error)
    }
  }

  return (
    <>
      <Typography
        component='p'
        sx={{ textAlign: 'center', mt: 2, color: '#555' }}
      >
        Digite seus dados para acessar o painel administrativo do estabelecimento
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
        <TextField
          label="Digite sua senha"
          name='password'
          type='password'
          fullWidth
          sx={{ mb: 2 }}
          onChange={(e) => setPasswordField(e.target.value)}
          value={passwordField}
          disabled={loading}
        />
        <Button
          type='submit'
          variant='contained'
          fullWidth
          disabled={loading}
        >
          {loading ? 'Carregando...' : 'Entrar'}
        </Button>

        {error &&
          <Alert
            variant='filled'
            severity='error'
            sx={{ mt: 3 }}
          >{error}</Alert>
        }


        <Box sx={{ mt: 3 }}>
          <MuiLink
            href='/login/forgot'
            variant='body2'
            component={Link}
          >
            Esqueceu sua senha?
          </MuiLink>
        </Box>
      </Box>
    </>
  )
}

export default Page