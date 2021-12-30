const projects = require('../data/projects')
const { v4:uuidv4 } = require('uuid')

const { writeDataToFile} = require('../utils')

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(projects)
    })
}

function findById(id) {
    return new Promise((resolve, reject) => {
        const project = projects.find((p)=> p.id === id)
        resolve(project)
    })
}

function create(project) {
    return new Promise((resolve, reject) => {
        const newProject = {id: uuidv4(), ...project}
        projects.push(newProject)
        writeDataToFile('./data/projects.json', projects)
        resolve(newProject)
      
    })
}

module.exports = {
    findAll,
    findById,
    create
}