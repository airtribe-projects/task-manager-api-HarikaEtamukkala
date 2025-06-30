
const app =require('../../app')
const tasks = require("../../task.json");

const taskdata = tasks;

app.use(taskdata);

app.get('api/v1/tasks', (req, res) => {
    console.log("GET");
    return res.status(200).send(taskdata.tasks);
})

app.get('api/v1/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const task = taskdata.tasks.find(t => t.id === parseInt(taskId));
    if (!task) {
        return res.status(404).send({ "message": `Task: ${taskId} not found` })
    }
    res.send(task);
})

app.post('/tasks',(req,res)=>{
    if (!req.body.title) {
        return res.status(400).send({
          success: 'false',
          message: 'title is required',
        });
      } else if (!req.body.description) {
        return res.status(400).send({
          success: 'false',
          message: 'description is required',
        });
      }
      else if (req.body.completed  === false || req.body.completed === true || req.body.completed instanceof Boolean) {
        return res.status(400).send({
          success: 'false',
          message: 'completed is boolean',
        });
    }
    const task = req.body;
    task.id= taskdata.tasks.length;
    taskdata.tasks.push(task);
    return res.status(201).send(task);
})

app.put('/tasks/:id',(req,res)=>{
    let taskFound;
    let itemIndex;
    taskdata.tasks.map((task, index) => {
        if (task.id === id) {
          taskFound = task;
          itemIndex = index;
        }
      });
    
      if (!todoFound) {
        return res.status(404).send({
          success: 'false',
          message: 'task not found',
        });
      }
      if (!req.body.title) {
        return res.status(400).send({
          success: 'false',
          message: 'title is required',
        });
      } else if (!req.body.description) {
        return res.status(400).send({
          success: 'false',
          message: 'description is required',
        });
      }

      const newTask = {
        id: taskFound.id,
        title: req.body.title || taskFound.title,
        description: req.body.description || taskFound.description,
      };

      taskdata.tasks.push(newTask);
      return res.status(201).send(newTask);
})

router.delete('/api/v1/tasks/:id', (req, res) => {
   
    let taskFound;
    let itemIndex;
    taskdata.tasks.map((task, index) => {
      if (task.id === id) {
        taskFound = task;
        itemIndex = index;
      }
    });
  
    if (!taskFound) {
      return res.status(404).send({
        success: 'false',
        message: 'task not found',
      });
    }
    taskdata.tasks.pop()
  
    return res.status(200).send({
      success: 'true',
      message: 'Task deleted successfuly',
    });
  });