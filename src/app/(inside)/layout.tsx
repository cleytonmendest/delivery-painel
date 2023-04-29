"use client"
import React from "react"
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Container } from "@mui/material";
import Header from "@/components/Header";

type Props = {
    children: React.ReactNode
}

const layout = ({children}: Props) =>{
    return (
        <html lang="pt-br">
            <body style={{margin: 0}}>
                <Header/>
                <Container component='section' maxWidth='lg'>
                    {children}
                </Container>
            </body>
        </html>
    )
}

export default layout