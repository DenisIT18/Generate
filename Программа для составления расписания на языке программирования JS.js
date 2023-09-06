document.addEventListener("DOMContentLoaded", function () {
    const serverURL = "http://localhost:5000"; // Обратите внимание на правильный адрес сервера

    const generateButton = document.getElementById("generateSchedule");
    generateButton.addEventListener("click", generateSchedule);

    // Список предметов
    const subjects = [
        "Предмет не указан",
        "Геометрия",
        "Математика",
        "Физика",
        "Алгебра",
        "Алгебра и начала математического анализа",
        "Информатика",
        "Казахский язык",
        "Казахская литература",
        "Казахский язык и литература",
        "Русский язык",
        "Русская литература",
        "Русский язык и литература",
        "Биология",
        "Химия",
        "Всемирная история",
        "История Казахстана",
        "Музыка",
        "Физическая культура",
        "Художественный труд",
        "Английский язык",
        "География",
        'ЧОП (Человек. Общество. Право)',
        "Классный час"
    ];

    function generateSchedule() {
        const numDays = parseInt(document.getElementById("numDays").value);
        const numClasses = parseInt(document.getElementById("numClasses").value);
        const numSubjectsPerDay = parseInt(document.getElementById("numSubjects").value);

        const scheduleTable = document.getElementById("schedule-table");
        scheduleTable.style.display = "block";

        const table = document.createElement("table");
        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");

        // Создаем заголовки таблицы для классов (горизонтально)
        const classRow = document.createElement("tr");
        classRow.innerHTML = "<th></th>";
        for (let i = 0; i < numClasses; i++) {
            const th = document.createElement("th");
            th.contentEditable = true; // Добавляем редактируемый элемент
            th.textContent = ""; // Оставляем пустое поле для ввода названия класса
            classRow.appendChild(th);
        }
        thead.appendChild(classRow);

        // Создаем строки с днями недели и предметами (вертикально)
        const daysOfWeek = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница"];
        for (let i = 0; i < numDays; i++) {
            const dayRow = document.createElement("tr");
            const th = document.createElement("th");
            th.textContent = daysOfWeek[i];
            dayRow.appendChild(th);

            for (let j = 0; j < numClasses; j++) {
                const td = document.createElement("td");
                td.contentEditable = true; // Добавляем редактируемый элемент

                // Добавляем чекбокс для обозначения параллельных уроков
                const parallelCheckbox = document.createElement("input");
                parallelCheckbox.type = "checkbox";
                parallelCheckbox.addEventListener("change", function () {
                    // Обработчик события при изменении состояния чекбокса
                    if (parallelCheckbox.checked) {
                        // Если чекбокс отмечен, добавляем стиль или метку для совпадения
                        td.classList.add("parallel-lesson");
                    } else {
                        // Если чекбокс снят, убираем стиль или метку
                        td.classList.remove("parallel-lesson");
                    }
                });

                for (let k = 0; k < numSubjectsPerDay; k++) {
                    const subjectSelect = document.createElement("select");
                    // Добавляем опции предметов
                    for (let m = 0; m < subjects.length; m++) {
                        const option = document.createElement("option");
                        option.value = subjects[m];
                        option.textContent = subjects[m];
                        subjectSelect.appendChild(option);
                    }
                    td.appendChild(subjectSelect);
                }

                td.appendChild(parallelCheckbox);
                dayRow.appendChild(td);
            }

            tbody.appendChild(dayRow);
        }

        table.appendChild(thead);
        table.appendChild(tbody);

        // Очищаем содержимое div перед добавлением таблицы
        scheduleTable.innerHTML = "";

        // Добавляем таблицу внутрь div
        scheduleTable.appendChild(table);

        // Отправляем запрос на сервер при генерации расписания
        fetch(`${serverURL}/generate-schedule`, {
            method: 'POST', // или другой метод, который вы используете
            // Другие параметры запроса...
        })
        .then(response => {
            // Обработка ответа от сервера
        })
        .catch(error => {
            // Обработка ошибок
        });
    }

    // Определите кнопку "Проверить конфликты"
    const findConflictButton = document.getElementById("findConflictButton");

    // Добавьте обработчик события при клике на кнопку "Проверить конфликты"
    findConflictButton.addEventListener("click", function () {
        checkForConflicts();
    });

    function checkForConflicts() {
        const scheduleTable = document.getElementById("schedule-table");
        const cells = scheduleTable.querySelectorAll("td");

        // Создайте объект, чтобы отслеживать, какие уроки у каждого класса одновременно
        const classLessons = {};

        // Пройдитесь по всем ячейкам расписания
        cells.forEach((cell) => {
            const className = cell.parentElement.querySelector("th").textContent; // Обновленная строка
            const subject = cell.querySelector("select").value;

            if (subject !== "Предмет не указан") {
                // Проверьте, есть ли уже урок у этого класса в текущее время
                if (classLessons[className]) {
                    alert(`Конфликт: ${className} имеет два урока одновременно.`);
                    return; // Завершаем функцию после выдачи предупреждения
                }

                classLessons[className] = subject;
            }
        });

        alert("Конфликты не найдены.");
    }
});

