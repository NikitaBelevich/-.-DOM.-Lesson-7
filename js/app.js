'use strict';


// Task 1. Очистите элемент. Создайте функцию clear(elem), которая удаляет всё содержимое из elem.
let olElem = document.querySelector('.task1').lastElementChild;
let but1 = document.querySelector('.task1 button');
but1.addEventListener('click', () => {
    clear(olElem);
});

function clear(elem) {
    while (elem.children.length != 0) {
        elem.firstElementChild.remove();
    }
}


/* 
Task 2. Создайте список 
Напишите интерфейс для создания списка. 

Для каждого пункта:
Запрашивайте содержимое пункта у пользователя с помощью prompt.
Создавайте элемент li и добавляйте его к ul.
Процесс прерывается, когда пользователь нажимает Esc или вводит пустую строку
Все элементы должны создаваться динамически.

Если пользователь вводит HTML-теги -– пусть в списке они показываются как обычный текст.
*/
let divTask2 = document.querySelector('.task2');
const but2 = document.querySelector('.task2 button');
but2.addEventListener('click', () => {
    generateList(divTask2);
});

function generateList(targetElement) {
    const title = document.createElement('h3');
    title.textContent = 'Create List';
    targetElement.append(title);

    const list = document.createElement('ul');
    targetElement.append(list);
    while (true) {
        let textLi = prompt('Введите текст для пункта списка', '');
        if (!textLi) {
            if (list.children.length == 0) list.remove();
            throw new Error('Отмена генерации списка');
        }

        const li = document.createElement('li');
        li.textContent = textLi;
        list.append(li);
    }
}

/* 
Task 3. Создайте дерево из объекта. Напишите функцию createTree, которая создаёт вложенный список ul/li из объекта.
Выберите один из двух способов решения этой задачи: <br>

Создать строку, а затем присвоить через container.innerHTML. <br>
Создавать узлы через методы DOM. <br>
Если получится – сделайте оба. <br>

P.S. Желательно, чтобы в дереве не было лишних элементов, в частности -– пустых ul  на нижнем уровне.
*/

let dataList3 = {
    "Рыбы": {
        "форель": {},
        "лосось": {}
    },

    "Деревья": {
        "Огромные": {
            "секвойя": {},
            "дуб": {}
        },
        "Цветковые": {
            "яблоня": {},
            "магнолия": {}
        }
    }
};

let divTask3 = document.querySelector('.task3');
const but3 = document.querySelector('.task3 button');
but3.addEventListener('click', () => {
    createTree(divTask3, dataList3);
});


function createTree(elem, dataList) {
    elem.append(createRecList(dataList));
}

function createRecList(dataList) {
    
    let ulNode = document.createElement('ul');

    for (const key in dataList) {
        let liNode = document.createElement('li');
        liNode.innerHTML = key;
        if (typeof dataList[key] == 'object' && Object.keys(dataList[key]).length != 0) {
            liNode.append(createRecList(dataList[key]));
            ulNode.append(liNode);
        } else {
            ulNode.append(liNode);
        }
    }

     return ulNode;   
}


/* 
Task 4. Выведите список потомков в дереве
Есть дерево, организованное в виде вложенных списков ul/li. <br>

Напишите код, который добавит каждому элементу списка li количество вложенных в него элементов. Узлы нижнего уровня, без детей – пропускайте.
*/
let divTask4 = document.querySelector('.task4');
const but4 = document.querySelector('.task4 button');
but4.addEventListener('click', () => {
    let targetList = document.querySelector('.task4 > ul');
    addCountElemInLi(targetList);
});

function addCountElemInLi(list) {
    Array.from(list.children).forEach((elem) => {
        if (elem.constructor.name == 'HTMLLIElement' && elem.children.length != 0) {
            // let firstTextNode = elem.firstChild.data;
            let quantityChildLi = elem.querySelectorAll('li').length;
            elem.firstChild.data += `[${quantityChildLi}]`;
        }
        addCountElemInLi(elem);
    });
}


/* 
Task 5. Создайте календарь в виде таблицы
Напишите функцию createCalendar(elem, year, month). 

Вызов функции должен создать календарь для заданного месяца month в году year и вставить его в elem. 

Календарь должен быть таблицей, где неделя – это <tr>, а день – это <td>. У таблицы должен быть заголовок с названиями дней недели, каждый день – <th>, первым днём недели должен быть понедельник. 
Например, createCalendar(cal, 2012, 9) сгенерирует в cal следующий календарь: 
*/
let divTask5 = document.querySelector('.task5');
const but5 = document.querySelector('.task5 button');
but5.addEventListener('click', () => {
    let inputDate = document.querySelector('.task5 input').value;

    removeOldCalendar(divTask5, '.table-calendar'); //? Функция для удаления старой таблицы
    if (inputDate) createCalendar(divTask5, ...inputDate.split('-')); // расширяем на отдельные элементы
});

