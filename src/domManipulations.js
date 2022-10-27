import projImg from './assets/projectLogo.png';
import trashImg from './assets/trash.png';
import editImg from './assets/edit.png';
import acceptImg from './assets/check.png';
import cancelImg from './assets/cancel.png';
import {createProject, deleteProject, editProject, setActiveProject, createTodo, deleteTodo, markTodoComplete, submitTodoEdits} from './index';
import { projectLibrary } from './objects';

export const createProjectElement = function (name, id) {

    //create div for project DOM element
    let newProject = document.createElement('div');
    newProject.dataset.projectId = id;
    newProject.setAttribute('class', 'project');

    //create wrapper for project name and icon
    let projectNameWrapper = document.createElement('div');
    projectNameWrapper.setAttribute('class', 'nameWrapper');

    //add project logo to project name and icon wrapper div
    let projectIcon = document.createElement('img');
    projectIcon.src = projImg;
    projectNameWrapper.appendChild(projectIcon);

    //add project name to project name and icon wrapper div
    let projectName = document.createElement('p');
    projectName.innerHTML = `${name}`;
    projectNameWrapper.appendChild(projectName);

    //add project name and icon wrapper div to new project div
    newProject.appendChild(projectNameWrapper);

    //create wrapper for edit and trash icons
    let iconWrapper = document.createElement('div');
    iconWrapper.setAttribute('class', 'projectIconWrapper');
    newProject.appendChild(iconWrapper);


    //add edit icon to project div
    let editIcon = document.createElement('img');
    editIcon.src = editImg;
    editIcon.setAttribute('class', 'editIcon');
    editIcon.addEventListener('click', e => addEditProjectElem(e));
    iconWrapper.appendChild(editIcon);

    //add trash icon to project div
    let trashIcon = document.createElement('img');
    trashIcon.src = trashImg;
    trashIcon.setAttribute('class', 'trashIcon');
    trashIcon.addEventListener('click', openRemProjModal);
    iconWrapper.appendChild(trashIcon);

    //add active project listener
    addSetActiveProjectListener(newProject);

    //append project div to active_project element
    document.querySelector('.active_projects').appendChild(newProject);

    //remove project form if one exists
    if (document.getElementsByClassName('newProjectForm')[0]){
        removeProjectForm();
    };

    overlay.classList.remove('active');
};

export const createProjectForm = function () {

    //activate overlay
    toggleOverlay();

    //create div for form DOM element
    let newProjectForm = document.createElement('div');
    newProjectForm.setAttribute('class', 'newProjectForm');

    //create div for form input and icon wrapper
    let formWrapper = document.createElement('div');
    formWrapper.setAttribute('class', 'formWrapper');

    //add project logo to form
    let formIcon = document.createElement('img');
    formIcon.src = projImg;
    formWrapper.appendChild(formIcon);

    //add text input field to form
    let formInput = document.createElement('input');
    formInput.setAttribute('class', 'projectInput');
    formInput.id = 'projectNameField';
    formInput.setAttribute = ('type', 'text');
    formInput.placeholder = 'project name';
    formInput.maxLength = '10';
    formWrapper.appendChild(formInput);

    //add enter key listener to text input
    formInput.addEventListener('keypress', function (e){
        if (e.key === 'Enter') {
            createProject();
        }
    });

    //add formWrapper to new project div
    newProjectForm.appendChild(formWrapper);

    //create wrapper for accept/cancel icons
    let acceptCancelWrapper = document.createElement('div');
    acceptCancelWrapper.setAttribute('class', 'acceptCancelWrapper');

    //add accept icon to project div
    let acceptIcon = document.createElement('img');
    acceptIcon.src = acceptImg;
    acceptIcon.setAttribute('class', 'acceptIcon');
    acceptIcon.addEventListener('click', createProject);
    acceptCancelWrapper.appendChild(acceptIcon);

    //add cancel icon to project div
    let cancelIcon = document.createElement('img');
    cancelIcon.src = cancelImg;
    cancelIcon.setAttribute('class', 'cancelIcon');
    cancelIcon.addEventListener('click', removeProjectForm);
    acceptCancelWrapper.appendChild(cancelIcon);

    //append accept & cancel wrapper to new project form
    //append new project div to active_project element
    newProjectForm.appendChild(acceptCancelWrapper);
    document.querySelector('.active_projects').appendChild(newProjectForm);

    //focus cursor on text input
    document.getElementById('projectNameField').focus();
};

