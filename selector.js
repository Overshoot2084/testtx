document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.tab1').forEach(tab => {
        tab.addEventListener('click', function() {
            switchTab(this.getAttribute('data-tab'), this);
        });
    });

    document.querySelector('#valores-options').addEventListener('change', function() {
        showValoresWindow(this.value);
    });

    document.querySelector('#resultados-options').addEventListener('change', function() {
        showResultadosWindow(this.value);
    });

    document.querySelector('#valores button').addEventListener('click', calcularValores);
    document.querySelector('#resultados button').addEventListener('click', calculate);
    document.querySelector('#resultados2 button').addEventListener('click', calculate2);

    document.querySelectorAll('.tab-link').forEach(tab => {
        tab.addEventListener('click', function() {
            openTab(this.getAttribute('data-tab'), this);
        });
    });

    // Añadir el evento de cambio de idioma
    document.getElementById('languageSelect').addEventListener('change', function() {
        changeLanguage(this.value);
    });

    const toggle = document.getElementById("togglecontainer");
    toggle.addEventListener('click', function() {
        toggle.classList.toggle("active");
        document.body.classList.toggle("active");
        document.querySelector("header").classList.toggle("active");
        document.querySelector(".card1").classList.toggle("active");
        document.querySelector(".card2").classList.toggle("active");

        // Cambiar el color del texto en modo oscuro
        document.querySelectorAll(".card2, .tab-content, #backButton").forEach(element => {
            element.style.color = document.body.classList.contains("active") ? "white" : "black";
        });
    });

    document.getElementById("crearNotaBtn").addEventListener("click", crearNota);
});

function switchTab(tabId, element) {
    document.querySelectorAll('.contenido1').forEach(tab => {
        tab.style.display = 'none';
    });

    document.querySelectorAll('.select-container').forEach(tab => {
        tab.style.display = 'none';
    });

    document.querySelectorAll('.tab1').forEach(tab => {
        tab.classList.remove('active');
    });

    // Ocultar el tab seleccionado y mostrar solo el otro
    if (tabId === 'valores') {
        document.getElementById('valores-select').style.display = 'block';
        document.getElementById('valores-options').selectedIndex = 0; // Reset select to "Elije una opción"
        document.querySelector('.tab1[data-tab="valores"]').style.display = 'none';
        document.querySelector('.tab1[data-tab="resultados"]').style.display = 'block';
    } else if (tabId === 'resultados') {
        document.getElementById('resultados-select').style.display = 'block';
        document.getElementById('resultados-options').selectedIndex = 0; // Reset select to "Elije una opción"
        document.querySelector('.tab1[data-tab="resultados"]').style.display = 'none';
        document.querySelector('.tab1[data-tab="valores"]').style.display = 'block';
    }

    element.classList.add('active');
    document.getElementById("backButton").style.display = "block";
}

function showValoresWindow(option) {
    if (option === 'valores1') {
        document.getElementById('valores').style.display = 'block';
        hideTabsAndSelects();
    } else {
        document.getElementById('valores').style.display = 'none';
    }
}

function showResultadosWindow(option) {
    if (option === 'resultados1') {
        document.getElementById('resultados').style.display = 'block';
        hideTabsAndSelects();
    } else if (option === 'resultados2') {
        document.getElementById('resultados2').style.display = 'block';
        hideTabsAndSelects();
    } else {
        document.getElementById('resultados').style.display = 'none';
        document.getElementById('resultados2').style.display = 'none';
    }
}

function hideTabsAndSelects() {
    document.querySelector('.seccion1').style.display = 'none';
    document.querySelectorAll('.select-container').forEach(select => {
        select.style.display = 'none';
    });
}

function goBack() {
    document.querySelector('.seccion1').style.display = 'flex';
    document.querySelectorAll('.select-container').forEach(select => {
        select.style.display = 'none';
    });
    document.querySelectorAll('.contenido1').forEach(tab => {
        tab.style.display = 'none';
    });
    document.querySelectorAll('.tab1').forEach(tab => {
        tab.classList.remove('active');
        tab.style.position = 'static';
        tab.style.display = 'block';
    });

    // limpiar contentido
    document.getElementById('opcion1').innerHTML = '';
    document.getElementById("opcion2").innerHTML = "";

    //limpiar inputs
    document.getElementById('numeroInput').value = '';
    document.getElementById('percentage').value = '';
    document.getElementById('dailyValue').value = '';
    document.getElementById('daysCount').value = '';
    document.getElementById('range').value = '';
    document.getElementById('x_value').value = '';
    document.getElementById('numb_y').value = '';
    document.getElementById('range2').value = '';


    document.getElementById("backButton").style.display = "none";
    
}

