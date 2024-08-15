// Array de objetos gastos
let gastos = [
    { nombre: "Alquiler", costo: 0 },
    { nombre: "Agua", costo: 0 },
    { nombre: "Luz", costo: 0 },
    { nombre: "Mercado", costo: 0 },
    { nombre: "Otros Gastos", costo: 0 }
];

// Función para guardar los datos del usuario en localStorage usando JSON.stringify
function saveUserInfo(name, age) {
    const userInfo = { name, age };
    localStorage.setItem('userInfo', JSON.stringify(userInfo)); // Convertir el objeto en una cadena JSON
}

// Función para obtener el costo de un ítem
function getCost(gasto, inputId) {
    let inputElement = document.getElementById(inputId);
    let costo = parseFloat(inputElement.value);
    if (isNaN(costo) || costo < 0) {
        // Mostrar mensaje de error en el DOM
        document.getElementById('message').textContent = "Por favor, ingrese un número válido mayor o igual a 0.";
        return false;
    }
    gasto.costo = costo; // Asignar el costo al objeto
    return true; // Retornar true si el costo es válido
}

// Función para calcular el costo total mensual
function calculateTotal() {
    let budget = parseFloat(document.getElementById("budget").value);
    if (isNaN(budget) || budget < 0) {
        // Mostrar mensaje de error en el DOM
        document.getElementById('message').textContent = "Por favor, ingrese un presupuesto válido.";
        return;
    }

    let total = 0;
    let validInputs = true;

    for (let i = 0; i < gastos.length; i++) {
        if (!getCost(gastos[i], `gasto${i}`)) {
            validInputs = false;
            break;
        }
        total += gastos[i].costo;
    }

    if (!validInputs) return;

    total = Math.round(total);  // Redondear el total a un número entero
    budget = Math.round(budget);  // Redondear el presupuesto a un número entero

    let resultadoElement = document.getElementById("resultado");
    let totalGastosElement = document.getElementById("totalGastos");
    let diferenciaElement = document.getElementById("diferencia");

    totalGastosElement.textContent = `Costo Total Mensual: $${total}`;

    if (total > budget) {
        let difference = total - budget;
        diferenciaElement.textContent = `El presupuesto no es suficiente. La diferencia es: $${difference}`;
    } else {
        let savings = budget - total;
        diferenciaElement.textContent = `Capacidad de Ahorro: $${savings}`;
    }

    resultadoElement.classList.remove("hidden");
    document.getElementById("opciones").classList.remove("hidden");
}

// Función para buscar un gasto específico por nombre
function buscarGastoPorNombre() {
    let nombreGasto = prompt("Ingrese el nombre del gasto que desea buscar:");
    let gastoEncontrado = gastos.find(gasto => gasto.nombre.toLowerCase() === nombreGasto.toLowerCase());

    let resultadoElement = document.getElementById("resultado");
    let totalGastosElement = document.getElementById("totalGastos");

    if (gastoEncontrado) {
        totalGastosElement.textContent = `El gasto de ${gastoEncontrado.nombre} tiene un costo de $${gastoEncontrado.costo}.`;
    } else {
        totalGastosElement.textContent = `No se encontró un gasto con el nombre ${nombreGasto}.`;
    }

    resultadoElement.classList.remove("hidden");
}

// Función para filtrar gastos con un costo mayor a un valor dado
function filtrarGastosMayoresA() {
    let valorMinimo = parseFloat(prompt("Ingrese el valor mínimo para filtrar los gastos:"));
    let gastosFiltrados = gastos.filter(gasto => gasto.costo > valorMinimo);

    let resultadoElement = document.getElementById("resultado");
    let totalGastosElement = document.getElementById("totalGastos");

    if (gastosFiltrados.length > 0) {
        totalGastosElement.textContent = `Gastos mayores a $${valorMinimo}:\n` + gastosFiltrados.map(g => `${g.nombre}: $${g.costo}`).join("\n");
    } else {
        totalGastosElement.textContent = `No hay gastos mayores a $${valorMinimo}.`;
    }

    resultadoElement.classList.remove("hidden");
}

// Función para iniciar la simulación
function startSimulation() {
    let userInfo = localStorage.getItem('userInfo');
    let userInfoElement = document.getElementById("userInfo");
    let gastosFormElement = document.getElementById("gastosForm");

    if (userInfo) {
        userInfo = JSON.parse(userInfo); // Convertir la cadena JSON en un objeto JavaScript
        userInfoElement.classList.add("hidden");
        gastosFormElement.classList.remove("hidden");
    }
}

// Inicializar el simulador y los eventos
function initSimulator() {
    document.getElementById("startSimulation").addEventListener("click", function () {
        let name = document.getElementById("name").value;
        let age = parseInt(document.getElementById("age").value);

        if (!name || isNaN(age) || age <= 0) {
            // Mostrar mensaje de error en el DOM
            document.getElementById('message').textContent = "Por favor, ingrese un nombre válido y una edad mayor a 0.";
            return;
        }

        saveUserInfo(name, age);
        startSimulation();
    });

    document.getElementById("calculateTotal").addEventListener("click", calculateTotal);
    document.getElementById("buscarGasto").addEventListener("click", buscarGastoPorNombre);
    document.getElementById("filtrarGastos").addEventListener("click", filtrarGastosMayoresA);
}

// Cargar los inputs de gastos al cargar la página
function loadGastosInputs() {
    let gastosInputsContainer = document.getElementById("gastosInputs");

    gastos.forEach((gasto, index) => {
        let inputGroup = document.createElement("div");
        inputGroup.className = "input-group";

        let label = document.createElement("label");
        label.htmlFor = `gasto${index}`;
        label.textContent = `Costo para ${gasto.nombre}:`;

        let input = document.createElement("input");
        input.type = "number";
        input.id = `gasto${index}`;
        input.placeholder = `Ingresa el costo de ${gasto.nombre}`;

        inputGroup.appendChild(label);
        inputGroup.appendChild(input);
        gastosInputsContainer.appendChild(inputGroup);
    });
}

// Evento al cargar la página
document.addEventListener("DOMContentLoaded", function () {
    initSimulator();
    loadGastosInputs();
});
