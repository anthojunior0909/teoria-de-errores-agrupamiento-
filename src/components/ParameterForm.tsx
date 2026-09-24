import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Parametros } from "../types";

interface Props {
  valorInicial: Parametros;
  onCalcular: (parametros: Parametros) => void;
}

const LIMITE_ITERACIONES = 100_000_000;

type Campos = Record<keyof Parametros, string>;

const aNumero = (texto: string) => (texto.trim() === "" ? NaN : Number(texto));

export function ParameterForm({ valorInicial, onCalcular }: Props) {
  const [campos, setCampos] = useState<Campos>({
    base: String(valorInicial.base),
    incremento: String(valorInicial.incremento),
    iteraciones: String(valorInicial.iteraciones),
    tamanoGrupo: String(valorInicial.tamanoGrupo),
  });
  const [error, setError] = useState<string | null>(null);

  const cambiar =
    (campo: keyof Campos) => (e: ChangeEvent<HTMLInputElement>) =>
      setCampos((previo) => ({ ...previo, [campo]: e.target.value }));

  const enviar = (e: FormEvent) => {
    e.preventDefault();

    const base = aNumero(campos.base);
    const incremento = aNumero(campos.incremento);
    const iteraciones = aNumero(campos.iteraciones);
    const tamanoGrupo = aNumero(campos.tamanoGrupo);

    if (!Number.isFinite(base) || !Number.isFinite(incremento)) {
      return setError("La base y el incremento deben ser números.");
    }
    if (
      !Number.isInteger(iteraciones) ||
      iteraciones < 1 ||
      iteraciones > LIMITE_ITERACIONES
    ) {
      return setError(
        `Las iteraciones deben ser un entero entre 1 y ${LIMITE_ITERACIONES.toLocaleString("es")}.`
      );
    }
    if (!Number.isInteger(tamanoGrupo) || tamanoGrupo < 1) {
      return setError("El tamaño de grupo debe ser un entero mayor o igual a 1.");
    }

    setError(null);
    onCalcular({ base, incremento, iteraciones, tamanoGrupo });
  };

  return (
    <form className="panel formulario" onSubmit={enviar} noValidate>
      <h2>Parámetros</h2>

      <label>
        Base
        <input type="text" inputMode="decimal" value={campos.base} onChange={cambiar("base")} />
        <small>Valor con el que empieza la suma.</small>
      </label>

      <label>
        Incremento
        <input
          type="text"
          inputMode="decimal"
          value={campos.incremento}
          onChange={cambiar("incremento")}
        />
        <small>Lo que se suma en cada iteración.</small>
      </label>

      <label>
        Iteraciones
        <input
          type="text"
          inputMode="numeric"
          value={campos.iteraciones}
          onChange={cambiar("iteraciones")}
        />
        <small>Cuántas veces se suma el incremento.</small>
      </label>

      <label>
        Tamaño de grupo
        <input
          type="text"
          inputMode="numeric"
          value={campos.tamanoGrupo}
          onChange={cambiar("tamanoGrupo")}
        />
        <small>Incrementos que se suman juntos antes de pasar al total.</small>
      </label>

      {error && (
        <p className="mensaje-error" role="alert">
          {error}
        </p>
      )}

      <button type="submit">Calcular</button>
    </form>
  );
}

export default ParameterForm;