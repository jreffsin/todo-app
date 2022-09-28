import css from "./main.css";
import {createProjectElement} from "./domManipulations"
import {projectLibrary, createProject} from "./objects"

createProjectElement('Brett');
// let brettProject = Project('brett');

let brettProject = createProject('brett');

let clarkProject = createProject('clark');
console.log(projectLibrary);

projectLibrary.removeProject(brettProject);
console.log(projectLibrary);

// Function that generates new todo item