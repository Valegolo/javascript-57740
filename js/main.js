let gastos = [
    { nombre: "Alquiler", costo: 0 },
    { nombre: "Agua", costo: 0 },
    { nombre: "Luz", costo: 0 },
    { nombre: "Mercado", costo: 0 },
    { nombre: "Otros Gastos", costo: 0 }
];

function getCost(gasto) {
    let costo = parseFloat(prompt(`Ingrese el costo mensual para ${gasto.nombre}:`));
    while (isNaN(costo) || costo < 0) {
        alert("Por favor, ingrese un número válido mayor o igual a 0.");
        costo = parseFloat(prompt(`Ingrese el costo mensual para ${gasto.nombre}:`));
    }
    gasto.costo = costo;
    return costo;
}

function calculateTotal() {
    let budgetObj = { nombre: "Presupuesto", costo: 0 };
    let budget = getCost(budgetObj);
    let total = 0;
    
    for (let i = 0; i < gastos.length; i++) {
        total += getCost(gastos[i]);
    }

    total = Math.round(total);
    budget = Math.round(budget);

    if (total > budget) {
        let difference = total - budget;
        alert(`El presupuesto no es suficiente. La diferencia es: $${difference}`);
    } else {
        let savings = budget - total;
        alert(`Costo Total Mensual: $${total}\nCapacidad de Ahorro: $${savings}`);
    }

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

function buscarGastoPorNombre(nombre) {
    let gastoEncontrado = gastos.find(gasto => gasto.nombre.toLowerCase() === nombre.toLowerCase());
    if (gastoEncontrado) {
        alert(`El gasto de ${gastoEncontrado.nombre} tiene un costo de $${gastoEncontrado.costo}.`);
    } else {
        alert(`No se encontró un gasto con el nombre ${nombre}.`);
    }
}

function filtrarGastosMayoresA(valor) {
    let gastosFiltrados = gastos.filter(gasto => gasto.costo > valor);
    if (gastosFiltrados.length > 0) {
        alert(`Gastos mayores a $${valor}:\n` + gastosFiltrados.map(g => `${g.nombre}: $${g.costo}`).join("\n"));
    } else {
        alert(`No hay gastos mayores a $${valor}.`);
    }
}

setTimeout(calculateTotal, 500);



