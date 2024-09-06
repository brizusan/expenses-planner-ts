import { useEffect, useMemo } from "react";
import { Expenses, Header, Modal ,ExpenseFilter } from "./components";
import { useBudget } from "./hooks/useBudge";

function App() {
  const { state } = useBudget();

  const isValidBudget = useMemo(() => {
    return state.budget > 0;
  }, [state.budget]);

  useEffect(() => {
    localStorage.setItem("budget", state.budget.toString());
    localStorage.setItem("expenses", JSON.stringify(state.expenses));
  }, [state.budget, state.expenses]);

  return (
    <>
      <Header />

      {isValidBudget && (
        <>
          <ExpenseFilter />
          <Expenses />
          <Modal />
        </>
      )}
    </>
  );
}

export default App;