document.getElementById('backButton').addEventListener('click', goBack);

function calcularValores() {
    const numeroInput = document.getElementById('numeroInput').value;
    const operation = document.getElementById('operaciones').value;
    const units = document.getElementById('units').value;

    if (!validarInput(numeroInput)) {
        alert('Por favor, ingrese un número válido.');
        return;
    }

    const numeros = convertirANumeros(numeroInput, units);
    const resultado = realizarOperacion(numeros, operation);

    const operationElement = document.getElementById('operation');
    const checkElement = document.getElementById('check');

    operationElement.textContent = 'El resultado total es: ' + resultado;
    checkElement.textContent = '';

    // Mostrar los valores generados
    document.getElementById('generated-values-title').style.display = 'block';
    document.getElementById('generated-values-title').textContent = `Valores calculados: ${numeros.join(', ')}`;
}

function validarInput(input) {
    return /^\d+$/.test(input);
}

function convertirANumeros(input, units) {
    let step;
    switch (units) {
        case 'unit':
            step = 1;
            break;
        case 'ten':
            step = 2;
            break;
        case 'hundred':
            step = 3;
            break;
        case 'thousand':
            step = 4;
            break;
        default:
            step = 1;
    }

    const numeros = [];
    for (let i = 0; i < input.length; i += step) {
        const numero = parseInt(input.substr(i, step), 10);
        if (!isNaN(numero)) {
            numeros.push(numero);
        }
    }

    return numeros;
}

function realizarOperacion(numeros, operation) {
    let resultado;

    switch (operation) {
        case 'add':
            resultado = numeros.reduce((acc, num) => acc + num, 0);
            break;
        case 'subtract':
            resultado = numeros.reduce((acc, num) => acc - num);
            break;
        case 'multiply':
            resultado = numeros.reduce((acc, num) => acc * num, 1);
            break;
        case 'divide':
            resultado = numeros.reduce((acc, num) => acc / num);
            break;
        default:
            resultado = 0;
    }

    return resultado;
}

function calculate() {
    const percentage = parseFloat(document.getElementById('percentage').value);
    const dailyValue = parseInt(document.getElementById('dailyValue').value, 10);
    const daysCount = parseInt(document.getElementById('daysCount').value, 10);
    const rangeValue = document.getElementById('range').value.split('-').map(Number);
    const min = rangeValue[0];
    const max = rangeValue[1];

    // Verificación del rango
    if (!isValidRange(min, max, dailyValue, daysCount, percentage)) {
        showRangeSuggestions(dailyValue, daysCount, percentage);
        return;
    }

    let generatedValues = [];
    let total = 0;
    const targetTotal = dailyValue * daysCount * (percentage / 100);

    for (let i = 0; i < daysCount; i++) {
        let randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
        total += randomValue;
        generatedValues.push(randomValue);
    }

    // Ajustar valores para cumplir con el total objetivo
    let iterations = 0;
    while (Math.abs(total - targetTotal) > 0.01 && iterations < 10000) {
        for (let i = 0; i < generatedValues.length; i++) {
            if (total > targetTotal && generatedValues[i] > min) {
                generatedValues[i]--;
                total--;
            } else if (total < targetTotal && generatedValues[i] < max) {
                generatedValues[i]++;
                total++;
            }
        }
        iterations++;
    }

    const calculatedPercentage = (total / (dailyValue * daysCount)) * 100;
    const roundedPercentage = Math.round(calculatedPercentage);

    // Verificar si el porcentaje redondeado coincide con el proporcionado por el usuario
    const isCorrect = roundedPercentage === percentage;

    // Mostrar los valores generados en el tab "resultado"
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = ''; // Limpiar contenido previo

    // Crear título
    const titleElement = document.createElement('h2');
    titleElement.textContent = 'Valores Generados';
    titleElement.style.marginBottom = '20px';
    resultElement.appendChild(titleElement);

    // Mostrar hasta un máximo de 31 valores
    const displayedValues = generatedValues.slice(0, Math.min(daysCount, 31));
    
    // Agrupar los valores en filas de 7, asegurando que no haya más de 3 repeticiones por fila y que no estén juntos
    let ul = document.createElement('ul');
    ul.style.listStyleType = 'none';
    ul.style.paddingLeft = '0';
    ul.style.display = 'inline-block';
    ul.style.textAlign = 'left';
    let count = 0;
    let listItem;
    let valueCounts = {};

    displayedValues.forEach((value, index) => {
        if (!valueCounts[value]) {
            valueCounts[value] = 0;
        }

        if (count === 0) {
            listItem = document.createElement('li');
            listItem.textContent = value;
            valueCounts[value]++;
        } else if (count < 7) {
            if (valueCounts[value] < 3) {
                listItem.textContent += `, ${value}`;
                valueCounts[value]++;
            } else {
                for (let i = min; i <= max; i++) {
                    if (!valueCounts[i]) {
                        valueCounts[i] = 0;
                    }

                    if (valueCounts[i] < 3) {
                        listItem.textContent += `, ${i}`;
                        valueCounts[i]++;
                        break;
                    }
                }
            }
        } else {
            ul.appendChild(listItem);
            listItem = document.createElement('li');
            listItem.textContent = value;
            count = 0;
            valueCounts = {};
            valueCounts[value] = 1;
        }
        count++;
    });

    if (listItem) ul.appendChild(listItem);
    resultElement.appendChild(ul);

    // Mostrar resultados en el tab "resultado"
    const resultadoTab = document.getElementById('opcion1');
    resultadoTab.style.display = 'flex';
    resultadoTab.style.flexDirection = 'column';
    resultadoTab.style.alignItems = 'center';

    // Actualizar el estado de "correcto" o "incorrecto" visualmente
    resultElement.className = isCorrect ? 'correcto' : 'incorrecto';
}

