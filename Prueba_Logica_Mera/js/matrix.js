const matrix = [];
const maxSelections = 5;
let selections = 0;

// Crear la matriz 10x5
for (let i = 0; i < 10; i++) {
  matrix.push([]);
  for (let j = 0; j < 5; j++) {
    matrix[i].push({ value: 0, disabled: false });
  }
}

const resetButton = document.getElementById("resetBtn");
const randomButton = document.getElementById("randomBtn");

// Función para actualizar la visualización de la matriz
function updateMatrixView() {
  const table = document.getElementById("matrix");
  table.innerHTML = "";

  for (let i = 0; i < matrix.length; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < matrix[i].length; j++) {
      const cell = document.createElement("td");
      if (matrix[i][j].value === 1) {
        cell.classList.add("selected");
        cell.textContent = "X";
      }
      if (matrix[i][j].disabled) {
        cell.classList.add("row-selected");
        cell.classList.add("col-selected");
      }
      cell.addEventListener("click", () => toggleCell(i, j));
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
}

// Función para seleccionar/deseleccionar una celda
function toggleCell(row, col) {
  if (selections >= maxSelections) {
    alert("¡Excelente trabajo! Has alcanzado el número máximo de celdas seleccionables. Para continuar eligiendo más celdas, por favor reinicia la matriz.");
    return;
  }

  const currentCell = matrix[row][col];
  if (!currentCell.disabled) {
    currentCell.value = currentCell.value === 1 ? 0 : 1;
    currentCell.disabled = true;
    selections++;

    for (let i = 0; i < matrix.length; i++) {
      matrix[i][col].disabled = true;
    }
    for (let j = 0; j < matrix[row].length; j++) {
      matrix[row][j].disabled = true;
    }
  }

  updateMatrixView();
}

// Función para reiniciar la matriz
function resetMatrix() {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      matrix[i][j].value = 0;
      matrix[i][j].disabled = false;
    }
  }
  selections = 0;
  updateMatrixView();
}

// Función para generar un número aleatorio y pintar la celda correspondiente
function generateRandom() {
  if (selections >= maxSelections) {
    alert("¡Excelente trabajo! Has alcanzado el número máximo de celdas seleccionables. Para continuar eligiendo más celdas, por favor reinicia la matriz.");
    return;
  }

  const availableCells = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (!matrix[i][j].disabled) {
        availableCells.push({ row: i, col: j });
      }
    }
  }

  if (availableCells.length === 0) {
    alert("¡Enhorabuena! Cada una de las celdas ha sido pintada. Te invitamos a reiniciar la matriz para seguir adelante. ¡Gracias!");
    return;
  }

  const randomIndex = Math.floor(Math.random() * availableCells.length);
  const randomCell = availableCells[randomIndex];
  const selectedCell = matrix[randomCell.row][randomCell.col];

  selectedCell.value = 1;
  selectedCell.disabled = true;
  selections++;

  for (let i = 0; i < matrix.length; i++) {
    matrix[i][randomCell.col].disabled = true;
  }
  for (let j = 0; j < matrix[randomCell.row].length; j++) {
    matrix[randomCell.row][j].disabled = true;
  }

  updateMatrixView();
}

// Asignar funciones a los botones
resetButton.addEventListener("click", resetMatrix);
randomButton.addEventListener("click", generateRandom);

// Inicializar la matriz y la visualización
updateMatrixView();