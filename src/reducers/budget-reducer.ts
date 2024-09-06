import type { Category, Expense } from "../types";

export type BudgetActions =
  | { type: "add-budget"; payload: { budget: number } }
  | { type: "show-modal" }
  | { type: "hide-modal" }
  | { type: "add-expense"; payload: { expense: Expense } }
  | { type: "edit-expense"; payload: { expense: Expense["id"] } }
  | { type: "update-expense"; payload: { expense: Expense } }
  | { type: "delete-expense"; payload: { id: Expense["id"] } }
  | { type: "filter-expense-by-category"; payload: { category: Category["id"] } }
  | { type: "reset-app"};

export type BudgetState = {
  budget: number;
  modal: boolean;
  expenses: Expense[];
  editId : Expense["id"];
  categoryId : Expense["category"];
};


const storageBudget = ()=>{
  const budgetLS = localStorage.getItem("budget");
  return budgetLS ? parseInt(budgetLS) : 0
}

const storageExpenses = ()=>{
  const expensesLS = localStorage.getItem("expenses");
  return expensesLS ? JSON.parse(expensesLS) : []
}



export const initialState: BudgetState = {
  budget: storageBudget(),
  modal: false,
  expenses:storageExpenses(),
  editId:"",
  categoryId:""
};

export const budgetReducer = (state: BudgetState, action: BudgetActions) => {
  if (action.type === "add-budget") {
    return {
      ...state,
      budget: action.payload.budget,
    };
  }

  if (action.type === "show-modal") {
    return {
      ...state,
      modal: true,
    };
  }

  if (action.type === "hide-modal") {
    return {
      ...state,
      modal: false,
    };
  }

  if (action.type === "add-expense") {
    return {
      ...state,
      expenses: [...state.expenses, action.payload.expense],
      modal: false,
    };
  }

  if (action.type === "delete-expense") {
    return {
      ...state,
      expenses: state.expenses.filter(
        (expense) => expense.id !== action.payload.id
      ),
    };
  }

  if(action.type === "edit-expense"){
    return {
      ...state,
      modal:true,
      editId: action.payload.expense
    }
  }


  if(action.type === "update-expense"){
    return {
      ...state,
      modal:false,
      editId: "",
      expenses: state.expenses.map((expense)=>{
        if(expense.id === action.payload.expense.id){
          return action.payload.expense
        }
        return expense
      })
      
    }
  }

  if(action.type === "reset-app"){
    return {
      ...state,
      budget: 0,
      expenses: [],
      editId:""
    }
  }


  if(action.type === "filter-expense-by-category"){
    return {
      ...state,
      categoryId: action.payload.category
    }
 
  }

  return state;
};
