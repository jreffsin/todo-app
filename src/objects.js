const Project = function (projectName) {

    let name = projectName;
    let id = projectLibrary.assignId();

    let todoLibrary = {
        idCounter: -1,
        library: {},
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
    library: {},
    editing: -1,
    active: -1,
    assignId: function () {
        this.idCounter++;
        return this.idCounter;
    }
};

export const createProjectObject = function (projectName) {
    let project = Project(projectName);
    // projectLibrary.addProject(project);
    projectLibrary.library[project.id] = project;
    return project.id
};

export const createTodoObject = function (project, name, description, dueDate, priority) {
    let todo = Todo(project, name, description, dueDate, priority);
    project.todoLibrary.add(todo);
    return todo;
};