function isValidRange(min, max, dailyValue, daysCount, percentage) {
    const minPossibleSum = min * daysCount;
    const maxPossibleSum = max * daysCount;
    const targetTotal = dailyValue * daysCount * (percentage / 100);

    return min <= max && targetTotal >= minPossibleSum && targetTotal <= maxPossibleSum;
}

function showRangeSuggestions(dailyValue, daysCount, percentage) {
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = ''; // Limpiar contenido previo

    const titleElement = document.createElement('h2');
    titleElement.textContent = 'Rango Proporcionado No Válido';
    titleElement.style.marginBottom = '20px';
    resultElement.appendChild(titleElement);

    const suggestionText = document.createElement('p');
    suggestionText.textContent = 'Sugerencias de Rango:';
    resultElement.appendChild(suggestionText);

    const targetTotal = dailyValue * daysCount * (percentage / 100);
    const minSuggestedRange = Math.ceil(targetTotal / daysCount);
    const maxSuggestedRange = Math.floor(targetTotal / daysCount);

    const suggestions = [
        `${Math.min(minSuggestedRange, maxSuggestedRange)}-${Math.max(minSuggestedRange, maxSuggestedRange)}`,
        `${Math.min(Math.max(minSuggestedRange - 1, 1), maxSuggestedRange + 1)}-${Math.max(Math.max(minSuggestedRange - 1, 1), maxSuggestedRange + 1)}`,
        `${Math.min(minSuggestedRange + 1, Math.max(maxSuggestedRange - 1, 1))}-${Math.max(minSuggestedRange + 1, Math.max(maxSuggestedRange - 1, 1))}`
    ];

    const validSuggestions = suggestions.filter(suggestion => {
        const [min, max] = suggestion.split('-').map(Number);
        return isValidRange(min, max, dailyValue, daysCount, percentage);
    });

    let ul = document.createElement('ul');
    ul.style.listStyleType = 'none';
    ul.style.paddingLeft = '0';
    ul.style.display = 'inline-block';
    ul.style.textAlign = 'left';

    if (validSuggestions.length > 0) {
        validSuggestions.forEach(suggestion => {
            let listItem = document.createElement('li');
            listItem.textContent = suggestion;
            ul.appendChild(listItem);
        });
    } else {
        let listItem = document.createElement('li');
        listItem.textContent = 'No hay más rangos disponibles.';
        ul.appendChild(listItem);
    }

    resultElement.appendChild(ul);

    // Crear botón de reset para obtener nuevos rangos sugeridos si hay más disponibles
    if (validSuggestions.length > 1) {
        const resetButton = document.createElement('button');
        resetButton.innerHTML = '&#x21bb;'; // Unicode for the reload symbol
        resetButton.className = 'reset-button';
        resetButton.onclick = () => {
            validSuggestions.shift(); // Remove the current suggestion
            showRangeSuggestions(dailyValue, daysCount, percentage);
        };
        resultElement.appendChild(resetButton);
    }

    // Mostrar resultados en el tab "resultado"
    const resultadoTab = document.getElementById('opcion1').innerHTML = opcion1;
    resultadoTab.style.display = 'flex';
    resultadoTab.style.flexDirection = 'column';
    resultadoTab.style.alignItems = 'center';
}













