export interface Category {
  id: string;
  name: string;
  icon: string;
}


export interface Expense {
  id: string;
  name: string;
  amount: number;
  category: string;
  date: Date | null ;
}

export type DraftExpense = Omit<Expense, "id">