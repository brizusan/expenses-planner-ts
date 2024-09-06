import { useMemo } from "react";
import { useBudget } from "../hooks/useBudge";
import { BudgetForm } from "./budget/BudgetForm";
import { BudgeTrack } from "./budget/BudgeTrack";

export const Header = () => {
  const { state } = useBudget();

  const isValidBudget = useMemo(() => {
    return state.budget > 0;
  }, [state.budget]);


  return (
    <header>
      <div className="mx-auto  bg-indigo-500 py-8">
        <h1 className="text-center  text-3xl md:text-4xl font-bold text-white uppercase tracking-wider">
          Planificador de gastos
        </h1>
      </div>

      {isValidBudget ? <BudgeTrack /> : <BudgetForm />}
    </header>
  );
};
