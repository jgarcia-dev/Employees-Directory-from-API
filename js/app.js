let employees = [];
const urlAPI = 'https://randomuser.me/api/?nat=us&results=12';
const gridContainer = document.querySelector('.grid-container');
const overlay = document.querySelector('.overlay');
const modalContent = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');
const queryField = document.querySelector('#query-field');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
let currEmployeeIndex;


// Functions 
//----------------------------------------------------
function displayEmployees(employeesData) {
    employees = employeesData;
    let employeeHTML = '';
    
    employees.forEach( (employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;

        // Build HTML for each employee
        employeeHTML += `
            <div class="card" data-index="${index}">
                <img src="${picture.large}" alt="employee picture" class="avatar">
                <div class="text-container">
                    <h2 class="name">${name.first} ${name.last}</h2>
                    <p class="email">${email}</p>
                    <p class="address">${city}</p>
                </div>
            </div>
        `;
    });

    gridContainer.innerHTML = employeeHTML;
}

function displayModal(index) {
    let { 
        name, 
        dob, 
        phone, 
        email, 
        location: { city, street, state, postcode },
        picture
    } = employees[index];

    let date = new Date(dob.date);

    // Build modal HTML
    const modalHTML = `
        <img src="${picture.large}" alt="" class="avatar">
        <div class="text-container">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
            <hr />
            <p>${phone}</p>
            <p class="address">${street.number} ${street.name}, ${state}, ${postcode}</p>
            <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
    `;

    overlay.classList.remove('hidden');
    modalContent.innerHTML = modalHTML;
}



// Fetch data
//----------------------------------------------------
fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err));



// Event Listeners
//----------------------------------------------------

// display employee cards based on user name search
queryField.addEventListener('input', () => {
    const search = queryField.value.trim().toLowerCase();
    const employeeCards = gridContainer.children;

    for (const card of employeeCards) {
        const employeeCardName = card.lastElementChild.firstElementChild.textContent.toLowerCase();
        if (!employeeCardName.startsWith(search)) {
            card.classList.add('hidden');
        } else {
            card.classList.remove('hidden');
        }
    } 
});

// display employee modal information
gridContainer.addEventListener('click', e => {
    if (e.target !== gridContainer) {
        const card = e.target.closest('.card');
        currEmployeeIndex = parseInt(card.getAttribute('data-index'), 10);

        displayModal(currEmployeeIndex);
    }
});

// close modal window
modalClose.addEventListener('click', () => {
    overlay.classList.add('hidden');
});

// show previous employee modal window
prevBtn.addEventListener('click', () => {
    if (currEmployeeIndex === 0) {
        currEmployeeIndex = employees.length - 1;
        displayModal(currEmployeeIndex);
    } else {
        currEmployeeIndex--;
        displayModal(currEmployeeIndex);
    }
});

// show next employee modal window
nextBtn.addEventListener('click', () => {
    if (currEmployeeIndex === employees.length - 1) {
        currEmployeeIndex = 0;
        displayModal(currEmployeeIndex);
    } else {
        currEmployeeIndex++;
        displayModal(currEmployeeIndex);
    }
});