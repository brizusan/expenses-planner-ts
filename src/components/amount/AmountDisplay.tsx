import {formatCurrency} from "../../helpers"
type AmountProps = {
  label?: string
  amount: number
}


export const AmountDisplay = ({label , amount} : AmountProps) => {
  return (
    <div >
      <p className="text-2xl font-bold text-indigo-600">
        {label && `${label}: `}
         <span className="font-normal text-slate-800">{formatCurrency(amount)}</span>
      </p>
    </div>
  )
}
