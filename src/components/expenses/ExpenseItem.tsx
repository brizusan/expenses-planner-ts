import { useMemo } from "react";
import { formatDate } from "../../helpers";
import type { Expense } from "../../types";
import { categories } from "../../data";
import { AmountDisplay } from "../amount/AmountDisplay";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";

import "react-swipeable-list/dist/styles.css";
import { useBudget } from "../../hooks/useBudge";

type ExpenseItemProp = {
  expense: Expense;
};


export const ExpenseItem = ({ expense }: ExpenseItemProp) => {

  const {dispatch} = useBudget();

  const categoryIcon = useMemo(
    () => categories.filter((cat) => cat.id === expense.category)[0],
    [expense.category]
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        destructive={true}
        onClick={() => dispatch({type: "delete-expense", payload: {id: expense.id}})}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={()=>dispatch({type:"edit-expense", payload: {expense: expense.id}})}>
        Editar
      </SwipeAction>
    </LeadingActions>
  );
  

  return (
    <SwipeableList>
      <SwipeableListItem
        maxSwipe={30}
        trailingActions={trailingActions()}
        leadingActions={leadingActions()}

      >
        <div className="w-full flex items-center bg-white rounded-md shadow-md p-8  relative">
          <div className="flex-1  flex items-center gap-4 md:gap-12">
            <img
              className="w-20 h-20 md:w-26 md:h-26"
              src={`/icono_${categoryIcon.icon}.svg`}
              alt={`imagen de categoria - ${categoryIcon.name}`}
            />
            <div className="space-y-2">
              <p className="text-xl md:text-3xl font-bold  uppercase text-slate-600">
                {categoryIcon.name}
              </p>
              <p className="text-xl font-bold  capitalize text-slate-700">
                {expense.name}
              </p>
              <p className="text-slate-400 font-semibold">
                {formatDate(new Date(expense.date!))}
              </p>
            </div>
          </div>
          <div>
            <AmountDisplay amount={expense.amount} />
          </div>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};
