import type { Errores, Parametros, Resultado } from "../types";

interface Props {
  resultado: Resultado | null;
  parametros: Parametros | null;
}

/** 17 cifras significativas: las que hacen falta para distinguir dos doubles. */
const completo = (n: number) => n.toPrecision(17);

const cientifico = (n: number) => (Number.isFinite(n) ? n.toExponential(6) : "∞");

function mensajeMejora(factor: number): string {
  if (factor === 1) return "Con estos parámetros los dos métodos dan el mismo error.";
  if (factor === Infinity) {
    return "El agrupamiento elimina por completo el error de la suma directa.";
  }
  if (factor > 1) {
    return `El error absoluto del agrupamiento es ${factor.toLocaleString("es", {
      maximumFractionDigits: 1,
    })} veces menor que el de la suma directa.`;
  }
  return "En este caso el agrupamiento no redujo el error.";
}

interface TarjetaProps {
  titulo: string;
  subtitulo: string;
  valor: number;
  errores: Errores;
  clase: "directa" | "agrupada";
}

function Tarjeta({ titulo, subtitulo, valor, errores, clase }: TarjetaProps) {
  return (
    <article className={`tarjeta ${clase}`}>
      <h3>{titulo}</h3>
      <p className="subtitulo">{subtitulo}</p>

      <dl>
        <dt>Valor obtenido</dt>
        <dd className="valor">{completo(valor)}</dd>
        <dt>Error absoluto</dt>
        <dd className="error">{cientifico(errores.absoluto)}</dd>
        <dt>Error relativo</dt>
        <dd className="error">{cientifico(errores.relativo)}</dd>
      </dl>
    </article>
  );
}

export default function OutputDisplay({ resultado, parametros }: Props) {
  if (!resultado || !parametros) {
    return (
      <section className="panel vacio">
        <h2>Resultados</h2>
        <p>Ingresa los parámetros y pulsa Calcular para comparar los dos métodos.</p>
      </section>
    );
  }

  const { valorExacto, directa, agrupada, factorMejora } = resultado;

  return (
    <section className="panel resultados">
      <h2>Resultados</h2>

      <p className="exacto">
        <span>Valor exacto</span>
        <strong>{completo(valorExacto)}</strong>
      </p>

      <div className="comparacion">
        <Tarjeta
          clase="directa"
          titulo="Sin agrupamiento"
          subtitulo="Error por suma directa"
          valor={directa.valor}
          errores={directa.errores}
        />
        <Tarjeta
          clase="agrupada"
          titulo="Con agrupamiento"
          subtitulo="Estrategia recomendada"
          valor={agrupada.valor}
          errores={agrupada.errores}
        />
      </div>

      <p className="veredicto">{mensajeMejora(factorMejora)}</p>

      <h3 className="titulo-tabla">Sumas parciales por grupo</h3>
      <p className="nota">
        {parametros.iteraciones.toLocaleString("es")} iteraciones en{" "}
        {agrupada.totalGrupos.toLocaleString("es")} grupos de{" "}
        {parametros.tamanoGrupo.toLocaleString("es")}.
        {agrupada.totalGrupos > agrupada.grupos.length &&
          ` Se muestran los primeros ${agrupada.grupos.length}.`}
      </p>

      <div className="tabla-scroll">
        <table>
          <thead>
            <tr>
              <th>Grupo</th>
              <th>Elementos</th>
              <th>Suma parcial</th>
            </tr>
          </thead>
          <tbody>
            {agrupada.grupos.map((g) => (
              <tr key={g.indice}>
                <td>{g.indice}</td>
                <td>{g.elementos.toLocaleString("es")}</td>
                <td>{completo(g.sumaParcial)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}