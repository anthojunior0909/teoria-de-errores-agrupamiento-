/** Datos que el usuario ingresa en el formulario. */
export interface Parametros {
  base: number;
  incremento: number;
  iteraciones: number;
  /** Cuántos incrementos se suman dentro de cada grupo antes de pasar al total. */
  tamanoGrupo: number;
}

/** Suma parcial de un grupo de incrementos. */
export interface GrupoParcial {
  indice: number;
  elementos: number;
  sumaParcial: number;
}

export interface Errores {
  absoluto: number;
  relativo: number;
  porcentual: number;
}

/** Salida cruda del algoritmo de agrupamiento. */
export interface SalidaAgrupamiento {
  valor: number;
  totalGrupos: number;
  /** Solo los primeros grupos, para mostrarlos en pantalla. */
  grupos: GrupoParcial[];
}

/** Resultado de un método, ya comparado contra el valor exacto. */
export interface ResultadoDirecto {
  valor: number;
  errores: Errores;
}

export interface ResultadoAgrupado extends ResultadoDirecto {
  totalGrupos: number;
  grupos: GrupoParcial[];
}

export interface Resultado {
  valorExacto: number;
  /** Sin agrupamiento: error por suma directa. */
  directa: ResultadoDirecto;
  /** Con agrupamiento: estrategia recomendada. */
  agrupada: ResultadoAgrupado;
  /** Cuántas veces es menor el error absoluto del agrupamiento (Infinity si es 0). */
  factorMejora: number;
}