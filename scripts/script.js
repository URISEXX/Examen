 function showApp(appId, btnElement) {
            // Ocultar todas las secciones
            document.querySelectorAll('.app-section').forEach(section => {
                section.classList.remove('active');
            });
            // Quitar clase activa de todos los botones
            document.querySelectorAll('nav button').forEach(btn => {
                btn.classList.remove('active');
            });
            // Mostrar la sección seleccionada y resaltar el botón[span_1](start_span)[span_1](end_span)
            document.getElementById(appId).classList.add('active');
            btnElement.classList.add('active');
        }

        /* --- PROYECTO 1: AGE CALCULATOR --- */
        // Rellenar selectores de día y año[span_2](start_span)[span_2](end_span)
        const daySelect = document.getElementById('daySelect');
        const yearSelect = document.getElementById('yearSelect');
        for (let i = 1; i <= 31; i++) {
            daySelect.innerHTML += `<option value="${i}">${i}</option>`;
        }
        const currentYear = new Date().getFullYear();
        for (let i = currentYear; i >= 1900; i--) {
            yearSelect.innerHTML += `<option value="${i}">${i}</option>`;
        }

        function calculateAge() {
            const day = document.getElementById('daySelect').value;
            const month = document.getElementById('monthSelect').value;
            const year = document.getElementById('yearSelect').value;
            const resultDiv = document.getElementById('ageResult');

            if (!day || !month || !year) {
                resultDiv.style.color = 'red';
                resultDiv.innerText = "Please select a valid date.";
                return;
            }

            const birthDate = new Date(year, month, day);
            const today = new Date();

            if (birthDate > today) {
                resultDiv.style.color = 'red';
                resultDiv.innerText = "Birth date cannot be in the future.";
                return;
            }

            let ageYears = today.getFullYear() - birthDate.getFullYear();
            let ageMonths = today.getMonth() - birthDate.getMonth();

            if (ageMonths < 0 || (ageMonths === 0 && today.getDate() < birthDate.getDate())) {
                ageYears--;
                ageMonths += 12;
            }
            if (today.getDate() < birthDate.getDate()) {
                ageMonths--;
                if (ageMonths < 0) { ageMonths = 11; }
            }

            resultDiv.style.color = '#1abc9c';
            resultDiv.innerText = `You are ${ageYears} years and ${ageMonths} months old`; //[span_3](start_span)[span_3](end_span)
        }


        /* --- PROYECTO 2: TEMPERATURE CONVERTER --- */
        const tempValueInput = document.getElementById('tempValue');
        const fromUnitSelect = document.getElementById('fromUnit');
        const toUnitSelect = document.getElementById('toUnit');
        const convertBtn = document.getElementById('convertBtn');

        // Función para validar y habilitar/deshabilitar el botón[span_4](start_span)[span_4](end_span)
        function checkConverterInputs() {
            if (tempValueInput.value !== '' && fromUnitSelect.value !== '' && toUnitSelect.value !== '') {
                convertBtn.disabled = false;
            } else {
                convertBtn.disabled = true;
            }
        }

        tempValueInput.addEventListener('input', checkConverterInputs);
        fromUnitSelect.addEventListener('change', checkConverterInputs);
        toUnitSelect.addEventListener('change', checkConverterInputs);

        function convertTemp() {
            const value = parseFloat(tempValueInput.value);
            const from = fromUnitSelect.value;
            const to = toUnitSelect.value;
            let result = 0;

            if (from === to) { result = value; }
            else if (from === "Celsius" && to === "Fahrenheit") { result = (value * 9/5) + 32; }
            else if (from === "Celsius" && to === "Kelvin") { result = value + 273.15; }
            else if (from === "Fahrenheit" && to === "Celsius") { result = (value - 32) * 5/9; }
            else if (from === "Fahrenheit" && to === "Kelvin") { result = (value - 32) * 5/9 + 273.15; }
            else if (from === "Kelvin" && to === "Celsius") { result = value - 273.15; }
            else if (from === "Kelvin" && to === "Fahrenheit") { result = (value - 273.15) * 9/5 + 32; }

            document.getElementById('tempResult').innerText = `${value} ${from} is ${result.toFixed(2)} ${to}`; //[span_5](start_span)[span_5](end_span)
        }


        /* --- PROYECTO 3: TASK TRACKER --- */
        // Arreglo interno de tareas[span_6](start_span)[span_6](end_span)
        let tasks = []; 

        const taskInput = document.getElementById('taskInput');
        
        taskInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') addTask();
        });

        function addTask() {
            const desc = taskInput.value.trim();
            if (desc !== "") {
                tasks.push({ descripcion: desc, completada: false }); //[span_7](start_span)[span_7](end_span)
                taskInput.value = "";
                renderTasks(); //[span_8](start_span)[span_8](end_span)
            }
        }

        function toggleTask(index) {
            tasks[index].completada = !tasks[index].completada; //[span_9](start_span)[span_9](end_span)
            renderTasks();
        }

        function deleteTask(index) {
            tasks.splice(index, 1); //[span_10](start_span)[span_10](end_span)
            renderTasks();
        }

        // Función dedicada para renderizar y reubicar las tareas[span_11](start_span)[span_11](end_span)
        function renderTasks() {
            const list = document.getElementById('taskList');
            list.innerHTML = ""; 

            // Mostrar pendientes primero, luego completadas[span_12](start_span)[span_12](end_span)
            const pendingTasks = tasks.map((task, index) => ({...task, originalIndex: index})).filter(t => !t.completada);
            const completedTasks = tasks.map((task, index) => ({...task, originalIndex: index})).filter(t => t.completada);
            const sortedTasks = [...pendingTasks, ...completedTasks];

            sortedTasks.forEach(task => {
                const li = document.createElement('li');
                li.className = `task-item ${task.completada ? 'completed' : ''}`;
                
                li.innerHTML = `
                    <input type="checkbox" ${task.completada ? 'checked' : ''} onchange="toggleTask(${task.originalIndex})">
                    <span>${task.descripcion}</span>
                    <button class="delete-btn" onclick="deleteTask(${task.originalIndex})">🗑️</button>
                `;
                list.appendChild(li);
            });
        }