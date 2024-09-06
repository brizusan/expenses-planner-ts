import { useBudget } from "../../hooks/useBudge";
import { ExpenseItem } from "./ExpenseItem";

export const ExpensesList = () => {
  const { state, isEmpty } = useBudget();

  const filterExpenses = state.categoryId
    ? state.expenses.filter((expense) => expense.category === state.categoryId)
    : state.expenses;


  if (filterExpenses.length === 0)
    return (
      <h2 className="text-center text-lg font-bold text-red-400">
        No hay Gastos Registrados para esta categoria
      </h2>
    );

  return (
    <>
      {!isEmpty &&
        filterExpenses.map((expense) => (
          <ExpenseItem key={expense.id} expense={expense} />
        ))}
    </>
  );
};
