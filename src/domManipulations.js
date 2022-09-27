import projImg from './assets/projectLogo.png';
import trashImg from './assets/trash.png';

// Function that generates new project

export let createProjectElement = function (name) {
    //create div for project DOM element
    let newProject = document.createElement('div');
    newProject.setAttribute('id', `${name}`);
    newProject.setAttribute('class', 'project');

    //create div for project name and icon wrapper
    let projectNameWrapper = document.createElement('div');
    projectNameWrapper.setAttribute('class', 'nameWrapper');

    //add project logo to project name and icon wrapper div
    let projectIcon = document.createElement('img');
    projectIcon.src = projImg;
    projectNameWrapper.appendChild(projectIcon);

    //add project name to project name and icon wrapper div
    let projectName = document.createElement('p');
    projectName.innerHTML = `${name}`;
    projectNameWrapper.appendChild(projectName);

    //add project name and icon wrapper div to new project div
    newProject.appendChild(projectNameWrapper);

    //add trash icon to project div
    let trashIcon = document.createElement('img');
    trashIcon.src = trashImg;
    trashIcon.setAttribute('class', 'trashIcon');
    newProject.appendChild(trashIcon);

    //append project div to active_project element
    document.querySelector('.active_projects').appendChild(newProject);
}