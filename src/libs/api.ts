import { OrderStatus } from '@/types/OrderStatus'
import { Order } from '../types/Order'
import { Product } from '@/types/Product'

const tmpProduct: Product = {
    id: 999,
    image: 'https://saopaulosecreto.com/wp-content/uploads/2022/10/Get-Burger-1024x683.jpg',
    category: {
        id: 99,
        name: 'buergue'
    },
    name: 'Burguer loko',
    price: 35.2,
    description: 'Um burger boladão simbpols'
}

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
    },
    forgotPassword: async (email:string): Promise<{error: string}> => {
        return new Promise(resolve =>{
            setTimeout(() =>{
                resolve({
                    error: ''
                })
            },1000)
        })
    },
    redefinePassword: async (password: string, token: string): Promise<{error: string}> =>{
        return new Promise(resolve =>{
            setTimeout(() =>{
                resolve({
                    error: ''
                })
            },1000)
        })
    },
    getOrders: async(): Promise<Order[]> => {
        return new Promise(resolve =>{
            setTimeout(() =>{
                const orders:Order[] = []
                const statuses: OrderStatus[] = ['preparing', 'delivered', 'sent']

                for(let i=0; i<6;i++){
                    orders.push({
                        id: parseInt('12' + i),
                        status: statuses[Math.floor(Math.random() * 3)],
                        orderDate: '2023-01-03 18:30',
                        userId: '1',
                        userName: 'Pedro',
                        shippingAddress: {
                            id:9,
                            cep: '99999999',
                            address: 'Rua shimbalis',
                            number: '56',
                            neighborhood: 'Jambimba',
                            city: 'Jalill',
                            state: 'Impialimba',
                            complement: 'talarico'
                        },
                        shippingPrice: 12,
                        paymentType: 'card',
                        changeValue: 0,
                        cupom: "BLA",
                        cupomDiscount: 2,
                        products: [
                            {qt: 2, product: tmpProduct},
                            {qt: 3, product: {...tmpProduct, id: 888, name: 'Timbaliabim'}}
                        ],
                        subtotal: 99,
                        total: 120
                    })
                }

                resolve(orders)
            },1000)
        })
    },
    changeOrderStatus: async (id: number, newStatus: OrderStatus) =>{
        return true
    }
}