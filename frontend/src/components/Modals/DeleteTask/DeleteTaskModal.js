import React from "react";

export default function DeleteTaskModal(props) {
  return (
    <>
      <div
        class="modal fade"
        id="delete_task_modal"
        tabindex="-1"
        aria-labelledby="delete_task_modal_Label"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header border-0">
              <h5 class="modal-title" id="exampleModalLabel">
                Bạn chắc chắn chứ ?
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body border-0">Bạn có muốn tiếp tục xóa ?</div>
            <div class="modal-footer border-0">
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onClick={(e)=>{props.handleDelete()}}>
                Xóa
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
