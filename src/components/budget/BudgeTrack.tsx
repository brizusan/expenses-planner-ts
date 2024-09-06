import { useBudget } from "../../hooks/useBudge";
import { AmountDisplay } from "../amount/AmountDisplay";
import { CircularProgressbar , buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const BudgeTrack = () => {

  const {state , totalExpenses , remainBudget , dispatch} = useBudget()
  const percentage = Math.round((totalExpenses / state.budget) * 100);

  return (
    <article className="flex items-center justify-around border rounded-md shadow-md p-2 md:p-8 max-w-2xl mx-auto my-10 bg-white w-11/12 md:w-full">
      <CircularProgressbar 
        className="w-36 h-36 md:w-64 md:h-64"
        styles={buildStyles({
          pathColor: percentage === 100 ? '#dc2626' : '#3b82f6',
          textColor: percentage === 100 ? '#dc2626' : '#3b82f6',
          trailColor: '#f5f5f5',
        })}
        value={percentage} 
        text={`${percentage }%`} 
      />

      <section className="space-y-2 text-center">
        <button
          onClick={()=>{
            const confirm = window.confirm('¿Estas seguro de resetear la app?')
            if(confirm) {
              dispatch({type: "reset-app"})
            }
            
          }}
          type="button"
          className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded"
        >
          Resetear App
        </button>
        <AmountDisplay label="Presupuesto" amount={state.budget} />
        <AmountDisplay label="Disponible" amount={remainBudget} />
        <AmountDisplay label="Gastado" amount={totalExpenses} />
      </section>
    </article>
  );
};
