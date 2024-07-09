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
    let items = ["Alquiler", "Servicios (agua, luz, etc.)", "Comestibles", "Otros Gastos"];
    let total = 0;
    
    for (let i = 0; i < items.length; i++) {
        total += getCost(items[i]);
    }
    
    alert(`Costo Total Mensual: $${total.toFixed(2)}`);
}

// Ejecutar la función para calcular el total
calculateTotal();
