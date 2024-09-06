import { useContext } from "react";
import { BudgetContext } from "../context/Budgetcontext";

export const useBudget = () => {
  const contexto = useContext(BudgetContext);
  if(!contexto) throw new Error("useBudget must be used within a BudgetProvider");
  return contexto

}