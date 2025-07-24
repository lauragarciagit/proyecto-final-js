const nombre = document.getElementById("nombre");
const btnEnviar = document.getElementById("btnEnviar");
const mensaje = document.getElementById("mensaje");
const botonGuardar = document.getElementById("guardarNombre");
const botonEliminar = document.getElementById("eliminarNombre");
const botonGuardarPuntaje = document.getElementById("Guardar puntaje");
const contenedorCards = document.querySelector(".cards");
let puntos = 0;
let preguntasRespondidas = 0;

// Objeto jugador
const jugador = {
  nombre: "",
  puntaje: 0,
  respuestas: [],
  ganoEntradas: false
};

// Array de preguntas
const preguntas = [
  {
    texto: "¿Quién escribió El conventillo de la Paloma?",
    opciones: [
      { texto: "Federico García Lorca", correcto: false },
      { texto: "Alberto Vaccarezza", correcto: true },
      { texto: "Roberto Cossa", correcto: false }
    ]
  },
  {
    texto: "¿A qué género pertenece Esperando a Godot?",
    opciones: [
      { texto: "Teatro del absurdo", correcto: true },
      { texto: "Teatro épico", correcto: false },
      { texto: "Comedia musical", correcto: false }
    ]
  },
  {
    texto: "¿Qué autor argentino escribió La Nona?",
    opciones: [
      { texto: "Tito Lusiardo", correcto: false },
      { texto: "Carlos Gorostiza", correcto: false },
      { texto: "Roberto Cossa", correcto: true }
    ]
  },
  {
    texto: "¿Quién ganó el Martín Fierro Teatro de oro 2025?",
    opciones: [
      { texto: "Julio Chávez", correcto: false },
      { texto: "Nicolás Vázquez", correcto: false },
      { texto: "Gabriel Goity", correcto: true }
    ]
  },
  {
    texto: "¿Qué personaje dice la frase “Ser o no ser, esa es la cuestión”?",
    opciones: [
      { texto: "Macbeth", correcto: false },
      { texto: "Hamlet", correcto: true },
      { texto: "Otel·lo", correcto: false }
    ]
  },
  {
    texto: "¿Cuál de estas obras fue escrita por Tenessee Williams?",
    opciones: [
      { texto: "Un tranvía llamado libertad", correcto: false },
      { texto: "Un tranvía llamado deseo", correcto: true },
      { texto: "La gata sobre el tejado de zinc caliente", correcto: false }
    ]
  },
  {
    texto: "¿Qué obra fue escrita por Arthur Miller?",
    opciones: [
      { texto: "La muerte de un viajante", correcto: true },
      { texto: "La gaviota", correcto: false },
      { texto: "Esperando a Godot", correcto: false }
    ]
  },
  {
    texto: "¿Quién escribió El zoo de cristal?",
    opciones: [
      { texto: "Edward Albee", correcto: false },
      { texto: "Tennessee Williams", correcto: true },
      { texto: "Sam Shepard", correcto: false }
    ]
  }
];

// Cargar nombre
btnEnviar.addEventListener("click", () => {
  const nuevoTexto = nombre.value.trim();
  if (nuevoTexto !== "") {
    jugador.nombre = nuevoTexto;
    mensaje.textContent = `¡Hola, ${nuevoTexto}! Bienvenido/a a la trivia.`;
  } else {
    mensaje.textContent = "Debes ingresar un texto válido.";
  }
});

// Guardar jugador en localStorage
botonGuardar.addEventListener("click", () => {
  localStorage.setItem("jugador", JSON.stringify(jugador));
  alert("Datos guardados correctamente.");
});

// Eliminar jugador
botonEliminar.addEventListener("click", () => {
  localStorage.removeItem("jugador");
  alert("Datos eliminados.");
});

// Cargar preguntas dinámicamente
preguntas.forEach((preguntaObj, index) => {
  const card = document.createElement("div");
  card.className = "card";

  const pregunta = document.createElement("p");
  pregunta.className = "pregunta";
  pregunta.textContent = preguntaObj.texto;

  const opciones = document.createElement("div");
  opciones.className = "opciones";

  preguntaObj.opciones.forEach((opcion) => {
    const boton = document.createElement("button");
    boton.className = "btn";
    boton.textContent = opcion.texto;
    boton.dataset.correcto = opcion.correcto;

    boton.addEventListener("click", () => {
      manejarRespuesta(boton, card, opcion.correcto);
    });

    opciones.appendChild(boton);
  });

  const respuesta = document.createElement("div");
  respuesta.className = "respuesta";

  card.appendChild(pregunta);
  card.appendChild(opciones);
  card.appendChild(respuesta);

  contenedorCards.appendChild(card);
});

// Función que maneja la respuesta
function manejarRespuesta(boton, card, esCorrecta) {
  const respuesta = card.querySelector(".respuesta");
  const textoPregunta = card.querySelector(".pregunta").textContent;
  const textoOpcion = boton.textContent;

  jugador.respuestas.push({
    pregunta: textoPregunta,
    respuestaDada: textoOpcion,
    correcta: esCorrecta
  });

  if (esCorrecta) {
    puntos += 30;
    jugador.puntaje = puntos;
    boton.style.backgroundColor = "#4CAF50"; // verde
    boton.style.color = "white";
    respuesta.textContent = "¡Correcto!";
    respuesta.style.color = "#4CAF50";
  } else {
    puntos -= 10;
    jugador.puntaje = puntos;
    boton.style.backgroundColor = "#f44336"; // rojo
    boton.style.color = "white";
    respuesta.textContent = "Incorrecto.";
    respuesta.style.color = "#f44336";
  }

  preguntasRespondidas++;

  // Mostrar resultado final
  if (preguntasRespondidas === preguntas.length) {
    const puntosGanador = document.getElementById("puntosGanador");
    if (puntos >= 200) {
      jugador.ganoEntradas = true;
      puntosGanador.textContent = "🎉 ¡Ganaste 2 entradas al teatro! 🎭";
      puntosGanador.style.color = "#9C27B0";
    } else {
      jugador.ganoEntradas = false;
      puntosGanador.textContent = "😢 Estuviste cerca, será la próxima.";
      puntosGanador.style.color = "#8D6E63";
    }
  }


  // Deshabilitar todos los botones de esta tarjeta
  const botones = card.querySelectorAll(".btn");
  botones.forEach((btn) => {
    btn.disabled = true;
  });

  // Actualizar puntaje en pantalla
  document.getElementById("puntuacion").textContent = puntos;
}
