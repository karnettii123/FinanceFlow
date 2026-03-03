const modalOpen = document.querySelector(".openModal")
const modal = document.querySelector(".modal")
const modalOvelay = document.querySelector(".modalOverlay")
const modalClose = document.querySelector(".closeModal")
const form = document.querySelector(".formAdd")

const list = document.querySelector(".list")

let transactions = []
let transactionId = 0;

modalOpen.addEventListener('click', () => {
    modal.classList.add('active');
});

modalOvelay.addEventListener('click', () =>{
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




form.addEventListener('submit', (event) => {
    event.preventDefault()

    const data = getForm()
    if (!data) return

    transactions.push(data);

    renderTransaction()

    console.log(transactions)
    form.reset();
    modal.classList.remove('active');
})
