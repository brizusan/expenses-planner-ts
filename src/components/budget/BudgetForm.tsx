import {  useMemo, useState } from "react";
import { useBudget } from "../../hooks/useBudge";

export const BudgetForm = () => {
  const [budget, setBudget] = useState(0);
  const {dispatch} = useBudget()

  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(parseInt(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({type: "add-budget", payload: {budget}})
  };

  const isValid = useMemo(() => {
    return budget > 0 && !isNaN(budget);
  }, [budget]);


  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-2 border rounded-md shadow-md p-4 max-w-xl mx-auto my-10 bg-white w-11/12 md:w-full"
    >
      <legend className="text-center text-3xl font-bold text-indigo-500">
        Definir Presupuesto
      </legend>
      <input
        type="number"
        placeholder="establecer presupuesto : 0"
        className="border w-full p-2 rounded-md px-4"
        onChange={handleChange}
      />

      <div className="flex justify-center max-w-[450px] mx-auto">
        <input
          type="submit"
          value="definir presupuesto"
          className={`bg-indigo-500 hover:bg-indigo-600 transition-colors cursor-pointer text-white
          uppercase font-bold px-4 py-2 rounded-md w-full ${isValid ? "" : "disabled:bg-indigo-100 disabled:cursor-not-allowed"}`}
          disabled={!isValid}
        />
      </div>
    </form>
  );
};
