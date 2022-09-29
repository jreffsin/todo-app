import css from "./main.css";
import {createProjectElement} from "./domManipulations"
import {projectLibrary, createProject, createTodo} from "./objects"


let brettProject = createProject('brett');

let clarkProject = createProject('clark');

createTodo(brettProject, 'cheryl', 'lorem ipsum', '12/01/22', 'high');
createTodo(brettProject, 'dark clark', 'lorem ipsum', '11/01/22', 'low');

console.log(brettProject);


// projectLibrary.removeProject(brettProject);


// Function that generates new todo item