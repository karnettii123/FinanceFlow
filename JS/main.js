const modalOpen = document.querySelector(".openModal")
const modal = document.querySelector(".modal")
const modalOverlay = document.querySelector(".modalOverlay")
const modalClose = document.querySelector(".closeModal")
const form = document.querySelector(".formAdd")

const list = document.querySelector(".list")

let balanceIncome = document.getElementById("balance-income")
let balanceExpenses = document.getElementById("balance-expenses")
let balanceAll = document.getElementById("balance-amount")

let chart

let transactions = []
let transactionId = 0;

modalOpen.addEventListener('click', () => {
    modal.classList.add('active');
});

modalOverlay.addEventListener('click', () =>{
    modal.classList.remove('active');

});

modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
});

function renderTransaction(){
    list.innerHTML = ""

    transactions.forEach(arr => {
        const li = document.createElement('li')

        li.classList.add(arr.balance)

        const nameLi = document.createElement('span')
        nameLi.textContent = arr.name
        nameLi.classList.add('li-name')

        const amountLi = document.createElement('span')
        amountLi.textContent = `$${arr.amount}`
        amountLi.classList.add('li-amount')

        const categoryLi = document.createElement('span');
        categoryLi.textContent = arr.category;
        categoryLi.classList.add('li-category');

        li.appendChild(nameLi)
        li.appendChild(amountLi)
        li.appendChild(categoryLi)

        list.appendChild(li)
    })
}


function getForm(){
    const name = document.getElementById('name').value;
    const amount = Number (document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    const balanceEl = document.querySelector('input[name="balance"]:checked')
    const balance = balanceEl ? balanceEl.value : null;
    const id = transactionId++;

    if (name === "") {
        alert("Input name")
        document.getElementById('name').style.borderColor = "red"
        return null
    } else if (amount === 0) {
        alert("Input amount")
        document.getElementById('amount').style.borderColor = "red"
        return null
    } else if (!balance) {
        alert ("Select transition type");
        return null
    } else {
        return {id, name, amount, category, balance}
    }
}

function saveTransactions () {
    localStorage.setItem("transactions", JSON.stringify(transactions))
}

function loadTransactions(){
    const data = localStorage.getItem("transactions")
    if(data) 
        transactions = JSON.parse(data)
}

function updateStats () {
    let income = 0
    let expenses = 0
    let balance = 0

    transactions.forEach(arr => {
        if (arr.balance === "income") {
            income += arr.amount
        } else if (arr.balance === "expenses") {
            expenses += arr.amount
        }
        balance = income - expenses

        balanceIncome.innerHTML = income
        balanceExpenses.innerHTML = expenses
        balanceAll.innerHTML = balance
    })
    return { income, expenses }
}

function renderChart(){
    const { income, expenses } = updateStats()
    const ctx = document.getElementById("myChart").getContext("2d")
    if (chart) 
        chart.destroy()

    chart = new Chart(ctx, {
        type:'doughnut',
        data: {
            labels:["Income","Expenses"],
            datasets:[{
                label:"FinanceFlow",
                data:[income, expenses],
                backgroundColor: ["#45A133", "#DA3633" ]
            }]
        }, 
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom', labels: { color: "#fff" } }
            }
        }
    })
}


form.addEventListener('submit', (event) => {
    event.preventDefault()

    const data = getForm()
    if (!data) return

    transactions.push(data);
    saveTransactions()

    renderTransaction()
    updateStats()
    renderChart()

    console.log(transactions)
    form.reset();
    modal.classList.remove('active');
})

loadTransactions()
renderTransaction()
updateStats()
renderChart()