let gastos = [];

function cargarDatosDesdeJSON() {
    return fetch('./js/data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }
            return response.json();
        })
        .then(data => {
            gastos = data;  // Almacena los datos en la variable 'gastos'
        })
        .catch(error => console.error('Error al cargar datos desde JSON:', error));
}

// Simulación de mi "supuesta -API" 
function apiGetGastos() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(gastos);
        }, 500);
    });
}

function apiGetGastoPorNombre(nombre) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const gasto = gastos.find(g => g.nombre.toLowerCase() === nombre.toLowerCase());
            resolve(gasto);
        }, 500);
    });
}

function apiActualizarCostoGasto(nombre, nuevoCosto) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const gasto = gastos.find(g => g.nombre.toLowerCase() === nombre.toLowerCase());
            if (gasto) {
                gasto.costo = nuevoCosto;
                resolve(gasto);
            } else {
                resolve(null);
            }
        }, 500);
    });
}

function apiAgregarGasto(nombre, costo) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const nuevoGasto = { nombre, costo };
            gastos.push(nuevoGasto);
            resolve(nuevoGasto);
        }, 500);
    });
}

// Funciones del simulador - Desde aquí están las funciones anteriores sin API -
function saveUserInfo(name, age) {
    const userInfo = { name, age };
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
}

function getCost(gasto, inputId) {
    let inputElement = document.getElementById(inputId);
    let costo = parseFloat(inputElement.value);
    if (isNaN(costo) || costo < 0) {
        Swal.fire('Error', 'Por favor, ingrese un número válido mayor o igual a 0.', 'error');
        return false;
    }
    gasto.costo = costo;
    return true;
}

function calculateTotal() {
    let budget = parseFloat(document.getElementById("budget").value);
    if (isNaN(budget) || budget < 0) {
        Swal.fire('Error', 'Por favor, ingrese un presupuesto válido.', 'error');
        return;
    }

    apiGetGastos().then(gastos => {
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
            Swal.fire('Atención', `El presupuesto no es suficiente. La diferencia es: $${difference}`, 'warning');
        } else {
            let savings = budget - total;
            diferenciaElement.textContent = `Capacidad de Ahorro: $${savings}`;
            Swal.fire('¡Bien!', `Capacidad de Ahorro: $${savings}`, 'success');
        }

        resultadoElement.classList.remove("hidden");
    });
}

function buscarGastoPorNombre() {
    let nombreGasto = document.getElementById("searchValue").value.trim().toLowerCase();

    apiGetGastoPorNombre(nombreGasto).then(gastoEncontrado => {
        let resultadoElement = document.getElementById("resultado");
        let totalGastosElement = document.getElementById("totalGastos");

        if (gastoEncontrado) {
            totalGastosElement.textContent = `El gasto de ${gastoEncontrado.nombre} tiene un costo de $${gastoEncontrado.costo}.`;
            Swal.fire('Resultado', `El gasto de ${gastoEncontrado.nombre} tiene un costo de $${gastoEncontrado.costo}.`, 'info');
        } else {
            totalGastosElement.textContent = `No se encontró un gasto con el nombre "${nombreGasto}".`;
            Swal.fire('No encontrado', `No se encontró un gasto con el nombre "${nombreGasto}".`, 'error');
        }

        resultadoElement.classList.remove("hidden");
    });
}

function filtrarGastosMayoresA() {
    let valorMinimo = parseFloat(document.getElementById("filterValue").value);

    apiGetGastos().then(gastos => {
        let gastosFiltrados = gastos.filter(gasto => gasto.costo > valorMinimo);

        let resultadoElement = document.getElementById("resultado");
        let totalGastosElement = document.getElementById("totalGastos");

        if (gastosFiltrados.length > 0) {
            totalGastosElement.textContent = `Gastos mayores a $${valorMinimo}:\n` + gastosFiltrados.map(g => `${g.nombre}: $${g.costo}`).join("\n");
            Swal.fire('Resultados', `Gastos mayores a $${valorMinimo}:\n` + gastosFiltrados.map(g => `${g.nombre}: $${g.costo}`).join("\n"), 'info');
        } else {
            totalGastosElement.textContent = `No hay gastos mayores a $${valorMinimo}.`;
            Swal.fire('Sin resultados', `No hay gastos mayores a $${valorMinimo}.`, 'info');
        }

        resultadoElement.classList.remove("hidden");
    });
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
            Swal.fire('Error', 'Por favor, ingrese un nombre válido y una edad mayor a 0.', 'error');
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
    cargarDatosDesdeJSON().then(() => {
        loadGastosInputs();
        initSimulator();
    });
});