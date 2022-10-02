import projImg from './assets/projectLogo.png';
import trashImg from './assets/trash.png';
import acceptImg from './assets/check.png';
import cancelImg from './assets/cancel.png';
import {createProject} from './index';

export let createProjectElement = function (name) {

    //create div for project DOM element
    let newProject = document.createElement('div');
    newProject.setAttribute('id', `${name}`);
    newProject.setAttribute('class', 'project');

    //create div for project name and icon wrapper
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

    //add trash icon to project div
    let trashIcon = document.createElement('img');
    trashIcon.src = trashImg;
    trashIcon.setAttribute('class', 'trashIcon');
    trashIcon.addEventListener('click', () => openModal('removeProjectModal'));
    newProject.appendChild(trashIcon);

    //append project div to active_project element
    document.querySelector('.active_projects').appendChild(newProject);

    //remove project form if one exists
    if (document.getElementsByClassName('newProjectForm')[0]){
        removeProjectForm();
    };

    overlay.classList.remove('active');
}

export let createProjectForm = function () {

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
}

export let addProjectFormListener = function () {
    const project_adder = document.getElementsByClassName('project_adder');
    project_adder[0].addEventListener('click', createProjectForm);
}

let removeProjectForm = function () {
    const newProjectForm = document.getElementsByClassName('newProjectForm');
    newProjectForm[0].parentNode.removeChild(newProjectForm[0]);
    toggleOverlay();
}

let openModal = function (type) {
    let modal = document.getElementById(type);
    modal.classList.add('active');
    toggleOverlay();
}

let closeModal = function (e) {

    e.target.closest('.modal').classList.remove('active');
    toggleOverlay();
};

let toggleOverlay = function() {
    let overlay = document.getElementById('overlay');
    if (overlay.classList.contains('active')){
        overlay.classList.remove('active');
        return;
    }
    overlay.classList.add('active');
}

let initModals = function() {

    //bind click event handlers to modal close buttons
    let closeButtons = document.getElementsByClassName('close-button');
    for (let i = 0; i < closeButtons.length; i++){
        closeButtons[i].addEventListener('click', closeModal);
    };
}

initModals();