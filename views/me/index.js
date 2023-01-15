document.addEventListener("DOMContentLoaded", () => {
    let courseId;
    const deleteForm = document.forms["delete-course-form"];
    const btnDeleteCourse = document.getElementById("btn-delete-course"); // When dialog confirm clicked
    $("#delete-course-modal").on("show.bs.modal", (event) => {
        const button = $(event.relatedTarget);
        courseId = button.data("id");
    }); // When delete course btn clicked
    btnDeleteCourse.onclick = function () {
        deleteForm.action = `/courses/delete/${courseId}?_method=DELETE`;
        deleteForm.submit();
    };
});
