const inputField = document.querySelector('.todo__input')
const addBtn = document.querySelector('.todo__btn')
const ulList = document.querySelector('.todo__list')
const infoParagraph = document.querySelector('.todo__info-paragraph')
const popupDiv = document.querySelector('.pop-up')
const popupAcceptBtn = document.querySelector('.edit-accept')
const popupCancelBtn = document.querySelector('.edit-cancel')
const popupInput = document.querySelector('.edit__input')
const popupInfo = document.querySelector('.edit__info')

let liItem
let acceptButton
let editButton
let cancelButton
let editedTodoTask
let liText

let editBtnToBeDisabled

const createLiSpace = () => {
	const div = document.createElement('div')
	div.classList.add('todo__list-buttons')
	liItem.append(div)

	acceptButton = document.createElement('button')
	acceptButton.classList.add('todo__list-btn', 'todo__list-btn--accept')
	acceptButton.innerHTML = '<i class="fa-solid fa-check"></i>'

	editButton = document.createElement('button')
	editButton.classList.add('todo__list-btn', 'todo__list-btn--edit')
	editButton.innerHTML = '<i class="fa-solid fa-pencil"></i>'

	cancelButton = document.createElement('button')
	cancelButton.classList.add('todo__list-btn', 'todo__list-btn--cancel')
	cancelButton.innerHTML = '<i class="fa-solid fa-xmark"></i>'

	div.append(acceptButton, editButton, cancelButton)

	acceptButton.addEventListener('click', completeTask)
	editButton.addEventListener('click', showPopup)
	cancelButton.addEventListener('click', deleteTask)
}

const addTask = () => {
	if (inputField.value !== '') {
		liItem = document.createElement('li')
		liItem.classList.add('todo__list-item')
		liText = document.createElement('span')
		liItem.append(liText)
		liText.textContent = inputField.value
		createLiSpace()
		ulList.appendChild(liItem)

		inputField.value = ''
		infoParagraph.textContent = ''
	} else if (inputField.value == '') {
		infoParagraph.style.color = 'rgb(206, 99, 28)'
		infoParagraph.textContent = 'Please type in your task first!'
	}
}

const showPopup = e => {
	editedTodoTask = e.target.closest('li')
	popupDiv.style.visibility = 'visible'
	popupInfo.textContent = ''
	popupInput.value = editedTodoTask.firstChild.textContent
}

const changeTodoTask = e => {
	if (popupInput.value !== '') {
		liText = e.target.closest('span')
		editedTodoTask.firstChild.textContent = popupInput.value
		closePopup()
	} else {
		popupInfo.textContent = 'Please type in some text here...'
	}
	popupInput.value = ''
}

const enterAddTask = e => {
	if (e.key == 'Enter') {
		addTask()
	}
}

const completeTask = e => {
	editedTodoTask = e.target.closest('li')
	editedTodoTask.classList.toggle('crossline')
	editBtnToBeDisabled = editedTodoTask.childNodes[1].childNodes[1]
	editBtnToBeDisabled.classList.toggle('disabled')
}

const closePopup = () => {
	popupDiv.style.visibility = 'hidden'
}

const deleteTask = e => {
	ulList.removeChild(e.target.closest('li'))
}

popupAcceptBtn.addEventListener('click', changeTodoTask)
popupCancelBtn.addEventListener('click', closePopup)
addBtn.addEventListener('click', addTask)
inputField.addEventListener('keyup', enterAddTask)
