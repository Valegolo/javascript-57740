// Array de objetos gastos
let gastos = [
    { nombre: "Alquiler", costo: 0 },
    { nombre: "Agua", costo: 0 },
    { nombre: "Luz", costo: 0 },
    { nombre: "Mercado", costo: 0 },
    { nombre: "Otros Gastos", costo: 0 }
];

// Función para obtener el costo de un ítem
function getCost(gasto) {
    let costo = parseFloat(prompt(`Ingrese el costo mensual para ${gasto.nombre}:`));
    while (isNaN(costo) || costo < 0) {
        alert("Por favor, ingrese un número válido mayor o igual a 0.");
        costo = parseFloat(prompt(`Ingrese el costo mensual para ${gasto.nombre}:`));
    }
    gasto.costo = costo; // Asignar el costo al objeto
    return costo; // Retornar el costo
}

// Función para calcular el costo total mensual
function calculateTotal() {
    let budgetObj = { nombre: "Presupuesto", costo: 0 };
    let budget = getCost(budgetObj);  // Obtener el costo del presupuesto
    let total = 0;
    
    for (let i = 0; i < gastos.length; i++) {
        total += getCost(gastos[i]);
    }

    total = Math.round(total);  // Redondear el total a un número entero
    budget = Math.round(budget);  // Redondear el presupuesto a un número entero

    if (total > budget) {
        let difference = total - budget;
        alert(`El presupuesto no es suficiente. La diferencia es: $${difference}`);
    } else {
        let savings = budget - total;
        alert(`Costo Total Mensual: $${total}\nCapacidad de Ahorro: $${savings}`);
    }

    // Opciones para el usuario después del cálculo
    let opcion = prompt("¿Qué le gustaría hacer ahora?\n1. Buscar un gasto por nombre\n2. Filtrar gastos mayores a un valor\n3. Salir");

    if (opcion === "1") {
        let nombreGasto = prompt("Ingrese el nombre del gasto que desea buscar:");
        buscarGastoPorNombre(nombreGasto);
    } else if (opcion === "2") {
        let valorMinimo = parseFloat(prompt("Ingrese el valor mínimo para filtrar los gastos:"));
        filtrarGastosMayoresA(valorMinimo);
    } else {
        alert("Gracias por usar el sistema.");
    }
}

// Función para buscar un gasto específico por nombre
function buscarGastoPorNombre(nombre) {
    let gastoEncontrado = gastos.find(gasto => gasto.nombre.toLowerCase() === nombre.toLowerCase());
    if (gastoEncontrado) {
        alert(`El gasto de ${gastoEncontrado.nombre} tiene un costo de $${gastoEncontrado.costo}.`);
    } else {
        alert(`No se encontró un gasto con el nombre ${nombre}.`);
    }
}

// Función para filtrar gastos con un costo mayor a un valor dado
function filtrarGastosMayoresA(valor) {
    let gastosFiltrados = gastos.filter(gasto => gasto.costo > valor);
    if (gastosFiltrados.length > 0) {
        alert(`Gastos mayores a $${valor}:\n` + gastosFiltrados.map(g => `${g.nombre}: $${g.costo}`).join("\n"));
    } else {
        alert(`No hay gastos mayores a $${valor}.`);
    }
}

// Calcular el total después de algunos segundos
setTimeout(calculateTotal, 500);


