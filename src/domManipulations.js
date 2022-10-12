import projImg from './assets/projectLogo.png';
import trashImg from './assets/trash.png';
import editImg from './assets/edit.png';
import acceptImg from './assets/check.png';
import cancelImg from './assets/cancel.png';
import {createProject, deleteProject, editProject, setActiveProject} from './index';
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
    console.log(projectLibrary);
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
    toggleOverlay();
}

export const getTodoData = function () {

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