const createEditProjectForm = function (element) {
    //activate overlay
    toggleOverlay();

    //create div for form DOM element
    let newProjectForm = document.createElement('div');
    newProjectForm.setAttribute('class', 'newProjectForm');

    //create div for form input and icon wrapper
    let formWrapper = document.createElement('div');
    formWrapper.setAttribute('class', 'formWrapper');

    //add project logo to form
    let formIcon = document.createElement('img');
    formIcon.src = projImg;
    formWrapper.appendChild(formIcon);

    //add text input field to form
    let formInput = document.createElement('input');
    formInput.setAttribute('class', 'projectInput');
    formInput.id = 'projectNameField';
    formInput.setAttribute = ('type', 'text');
    formInput.value = projectLibrary.library[projectLibrary.editing].name; //set form value to the name of project that's currently being edited
    formInput.maxLength = '10';
    formWrapper.appendChild(formInput);

    //add enter key listener to text input
    formInput.addEventListener('keypress', function (e){
        if (e.key === 'Enter') {
            editProject();
        }
    });

    //add formWrapper to new project div
    newProjectForm.appendChild(formWrapper);

    //create wrapper for accept/cancel icons
    let acceptCancelWrapper = document.createElement('div');
    acceptCancelWrapper.setAttribute('class', 'acceptCancelWrapper');

    //add accept icon to project div
    let acceptIcon = document.createElement('img');
    acceptIcon.src = acceptImg;
    acceptIcon.setAttribute('class', 'acceptIcon');
    acceptIcon.addEventListener('click', editProject);
    acceptCancelWrapper.appendChild(acceptIcon);

    //add cancel icon to project div
    let cancelIcon = document.createElement('img');
    cancelIcon.src = cancelImg;
    cancelIcon.setAttribute('class', 'cancelIcon');
    cancelIcon.addEventListener('click', removeEditProjectForm);
    acceptCancelWrapper.appendChild(cancelIcon);

    //append accept & cancel wrapper to new project form
    //append new project div to active_project element
    newProjectForm.appendChild(acceptCancelWrapper);
    // document.querySelector('.active_projects').appendChild(newProjectForm);
    document.querySelector('.active_projects').insertBefore(newProjectForm, element);

    //focus cursor on text input
    document.getElementById('projectNameField').focus();
};

export const addProjectFormListener = function () {
    const project_adder = document.getElementsByClassName('project_adder');
    project_adder[0].addEventListener('click', createProjectForm);
};

const removeProjectForm = function () {
    const newProjectForm = document.getElementsByClassName('newProjectForm');
    newProjectForm[0].parentNode.removeChild(newProjectForm[0]);
    toggleOverlay();
};

const removeEditProjectForm = function () {
    const newProjectForm = document.getElementsByClassName('newProjectForm');
    newProjectForm[0].parentNode.removeChild(newProjectForm[0]);
    let parent = document.querySelector(`[data-project-id='${projectLibrary.editing}']`); //select project element that's currently being edited
    parent.style.display = 'flex'; //show project div
    toggleOverlay();
};

const openRemProjModal = function (e) {
    let modal = document.getElementById('removeProjectModal');
    
    //get targeted project id by accessing id of button's parent
    //set the currently editing attribute of project library to the target project id
    let parent = e.target.parentNode.parentNode;
    projectLibrary.editing = parent.dataset.projectId;

    //get project name by accessing div under parent and then the value of p element under that
    let projName = parent.getElementsByClassName('nameWrapper')[0].querySelector('p').innerHTML;

    //access text copy of modal and pass project name into copy with delete message
    modal.querySelectorAll('.modal-copy')[0].innerHTML = `Delete the project "${projName}"?`;

    modal.classList.add('active');
    toggleOverlay();

    e.stopImmediatePropagation();
};

export const closeModal = function (e) {
    e.target.closest('.modal').classList.remove('active');
    toggleOverlay();
};

const toggleOverlay = function() {
    let overlay = document.getElementById('overlay');
    if (overlay.classList.contains('active')){
        overlay.classList.remove('active');
        return;
    }
    overlay.classList.add('active');
};

