let gastos = [
    { nombre: "Alquiler", costo: 0 },
    { nombre: "Agua", costo: 0 },
    { nombre: "Luz", costo: 0 },
    { nombre: "Mercado", costo: 0 },
    { nombre: "Otros Gastos", costo: 0 }
];

function saveUserInfo(name, age) {
    const userInfo = { name, age };
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
}

function getCost(gasto, inputId) {
    let inputElement = document.getElementById(inputId);
    let costo = parseFloat(inputElement.value);
    if (isNaN(costo) || costo < 0) {
        document.getElementById('message').textContent = "Por favor, ingrese un número válido mayor o igual a 0.";
        return false;
    }
    gasto.costo = costo;
    return true;
}

function calculateTotal() {
    let budget = parseFloat(document.getElementById("budget").value);
    if (isNaN(budget) || budget < 0) {
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

    total = Math.round(total);
    budget = Math.round(budget);

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
}

function buscarGastoPorNombre() {
    let nombreGasto = document.getElementById("searchValue").value.trim().toLowerCase();
    let gastoEncontrado = gastos.find(gasto => gasto.nombre.toLowerCase() === nombreGasto);

    let resultadoElement = document.getElementById("resultado");
    let totalGastosElement = document.getElementById("totalGastos");

    if (gastoEncontrado) {
        totalGastosElement.textContent = `El gasto de ${gastoEncontrado.nombre} tiene un costo de $${gastoEncontrado.costo}.`;
    } else {
        totalGastosElement.textContent = `No se encontró un gasto con el nombre "${nombreGasto}".`;
    }

    resultadoElement.classList.remove("hidden");
}

function filtrarGastosMayoresA() {
    let valorMinimo = parseFloat(document.getElementById("filterValue").value);
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

function startSimulation() {
    let userInfo = localStorage.getItem('userInfo');
    let userInfoElement = document.getElementById("userInfo");
    let gastosFormElement = document.getElementById("gastosForm");

    if (userInfo) {
        userInfo = JSON.parse(userInfo);
        userInfoElement.classList.add("hidden");
        gastosFormElement.classList.remove("hidden");
    }
}

function initSimulator() {
    document.getElementById("startSimulation").addEventListener("click", function () {
        let name = document.getElementById("name").value;
        let age = parseInt(document.getElementById("age").value);

        if (!name || isNaN(age) || age <= 0) {
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

document.addEventListener("DOMContentLoaded", function() {
    loadGastosInputs();
    initSimulator();
});
