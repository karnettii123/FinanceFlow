const modalOpen = document.querySelector(".openModal")
const modal = document.querySelector(".modal")
const modalOvelay = document.querySelector(".modalOverlay")
const modalClose = document.querySelector(".closeModal")

modalOpen.addEventListener('click', () => {
    modal.style.visibility = 'visible';
    modal.style.opacity = '1';
    modal.style.transform = 'translateY(0px)';
});

modalOvelay.addEventListener('click', () =>{
    modal.style.visibility = 'hidden';
    modal.style.opacity = '0';
});

modalClose.addEventListener('click', () => {
    modal.style.visibility = 'hidden';
    modal.style.opacity = '0';
});