export const dateFormat = (date:string | Date) =>{
    const formatter = new Intl.DateTimeFormat(
        'pt-BR',
        {dateStyle: 'short', timeStyle: 'short'}
    )
    return formatter.format(date instanceof Date ? date : new Date(date))
}