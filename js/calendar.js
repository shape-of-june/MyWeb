const headerPrevMonthButton = document.querySelector('.prev-month');
const headerNextMonthButton = document.querySelector('.next-month');
const headerCurrentMonthYear = document.querySelector('.current-month-year');
const calendarBody = document.querySelector('.calendar-body');

const Months = [
    'January', 'February', 'March', 'April', 
    'May', 'June', 'July', 'August', 
    'September', 'October', 'November', 'December'
]
const Dates = [];

const date = new Date();
let realCurrentMonth = date.getMonth();
let realCurrentYear = date.getFullYear();
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();



function renderCalendar() {
    Dates.length = 0;
    while(calendarBody.childElementCount > 1){
        calendarBody.removeChild(calendarBody.lastChild);
    }

    if(currentMonth < 0){
        currentMonth = 11;
        currentYear -= 1;
    } else if(currentMonth > 11){
        currentMonth = 0;
        currentYear += 1;
    }
    headerCurrentMonthYear.textContent = `${Months[currentMonth]} ${currentYear}`;
    const lastDayOfPrevMonth = new Date(currentYear, currentMonth, 0);
    if(lastDayOfPrevMonth.getDay() !== 6){
        for(let i = lastDayOfPrevMonth.getDay(); i >= 0; i--){
            Dates.push({
                date: lastDayOfPrevMonth.getDate() - i,
                isCurrentMonth: false
            });
        }
    }

    const lastDayOfCurrentMonth = new Date(currentYear, currentMonth + 1, 0);
    for(let i = 1; i <= lastDayOfCurrentMonth.getDate(); i++){
        Dates.push({
            date: i,
            isCurrentMonth: true
        });
    }

    let nextMonthDay = 1;
    while(Dates.length % 7 !== 0){
        Dates.push({
            date: nextMonthDay++,
            isCurrentMonth: false
        });
    }
    for(let i = 0; i < Dates.length; i++){
        if(i % 7 === 0){
            const row = document.createElement('tr');
            calendarBody.appendChild(row);
        }
        const cell = document.createElement('td');
        cell.textContent = Dates[i].date;
        if(!Dates[i].isCurrentMonth){
            cell.classList.add('not-current-month');
        }
        if(i % 7 === 0){
            cell.classList.add('weekend1');
        }
        if(i % 7 === 6){
            cell.classList.add('weekend2');
        }
        if(realCurrentMonth === currentMonth &&
            realCurrentYear === currentYear &&
            Dates[i].isCurrentMonth && date.getDate() === Dates[i].date){
            cell.classList.add('today');
        }
        calendarBody.lastChild.appendChild(cell);
    }
}

function handlePrevButtonClick(event) {
    currentMonth -= 1;
    renderCalendar();
}

function handleNextButtonClick(event) {
    currentMonth += 1;
    renderCalendar();
}   



renderCalendar();

headerPrevMonthButton.addEventListener('click', handlePrevButtonClick);
headerNextMonthButton.addEventListener('click', handleNextButtonClick);
