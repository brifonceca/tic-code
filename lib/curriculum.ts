export type Language = 'python' | 'javascript'

export type Difficulty = 'Fácil' | 'Media' | 'Difícil'

export type TestCase = {
  args: unknown[]
  expected: unknown
}

export type Exercise = {
  id: string
  title: string
  difficulty: Difficulty
  fnName: string
  params: string[]
  statement: string
  hints: string[]
  tests: TestCase[]
}

export type Subject = {
  id: string
  year: number
  name: string
  description: string
  languages: Language[]
  defaultLanguage: Language
  exercises: Exercise[]
}

export type Year = {
  number: number
  label: string
  focus: string
}

export const LANGUAGES: Record<Language, { label: string; extension: string; indent: string }> = {
  python: { label: 'Python', extension: 'py', indent: '    ' },
  javascript: { label: 'JavaScript', extension: 'js', indent: '  ' },
}

export const YEARS: Year[] = [
  { number: 1, label: '1° Año', focus: 'Primeros pasos y lógica' },
  { number: 2, label: '2° Año', focus: 'Ciclos, condiciones y funciones' },
  { number: 3, label: '3° Año', focus: 'Listas y cadenas de texto' },
  { number: 4, label: '4° Año', focus: 'Ordenamiento y recursividad' },
  { number: 5, label: '5° Año', focus: 'Estructuras y matrices' },
  { number: 6, label: '6° Año', focus: 'Algoritmos avanzados y grafos' },
]

const BOTH: Language[] = ['python', 'javascript']

