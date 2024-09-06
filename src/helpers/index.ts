export const formatCurrency = (currency : number) =>{
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(currency)
}


export const formatDate = (date : Date) =>{
  return new Intl.DateTimeFormat('es-PE',{
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}


export const sortFormatDate = (date : Date) =>{
  return new Intl.DateTimeFormat('es-PE').format(date)
}