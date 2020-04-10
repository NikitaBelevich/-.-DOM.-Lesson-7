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