export const initModals = function() {

    //bind click event handlers to modal close buttons
    let closeButtons = document.getElementsByClassName('close-button');
    for (let i = 0; i < closeButtons.length; i++){
        closeButtons[i].addEventListener('click', closeModal);
    };

    //bind click event to delete button on remove project modal
    let remProjDelButton = document.getElementById('remProjDelButton');
    remProjDelButton.addEventListener('click', (e) => deleteProject(e));

    //bind click event to delete button on remove todo modal
    let remTodoDelButton = document.getElementById('remTodoDelButton');
    remTodoDelButton.addEventListener('click', deleteTodo);

};

export const removeProjectElem = function () {

    //set projectID to the ID of the project that's flagged as editing in
    //projectLibrary object
    let projectID = projectLibrary.editing

    //delete DOM element with class project and ID equal to projectID
    let element = document.querySelector(`[data-project-id='${projectID}']`);
    element.remove();
};

const addEditProjectElem = function (e) {
    let parent = e.target.parentNode.parentNode; //target the containing project div
    projectLibrary.editing = parent.dataset.projectId //set project as currently editing
    parent.style.display = 'none'; //hide project div
    createEditProjectForm(parent);
    e.stopImmediatePropagation();
};

export const editProjectElem = function () {
    let parent = document.querySelector(`[data-project-id='${projectLibrary.editing}']`); //select project element that's currently being edited
    parent.querySelector('p').innerHTML = `${projectLibrary.library[projectLibrary.editing].name}`; //change display name of project to whatever's listed in object storage
    parent.style.display = 'flex'; //show project div
    removeProjectForm(); //remove edit project div
};

const addSetActiveProjectListener = function (projectElement) {
    projectElement.addEventListener('click', setActiveProject)
};

export const removeActiveProjectElementToggle = function () {
    if (projectLibrary.active === -1){
        return
    }
    let element = document.querySelector(`[data-project-id='${projectLibrary.active}']`)
    element.classList.remove('activeProject');
}

export const addActiveProjectElementToggle = function () {
    let element = document.querySelector(`[data-project-id='${projectLibrary.active}']`)
    element.classList.add('activeProject');
}

export const addTodoAdderListener = function () {
    const todoAdder = document.querySelector('.todo_adder');
    todoAdder.addEventListener('click', openAddTodoModal);
};

export const openAddTodoModal = function () {
    let todoModal = document.querySelector('#createTodoModal');
    todoModal.classList.add('active');
    document.getElementById('todo-name').focus();
    toggleOverlay();
}

export const addPriorityButtonsEventListeners = function () {
    let priorityButtons = document.querySelectorAll('.priority-button');
    priorityButtons.forEach((element) => element.addEventListener('click', (e) => setPriorityButton(e)))
}

export const setPriorityButton = function (e) {
    let untoggleAndExit = false;
    if (e.target.classList.contains('active')) untoggleAndExit = true
    let priorityButtons = document.querySelectorAll('.priority-button');
    priorityButtons.forEach((button) => button.classList.remove('active'))
    if (untoggleAndExit) return
    e.target.classList.add('active');
}

export const addTodoSubmitListener = function () {
    let todoSubmitButton = document.querySelector('#createTodoButton')
    todoSubmitButton.addEventListener('click', createTodo)

    let nameInput = document.querySelector('#todo-name');
    nameInput.addEventListener('keypress', createTodoKeypressFunc);
}

const removeTodoSubmitListener = function () {
    let todoSubmitButton = document.querySelector('#createTodoButton')
    todoSubmitButton.removeEventListener('click', createTodo)

    let nameInput = document.querySelector('#todo-name');
    nameInput.removeEventListener('keypress', createTodoKeypressFunc);
}

const createTodoKeypressFunc = function (e){
    if (e.key === 'Enter') {
        createTodo(e);
    }
}

export const getTodoValues = function () {
    let name = document.querySelector('#todo-name').value
    let description = document.querySelector('#todo-description').value
    let dueDate = document.querySelector('#todo-due').value

    let priorityButtons = document.querySelectorAll('.priority-button')
    let priority
    priorityButtons.forEach((button) => {
        if (button.classList.contains('active')){
            priority = button.dataset.priorityLevel
        }
    })

    return {name, description, dueDate, priority}
}

