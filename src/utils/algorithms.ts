import type { GrupoParcial, Parametros, SalidaAgrupamiento } from "../types";

/** Cantidad máxima de grupos que se guardan para mostrarlos en la tabla. */
export const MAX_GRUPOS_VISIBLES = 20;

/**
 * Valor de referencia: base + incremento × iteraciones.
 * Se calcula con una sola multiplicación, así que acumula un único redondeo
 * en vez de uno por cada suma.
 */
export function valorExacto({ base, incremento, iteraciones }: Parametros): number {
  return base + incremento * iteraciones;
}

/**
 * Sin agrupamiento: suma directa, un incremento a la vez sobre un único acumulador.
 * Cada suma redondea, y el acumulador crece, así que el error se va acumulando.
 */
export function sumaDirecta({ base, incremento, iteraciones }: Parametros): number {
  let total = base;
  for (let i = 0; i < iteraciones; i++) {
    total += incremento;
  }
  return total;
}

/**
 * Con agrupamiento:
 *  1. Los incrementos se suman en grupos de `tamanoGrupo` elementos.
 *  2. Cada suma parcial se acumula sobre la base al terminar su grupo.
 *
 * Los parciales se mantienen pequeños, por lo que el acumulador grande
 * recibe menos sumas y se pierden menos dígitos que sumando uno por uno.
 * El último grupo puede tener menos elementos si `iteraciones` no es múltiplo.
 */
export function sumaAgrupada(p: Parametros): SalidaAgrupamiento {
  const { base, incremento, iteraciones, tamanoGrupo } = p;

  let total = base;
  let restantes = iteraciones;
  let totalGrupos = 0;
  const grupos: GrupoParcial[] = [];

  while (restantes > 0) {
    const elementos = Math.min(tamanoGrupo, restantes);

    let sumaParcial = 0;
    for (let i = 0; i < elementos; i++) {
      sumaParcial += incremento;
    }

    total += sumaParcial;
    restantes -= elementos;
    totalGrupos++;

    if (grupos.length < MAX_GRUPOS_VISIBLES) {
      grupos.push({ indice: totalGrupos, elementos, sumaParcial });
    }
  }

  return { valor: total, totalGrupos, grupos };
}