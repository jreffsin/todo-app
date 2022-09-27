//project object
//project has a name, list of contained todos, number of contained todos

import { library } from "webpack"; //why did this get added?

export const Project = function (name) {
    let name = name;
    
    // goto projects table and get ID for Proj
    let id = ProjectLibrary.getId;

    // array to hold all todos contained in project
    let todoList = [];

    let addProjToTable = function (){
        //add project to projects table
    };



};

export ProjectLibrary = {

    idHigh: 0,
    library: [],
    addProject: (project) {
        library.push(project);
    },
    removeProject: (project.id) {
        //need to add code here to remove project from library array of given id
    },
    getId: () {
        idHigh++;
        return idHigh;
    }

};

//todo object

//projects table
//addProjectToTable Function

//todo table