export const createTodoElement = function (id, name, priority, completed) {
    let baseTodoElement = document.querySelector('#base-todo-item');
    let newTodoElement = baseTodoElement.cloneNode(true);
    newTodoElement.classList.add('activeTodo');
    if (completed) newTodoElement.classList.add('complete');
    toggleCheckbox(newTodoElement)
    newTodoElement.removeAttribute('id');
    newTodoElement.dataset.todoId = `${id}`;

    //add eventlistener to trash icon
    let trashIcon = newTodoElement.querySelector('.todo-trash-icon')
    trashIcon.addEventListener('click', openRemTodoModal)

    //add eventlistener to edit icon
    let editIcon = newTodoElement.querySelector('.todo-edit-icon')
    editIcon.addEventListener('click', openEditTodoModal)

    //add click eventlistenr to leftwrapper for marking todo complete
    let leftWrapper = newTodoElement.querySelector('.todo-left-wrapper')
    leftWrapper.addEventListener('click', (e) => markTodoComplete(e))

    let newTodoTitleElement = newTodoElement.querySelector('.todo-left-wrapper').querySelector('p')
    newTodoTitleElement.innerText = `${name}`;

    if (priority === 'low'){
        newTodoElement.classList.add('lowPriority')
    }
    if (priority === 'medium'){
        newTodoElement.classList.add('mediumPriority')
    }
    if (priority === 'high'){
        newTodoElement.classList.add('highPriority')
    }

    let contentWrapper = document.querySelector('.content_wrapper');
    let todoAdder = document.querySelector('.todo_adder');

    contentWrapper.insertBefore(newTodoElement, todoAdder);


}

const openRemTodoModal = function (e) {
    let modal = document.getElementById('removeTodoModal');
    let element = e.target.closest('.todo-item')
    projectLibrary.todoEditing = element.dataset.todoId 
    let todoName = element.querySelector('p').innerHTML
    modal.querySelector('.modal-copy').innerHTML = `Delete the item "${todoName}"?`;
    modal.classList.add('active');
    toggleOverlay();
    e.stopImmediatePropagation();
};

export const removeTodoElement = function () {
    let id = projectLibrary.todoEditing
    let element = document.querySelector(`[data-todo-id="${id}"]`)
    element.remove();
}

export const clearTodoInputFields = function () {
    document.querySelector('#todo-name').value = ''
    document.querySelector('#todo-description').value = ''
    document.querySelector('#todo-description').value = ''
    document.querySelector('#todo-due').value = ''

    let priorityButtons = document.querySelectorAll('.priority-button');
    priorityButtons.forEach((button) => button.classList.remove('active'))
}

export const removeTodoElements = function () {
    let activeTodoElements = document.querySelectorAll('.activeTodo')
    activeTodoElements.forEach((element) => element.remove())
}

export const updateItemsTitle = function () {
    let header = document.querySelector('.todos-header');
    header.innerText = `Items in ${projectLibrary.library[projectLibrary.active].name}`
}

export const markTodoElementComplete = function (e) {
    let element = e.target.closest('.todo-item')
    let id = element.dataset.todoId
    element.classList.toggle('complete')
    toggleCheckbox(element)
    return id
}

const toggleCheckbox = function (element) {
    let checkbox = element.querySelector('.checkbox')
    checkbox.checked = element.classList.contains('complete')
}

const openEditTodoModal = function (e) {
    let id = e.target.closest('.todo-item').getAttribute('data-todo-id')
    projectLibrary.todoEditing = id

    updateTodoModalContextText()
    updateEditTodoModalValues()
    removeDefaultTodoModalCloseListeners()
    addEditTodoModalCloseListeners()
    openAddTodoModal()
    removeTodoSubmitListener()
    addTodoSubmitEditListener()
}

const updateTodoModalContextText = function () {
    let modal = document.querySelector('#createTodoModal')
    let submitButton = modal.querySelector('#createTodoButton')

    if (submitButton.innerText === 'Create'){
        submitButton.innerText = 'Update'
        modal.querySelector('.modal-title').innerText = 'Edit to-do item'
    }
    else {
        submitButton.innerText = 'Create'
        modal.querySelector('.modal-title').innerText = 'Create to-do item'
    }
}

