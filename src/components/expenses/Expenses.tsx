import { useBudget } from "../../hooks/useBudge";
import { ExpensesList } from "./ExpensesList";

export const Expenses = () => {

  const { isEmpty } = useBudget();

  return (
    <main className="my-10 max-w-4xl mx-auto w-11/12 lg:w-full  ">
      <h2 className="text-center text-3xl font-bold text-slate-700">{!isEmpty ? "Gastos Registrados" : "No tenemos Gastos Registrados aún"}</h2>

      <section className="grid grid-cols-1 gap-4 pt-6">
        {
          !isEmpty && <ExpensesList />
        }
      
      </section>
    </main>
  )
}
