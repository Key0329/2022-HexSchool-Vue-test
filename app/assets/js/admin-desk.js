// const Url = "http://localhost:3000";
const Url = "https://vue-test-render.onrender.com";

const adminDeskTable = document.querySelector(".admin-desk-table");

function renderDeskTable(arr) {
  let str = "";

  arr.forEach((item) => {
    str += `
    <tr>
      <th scope="row">${item.id}</th>
      <td>${item.title}</td>
      <td>${item.content}</td>
      <td>
        <a href="#" class="admin-view-remove-btn btn btn-outline-danger me-2" data-id=${item.id}>刪除</a>
        <a href="./edit.html" class="admin-view-edit-btn btn btn-outline-warning" data-id=${item.id}>編輯</a>
      </td>
    </tr>
    `;
  });

  if (adminDeskTable) {
    adminDeskTable.innerHTML = str;
  }
}

function saveEditId() {
  const adminViewEditBtn = document.querySelectorAll(".admin-view-edit-btn");

  if (adminViewEditBtn) {
    adminViewEditBtn.forEach((item) => {
      item.addEventListener("click", (e) => {
        const id = e.target.dataset.id;
        localStorage.setItem("adminViewID", id);
      });
    });
  }
}

function deleteViews() {
  const adminViewRemoveBtn = document.querySelectorAll(
    ".admin-view-remove-btn"
  );

  if (adminViewRemoveBtn) {
    adminViewRemoveBtn.forEach((item) => {
      item.addEventListener("click", (e) => {
        const id = e.target.dataset.id;

        axios
          .delete(`${Url}/views/${id}`)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "刪除成功",
              showConfirmButton: false,
              timer: 1000,
            });

            localStorage.removeItem("adminViewID");

            adminInit();
          })
          .catch((error) => {
            console.log(error);
          });
      });
    });
  }
}

function getAdminViewsData() {
  axios
    .get(`${Url}/views`)
    .then((res) => {
      const { data } = res;
      renderDeskTable(data);
      saveEditId();
      deleteViews();
    })
    .catch((error) => {
      console.log(error);
    });
}

function adminInit() {
  getAdminViewsData();
}

adminInit();