function createCalendar(elem, year, month) {
    month = createCalendar.getFormattingMonth(month) - 1;

    // сгенерировали и добавили таблицу
    const tableCalendar = document.createElement('table');
    tableCalendar.classList.add('table-calendar');
    elem.append(tableCalendar); 

    // TODO Блок работы с экземпляром даты --------------
    let receivedDate = new Date(year, month + 1); //* следующий месяц, первый день
    receivedDate.setDate(receivedDate.getDate() - 1); //* отняли день, получили последний день предыдущего месяца, который и установили в дату
    let lastDayMonth = receivedDate.getDate(); //* получили последний день месяца переданной даты
    receivedDate.setDate(1); // ! Снова поменяли день месяца на первый
    let numberWeekDay = receivedDate.getDay(); //* получили номер первого дня недели переданного месяца
    // TODO Блок работы с экземпляром даты --------------

    const weekDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']; // для наших th
    
    // TODO Блок генерации строк и ячеек --------------
    for (let i = 0; i <= 6; i++) { // создаём tr
        let trWeek = document.createElement('tr');
        for (let k = 0; k < 7; k++) { // создаём th, td
            if (i == 0) { // первая строка, добавляем th
                let thDay = document.createElement('th');
                trWeek.append(thDay);
                thDay.textContent = weekDays[k];
                const thText = thDay.textContent;
                // добавляем классы с цветом фона заголовков
                if (thText.includes(weekDays[5]) || thText.includes(weekDays[6])) {
                    thDay.classList.add('table-calendar__th-weekends');
                } else {
                    thDay.classList.add('table-calendar__th');
                }
            } else {
                let tdDay = document.createElement('td');
                trWeek.append(tdDay);
            }
        }
        tableCalendar.append(trWeek);
    }
    // TODO Блок генерации строк и ячеек --------------

    console.group('Отладочная информация');
    console.log('Последний день выбранного месяца: ', lastDayMonth);
    console.log('Номер дня недели 1 числа месяца: ', numberWeekDay);
    console.groupEnd('Отладочная информация');

    // TODO Блок заполнения календаря --------------
    const allCells = tableCalendar.querySelectorAll('td');
    for (let i = 1; i <= lastDayMonth; i++) { //* заполняем от 1 дня, до последнего дня переданного месяца
        let startingPosition = (numberWeekDay == 0) ? (i + 5) : (i + numberWeekDay) - 2;
        allCells[startingPosition].textContent = i;
        /* 
            * Начинаем заполнять календарь, начиная с ячейки, номер которой в коллекции соответствует numberWeekDay,
            * т.е начинаем с numberWeekDay, но т.к нумерация номеров дней недели и нумерация NodeList ячеек таблицы с 0,
            * то отнимаем от индекса лишние единицы (минус 2) от переменной счётчика и от numberWeekDay
            * (i + 5) в случае если первый день месяца это воскресенье, и мы начинаем вывод с последней ячейки
            * 
        */
    }
    // TODO Блок заполнения календаря --------------
    removeLastRow(tableCalendar); //* удаляем последнюю tr если в ней нет дат
}
createCalendar.getFormattingMonth = function(month) { // внутренний метод нашей функции
    return (month.startsWith(0)) ? month[1] : month;
}
function removeOldCalendar(elem, classTable) {
    const oldCalendar = elem.querySelector(classTable);
    if (oldCalendar) oldCalendar.remove(); //* если таблица была, значит удаляем её
}
function removeLastRow(tableCalendar) {
    const lastRowTable = tableCalendar.lastElementChild;
    if (!lastRowTable.firstElementChild.textContent) {
        lastRowTable.remove();
    }
}

//Task 6. Цветные часы с использованием setInterval
const buttonStart = document.querySelector('.task6 .btn-start');
const buttonStop = document.querySelector('.task6 .btn-stop');

buttonStart.addEventListener('click', () => {
    const [ 
        hoursNode,
        minutesNode,
        secondsNode
    ] = document.querySelector('.task6 .clock').children; //* наши цветные span

    colorTime(hoursNode, minutesNode, secondsNode);
});

function colorTime(hoursNode, minutesNode, secondsNode) {
    
    let timerId = setTimeout(function tickTime() {
        
        const currentDate = new Date();

        let hours = currentDate.getHours();
        hours = (hours < 10) ? `0${hours}` : hours;
        hoursNode.textContent = hours;

        let minutes = currentDate.getMinutes();
        minutes = (minutes < 10) ? `0${minutes}` : minutes;
        minutesNode.textContent = minutes;

        let seconds = currentDate.getSeconds();
        seconds = (seconds < 10) ? `0${seconds}` : seconds;
        secondsNode.textContent = seconds;

        timerId = setTimeout(tickTime, 1000);
    });

    buttonStop.addEventListener('click', () => {
        clearTimeout(timerId);
    });
}

