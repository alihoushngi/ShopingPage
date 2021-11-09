//variebles
const courses = document.querySelector("#courses-list");

// eventListeners
eventListeners();
function eventListeners() {
  courses.addEventListener("click", byCourse);
}

// functions
function byCourse(e) {
  e.preventDefault();
  if (e.target.classList.contains("add-to-card")) {
    console.log(
      e.target.parentElement.parentElement.parentElement.parentElement
    );
  }
}
