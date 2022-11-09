import axios from "axios";

var projectData = {
  id: "", name: "", key: "", leader: "", 
  members: [], tasks: [], taskAreas: [],
  createdAt: ""
};

async function getProjectData() {
  projectData.id = localStorage.getItem("IdProject");

  var project = await axios.get(
    "http://localhost:5000/api/project/find/id/" + projectData.id,
  );
  project = project.data.project;

  projectData.name = project.Name;
  projectData.key = project.Key;
  projectData.leader = project.User_ID;
  projectData.members = project.Member;

  var tasks = await axios.get(
    "http://localhost:5000/api/issue/find/project/id/" + projectData.id + "/sort/UpdateStatusAt"
  );
  projectData.tasks = tasks.data.issues;

  var statuses = await axios.get("http://localhost:5000/api/status/sort/stt");
  projectData.statuses = statuses.data;
  
  var types = await axios.get("http://localhost:5000/api/type/istype?type=Tasks");
  projectData.types = types.data;
  projectData.taskAreas = await classifyTasksByStatus();

  projectData.createdAt = project.createdAt;

  return projectData;
}

async function classifyTasksByStatus() {
  var taskAreasData = [];
  if(projectData.statuses != undefined) {
    var tasksWithStatus = {};
    projectData.statuses.forEach(status => tasksWithStatus[status.Name] = []);

    var tasks = projectData.tasks;
    console.log(tasks);
    for(var i = 0; i < tasks.length; i++) {
      var { Key, Summary, User_ID ,Avatar,_id, Type_ID} = tasks[i];
      if(tasks[i].Status_ID == null) {
        tasks[i].Status_ID = { Name: projectData.statuses[0].Name }
        updateTaskStatus(tasks[i].Key, projectData.statuses[0].Name)
      }
      var status = projectData.statuses.find(status => status.Name === tasks[i].Status_ID.Name);
      tasksWithStatus[status.Name].push({task:tasks[i], user: User_ID,Avatar });
    }
    
    projectData.statuses.forEach(status => taskAreasData.push({
      id: status.Name + "TasksArea",
      title: status.Name,
      tasksInArea: tasksWithStatus[status.Name],
    }));
  }

  return taskAreasData;
}

async function getTaskStatus(taskKey) { 
  var task = await findTaskByKey(taskKey);
  
  return task.Status_ID.Name;
}

async function findTaskByKey(taskKey) {
  var task = await axios.get(
    "http://localhost:5000/api/issue/find/key/" + taskKey
  );
  
  return task.data.issue;
}

async function updateTaskStatus(taskKey, newStatus) {
  var task = await findTaskByKey(taskKey);
  var status = projectData.statuses.find(status => status.Name === newStatus);

  await axios.put(
    "http://localhost:5000/api/issue/update/id/" + task._id,
    { Status_ID: status._id, UpdateStatusAt: new Date() }
  );
}

export { getProjectData, getTaskStatus, updateTaskStatus };
