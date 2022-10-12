const Project = function (projectName) {

    let name = projectName;
    let id = projectLibrary.assignId();
    let todoLibrary = {};

    return {name, id, todoLibrary};

};

const Todo = function (todoName, todoDescription, todoDueDate, todoPriority) {

    let name = todoName;
    let description = todoDescription;
    let dueDate = todoDueDate;
    let priority = todoPriority;
    let id = projectLibrary.assignTodoId();
    let completed = false;

    return {
        name, description, dueDate, priority, id, completed
    }


};

export let projectLibrary = {
    idCounter: -1,
    todoIdCounter: -1,
    library: {},
    editing: -1,
    active: -1,
    assignId: function () {
        this.idCounter++;
        return this.idCounter;
    },
    assignTodoId: function () {
        this.todoIdCounter++;
        return this.todoIdCounter;
    }
};

export const createProjectObject = function (projectName) {
    let project = Project(projectName);
    projectLibrary.library[project.id] = project;
    return project.id
};

export const createTodoObject = function (project, name, description, dueDate, priority) {
    let todo = Todo(name, description, dueDate, priority);
    project.todoLibrary[todo.id] = todo;
    return todo;
};

