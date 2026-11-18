-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 18-11-2026 a las 19:29:03
-- Versión del servidor: 8.0.39
-- Versión de PHP: 8.2.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `Tic-Code`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `anos`
--

CREATE TABLE `anos` (
  `id` bigint NOT NULL,
  `numero` int NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `foco` varchar(120) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `anos`
--

INSERT INTO `anos` (`id`, `numero`, `nombre`, `foco`) VALUES
(1, 1, '1° Año', 'ta todo cambiado a comparación de mi epoca'),
(2, 2, '2° Año', 'Lo mismo q primero'),
(3, 3, '3° Año', 'Pensamientos de cambiarte de colegio'),
(4, 4, '4° Año', 'mmm año medio raro'),
(5, 5, '5° Año', 'Te arrepentis de no haberte cambiado d colegio'),
(6, 6, '6° Año', 'Nivel avanzado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `consignas`
--

CREATE TABLE `consignas` (
  `id` bigint NOT NULL,
  `titulo` varchar(120) NOT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  `cursos_id` bigint NOT NULL,
  `slug` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `consignas`
--

INSERT INTO `consignas` (`id`, `titulo`, `descripcion`, `cursos_id`, `slug`) VALUES
(1, 'Sumar dos números', 'Escribí una función que reciba dos números y devuelva su suma.', 1, 'sumar'),
(2, '¿Es par?', 'Devolvé verdadero si el número recibido es par y falso en caso contrario.', 1, 'es-par'),
(3, 'El mayor de tres', 'Recibís tres números. Devolvé el mayor de ellos usando condicionales.', 1, 'mayor-de-tres'),
(7, 'Sumar una lista', 'Devolvé la suma de todos los números de la lista. Si la lista está vacía, devolvé 0.', 3, 'sumar-lista'),
(8, 'Invertir texto', 'Devolvé el texto recibido escrito al revés.', 3, 'invertir-texto'),
(9, 'Máximo de una lista', 'Devolvé el número más grande de la lista sin usar funciones como max() o Math.max().', 3, 'maximo-lista'),
(13, 'Eliminar duplicados', 'Devolvé una nueva lista sin elementos repetidos, conservando el orden de su primera aparición.', 5, 'eliminar-duplicados'),
(14, 'Contar ocurrencias', 'Devolvé cuántas veces aparece el valor dentro de la lista.', 5, 'contar-ocurrencias'),
(15, 'Aplanar lista', 'Recibís una lista de listas. Devolvé una sola lista con todos los elementos en orden.', 5, 'aplanar'),
(16, 'Palíndromo', 'Devolvé verdadero si el texto se lee igual de izquierda a derecha que de derecha a izquierda. Ignorá mayúsculas.', 6, 'es-palindromo'),
(17, 'Capitalizar palabras', 'Devolvé la frase con la primera letra de cada palabra en mayúscula. Las palabras están separadas por un espacio.', 6, 'capitalizar'),
(18, 'Contar palabras', 'Devolvé la cantidad de palabras de la frase. Puede haber espacios extra al inicio o al final.', 6, 'contar-palabras'),
(19, 'Ordenamiento burbuja', 'Implementá el algoritmo de burbuja y devolvé la lista ordenada de menor a mayor. No uses sort().', 7, 'burbuja'),
(20, '¿Está ordenada?', 'Devolvé verdadero si la lista está ordenada de forma no decreciente.', 7, 'esta-ordenada'),
(21, 'Fusionar listas ordenadas', 'Recibís dos listas ordenadas. Devolvé una única lista ordenada con todos sus elementos, en tiempo lineal.', 7, 'fusionar'),
(22, 'Potencia recursiva', 'Calculá base elevado a exponente (entero ≥ 0) de forma recursiva, sin usar ** ni pow.', 8, 'potencia'),
(23, 'Suma de dígitos', 'Devolvé la suma de los dígitos de un entero positivo n, de forma recursiva.', 8, 'suma-digitos'),
(24, 'Máximo común divisor', 'Calculá el MCD de dos enteros positivos usando el algoritmo de Euclides recursivo.', 8, 'mcd'),
(25, 'Búsqueda binaria', 'Recibís una lista ordenada. Devolvé el índice del objetivo usando búsqueda binaria, o -1 si no está.', 9, 'busqueda-binaria'),
(26, 'Paréntesis balanceados', 'Determiná si los símbolos (), [] y {} del texto están correctamente balanceados usando una pila.', 9, 'parentesis'),
(27, 'Rotar lista', 'Rotá la lista k posiciones hacia la derecha y devolvé el resultado. k puede ser mayor al largo.', 9, 'rotar'),
(28, 'Transponer matriz', 'Devolvé la matriz transpuesta: las filas pasan a ser columnas.', 10, 'transponer'),
(29, 'Suma de la diagonal', 'Recibís una matriz cuadrada. Devolvé la suma de su diagonal principal.', 10, 'suma-diagonal'),
(30, 'Matriz identidad', 'Generá una matriz identidad de n × n: unos en la diagonal y ceros en el resto.', 10, 'identidad'),
(31, 'Subarreglo de suma máxima', 'Devolvé la mayor suma posible de un subarreglo contiguo (no vacío). Intentá resolverlo en O(n) con el algoritmo de Kadane.', 11, 'subarreglo-maximo'),
(32, 'Dos sumas', 'Devolvé una lista con los índices [i, j] (i < j) de los dos números que suman el objetivo. Siempre existe una única solución.', 11, 'dos-sumas'),
(33, 'Anagramas', 'Devolvé verdadero si ambas palabras usan exactamente las mismas letras, en cualquier orden.', 11, 'anagramas'),
(34, 'Grado máximo', 'El grafo se representa como lista de adyacencia: grafo[i] contiene los vecinos del nodo i. Devolvé el índice del nodo con más vecinos (el menor índice si hay empate).', 12, 'grado-maximo'),
(35, '¿Existe un camino?', 'Usando BFS o DFS, devolvé verdadero si se puede llegar del nodo origen al nodo destino.', 12, 'camino-existe'),
(36, 'Contar aristas', 'El grafo es no dirigido: cada arista aparece dos veces en la lista de adyacencia. Devolvé la cantidad de aristas.', 12, 'contar-aristas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursos`
--

CREATE TABLE `cursos` (
  `id` bigint NOT NULL,
  `nombre` varchar(120) NOT NULL,
  `anos_id` bigint NOT NULL,
  `slug` varchar(80) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `cursos`
--

INSERT INTO `cursos` (`id`, `nombre`, `anos_id`, `slug`, `descripcion`) VALUES
(1, 'Pensamiento Computacional', 1, '1', 'Sabra dios lo q hacen'),
(3, 'Pensamiento Computacional', 2, '3', 'Lo mismo q primero'),
(5, 'Tecnología de Control', 3, '5', 'Arduino'),
(6, 'Algoritmo y Programación', 3, '6', 'Tic80'),
(7, 'Lógica Computacional', 4, '7', 'Proyecto Mouse'),
(8, 'Algoritmos y Estructura de Datos', 4, '8', 'Tic80'),
(9, 'Diseño de Software', 5, '9', 'Tortura de holademonio alias pipi'),
(10, 'Programación Web', 5, '10', 'Fede capo'),
(11, 'Algoritmos Avanzados', 6, '11', 'Optimización y técnicas de entrevista técnica.'),
(12, 'Teoría de Grafos', 6, '12', 'Listas de adyacencia, recorridos y caminos.'),
(15, 'Adm. Gestión de Base de Datos', 5, '13', 'Consultas SQL, diseño relacional y administración de bases de datos.'),
(16, 'Disp. electronicos programables', 5, '14', 'aprobame navarro');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entregas`
--

CREATE TABLE `entregas` (
  `id` bigint NOT NULL,
  `nombre` varchar(120) NOT NULL,
  `codigo_enviado` text,
  `estado` varchar(50) DEFAULT NULL,
  `estudiante_id` bigint NOT NULL,
  `consigna_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiantes`
--

CREATE TABLE `estudiantes` (
  `id` bigint NOT NULL,
  `nombre` varchar(120) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `flyway_schema_history`
--

CREATE TABLE `flyway_schema_history` (
  `installed_rank` int NOT NULL,
  `version` varchar(50) DEFAULT NULL,
  `description` varchar(200) NOT NULL,
  `type` varchar(20) NOT NULL,
  `script` varchar(1000) NOT NULL,
  `checksum` int DEFAULT NULL,
  `installed_by` varchar(100) NOT NULL,
  `installed_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `execution_time` int NOT NULL,
  `success` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `flyway_schema_history`
--

INSERT INTO `flyway_schema_history` (`installed_rank`, `version`, `description`, `type`, `script`, `checksum`, `installed_by`, `installed_on`, `execution_time`, `success`) VALUES
(1, '1', 'anos', 'SQL', 'V1__anos.sql', -1553547518, 'tiCode', '2026-11-12 18:47:55', 15, 1),
(2, '2', 'estudiantes', 'SQL', 'V2__estudiantes.sql', 367017634, 'tiCode', '2026-11-12 18:47:55', 7, 1),
(3, '3', 'cursos', 'SQL', 'V3__cursos.sql', 398046137, 'tiCode', '2026-11-12 18:47:55', 6, 1),
(4, '4', 'consignas', 'SQL', 'V4__consignas.sql', 618747467, 'tiCode', '2026-11-12 18:47:55', 6, 1),
(5, '5', 'inscripciones', 'SQL', 'V5__inscripciones.sql', -2011705029, 'tiCode', '2026-11-12 18:47:55', 7, 1),
(6, '6', 'entregas', 'SQL', 'V6__entregas.sql', 232520078, 'tiCode', '2026-11-12 18:47:55', 6, 1),
(7, '7', 'corregir modelo anos cursos', 'SQL', 'V7__corregir_modelo_anos_cursos.sql', 426883004, 'tiCode', '2026-11-12 21:45:35', 88, 1),
(8, '8', 'datos iniciales anos cursos', 'SQL', 'V8__datos_iniciales_anos_cursos.sql', 1624305846, 'tiCode', '2026-11-12 21:45:35', 7, 1),
(9, '9', 'ampliar codigo y descripcion', 'SQL', 'V9__ampliar_codigo_y_descripcion.sql', 1700916788, 'tiCode', '2026-11-12 21:45:35', 63, 1),
(10, '10', 'consignas con slug y datos', 'SQL', 'V10__consignas_con_slug_y_datos.sql', 521873684, 'tiCode', '2026-11-12 22:00:41', 57, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inscripciones`
--

CREATE TABLE `inscripciones` (
  `id` bigint NOT NULL,
  `estudiantes_id` bigint NOT NULL,
  `cursos_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `anos`
--
ALTER TABLE `anos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_anos_numero` (`numero`);

--
-- Indices de la tabla `consignas`
--
ALTER TABLE `consignas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_consignas_curso_slug` (`cursos_id`,`slug`);

--
-- Indices de la tabla `cursos`
--
ALTER TABLE `cursos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_cursos_slug` (`slug`),
  ADD KEY `fk_cursos_anos` (`anos_id`);

--
-- Indices de la tabla `entregas`
--
ALTER TABLE `entregas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_entrega_estudiante` (`estudiante_id`),
  ADD KEY `fk_entrega_consigna` (`consigna_id`);

--
-- Indices de la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `flyway_schema_history`
--
ALTER TABLE `flyway_schema_history`
  ADD PRIMARY KEY (`installed_rank`),
  ADD KEY `flyway_schema_history_s_idx` (`success`);

--
-- Indices de la tabla `inscripciones`
--
ALTER TABLE `inscripciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_estudiante_inscripciones` (`estudiantes_id`),
  ADD KEY `fk_cursos_inscripciones` (`cursos_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `anos`
--
ALTER TABLE `anos`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `consignas`
--
ALTER TABLE `consignas`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `cursos`
--
ALTER TABLE `cursos`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `entregas`
--
ALTER TABLE `entregas`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `inscripciones`
--
ALTER TABLE `inscripciones`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `consignas`
--
ALTER TABLE `consignas`
  ADD CONSTRAINT `fk_cursos` FOREIGN KEY (`cursos_id`) REFERENCES `cursos` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `cursos`
--
ALTER TABLE `cursos`
  ADD CONSTRAINT `fk_cursos_anos` FOREIGN KEY (`anos_id`) REFERENCES `anos` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `entregas`
--
ALTER TABLE `entregas`
  ADD CONSTRAINT `fk_entrega_consigna` FOREIGN KEY (`consigna_id`) REFERENCES `consignas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_entrega_estudiante` FOREIGN KEY (`estudiante_id`) REFERENCES `estudiantes` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `inscripciones`
--
ALTER TABLE `inscripciones`
  ADD CONSTRAINT `fk_cursos_inscripciones` FOREIGN KEY (`cursos_id`) REFERENCES `cursos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_estudiante_inscripciones` FOREIGN KEY (`estudiantes_id`) REFERENCES `estudiantes` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
