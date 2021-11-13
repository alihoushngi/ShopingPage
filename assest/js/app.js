//variebles
const courses = document.querySelector("#courses-list"),
  shoppingCartContetnt = document.querySelector("#cart-content tbody"),
  clearCart = document.querySelector("#clear-cart");

// eventListeners
eventListeners();
function eventListeners() {
  courses.addEventListener("click", byCourse);

  shoppingCartContetnt.addEventListener("click", removeCourse);

  clearCart.addEventListener("click", removeCourses);

  document.addEventListener("DOMContentLoaded", showCourseOnLoad);
}

// functions
function byCourse(e) {
  e.preventDefault();
  if (e.target.classList.contains("add-to-card")) {
    const course =
      e.target.parentElement.parentElement.parentElement.parentElement;
    getCourseInfo(course);
  }
}

function getCourseInfo(course) {
  const courseInfo = {
    image: course.querySelector("img").src,
    title: course.querySelector("h1").textContent,
    price: course.querySelector("h3").textContent,
    id: course.querySelector("a").getAttribute("data-id"),
  };

  addToCard(courseInfo);
}

function addToCard(courseInfo) {
  let row = document.createElement("tr");

  row.innerHTML = `
              <tr>
                    <td>
                    <img src="${courseInfo.image}" style="width: 80px ; margin-top: 1rem ">
                    </td>
                      <td>${courseInfo.title}</td>
                      <td>${courseInfo.price}</td>
                      <td>
                        <a style="margin-top: 1.5rem; margin-left: 1rem;" class= "remove" href="#" data-id="${courseInfo.id}"><i class="fas fa-trash"></i></a>
                      </td>
              </tr>

  `;

  shoppingCartContetnt.appendChild(row);

  saveToLocal(courseInfo);
}

function saveToLocal(course) {
  let courses = getFromLocal();

  courses.push(course);

  localStorage.setItem("courses", JSON.stringify(courses));
}

function getFromLocal() {
  let courses;
  if (localStorage.getItem("courses")) {
    courses = JSON.parse(localStorage.getItem("courses"));
  } else {
    courses = [];
  }
  return courses;
}

function removeCourse(e) {
  let course, courseId;

  if (e.target.classList.contains("remove")) {
    e.target.parentElement.parentElement.remove();
    course = e.target.parentElement.parentElement;
    courseId = course.querySelector("a").getAttribute("data-id");
  }

  removeCourseFromLS(courseId);
}

function removeCourseFromLS(id) {
  let courseList = getFromLocal();

  courseList.forEach(function (course, index) {
    if (course.id === id) {
      courseList.splice(index, 1);
    }
  });

  localStorage.setItem("courses", JSON.stringify(courseList));
}

function removeCourses(e) {
  while (shoppingCartContetnt.firstChild) {
    shoppingCartContetnt.firstChild.remove();
  }

  clearCartFromLs();
}

function clearCartFromLs() {
  localStorage.clear();
}

function showCourseOnLoad() {
  let courses = getFromLocal();

  courses.forEach(function (courseInfo) {
    let row = document.createElement("tr");

    row.innerHTML = `
                  <tr>
                        <td>
                        <img src="${courseInfo.image}" style="width: 80px ; margin-top: 1rem ">
                        </td>
                          <td>${courseInfo.title}</td>
                          <td>${courseInfo.price}</td>
                          <td>
                            <a style="margin-top: 1.5rem; margin-left: 1rem;" class= "remove" href="#" data-id="${courseInfo.id}"><i class="fas fa-trash"></i></a>
                          </td>
                  </tr>
    
                  `;
    shoppingCartContetnt.appendChild(row);
  });
}
