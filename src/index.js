import css from "./main.css";
import {createProjectElement, createProjectForm, addProjectFormListener, removeProjectElem, initModals, closeModal, editProjectElem, removeActiveProjectElementToggle, addActiveProjectElementToggle, addTodoAdderListener, addPriorityButtonsEventListeners} from "./domManipulations"
import {projectLibrary, createProjectObject, createTodoObject} from "./objects"

export const createProject = function (arg) {

    //set name to either a passed arg (if given) 
    //or else the value of a form input
    let name = typeof(arg) === 'string'
    ? arg
    : document.getElementById('projectNameField').value;

    let id = createProjectObject(name);
    createProjectElement(name, id);
};

export const deleteProject = function (e) {
    //remove target project element from DOM
    removeProjectElem();

    //remove project object from projectLibrary
    delete projectLibrary.library[projectLibrary.editing];

    closeModal(e);

    //behavior for when user deletes the active project
    //if projectLibrary.editing = projectLibrary.active
    //remove items from items panel and display #no-project-wrapper div
    //set projectLibarry.active = -1

    //reset projectLibrary.editing
    projectLibrary.editing = -1;
};

export const editProject = function () {
    projectLibrary.library[projectLibrary.editing].name = document.getElementById('projectNameField').value; //update name of project in library to the entered value in edit form
    editProjectElem();
};

export const setActiveProject = function (e) {
    removeActiveProjectElementToggle();
    let target = getEventContainingDiv(e);
    updateActiveInProjectLibrary(e, target);
    addActiveProjectElementToggle();
    //todo:
    //update title of items panel
    //update contents of items panel
}

const getEventContainingDiv = function (e) {
    //if event is passed in, returns project div that captured click
    if (e === 0) {
        return 0;
    }
    let target = e.target;
    while (target.dataset.projectId === undefined) {
        target = target.parentNode
    }
    return target;
}

const updateActiveInProjectLibrary = function (e, target) {
    projectLibrary.active = e === 0 ? 0 : target.dataset.projectId;
}

export const setProjectBeingEdited = function (id) {
    projectLibrary.editing = id;
};

export const createTodo = function () {

    //get values from modal

    //
};


addProjectFormListener();
addTodoAdderListener();
addPriorityButtonsEventListeners();
createProject("To-Do's");
setActiveProject(0);
initModals();


//todo: 

//implement function to get item info from modal and store in library

//polish design of item element
//implement add-item functionality

//design and implement behavior for when user deletes active project
//this is designed and is in deleteProject function as comments
//implement once I implement populate items functionality

//nice-to-haves below

//set project title = to project name (and update on changes) so that
//hover will cause tooltip to popup with full title listed
//also make it so projects just ... after certain length
//then project names can be longer

//use classlist.toggle() on toggleOverlay function to toggle the active class