export const SUBJECTS: Subject[] = [
  {
    id: 'intro-programacion',
    year: 1,
    name: 'Introducción a la Programación',
    description: 'Variables, operaciones y tus primeras funciones.',
    languages: BOTH,
    defaultLanguage: 'python',
    exercises: [
      {
        id: 'sumar',
        title: 'Sumar dos números',
        difficulty: 'Fácil',
        fnName: 'sumar',
        params: ['a', 'b'],
        statement: 'Escribí una función que reciba dos números y devuelva su suma.',
        hints: ['Usá el operador + y devolvé el resultado con return.'],
        tests: [
          { args: [2, 3], expected: 5 },
          { args: [-4, 10], expected: 6 },
          { args: [0, 0], expected: 0 },
        ],
      },
      {
        id: 'es-par',
        title: '¿Es par?',
        difficulty: 'Fácil',
        fnName: 'es_par',
        params: ['n'],
        statement: 'Devolvé verdadero si el número recibido es par y falso en caso contrario.',
        hints: ['El operador módulo (%) devuelve el resto de una división.'],
        tests: [
          { args: [4], expected: true },
          { args: [7], expected: false },
          { args: [0], expected: true },
          { args: [-3], expected: false },
        ],
      },
      {
        id: 'mayor-de-tres',
        title: 'El mayor de tres',
        difficulty: 'Fácil',
        fnName: 'mayor_de_tres',
        params: ['a', 'b', 'c'],
        statement: 'Recibís tres números. Devolvé el mayor de ellos usando condicionales.',
        hints: ['Compará primero a con b, y el ganador con c.'],
        tests: [
          { args: [1, 2, 3], expected: 3 },
          { args: [9, 4, 6], expected: 9 },
          { args: [5, 8, 8], expected: 8 },
        ],
      },
    ],
  },
  {
    id: 'logica-algoritmos',
    year: 1,
    name: 'Lógica y Algoritmos',
    description: 'Pensamiento computacional aplicado a problemas cotidianos.',
    languages: BOTH,
    defaultLanguage: 'python',
    exercises: [
      {
        id: 'contar-vocales',
        title: 'Contar vocales',
        difficulty: 'Fácil',
        fnName: 'contar_vocales',
        params: ['texto'],
        statement:
          'Devolvé cuántas vocales (a, e, i, o, u) tiene el texto recibido. Ignorá mayúsculas y minúsculas.',
        hints: ['Convertí el texto a minúsculas antes de recorrerlo.'],
        tests: [
          { args: ['hola'], expected: 2 },
          { args: ['ETEC'], expected: 2 },
          { args: ['xyz'], expected: 0 },
          { args: ['Programacion'], expected: 5 },
        ],
      },
      {
        id: 'factorial',
        title: 'Factorial',
        difficulty: 'Media',
        fnName: 'factorial',
        params: ['n'],
        statement: 'Calculá el factorial de n (n! = 1 × 2 × … × n). Por definición, 0! = 1.',
        hints: ['Usá un acumulador que empiece en 1 y multiplicalo en un ciclo.'],
        tests: [
          { args: [0], expected: 1 },
          { args: [1], expected: 1 },
          { args: [5], expected: 120 },
          { args: [7], expected: 5040 },
        ],
      },
      {
        id: 'celsius-fahrenheit',
        title: 'Celsius a Fahrenheit',
        difficulty: 'Fácil',
        fnName: 'a_fahrenheit',
        params: ['celsius'],
        statement: 'Convertí una temperatura de grados Celsius a Fahrenheit con la fórmula F = C × 9 / 5 + 32.',
        hints: ['Respetá el orden de las operaciones.'],
        tests: [
          { args: [0], expected: 32 },
          { args: [100], expected: 212 },
          { args: [-40], expected: -40 },
        ],
      },
    ],
  },
  {
    id: 'programacion-1',
    year: 2,
    name: 'Programación I',
    description: 'Ciclos, acumuladores y manejo básico de listas.',
    languages: BOTH,
    defaultLanguage: 'python',
    exercises: [
      {
        id: 'sumar-lista',
        title: 'Sumar una lista',
        difficulty: 'Fácil',
        fnName: 'sumar_lista',
        params: ['numeros'],
        statement: 'Devolvé la suma de todos los números de la lista. Si la lista está vacía, devolvé 0.',
        hints: ['Recorré la lista con un for y acumulá cada valor.'],
        tests: [
          { args: [[1, 2, 3]], expected: 6 },
          { args: [[]], expected: 0 },
          { args: [[10, -5, 7]], expected: 12 },
        ],
      },
      {
        id: 'invertir-texto',
        title: 'Invertir texto',
        difficulty: 'Fácil',
        fnName: 'invertir_texto',
        params: ['texto'],
        statement: 'Devolvé el texto recibido escrito al revés.',
        hints: ['Podés recorrer el texto desde el último carácter hasta el primero.'],
        tests: [
          { args: ['hola'], expected: 'aloh' },
          { args: ['ETEC'], expected: 'CETE' },
          { args: [''], expected: '' },
        ],
      },
      {
        id: 'maximo-lista',
        title: 'Máximo de una lista',
        difficulty: 'Media',
        fnName: 'maximo',
        params: ['numeros'],
        statement: 'Devolvé el número más grande de la lista sin usar funciones como max() o Math.max().',
        hints: ['Guardá el primer elemento como máximo provisional y comparalo con el resto.'],
        tests: [
          { args: [[3, 9, 2]], expected: 9 },
          { args: [[-7, -2, -9]], expected: -2 },
          { args: [[5]], expected: 5 },
        ],
      },
    ],
  },
  {
    id: 'algoritmos-1',
    year: 2,
    name: 'Algoritmos I',
    description: 'Problemas clásicos para entrenar la lógica.',
    languages: BOTH,
    defaultLanguage: 'python',
    exercises: [
      {
        id: 'fizzbuzz',
        title: 'FizzBuzz',
        difficulty: 'Fácil',
        fnName: 'fizzbuzz',
        params: ['n'],
        statement:
          'Devolvé "Fizz" si n es múltiplo de 3, "Buzz" si es múltiplo de 5, "FizzBuzz" si es múltiplo de ambos y, si no, el número como texto.',
        hints: ['Chequeá primero el caso de múltiplo de 15.'],
        tests: [
          { args: [3], expected: 'Fizz' },
          { args: [10], expected: 'Buzz' },
          { args: [30], expected: 'FizzBuzz' },
          { args: [7], expected: '7' },
        ],
      },
      {
        id: 'es-primo',
        title: '¿Es primo?',
        difficulty: 'Media',
        fnName: 'es_primo',
        params: ['n'],
        statement: 'Devolvé verdadero si n es un número primo. Recordá que 0 y 1 no son primos.',
        hints: ['Alcanza con probar divisores hasta la raíz cuadrada de n.'],
        tests: [
          { args: [2], expected: true },
          { args: [1], expected: false },
          { args: [17], expected: true },
          { args: [21], expected: false },
        ],
      },
      {
        id: 'fibonacci',
        title: 'Fibonacci',
        difficulty: 'Media',
        fnName: 'fibonacci',
        params: ['n'],
        statement: 'Devolvé el n-ésimo número de Fibonacci, donde fibonacci(0) = 0 y fibonacci(1) = 1.',
        hints: ['Guardá los dos valores anteriores y avanzá en un ciclo.'],
        tests: [
          { args: [0], expected: 0 },
          { args: [1], expected: 1 },
          { args: [10], expected: 55 },
          { args: [20], expected: 6765 },
        ],
      },
    ],
  },
  {
    id: 'estructuras-datos-1',
    year: 3,
    name: 'Estructuras de Datos I',
    description: 'Arreglos, búsqueda y manipulación de colecciones.',
    languages: BOTH,
    defaultLanguage: 'javascript',
    exercises: [
      {
        id: 'eliminar-duplicados',
        title: 'Eliminar duplicados',
        difficulty: 'Fácil',
        fnName: 'eliminar_duplicados',
        params: ['lista'],
        statement: 'Devolvé una nueva lista sin elementos repetidos, conservando el orden de su primera aparición.',
        hints: ['Agregá cada elemento a la nueva lista solo si todavía no está.'],
        tests: [
          { args: [[1, 2, 2, 3, 1]], expected: [1, 2, 3] },
          { args: [[]], expected: [] },
          { args: [[5, 5, 5]], expected: [5] },
        ],
      },
      {
        id: 'contar-ocurrencias',
        title: 'Contar ocurrencias',
        difficulty: 'Fácil',
        fnName: 'contar',
        params: ['lista', 'valor'],
        statement: 'Devolvé cuántas veces aparece el valor dentro de la lista.',
        hints: ['Usá un contador que aumente cuando el elemento coincide.'],
        tests: [
          { args: [[1, 2, 1, 1], 1], expected: 3 },
          { args: [['a', 'b'], 'c'], expected: 0 },
          { args: [[], 4], expected: 0 },
        ],
      },
      {
        id: 'aplanar',
        title: 'Aplanar lista',
        difficulty: 'Media',
        fnName: 'aplanar',
        params: ['lista'],
        statement: 'Recibís una lista de listas. Devolvé una sola lista con todos los elementos en orden.',
        hints: ['Necesitás dos ciclos anidados.'],
        tests: [
          { args: [[[1, 2], [3], [4, 5]]], expected: [1, 2, 3, 4, 5] },
          { args: [[[], [1]]], expected: [1] },
          { args: [[]], expected: [] },
        ],
      },
    ],
  },
  {
    id: 'programacion-2',
    year: 3,
    name: 'Programación II',
    description: 'Procesamiento de cadenas de texto.',
    languages: BOTH,
    defaultLanguage: 'javascript',
    exercises: [
      {
        id: 'es-palindromo',
        title: 'Palíndromo',
        difficulty: 'Fácil',
        fnName: 'es_palindromo',
        params: ['texto'],
        statement:
          'Devolvé verdadero si el texto se lee igual de izquierda a derecha que de derecha a izquierda. Ignorá mayúsculas.',
        hints: ['Compará el texto en minúsculas con su versión invertida.'],
        tests: [
          { args: ['Neuquen'], expected: true },
          { args: ['ETEC'], expected: false },
          { args: ['a'], expected: true },
        ],
      },
      {
        id: 'capitalizar',
        title: 'Capitalizar palabras',
        difficulty: 'Media',
        fnName: 'capitalizar',
        params: ['frase'],
        statement:
          'Devolvé la frase con la primera letra de cada palabra en mayúscula. Las palabras están separadas por un espacio.',
        hints: ['Separá la frase en palabras, transformá cada una y volvé a unirlas.'],
        tests: [
          { args: ['hola mundo'], expected: 'Hola Mundo' },
          { args: ['escuela tecnica'], expected: 'Escuela Tecnica' },
          { args: ['x'], expected: 'X' },
        ],
      },
      {
        id: 'contar-palabras',
        title: 'Contar palabras',
        difficulty: 'Fácil',
        fnName: 'contar_palabras',
        params: ['frase'],
        statement: 'Devolvé la cantidad de palabras de la frase. Puede haber espacios extra al inicio o al final.',
        hints: ['Eliminá los espacios de los extremos antes de separar.'],
        tests: [
          { args: ['me gusta programar'], expected: 3 },
          { args: ['  hola  '], expected: 1 },
          { args: [''], expected: 0 },
        ],
      },
    ],
  },
  {
    id: 'ordenamiento',
    year: 4,
    name: 'Algoritmos de Ordenamiento',
    description: 'Burbuja, mezcla y verificación de orden.',
    languages: BOTH,
    defaultLanguage: 'javascript',
    exercises: [
      {
        id: 'burbuja',
        title: 'Ordenamiento burbuja',
        difficulty: 'Media',
        fnName: 'burbuja',
        params: ['lista'],
        statement: 'Implementá el algoritmo de burbuja y devolvé la lista ordenada de menor a mayor. No uses sort().',
        hints: ['En cada pasada, intercambiá pares adyacentes desordenados.'],
        tests: [
          { args: [[5, 1, 4, 2]], expected: [1, 2, 4, 5] },
          { args: [[]], expected: [] },
          { args: [[3, 3, 1]], expected: [1, 3, 3] },
        ],
      },
      {
        id: 'esta-ordenada',
        title: '¿Está ordenada?',
        difficulty: 'Fácil',
        fnName: 'esta_ordenada',
        params: ['lista'],
        statement: 'Devolvé verdadero si la lista está ordenada de forma no decreciente.',
        hints: ['Compará cada elemento con el siguiente.'],
        tests: [
          { args: [[1, 2, 2, 5]], expected: true },
          { args: [[3, 1]], expected: false },
          { args: [[]], expected: true },
        ],
      },
      {
        id: 'fusionar',
        title: 'Fusionar listas ordenadas',
        difficulty: 'Difícil',
        fnName: 'fusionar',
        params: ['a', 'b'],
        statement: 'Recibís dos listas ordenadas. Devolvé una única lista ordenada con todos sus elementos, en tiempo lineal.',
        hints: ['Usá dos índices, uno por lista, y avanzá el del menor elemento.'],
        tests: [
          { args: [[1, 4, 7], [2, 3, 9]], expected: [1, 2, 3, 4, 7, 9] },
          { args: [[], [1, 2]], expected: [1, 2] },
          { args: [[5], []], expected: [5] },
        ],
      },
    ],
  },
  {
    id: 'recursividad',
    year: 4,
    name: 'Recursividad',
    description: 'Funciones que se llaman a sí mismas.',
    languages: BOTH,
    defaultLanguage: 'python',
    exercises: [
      {
        id: 'potencia',
        title: 'Potencia recursiva',
        difficulty: 'Fácil',
        fnName: 'potencia',
        params: ['base', 'exponente'],
        statement: 'Calculá base elevado a exponente (entero ≥ 0) de forma recursiva, sin usar ** ni pow.',
        hints: ['Caso base: cualquier número elevado a 0 es 1.'],
        tests: [
          { args: [2, 10], expected: 1024 },
          { args: [5, 0], expected: 1 },
          { args: [3, 3], expected: 27 },
        ],
      },
      {
        id: 'suma-digitos',
        title: 'Suma de dígitos',
        difficulty: 'Media',
        fnName: 'suma_digitos',
        params: ['n'],
        statement: 'Devolvé la suma de los dígitos de un entero positivo n, de forma recursiva.',
        hints: ['El último dígito es n % 10 y el resto es la división entera por 10.'],
        tests: [
          { args: [1234], expected: 10 },
          { args: [7], expected: 7 },
          { args: [9081], expected: 18 },
        ],
      },
      {
        id: 'mcd',
        title: 'Máximo común divisor',
        difficulty: 'Media',
        fnName: 'mcd',
        params: ['a', 'b'],
        statement: 'Calculá el MCD de dos enteros positivos usando el algoritmo de Euclides recursivo.',
        hints: ['mcd(a, b) = mcd(b, a % b), y mcd(a, 0) = a.'],
        tests: [
          { args: [48, 18], expected: 6 },
          { args: [17, 5], expected: 1 },
          { args: [100, 25], expected: 25 },
        ],
      },
    ],
  },
  {
    id: 'estructuras-datos-2',
    year: 5,
    name: 'Estructuras de Datos II',
    description: 'Pilas, búsqueda binaria y rotaciones.',
    languages: BOTH,
    defaultLanguage: 'javascript',
    exercises: [
      {
        id: 'busqueda-binaria',
        title: 'Búsqueda binaria',
        difficulty: 'Media',
        fnName: 'busqueda_binaria',
        params: ['lista', 'objetivo'],
        statement:
          'Recibís una lista ordenada. Devolvé el índice del objetivo usando búsqueda binaria, o -1 si no está.',
        hints: ['Mantené los límites izquierdo y derecho y mirá el elemento del medio.'],
        tests: [
          { args: [[1, 3, 5, 7, 9], 7], expected: 3 },
          { args: [[1, 3, 5], 4], expected: -1 },
          { args: [[], 1], expected: -1 },
          { args: [[2, 4, 6, 8], 2], expected: 0 },
        ],
      },
      {
        id: 'parentesis',
        title: 'Paréntesis balanceados',
        difficulty: 'Difícil',
        fnName: 'balanceados',
        params: ['texto'],
        statement: 'Determiná si los símbolos (), [] y {} del texto están correctamente balanceados usando una pila.',
        hints: ['Apilá cada apertura y, al encontrar un cierre, verificá que coincida con el tope.'],
        tests: [
          { args: ['([]{})'], expected: true },
          { args: ['(]'], expected: false },
          { args: ['(('], expected: false },
          { args: [''], expected: true },
        ],
      },
      {
        id: 'rotar',
        title: 'Rotar lista',
        difficulty: 'Media',
        fnName: 'rotar',
        params: ['lista', 'k'],
        statement: 'Rotá la lista k posiciones hacia la derecha y devolvé el resultado. k puede ser mayor al largo.',
        hints: ['Usá k % largo para evitar rotaciones innecesarias.'],
        tests: [
          { args: [[1, 2, 3, 4, 5], 2], expected: [4, 5, 1, 2, 3] },
          { args: [[1, 2, 3], 3], expected: [1, 2, 3] },
          { args: [[1, 2], 5], expected: [2, 1] },
        ],
      },
    ],
  },
  {
    id: 'matrices',
    year: 5,
    name: 'Matrices y Arreglos 2D',
    description: 'Operaciones sobre tablas de datos.',
    languages: BOTH,
    defaultLanguage: 'python',
    exercises: [
      {
        id: 'transponer',
        title: 'Transponer matriz',
        difficulty: 'Media',
        fnName: 'transponer',
        params: ['matriz'],
        statement: 'Devolvé la matriz transpuesta: las filas pasan a ser columnas.',
        hints: ['El elemento [i][j] pasa a la posición [j][i].'],
        tests: [
          { args: [[[1, 2], [3, 4]]], expected: [[1, 3], [2, 4]] },
          { args: [[[1, 2, 3]]], expected: [[1], [2], [3]] },
        ],
      },
      {
        id: 'suma-diagonal',
        title: 'Suma de la diagonal',
        difficulty: 'Fácil',
        fnName: 'suma_diagonal',
        params: ['matriz'],
        statement: 'Recibís una matriz cuadrada. Devolvé la suma de su diagonal principal.',
        hints: ['Los elementos de la diagonal tienen el mismo índice de fila y columna.'],
        tests: [
          { args: [[[1, 2], [3, 4]]], expected: 5 },
          { args: [[[5]]], expected: 5 },
          { args: [[[1, 0, 0], [0, 2, 0], [0, 0, 3]]], expected: 6 },
        ],
      },
      {
        id: 'identidad',
        title: 'Matriz identidad',
        difficulty: 'Fácil',
        fnName: 'identidad',
        params: ['n'],
        statement: 'Generá una matriz identidad de n × n: unos en la diagonal y ceros en el resto.',
        hints: ['Construí cada fila con un ciclo y poné 1 cuando la fila es igual a la columna.'],
        tests: [
          { args: [2], expected: [[1, 0], [0, 1]] },
          { args: [1], expected: [[1]] },
          { args: [3], expected: [[1, 0, 0], [0, 1, 0], [0, 0, 1]] },
        ],
      },
    ],
  },
  {
    id: 'algoritmos-avanzados',
    year: 6,
    name: 'Algoritmos Avanzados',
    description: 'Optimización y técnicas de entrevista técnica.',
    languages: BOTH,
    defaultLanguage: 'javascript',
    exercises: [
      {
        id: 'subarreglo-maximo',
        title: 'Subarreglo de suma máxima',
        difficulty: 'Difícil',
        fnName: 'suma_maxima',
        params: ['lista'],
        statement:
          'Devolvé la mayor suma posible de un subarreglo contiguo (no vacío). Intentá resolverlo en O(n) con el algoritmo de Kadane.',
        hints: ['En cada paso decidí si extender el subarreglo actual o empezar uno nuevo.'],
        tests: [
          { args: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected: 6 },
          { args: [[-3, -1, -2]], expected: -1 },
          { args: [[5]], expected: 5 },
        ],
      },
      {
        id: 'dos-sumas',
        title: 'Dos sumas',
        difficulty: 'Media',
        fnName: 'dos_sumas',
        params: ['lista', 'objetivo'],
        statement:
          'Devolvé una lista con los índices [i, j] (i < j) de los dos números que suman el objetivo. Siempre existe una única solución.',
        hints: ['Un diccionario o mapa te permite encontrar el complemento en O(1).'],
        tests: [
          { args: [[2, 7, 11, 15], 9], expected: [0, 1] },
          { args: [[3, 2, 4], 6], expected: [1, 2] },
          { args: [[1, 5, 3, 8], 11], expected: [2, 3] },
        ],
      },
      {
        id: 'anagramas',
        title: 'Anagramas',
        difficulty: 'Fácil',
        fnName: 'son_anagramas',
        params: ['a', 'b'],
        statement: 'Devolvé verdadero si ambas palabras usan exactamente las mismas letras, en cualquier orden.',
        hints: ['Contá la frecuencia de cada letra o compará las palabras ordenadas.'],
        tests: [
          { args: ['roma', 'amor'], expected: true },
          { args: ['codigo', 'logica'], expected: false },
          { args: ['abc', 'abcd'], expected: false },
        ],
      },
    ],
  },
  {
    id: 'grafos',
    year: 6,
    name: 'Teoría de Grafos',
    description: 'Listas de adyacencia, recorridos y caminos.',
    languages: BOTH,
    defaultLanguage: 'python',
    exercises: [
      {
        id: 'grado-maximo',
        title: 'Grado máximo',
        difficulty: 'Fácil',
        fnName: 'grado_maximo',
        params: ['grafo'],
        statement:
          'El grafo se representa como lista de adyacencia: grafo[i] contiene los vecinos del nodo i. Devolvé el índice del nodo con más vecinos (el menor índice si hay empate).',
        hints: ['Compará el largo de cada lista de vecinos.'],
        tests: [
          { args: [[[1], [0, 2, 3], [1], [1]]], expected: 1 },
          { args: [[[1, 2], [0], [0]]], expected: 0 },
        ],
      },
      {
        id: 'camino-existe',
        title: '¿Existe un camino?',
        difficulty: 'Difícil',
        fnName: 'hay_camino',
        params: ['grafo', 'origen', 'destino'],
        statement: 'Usando BFS o DFS, devolvé verdadero si se puede llegar del nodo origen al nodo destino.',
        hints: ['Llevá un registro de los nodos visitados para no entrar en ciclos.'],
        tests: [
          { args: [[[1], [2], [], []], 0, 2], expected: true },
          { args: [[[1], [0], [3], [2]], 0, 3], expected: false },
          { args: [[[]], 0, 0], expected: true },
        ],
      },
      {
        id: 'contar-aristas',
        title: 'Contar aristas',
        difficulty: 'Fácil',
        fnName: 'contar_aristas',
        params: ['grafo'],
        statement: 'El grafo es no dirigido: cada arista aparece dos veces en la lista de adyacencia. Devolvé la cantidad de aristas.',
        hints: ['Sumá el tamaño de todas las listas y dividí por 2.'],
        tests: [
          { args: [[[1, 2], [0], [0]]], expected: 2 },
          { args: [[[]]], expected: 0 },
          { args: [[[1, 2], [0, 2], [0, 1]]], expected: 3 },
        ],
      },
    ],
  },
]

