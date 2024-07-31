// Función para obtener el costo de un ítem
function getCost(itemName) {
    let cost = parseFloat(prompt(`Ingrese el costo mensual para ${itemName}:`));
    while (isNaN(cost) || cost < 0) {
        alert("Por favor, ingrese un número válido mayor o igual a 0.");
        cost = parseFloat(prompt(`Ingrese el costo mensual para ${itemName}:`));
    }
    return cost;
}

// Función para calcular el costo total mensual
function calculateTotal() {
    let budget = getCost("Presupuesto");
    let items = ["Alquiler", "Agua", "Luz", "Mercado", "Otros Gastos"];
    let total = 0;
    
    for (let i = 0; i < items.length; i++) {
        total += getCost(items[i]);
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
}

// Ejecutar la función para calcular el total después de 5 segundos
setTimeout(calculateTotal, 500);


