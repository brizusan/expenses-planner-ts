import { useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import { es } from "date-fns/locale/es";
registerLocale("es", es);
import type { DraftExpense } from "../../types";
import { categories as categorias } from "../../data";
import { useBudget } from "../../hooks/useBudge";
import { Alerta } from "../alert/Alerta";
import {  sortFormatDate } from "../../helpers";

export const FormModal = () => {
  const { state, dispatch , remainBudget } = useBudget();
  const [expense, setExpense] = useState<DraftExpense>({
    name: "",
    amount: 0,
    category: "",
    date: new Date(),
  });
  const [alert, setAlert] = useState("");
  const [prevAmount , setPrevAmount] = useState(0)

  useEffect(() => {
    if (state.editId) {
      const expense = state.expenses.filter(
        (expense) => expense.id === state.editId
      )[0];
      setExpense(expense!);
      setPrevAmount(expense!.amount)
    }
  }, [state.editId]);

  const isEdit = useMemo(() => state.editId && true, [state.editId]);

  const handleChangeDate = (e: Date | null) => {
    setExpense({ ...expense, date: e });
  };

  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const isNumberField = ["amount"].includes(e.target.name);
    setExpense({
      ...expense,
      [e.target.name]: isNumberField
        ? parseInt(e.target.value)
        : e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, amount, category, date } = expense;
    if (!name || !amount || !category)
      return setAlert("Rellena todos los campos");

    if( (expense.amount - prevAmount) > remainBudget ){
      return setAlert("Monto ingresado excede el presupuesto restante");
    }

    if (isEdit) {
      dispatch({
        type: "update-expense",
        payload: { expense: { ...expense, id: state.editId } },
      });
    } else {
      const newExpense = {
        id: crypto.randomUUID(),
        name,
        amount,
        category,
        date,
      };

      dispatch({ type: "add-expense", payload: { expense: newExpense } });
    }

    setExpense({
      name: "",
      amount: 0,
      category: "",
      date: new Date(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-3 mx-auto">
      <legend className="text-center text-2xl font-bold text-indigo-700 underline underline-offset-4 ">
        {isEdit ? "Actualizar Gasto" : "Nuevo Gasto"}
      </legend>
      {alert && <Alerta>{alert}</Alerta>}
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-slate-800 text-lg font-semibold">
          Nombre del Gasto :{" "}
        </label>
        <input
          id="name"
          name="name"
          className="border p-2 px-6 rounded-md"
          type="text"
          placeholder="Añade el nombre del gasto..."
          onChange={handleChangeInput}
          value={expense?.name}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label
          htmlFor="cantidad"
          className="text-slate-800 text-lg font-semibold"
        >
          Cantidad o Monto :{" "}
        </label>
        <input
          id="cantidad"
          name="amount"
          className="border p-2 rounded-md px-6"
          type="number"
          placeholder="Añade la cantidad o monto del gasto..."
          onChange={handleChangeInput}
          value={expense?.amount}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label
          htmlFor="categoria"
          className="text-slate-800 text-lg font-semibold"
        >
          Categoria del Gasto :{" "}
        </label>
        <select
          id="categoria"
          className="border p-2 rounded-md text-center font-semibold"
          name="category"
          onChange={handleChangeInput}
          value={expense?.category}
        >
          <option value=""> --- Seleccione --- </option>
          {categorias.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-4">
        <label htmlFor="fecha" className="text-slate-800 text-lg font-semibold">
          Fecha del Gasto :{" "}
        </label>
        <DatePicker
          className="border p-2 text-center rounded-md font-semibold outline-none"
          id="fecha"
          locale="es"
          selected={expense.date as Date}
          onChange={handleChangeDate}
          value={sortFormatDate(new Date(expense.date!))}
        />
      </div>
      <div>
        <input
          type="submit"
          value={isEdit ? "Editar Gasto" : "Añadir Gasto"}
          className="border p-2 rounded-md bg-indigo-600 hover:bg-indigo-700 transition-colors w-full text-white uppercase font-semibold cursor-pointer"
        />
      </div>
    </form>
  );
};
