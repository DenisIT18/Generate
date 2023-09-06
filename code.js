document.getElementById('generateSchedule').addEventListener('click', () => {
    const numDays = document.getElementById('numDays').value;
    const numClasses = document.getElementById('numClasses').value;
    const numSubjects = document.getElementById('numSubjects').value;
  
    // Получение tbody элемента для добавления строк с данными
    const tbody = document.querySelector('#scheduleTable tbody');
  
    // Создание новой строки и добавление данных
    const newRow = document.createElement('tr');
    const dayCell = document.createElement('td');
    const classCell = document.createElement('td');
    const subjectCell = document.createElement('td');
  
    dayCell.textContent = numDays;
    classCell.textContent = numClasses;
    subjectCell.textContent = numSubjects;
  
    newRow.appendChild(dayCell);
    newRow.appendChild(classCell);
    newRow.appendChild(subjectCell);
  
    // Добавление новой строки в tbody
    tbody.appendChild(newRow);
  
    // Создание URL и перенаправление пользователя
    const url = `Расписание для учителей.html?days=${numDays}&classes=${numClasses}&subjects=${numSubjects}`;
;
    window.location.href = url;
  });
  