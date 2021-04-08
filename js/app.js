let employees = [];
const urlAPI = 'https://randomuser.me/api/?results=12';
const gridContainer = document.querySelector('.grid-container');
const overlay = document.querySelector('.overlay');
const modalContent = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');


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


// Fetch data
//----------------------------------------------------
fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err));