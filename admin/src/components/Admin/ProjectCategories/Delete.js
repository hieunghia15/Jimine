import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Delete() {
  const [id, setID] = useState(null);
  const onDelete = (id) => {
    axios.delete(`http://localhost:5000/api/type/delete/${localStorage.getItem('ID')}`)
      .then(() => {
        document.getElementById("Close-data").click();
      })
  }
  return (
    <div id="Delete" aria-hidden="true" className="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" >
      <div className="modal-dialog" role="document" >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Xóa loại dự án</h5>
            <button type="button" className="close" id="Close-data" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Bạn có muốn xóa loại dự án này?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={() => onDelete(id)}>Xóa</button>
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Trở lại</button>
          </div>
        </div>
      </div>
    </div>
  )
}
