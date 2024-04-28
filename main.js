// Seleccionar el formulario
const form = document.getElementById("calculatorForm");

// Agregar un event listener para el evento "submit"
form.addEventListener("submit", function(event) {
  // Prevenir el comportamiento por defecto del formulario
  event.preventDefault();

  // Obtener los valores del formulario y convertirlos a números decimales
  const ladoMayor = parseFloat(document.getElementById("ladoMayor").value);
  const ladoMenor = parseFloat(document.getElementById("ladoMenor").value);
  const cantidadLaminas = parseInt(document.getElementById("cantidadLaminas").value);

  // Validar que los valores ingresados sean válidos (no NaN)
  if (isNaN(ladoMayor) || isNaN(ladoMenor) || isNaN(cantidadLaminas)) {
    alert("Por favor ingresa valores válidos para los lados mayor y menor, y la cantidad de láminas.");
    return;
  }

  // Calcular las longitudes de las láminas
  const longitudes = calcularLongitudesLaminas(ladoMayor, ladoMenor, cantidadLaminas);

  // Limpiar la lista antes de agregar nuevos elementos
  const listaLongitudes = document.getElementById("listaLongitudes");
  listaLongitudes.innerHTML = "";

  // Iterar sobre las longitudes calculadas y agregarlas como elementos de lista
  longitudes.forEach((longitud, index) => {
    const li = document.createElement("li");
    li.textContent = `Lámina ${index + 1}: ${longitud.toFixed(2)} metros`;
    listaLongitudes.appendChild(li);
  });
});

// Función para calcular las longitudes de las láminas
function calcularLongitudesLaminas(ladoMayor, ladoMenor, cantidadLaminas) {
  // Calcular la "razón"
  const razon = (ladoMayor - ladoMenor) / cantidadLaminas;
  
  // Inicializar un arreglo para almacenar las longitudes de las láminas
  const longitudes = [];

  // Calcular las longitudes de las láminas
  let longitud = ladoMayor; // La primera lámina siempre tiene la longitud del lado mayor
  longitudes.push(longitud);
  for (let i = 1; i < cantidadLaminas; i++) {
    longitud -= razon; // Restar la razón para obtener la longitud de la siguiente lámina
    longitudes.push(longitud);
  }

  return longitudes;
}




// Función para agregar una fila a la tabla de entrada
function agregarFila() {
  const table = document.getElementById("inputTable");
  const newRow = table.insertRow(-1);
  const cell1 = newRow.insertCell(0);
  const cell2 = newRow.insertCell(1);
  cell1.innerHTML = '<input type="number" min="0" required>'; // Input para cantidad
  cell2.innerHTML = '<input type="number" step="0.01" min="0" required>'; // Input para medida
}

// Función para ordenar las medidas y mostrar el resumen
function ordenarMedidas() {
  const inputTable = document.getElementById("inputTable");
  const outputTable = document.getElementById("outputTable");
  const measuresMap = new Map();
  let totalMetros = 0;

  // Resetear la tabla de salida
  outputTable.innerHTML = "<tr><th>Cantidad</th><th>Medida (metros)</th></tr>";

  // Recorrer las filas de la tabla de entrada y agrupar las medidas
  for (let i = 1; i < inputTable.rows.length; i++) {
    const cells = inputTable.rows[i].cells;
    const quantityInput = cells[0].querySelector('input');
    const measureInput = cells[1].querySelector('input');

    // Verificar si existen los inputs y tienen valores
    if (quantityInput && quantityInput.value && measureInput && measureInput.value) {
      const quantity = parseInt(quantityInput.value);
      const measure = parseFloat(measureInput.value);

      // Verificar si los valores son válidos antes de agregarlos al mapa de medidas
      if (!isNaN(quantity) && !isNaN(measure)) {
        if (measuresMap.has(measure)) {
          measuresMap.set(measure, measuresMap.get(measure) + quantity);
        } else {
          measuresMap.set(measure, quantity);
        }
        totalMetros += quantity * measure; // Calcular total de metros
      }
    }
  }

  // Obtener las medidas del Map y ordenarlas
  const sortedMeasures = Array.from(measuresMap.keys()).sort((a, b) => a - b);

  // Recorrer las medidas ordenadas y agregarlas a la tabla de salida
  sortedMeasures.forEach(measure => {
    const quantity = measuresMap.get(measure);
    const newRow = outputTable.insertRow(-1);
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    cell1.textContent = quantity;
    cell2.textContent = measure.toFixed(2);
  });

  // Agregar fila para mostrar el total de metros
  const totalRow = outputTable.insertRow(-1);
  const totalCell1 = totalRow.insertCell(0);
  const totalCell2 = totalRow.insertCell(1);
  totalCell1.textContent = "Total:";
  totalCell2.textContent = totalMetros.toFixed(2) + " m";



}














