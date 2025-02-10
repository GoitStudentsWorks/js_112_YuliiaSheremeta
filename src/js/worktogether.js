//* Import libraries
import axios from "axios";

//* Find elements
const bodyEl = document.querySelector('body');
const formEl = document.querySelector('.footer-form');
const emailInputEl = document.querySelector('.email-input');
const textInputEl = document.querySelector('.comment-input');
const footerTitleEl = document.querySelector('.footer-title');
const contactListEl = document.querySelector('.footer-contact-list');

const modalBackdropEl = document.querySelector('.backdrop');
const modalCloseBtnEl = document.querySelector('.close-modal-button');
const modalTitleEl = document.querySelector('.modal-title');
const modalTextEl = document.querySelector('.modal-text');

//* Validate function
const isValid = email => {
    const pattern = /^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return pattern.test(email);
} 

//* Function
const onFormSubmit = async event => {
    event.preventDefault();

    const userEmail = emailInputEl.value.trim()
    const userComment = textInputEl.value.trim()

    try {
        const postRequest = await axios.post('https://portfolio-js.b.goit.study/api/requests', {
            "email": `${userEmail}`,
            "comment": `${userComment}`
        })

        emailInputEl.value = '';
        textInputEl.value = '';
        
        bodyEl.classList.add('footer-modal-open');
        modalBackdropEl.classList.add('is-open');

        modalCloseBtnEl.addEventListener('click', onCloseBtnClick);
        modalBackdropEl.addEventListener('click', onModalBackdropClick);
        document.addEventListener('keydown', onEscClick);
    } catch (err) {
        modalCloseBtnEl.removeEventListener('click', onCloseBtnClick);
        modalBackdropEl.removeEventListener('click', onModalBackdropClick);
        document.removeEventListener('keydown', onEscClick);

        modalTitleEl.classList.add('error-title');
        modalTitleEl.textContent = 'Error!';
        
        modalTextEl.classList.add('error-text');
        modalTextEl.textContent = 'Sorry something went wrong';
        
        modalCloseBtnEl.addEventListener('click', onCloseBtnClick);
        modalBackdropEl.addEventListener('click', onModalBackdropClick);
        document.addEventListener('keydown', onEscClick);

        bodyEl.classList.add('footer-modal-open');
        modalBackdropEl.classList.add('is-open');
    }
}

//* Add event listeners to form
formEl.addEventListener('submit', onFormSubmit);

emailInputEl.addEventListener('focus', event => {
    footerTitleEl.classList.add('animate-title');
})

emailInputEl.addEventListener('blur', event => {
    footerTitleEl.classList.remove('animate-title');
})

textInputEl.addEventListener('focus', event => {
    footerTitleEl.classList.add('animate-title');
})

textInputEl.addEventListener('blur', event => {
    footerTitleEl.classList.remove('animate-title');
})

//* Event functions
const onCloseBtnClick = event => {
    modalBackdropEl.classList.remove('is-open');
    bodyEl.classList.remove('footer-modal-open');
}

const onModalBackdropClick = event => {
    if (event.target === modalBackdropEl) {
        modalBackdropEl.classList.remove('is-open');
        bodyEl.classList.remove('footer-modal-open');
    }
} 

const onEscClick = event => {
    if (event.key === "Escape" || event.keyCode === 27) {
        modalBackdropEl.classList.remove('is-open');
        bodyEl.classList.remove('footer-modal-open');
    }
}
