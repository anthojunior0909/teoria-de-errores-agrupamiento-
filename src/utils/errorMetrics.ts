import type { Errores } from "../types";

/** Error absoluto: |exacto − aproximado| */
export function errorAbsoluto(exacto: number, aproximado: number): number {
  return Math.abs(exacto - aproximado);
}

/**
 * Error relativo: |exacto − aproximado| / |exacto|
 * Si el valor exacto es 0 no hay referencia para dividir:
 * devuelve 0 cuando coinciden e Infinity cuando no.
 */
export function errorRelativo(exacto: number, aproximado: number): number {
  const absoluto = errorAbsoluto(exacto, aproximado);
  if (exacto === 0) return absoluto === 0 ? 0 : Infinity;
  return absoluto / Math.abs(exacto);
}

export function calcularErrores(exacto: number, aproximado: number): Errores {
  const relativo = errorRelativo(exacto, aproximado);
  return {
    absoluto: errorAbsoluto(exacto, aproximado),
    relativo,
    porcentual: relativo * 100,
  };
}

/**
 * Cuántas veces es menor el error del agrupamiento respecto al de la suma directa.
 * 1 si ambos son 0; Infinity si solo el agrupamiento tiene error 0.
 */
export function factorMejora(errorDirecto: number, errorAgrupado: number): number {
  if (errorAgrupado === 0) return errorDirecto === 0 ? 1 : Infinity;
  return errorDirecto / errorAgrupado;
}