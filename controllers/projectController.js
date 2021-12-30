const Project = require('../models/projectModel')

const { getPostData} = require('../utils')


async function getProjects(req, res) {
    try {
        const projects = await Project.findAll()

        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(projects))   
    } catch (error) {
        console.log(error)
    }
  
}


async function getProject(req, res, id) {
    try {
        const project = await Project.findById(id)

        if(!project) {
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message : 'Project Not Found'})) 
        } else {
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(project)) 
        }

          
    } catch (error) {
        console.log(error)
    }
  
}
async function createProject(req, res) {
    try {
         
         let body = ''
         req.on('data', (chunk) => {
             body += chunk.toString()
         })

         req.on('end', async () => {
            const{name, description, tasks} = JSON.parse(body)

            const project = {
                name,
                description,
                tasks
             }

            const newProject = await Project.create(project)

            res.writeHead(201, {'Content-Type': 'application/json'})
            return res.end(JSON.stringify(newProject))
     
        })

        
    } catch (error) {
        console.log(error)
    }
    
  
}


  
   

module.exports = {
    getProjects,
    getProject,
    createProject
}