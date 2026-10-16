import { useState } from "react";
import Header from "./components/Header";
import OutputDisplay from "./components/OutputDisplay";
import ParameterForm from "./components/ParameterForm";
import type { Parametros, Resultado } from "./types";
import { sumaAgrupada, sumaDirecta, valorExacto } from "./utils/algorithms";
import { calcularErrores, factorMejora } from "./utils/errorMetrics";

const PARAMETROS_INICIALES: Parametros = {
  base: 1,
  incremento: 0.1,
  iteraciones: 1_000_000,
  tamanoGrupo: 1000,
};

export default function App() {
  const [parametros, setParametros] = useState<Parametros | null>(null);
  const [resultado, setResultado] = useState<Resultado | null>(null);

  const calcular = (p: Parametros) => {
    const exacto = valorExacto(p);
    const directo = sumaDirecta(p);
    const agrupado = sumaAgrupada(p);

    const erroresDirecta = calcularErrores(exacto, directo);
    const erroresAgrupada = calcularErrores(exacto, agrupado.valor);

    setParametros(p);
    setResultado({
      valorExacto: exacto,
      directa: { valor: directo, errores: erroresDirecta },
      agrupada: {
        valor: agrupado.valor,
        errores: erroresAgrupada,
        totalGrupos: agrupado.totalGrupos,
        grupos: agrupado.grupos,
      },
      factorMejora: factorMejora(erroresDirecta.absoluto, erroresAgrupada.absoluto),
    });
  };

  return (
    <div className="app">
      <Header />
      <main className="contenido">
        <ParameterForm valorInicial={PARAMETROS_INICIALES} onCalcular={calcular} />
        <OutputDisplay resultado={resultado} parametros={parametros} />
      </main>
    </div>
  );
}