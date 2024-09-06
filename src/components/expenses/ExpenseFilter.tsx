import { useBudget } from "../../hooks/useBudge";
import { categories } from "../../data";

export const ExpenseFilter = () => {
  const { isEmpty , dispatch } = useBudget();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: "filter-expense-by-category", payload: { category: e.target.value } });
  };

  return (
    <>
      {!isEmpty && (
        <div className="my-10 max-w-4xl mx-auto w-11/12 lg:w-full  ">
          <form className="w-2/3 flex items-center gap-10 ">
            <label
              htmlFor="category"
              className=" text-2xl font-bold text-slate-500 "
            >
              Filtro de Gastos
            </label>

            <select
              className="w-2/4 p-2 border border-slate-300 rounded-md text-center font-semibold "
              name="category"
              id="category"
              onChange={handleChange}

            >
              <option value=""> --- Seleccione --- </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </form>
        </div>
      )}
    </>
  );
};
