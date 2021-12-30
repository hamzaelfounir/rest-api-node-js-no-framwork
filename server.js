const http = require('http')

const { getProjects, getProject, createProject} = require('./controllers/projectController')

const server = http.createServer((req, res) => {
    if(req.url === '/api/projects' && req.method === 'GET') {
         getProjects(req, res)
    } else if(req.url.match(/\api\/projects\/([0-9]+)/) && req.method === 'GET')
    {    
        const id = req.url.split('/')[3]
        getProject(req, res, id)
    
    } else if(req.url === '/api/projects' && req.method === 'POST'){
        createProject(req, res)
    } else {
        res.writeHead(404, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message:'Route Not Found'}))
    }

    
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))