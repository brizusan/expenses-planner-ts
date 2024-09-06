import { PropsWithChildren } from "react";

export const Alerta = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-red-100 border text-center border-red-400 text-red-700 font-semibold  py-2 rounded">
      {children}
    </div>
  );
};
