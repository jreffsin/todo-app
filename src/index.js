import css from "./main.css";
import {createProjectElement, createProjectForm, addProjectFormListener, removeProjectElem, initModals, closeModal, editProjectElem} from "./domManipulations"
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

    //reset projectLibrary.editing
    projectLibrary.editing = -1;
};

export const editProject = function () {
    projectLibrary.library[projectLibrary.editing].name = document.getElementById('projectNameField').value; //update name of project in library to the entered value in edit form
    editProjectElem();
};

addProjectFormListener();
createProject("To-Do's");
initModals();

//todo - set project title = to project name (and update on changes) so that
//hover will cause tooltip to popup with full title listed

//use classlist.toggle() on my toggleOverlay function to toggle the active class