const updateEditTodoModalValues = function () {
    let id = projectLibrary.todoEditing
    let todo = projectLibrary.library[projectLibrary.active].todoLibrary

    let name = document.querySelector('#todo-name')
    let description = document.querySelector('#todo-description')
    let dueDate = document.querySelector('#todo-due')

    name.value = todo[id].name
    description.value = todo[id].description
    dueDate.value = todo[id].dueDate

    if (todo[id].priority === 'low'){
        document.querySelector('#low-priority').classList.add('active')
        return
    }
    if (todo[id].priority === 'medium'){
        document.querySelector('#med-priority').classList.add('active')
        return
    }
    if (todo[id].priority === 'high'){
        document.querySelector('#high-priority').classList.add('active')
        return
    }
}

const addTodoSubmitEditListener = function () {
    let submitButton = document.querySelector('#createTodoButton')
    submitButton.addEventListener('click', submitTodoEdits)

    let nameInput = document.querySelector('#todo-name');
    nameInput.addEventListener('keypress', editTodoKeypressFunc);
}

const removeTodoSubmitEditListener = function () {
    let submitButton = document.querySelector('#createTodoButton')
    submitButton.removeEventListener('click', submitTodoEdits)

    let nameInput = document.querySelector('#todo-name');
    nameInput.removeEventListener('keypress', editTodoKeypressFunc);
}

const editTodoKeypressFunc = function (e) {
    if (e.key === 'Enter') {
        submitTodoEdits(e);
    }
}

export const updateTodoElement = function () {
    let element = document.querySelector(`[data-todo-id="${projectLibrary.todoEditing}"]`)
    let todo = projectLibrary.library[projectLibrary.active].todoLibrary[projectLibrary.todoEditing]

    let elementName = element.querySelector('p')
    elementName.innerText = `${todo.name}`

    element.classList.remove('lowPriority')
    element.classList.remove('mediumPriority')
    element.classList.remove('highPriority')

    if (todo.priority === 'low'){
        element.classList.add('lowPriority')
    }
    if (todo.priority === 'medium'){
        element.classList.add('mediumPriority')
    }
    if (todo.priority === 'high'){
        element.classList.add('highPriority')
    }
}

const addDefaultTodoModalCloseListeners = function () {
    let editTodoModal = document.querySelector('#createTodoModal')
    let closeButtons = editTodoModal.getElementsByClassName('close-button');
    for (let i = 0; i < closeButtons.length; i++){
        closeButtons[i].addEventListener('click', closeModal);
    };
}

const removeDefaultTodoModalCloseListeners = function () {
    let editTodoModal = document.querySelector('#createTodoModal')
    let closeButtons = editTodoModal.getElementsByClassName('close-button');
    for (let i = 0; i < closeButtons.length; i++){
        closeButtons[i].removeEventListener('click', closeModal);
    };
}

const addEditTodoModalCloseListeners = function () {
    //bind click event handlers to modal close buttons
    let editTodoModal = document.querySelector('#createTodoModal')
    let closeButtons = editTodoModal.getElementsByClassName('close-button');
    for (let i = 0; i < closeButtons.length; i++){
        closeButtons[i].addEventListener('click', closeEditTodoModal);
    };
}

const removeEditTodoModalCloseListeners = function () {
    //bind click event handlers to modal close buttons
    let editTodoModal = document.querySelector('#createTodoModal')
    let closeButtons = editTodoModal.getElementsByClassName('close-button');
    for (let i = 0; i < closeButtons.length; i++){
        closeButtons[i].removeEventListener('click', closeEditTodoModal);
    };
}

export const closeEditTodoModal = function (e) {
    closeModal(e)
    removeTodoSubmitEditListener()
    addTodoSubmitListener()
    setTimeout(updateTodoModalContextText, 200)
    setTimeout(clearTodoInputFields, 200)
    removeEditTodoModalCloseListeners()
    addDefaultTodoModalCloseListeners()
}

export const toggleTodoPanelElementsVis = function () {
    let title = document.querySelector('.todos-header')
    let adder = document.querySelector('.todo_adder')
    let noProjElem = document.querySelector('#no-project-wrapper')
    if (projectLibrary.active === -1){
        title.style.display = 'none'
        adder.style.display = 'none'
        noProjElem.style.display = 'flex'
        return
    }
    title.style.display = 'block'
    adder.style.display = 'flex'
    noProjElem.style.display = 'none'
}



