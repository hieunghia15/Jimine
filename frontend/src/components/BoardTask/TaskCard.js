import TaskDetailModal from "../Modals/DetailTask/TaskDetailModal";
import React, { useState, useEffect } from 'react';

export default function TaskCard({ data: { task, user }, cardColor, func }) {

  console.log(task.Type_ID);
  function handleDragStart(e) {
    e.target.classList.add("dragging");
  }
  function handleDragEnd(e) {
    e.target.classList.remove("dragging");
  }
  return (
    <>
      <div
        className="task"
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        style={{backgroundColor: cardColor}}
        data-bs-toggle="modal"
        data-bs-target="#task_detail_modal"
        onClick={(e)=>{func(task)}}
      >
        <span className="taskKey">{task?.Key}</span>&nbsp;
        <span className="taskContent">{task?.Summary}</span>
        <div className="taskAsignee">
          Thực hiện: &nbsp;
          <img src={user?.Avatar ? `http://localhost:5000/asset/avatar/${user.Avatar}`:"img/DefaultAvatarProfile.jpg"} /> &nbsp;
          <span>{user?.Fullname}</span>
        </div>
        <div style={{marginTop:"3%"}}>
         <button className={"btn btn-"+task.Type_ID.Color+" btn-sm"}>{task.Type_ID.Name}</button>
        </div>
      </div>
     
     
    </>
  );
}
