export const api = {
    login: async(email: string, password: string): Promise<{error: string, token?: string}> => {
        return new Promise( resolve => {
            setTimeout(()=>{
                if(email !== 'teste@email.com' ){
                    resolve({
                        error: 'E-mail e/ou senha inválidos'
                    })
                } else {
                    resolve({
                        error: '',
                        token: '123'
                    })
                }
            }, 1000)
        })
    }
}