function calculate2() {
    const xValue = parseInt(document.getElementById('x_value').value);
    const numY = parseInt(document.getElementById('num_y').value);
    const rangeInput = document.getElementById('range2').value;
    let [minRange, maxRange] = rangeInput.split('-').map(parseFloat);

    if (minRange > maxRange) {
        [minRange, maxRange] = [maxRange, minRange];
    }

    // Verificar si el rango es posible
    const minPossibleSum = minRange * numY;
    const maxPossibleSum = maxRange * numY;
    const checkElement = document.getElementById('check');
    if (xValue < minPossibleSum || xValue > maxPossibleSum) {
        showErrorAndSuggestions(xValue, numY);
        return;
    } else {
        checkElement.textContent = ''; // Clear suggestions if the range is correct
    }

    const yValues = [];
    let totalSum = 0;

    for (let i = 0; i < numY; i++) {
        let randomNumber = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
        yValues.push(randomNumber);
        totalSum += randomNumber;
    }

    // Ajustar los valores para cumplir con el total deseado si es necesario
    let adjustment = xValue - totalSum;
    while (adjustment !== 0) {
        for (let i = 0; i < yValues.length; i++) {
            if (adjustment > 0 && yValues[i] < maxRange) {
                yValues[i]++;
                adjustment--;
            } else if (adjustment < 0 && yValues[i] > minRange) {
                yValues[i]--;
                adjustment++;
            }
            if (adjustment === 0) break;
        }
    }

    // Mostrar los valores generados y la comprobación del total
    const titleElement = document.getElementById('generated-values-title');
    const operationElement = document.getElementById('operation');
    titleElement.style.display = 'block';
    titleElement.textContent = `Valores generados: ${yValues.join(', ')}`;
    operationElement.textContent = `El total de los valores generados es: ${yValues.reduce((a, b) => a + b, 0)} (esperado: ${xValue})`;
    operationElement.style.color = document.body.classList.contains("active") ? "white" : "black";

    // Graficar los valores generados
    const ctx = document.getElementById('chart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: yValues.map((_, index) => `Y${index + 1}`),
            datasets: [{
                label: 'Valores generados',
                data: yValues,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Valores generados'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Rango'
                    }
                }
            }
        }
    });
}

function showErrorAndSuggestions(xValue, numY) {
    const operationElement = document.getElementById('operation');
    operationElement.textContent = 'El rango proporcionado no es correcto.';
    operationElement.style.color = 'red';

    const minSuggestedRange = Math.ceil(xValue / numY);
    const maxSuggestedRange = Math.floor(xValue / numY);
    const suggestions = [
        `<span class="suggested-number">${minSuggestedRange}-${maxSuggestedRange}</span>`,
        `<span class="suggested-number">${minSuggestedRange - 1}-${maxSuggestedRange + 1}</span>`,
        `<span class="suggested-number">${minSuggestedRange + 1}-${maxSuggestedRange - 1}</span>`
    ];

    const checkElement = document.getElementById('check');
    checkElement.innerHTML = `Sugerencias de rango: ${suggestions.join(', ')}`;
    checkElement.style.color = 'red';
}

function crearNota() {
    const notasContainer = document.getElementById('notasContainer');
    if (notasContainer.children.length >= 2) {
        alert('Solo puedes crear un máximo de 2 notas.');
        return;
    }

    const nota = document.createElement('div');
    nota.classList.add('nota');

    const contenidoTextarea = document.createElement('textarea');
    contenidoTextarea.placeholder = 'Contenido';
    contenidoTextarea.style.fontSize = '16px';
    contenidoTextarea.setAttribute('maxlength', '2024');

    const colorPicker = document.createElement('div');
    colorPicker.classList.add('color-picker');
    const colores = ['#ffcccc', '#ccffcc', '#ccccff', '#ffffcc', '#ffccff'];
    colores.forEach(color => {
        const colorOption = document.createElement('div');
        colorOption.classList.add('color-option');
        colorOption.style.backgroundColor = color;
        colorOption.addEventListener('click', () => {
            nota.style.backgroundColor = color;
        });
        colorPicker.appendChild(colorOption);
    });

    const eliminarBtn = document.createElement('button');
    eliminarBtn.textContent = 'Eliminar';
    eliminarBtn.addEventListener('click', () => {
        nota.remove();
        ajustarTamañoNotas();
    });

    const btnsContainer = document.createElement('div');
    btnsContainer.classList.add('nota-btns');
    btnsContainer.appendChild(colorPicker);
    btnsContainer.appendChild(eliminarBtn);

    nota.appendChild(contenidoTextarea);
    nota.appendChild(btnsContainer);

    notasContainer.appendChild(nota);

    ajustarTamañoNotas();
}

