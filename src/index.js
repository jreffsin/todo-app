import css from "./main.css";
import {createProjectElement, createProjectForm, addProjectFormListener} from "./domManipulations"
import {projectLibrary, createProjectObject, createTodoObject} from "./objects"

export const createProject = function (arg) {

    //set name to either a passed arg (if given) 
    //or else the value of a form input
    let name = typeof(arg) === 'string'
    ? arg
    : document.getElementById('projectNameField').value;

    createProjectObject(name);
    createProjectElement(name);
};

addProjectFormListener();
createProject('todos');