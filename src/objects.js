//project object
//project has a name, list of contained todos, number of contained todos

const Project = function (projectName) {

    let name = projectName;
    let id = projectLibrary.assignId();
    let todoList = [];

    return {name, id, todoList};

};

export let projectLibrary = {

    idCounter: -1,
    library: [],
    addProject: function (project) {
        this.library.push(project);
    },
    removeProject: function(project) {
        for(let i = 0; i < this.library.length; i++){
            if (this.library[i].id === project.id){
                this.library.splice(i, 1);
                break;
            };
        };
    },
    assignId: function () {
        this.idCounter++;
        return this.idCounter;
    }

};

export const createProject = function (projectName) {
    let project = Project(projectName);
    projectLibrary.addProject(project);
    return project;
};

// need to create todo object