function ajustarTamañoNotas() {
    const notas = document.querySelectorAll('.nota');
    const notasContainer = document.getElementById('notasContainer');
    const notasCount = notas.length;

    const width = (100 / notasCount) - 2; // 2% padding
    notas.forEach(nota => {
        nota.style.width = `${width}%`;
        nota.style.height = `${width}%`;
        nota.style.margin = '1%';
    });
}

function openTab(tabId, element) {
    document.querySelectorAll('.tab-content').forEach(content => {
        content.style.display = 'none';
    });
    document.querySelectorAll('.tab-link').forEach(tab => {
        tab.classList.remove('active');
    });

    document.getElementById(tabId).style.display = 'block';
    element.classList.add('active');
}

const translations = {
    es: {
        iniciar_sesion: "Iniciar sesión",
        precio: "Precio",
        ejemplos: "Ejemplos",
        acerca_de_nosotros: "Acerca de nosotros",
        valores: "Valores",
        totales: "Totales",
        elije_opcion: "Elije una opción",
        valores1: "Valores1",
        valores2: "Valores2",
        resultados1: "Resultados1",
        resultados2: "Resultados2",
        total_porcentaje: "Total %",
        intentos_totales: "Intentos totales",
        cantidad_dias: "Cantidad de días",
        rango: "Rango",
        calcular: "Calcular",
        resultado: "Resultado",
        grafica: "Gráfica",
        no_pulsar: "No pinches aquí",
        crear_nota: "Crear nota",
        valores_generados: "Valores generados",
        introduce_valor_total: "Introduce el valor total.",
        introduce_numero_valores: "Introduce el número de valores que deseas generar.",
        introduce_rango: "Introduce el rango (min - max) para cada valor generado. Ej: (2-4)"
    },
    en: {
        iniciar_sesion: "Login",
        precio: "Pricing",
        ejemplos: "Examples",
        acerca_de_nosotros: "About Us",
        valores: "Values",
        totales: "Totals",
        elije_opcion: "Choose an option",
        valores1: "Values1",
        valores2: "Values2",
        resultados1: "Results1",
        resultados2: "Results2",
        total_porcentaje: "Total %",
        intentos_totales: "Total attempts",
        cantidad_dias: "Number of days",
        rango: "Range",
        calcular: "Calculate",
        resultado: "Result",
        grafica: "Graph",
        no_pulsar: "Don't click here",
        crear_nota: "Create note",
        valores_generados: "Generated values",
        introduce_valor_total: "Enter the total value.",
        introduce_numero_valores: "Enter the number of values you want to generate.",
        introduce_rango: "Enter the range (min - max) for each generated value. E.g: (2-4)"
    }
};

function changeLanguage(language) {
    const elementsToTranslate = document.querySelectorAll('[data-translate-key]');
    elementsToTranslate.forEach(element => {
        const key = element.getAttribute('data-translate-key');
        element.textContent = translations[language][key];
    });

    // Opciones de los selects
    document.getElementById('valores-options').options[0].text = translations[language].elije_opcion;
    document.getElementById('valores-options').options[1].text = translations[language].valores1;
    document.getElementById('valores-options').options[2].text = translations[language].valores2;

    document.getElementById('resultados-options').options[0].text = translations[language].elije_opcion;
    document.getElementById('resultados-options').options[1].text = translations[language].resultados1;
    document.getElementById('resultados-options').options[2].text = translations[language].resultados2;

    // Placeholders
    document.getElementById('percentage').placeholder = translations[language].total_porcentaje;
    document.getElementById('dailyValue').placeholder = translations[language].intentos_totales;
    document.getElementById('daysCount').placeholder = translations[language].cantidad_dias;
    document.getElementById('range').placeholder = translations[language].rango;
    document.getElementById('range2').placeholder = translations[language].rango;

    // Tooltips
    const tooltips = document.querySelectorAll('.tooltiptext');
    tooltips[0].textContent = translations[language].introduce_valor_total;
    tooltips[1].textContent = translations[language].introduce_numero_valores;
    tooltips[2].textContent = translations[language].introduce_rango;

    // Botones
    document.getElementById('botonresult1').textContent = translations[language].calcular;
    document.getElementById('botonresult2').textContent = translations[language].calcular;
    document.getElementById('botonvalor1').textContent = translations[language].calcular;
    document.getElementById('crearNotaBtn').textContent = translations[language].crear_nota;
}
