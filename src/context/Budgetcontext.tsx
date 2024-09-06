import { createContext, Dispatch, useMemo, useReducer } from "react";
import {
  BudgetActions,
  budgetReducer,
  BudgetState,
  initialState,
} from "../reducers/budget-reducer";

type BudgetContextProps = {
  state: BudgetState;
  dispatch: Dispatch<BudgetActions>;
  totalExpenses: number;
  remainBudget: number;
  isEmpty : boolean
};

type BudgeProviderProps = {
  children: React.ReactNode;
};

export const BudgetContext = createContext<BudgetContextProps>(
  {} as BudgetContextProps
);

export const BudgeProvider = ({ children }: BudgeProviderProps) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  const totalExpenses = useMemo(
    () => state.expenses.reduce((total, expense) => total + expense.amount, 0),
    [state.expenses]
  );

  const remainBudget = state.budget - totalExpenses;
  const isEmpty = useMemo(()=> state.expenses.length === 0,[state.expenses])

  return (
    <BudgetContext.Provider value={{ state, dispatch, totalExpenses , remainBudget ,isEmpty}}>
      {children}
    </BudgetContext.Provider>
  );
};
