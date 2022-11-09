import TaskCard from "./TaskCard";
import { getTaskStatus, updateTaskStatus } from "./ProjectData";
export default function TaskArea({ data: { id, title, tasksInArea }, cardColor,func }) {
  function handleDragOver(e) {
    e.preventDefault();
  }
  async function handleDrop(e) {
    var draggingTask = document.querySelector(".dragging");
    var draggingTaskKey = draggingTask.querySelector(".taskKey").textContent;

    var oldStatus = await getTaskStatus(draggingTaskKey);
    var newID = e.target.closest(".tasksArea").id;
    var newStatus = newID.substring(0, newID.indexOf("TasksArea"));

    if(oldStatus !== newStatus) {
      updateTaskStatus(draggingTaskKey, newStatus);
      
      var oldArea = document.getElementById(oldStatus + "TasksArea");
      var newArea = document.getElementById(newID);
      var newCardColor = newArea.querySelector(".cardColor").value;
    
      draggingTask.style.backgroundColor = newCardColor;
      newArea.querySelector(".tasks").prepend(draggingTask);

      var oldTotalTasks = oldArea.querySelector(".totalTasksValue");
      var newTotalTasks = newArea.querySelector(".totalTasksValue");
      oldTotalTasks.textContent = Number(oldTotalTasks.textContent) - 1;
      newTotalTasks.textContent = Number(newTotalTasks.textContent) + 1;
    }
  }

  return (
    <div
      className="tasksArea"
      id={id}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input type="hidden" className="cardColor" value={cardColor}/>
      <div className="statusTitle">{title}</div>
      <div className="totalTasks">
        <span className="totalTasksValue">{tasksInArea.length}</span>
        &nbsp;công việc
      </div>
      <hr />
      <div className="tasks">
        {tasksInArea.map((task) => {
          return <TaskCard key={task.Index} data={task} cardColor={cardColor} func={func}/>;
        })}
      </div>
    </div>
  );
}
