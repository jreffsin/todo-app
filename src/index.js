import css from "./main.css";
import {createProjectElement, createProjectForm, addProjectFormListener, removeProjectElem, initModals, closeModal, editProjectElem, removeActiveProjectElementToggle, addActiveProjectElementToggle, addTodoAdderListener, addPriorityButtonsEventListeners, addTodoSubmitListener, getTodoValues, createTodoElement, clearTodoInputFields, removeTodoElements, updateItemsTitle, removeTodoElement, markTodoElementComplete, updateTodoElement, closeEditTodoModal, toggleTodoPanelElementsVis} from "./domManipulations"
import {projectLibrary, createProjectObject, createTodoObject} from "./objects"

export const createProject = function (arg) {

    //set name to either a passed arg (if given) 
    //or else the value of a form input
    let name = typeof(arg) === 'string'
    ? arg
    : document.getElementById('projectNameField').value;

    if (name.trim().length === 0){
        alert('Please enter a valid project name')
        document.getElementById('projectNameField').focus()
        return;
    }

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
    handleActiveProjDelete()

    //reset projectLibrary.editing
    projectLibrary.editing = -1;
};

const handleActiveProjDelete = function () {
    //check for active project delete
    if (projectLibrary.editing !== projectLibrary.active) {
        return
    }
    projectLibrary.active = -1
    toggleTodoPanelElementsVis()
    removeTodoElements()
}

export const editProject = function () {

    let name = document.getElementById('projectNameField').value

    if (name.trim().length === 0){
        alert('Please enter a valid project name')
        document.getElementById('projectNameField').focus()
        return;
    }

    projectLibrary.library[projectLibrary.editing].name = name; //update name of project in library to the entered value in edit form
    editProjectElem();
    updateItemsTitle();
};

export const setActiveProject = function (e) {
    removeActiveProjectElementToggle();
    let target = getEventContainingDiv(e);
    updateActiveInProjectLibrary(e, target);
    addActiveProjectElementToggle();

    updateItemsTitle();
    toggleTodoPanelElementsVis();

    removeTodoElements();
    populateTodoElements();
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
    projectLibrary.active = e === 0 ? '0' : target.dataset.projectId;
}

export const setProjectBeingEdited = function (id) {
    projectLibrary.editing = id;
};

export const createTodo = function (e) {

    let nameField = document.querySelector('#todo-name')
    if (nameField.value.trim().length === 0){
        alert('Please enter a valid item name')
        nameField.focus()
        return;
    }

    let todoValues = getTodoValues()
    let todo = createTodoObject(projectLibrary.library[projectLibrary.active], todoValues.name, todoValues.description, todoValues.dueDate, todoValues.priority)
    createTodoElement(todo.id, todo.name, todo.priority);
    closeModal(e)
    clearTodoInputFields();
};

export const deleteTodo = function (e) {
    removeTodoElement()
    let id = projectLibrary.todoEditing
    delete projectLibrary.library[projectLibrary.active].todoLibrary[id]
    closeModal(e);
}

export const markTodoComplete = function (e) {
    let id = markTodoElementComplete(e)
    let todo = projectLibrary.library[projectLibrary.active].todoLibrary[id]
    todo.completed = !todo.completed
    e.stopImmediatePropagation();
}

const populateTodoElements = function () {
    let todoLibrary = projectLibrary.library[projectLibrary.active].todoLibrary
    for (const key in todoLibrary){
        let id = todoLibrary[key].id
        let name = todoLibrary[key].name
        let priority = todoLibrary[key].priority
        let completed = todoLibrary[key].completed

        createTodoElement(id, name, priority, completed)
    }
}

export const submitTodoEdits = function (e) {

    let nameField = document.querySelector('#todo-name')
    if (nameField.value.trim().length === 0){
        alert('Please enter a valid item name')
        nameField.focus()
        return;
    }

    let todoValues = getTodoValues()
    updateTodoValues(todoValues)
    updateTodoElement()
    closeEditTodoModal(e)
}

const updateTodoValues = function (todoValues) {
    let id = projectLibrary.todoEditing
    let todo = projectLibrary.library[projectLibrary.active].todoLibrary
    todo[id].name = todoValues.name
    todo[id].description = todoValues.description
    todo[id].dueDate = todoValues.dueDate
    todo[id].priority = todoValues.priority
}

const initSampleValues = function () {
    //initialize sample values for projects and todo items
    createProject("Finish App");
    createTodoObject(projectLibrary.library[0], 'Complete styling', 'Update css to reflect new styling decisions', '2023-11-02', 'high')
    createTodoObject(projectLibrary.library[0], 'Add language support', 'Implement ability to select language', '2024-02-16', 'medium')
    createTodoObject(projectLibrary.library[0], 'Fix bugs', 'Squash all the bugs!', '2024-03-10', 'low')
    createTodoObject(projectLibrary.library[0], 'Push to GitHub', "Don't forget to commit changes!", '', 'high')
    projectLibrary.library[0].todoLibrary[0].completed = true
    projectLibrary.library[0].todoLibrary[2].completed = true

    createProject("Groceries");
    createTodoObject(projectLibrary.library[1], 'Eggs', '', '', '')
    createTodoObject(projectLibrary.library[1], 'Milk', '', '', '')
    createTodoObject(projectLibrary.library[1], 'Bread', '', '', '')
    createTodoObject(projectLibrary.library[1], 'Coffee', '', '', '')
    createTodoObject(projectLibrary.library[1], 'Carrots', '', '', '')
    createTodoObject(projectLibrary.library[1], 'Oatmeal', '', '', '')

    createProject("Gym");
    createTodoObject(projectLibrary.library[2], 'Leg day', 'Workout quads and calves', '', 'low')
    createTodoObject(projectLibrary.library[2], 'Arm day', 'Work on those pythons', '', 'high')
    createTodoObject(projectLibrary.library[2], 'Cardio', 'Break a sweat', '', 'high')
    projectLibrary.library[2].todoLibrary[11].completed = true
    projectLibrary.library[2].todoLibrary[12].completed = true
}

const initApp = function () {
    addProjectFormListener();
    addTodoAdderListener();
    addPriorityButtonsEventListeners();
    addTodoSubmitListener();
    initSampleValues();
    setActiveProject(0);
    initModals();
}

initApp()