export function getSubjectsByYear(year: number) {
  return SUBJECTS.filter((subject) => subject.year === year)
}

export function getSubject(id: string) {
  return SUBJECTS.find((subject) => subject.id === id)
}

export function getExercise(subjectId: string, exerciseId: string) {
  const subject = getSubject(subjectId)
  const exercise = subject?.exercises.find((item) => item.id === exerciseId)
  return subject && exercise ? { subject, exercise } : undefined
}

export function exerciseKey(subjectId: string, exerciseId: string) {
  return `${subjectId}/${exerciseId}`
}

export function getStarterCode(exercise: Exercise, language: Language) {
  const params = exercise.params.join(', ')
  if (language === 'python') {
    return `def ${exercise.fnName}(${params}):\n    # Escribí tu solución acá\n    pass\n`
  }
  return `function ${exercise.fnName}(${params}) {\n  // Escribí tu solución acá\n}\n`
}

export function formatValue(value: unknown, language: Language): string {
  if (value === undefined || value === null) return language === 'python' ? 'None' : String(value)
  if (typeof value === 'boolean') {
    return language === 'python' ? (value ? 'True' : 'False') : String(value)
  }
  if (typeof value === 'string') return JSON.stringify(value)
  if (Array.isArray(value)) return `[${value.map((item) => formatValue(item, language)).join(', ')}]`
  return String(value)
}

export const STUDENT_EMAIL = 'britanyfonceeca@etec.uba.ar'

export const INITIAL_COMPLETED = [
  'intro-programacion/sumar',
  'intro-programacion/es-par',
  'intro-programacion/mayor-de-tres',
  'logica-algoritmos/contar-vocales',
  'logica-algoritmos/factorial',
  'programacion-1/sumar-lista',
  'algoritmos-1/fizzbuzz',
  'estructuras-datos-1/eliminar-duplicados',
]
