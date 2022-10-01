const Project = function (projectName) {

    let name = projectName;
    let id = projectLibrary.assignId();

    let todoLibrary = {

        idCounter: -1,
        library: [],
        add: function (todoItem) {
            this.library.push(todoItem);
        },
        remove: function(todoItem) {
            for(let i = 0; i < this.library.length; i++){
                if (this.library[i].id === todoItem.id){
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

    return {name, id, todoLibrary};

};

const Todo = function (project, todoName, todoDescription, todoDueDate, todoPriority) {

    let name = todoName;
    let description = todoDescription;
    let dueDate = todoDueDate;
    let priority = todoPriority;
    let id = project.todoLibrary.assignId();

    return {
        name, description, dueDate, priority, id
    }


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

export const createProjectObject = function (projectName) {
    let project = Project(projectName);
    projectLibrary.addProject(project);
};

export const createTodoObject = function (project, name, description, dueDate, priority) {
    let todo = Todo(project, name, description, dueDate, priority);
    project.todoLibrary.add(todo);
    return todo;
};