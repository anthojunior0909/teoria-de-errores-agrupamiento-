# Teoría de Errores: Estrategia de Agrupamiento

Aplicación interactiva desarrollada en **React**, **TypeScript** y **Vite** para demostrar de manera práctica cómo minimizar el error por redondeo en operaciones de punto flotante mediante la **estrategia de agrupamiento**.

---

## 📌 Tabla de Contenidos

- [Fundamento Teórico](#-fundamento-teórico)
- [¿Por qué falla la suma directa?](#-por-qué-falla-la-suma-directa)
- [La Solución: Estrategia de Agrupamiento](#-la-solución-estrategia-de-agrupamiento)
- [Características del Proyecto](#-características-del-proyecto)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Métricas de Error Evaluadas](#-métricas-de-error-evaluadas)
- [Licencia](#-licencia)

---

## 📚 Fundamento Teórico

En el cálculo numérico por computadora, la representación de números decimales está limitada por la mantisa en el formato de punto flotante (estándar IEEE 754). Al operar con números de magnitudes muy diferentes, ocurren pérdidas de precisión debido a la **desnormalización** que realiza la CPU para alinear los exponentes antes de operar.

Existen **3 estrategias o métodos** principales planteados en la teoría numérica para minimizar los efectos de redondeo:

1. **Doble Precisión (McCracken):** Incrementar la capacidad de bits de almacenamiento (de 32 a 64 bits o más).
2. **Agrupamiento:** Modificar el orden y secuencia de las operaciones agrupando términos de escala similar.
3. **Desarrollo de Taylor:** Reformular expresiones matemáticas complejas o restas entre valores cercanos para evitar la cancelación sustractiva.

Esta aplicación se enfoca exclusivamente en la demostración y análisis de la **Estrategia de Agrupamiento**.

---

## ⚠️ ¿Por qué falla la suma directa?

Cuando sumamos repetidamente un número muy pequeño a un acumulador o número grande:

$$\text{Total} = \text{Base Grande} + \sum_{i=1}^{N} \text{Incremento Pequeño}$$

En cada iteración, la computadora desnormaliza el incremento pequeño para poder sumarlo al valor grande. Como la mantisa tiene un número finito de bits, **los dígitos menos significativos del número pequeño son recortados (redondeados a cero)**. Tras miles o millones de iteraciones, la acumulación de este recorte destruye la precisión del resultado.

---

## 💡 La Solución: Estrategia de Agrupamiento

En lugar de sumar iterativamente el incremento pequeño al número grande, la estrategia de **agrupamiento** modifica el algoritmo de cálculo:

1. **Agrupar los pequeños:** Se suman primero todos los incrementos pequeños entre sí:
   $$\text{Subtotal Pequeños} = \sum_{i=1}^{N} \text{Incremento Pequeño}$$
   Como estos valores comparten la misma magnitud, **no hay pérdida de bits por desnormalización**.
2. **Sumar al valor base:** Al finalizar la acumulación del grupo, el subtotal obtenido (que ahora tiene una magnitud considerable) se suma una sola vez al valor grande:
   $$\text{Resultado Final} = \text{Base Grande} + \text{Subtotal Pequeños}$$

Al reducir de $N$ interacciones desiguales a **una sola interacción de choque de magnitudes**, el error de redondeo acumulado se reduce drásticamente.

---

## ✨ Características del Proyecto

- **Simulación en Tiempo Real:** Configuración dinámica de valor base, incremento, número de iteraciones y tamaño de bloque.
- **Forzado de Precisión Simple (`Float32Array`):** Garantiza la reproducibilidad de los límites de mantisa de 32 bits independientemente del motor JS.
- **Cálculo Transparente de Errores:** Muestra tanto el Error Absoluto ($EA$) como el Error Relativo Porcentual ($ERP$).
- **Métricas Comparativas:** Muestra cuántas veces fue superior el agrupamiento respecto a la suma directa.
- **Interfaz Moderna:** Modo oscuro con tarjetas informativas y separación limpia entre lógica e interfaz.

---

## 📁 Estructura del Proyecto

```text
mi-proyecto-errores/
├── public/
├── src/
│   ├── assets/              # Estilos globales e imágenes
│   ├── components/          # Componentes de interfaz gráfica
│   │   ├── ParameterForm.tsx # Formulario para captura de datos
│   │   └── OutputDisplay.tsx # Visualización de tablas y métricas
│   ├── utils/               # Lógica matemática pura
│   │   ├── algorithms.ts    # Suma directa vs. Suma por Agrupamiento
│   │   └── errorMetrics.ts  # Fórmulas de Error Absoluto y Relativo
│   ├── types/               # Definiciones de TypeScript
│   │   └── index.ts         # Interfaces para parámetros y resultados
│   ├── App.tsx              # Integración principal
│   ├── main.tsx             # Punto de entrada Vite/React
│   └── index.css            # Estilos de la aplicación
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🛠️ Instalación y Configuración

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/teoria-de-errores.git
   cd teoria-de-errores
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador:**
   Visita `http://localhost:5173` para interactuar con la aplicación.

---

## 📐 Métricas de Error Evaluadas

Las métricas calculadas corresponden a las fórmulas estándar de análisis numérico:

- **Valor Exacto ($p$):** 
  $$p = \text{Base} + (\text{Incremento} \times \text{Iteraciones})$$

- **Error Absoluto ($EA$):**
  $$EA = |p^* - p|$$
  *(donde $p^*$ es el valor aproximado obtenido por el algoritmo)*.

- **Error Relativo Porcentual ($ERP$):**
  $$ERP = \left( \frac{|p^* - p|}{|p|} \right) \times 100\%$$

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.