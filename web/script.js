document.body.onload = fetchOrGet()

function render() {
  let userDataEl = document.getElementById("userData")
  userDataEl.innerHTML = '' // kosongin konten table
  let rawData = localStorage.getItem("arrUser")
  let arrUserData = JSON.parse(rawData)

  arrUserData.forEach((el, idx) => {
    userDataEl.innerHTML += `
      <tr>
        <td><img src="${el.photo}"></td>
        <td><b>${el.name}</b><br />${el.city}</td>
        <td>
          <button
            type="button"
            class="btn btn-sm btn-warning"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onclick="injectData(${idx})">
              Edit
          </button>
          <button class="btn btn-sm btn-danger" onclick="deleteUser(${idx}, '${el.name}')">Delete</button>
        </td>
      </tr>
    `
  });
}

function saveToLocalStorage(objUser) {
  let rawData = localStorage.getItem("arrUser")
  let arr = JSON.parse(rawData)
  if (!arr) {
    arr = []
  }
  arr.push(objUser)
  localStorage.setItem("arrUser", JSON.stringify(arr))
}

async function fetchUsers() {
  let response = await fetch('https://randomuser.me/api/?results=10&nat=us&inc=name,location,picture')
  let data = await response.json()
  let users = await data.results
  users.forEach(user => {
    let photo = user.picture.medium
    let { title, first, last } = user.name
    let name = [title, first, last].join(" ")
    let city = user.location.city
    let newUser = { photo, name, city }
    saveToLocalStorage(newUser)
    render()
  })
}

function fetchOrGet() {
  let rawData = localStorage.getItem("arrUser")
  if (rawData) {
    render()
  } else {
    fetchUsers()
    // fetch('https://randomuser.me/api/?results=10&nat=us&inc=name,location,picture')
    //   .then(response => response.json())
    //   .then(data => data.results)
    //   .then(users => {
    //     users.forEach(user => {
    //       let photo = user.picture.medium
    //       let { title, first, last } = user.name
    //       let name = [title, first, last].join(" ")
    //       let city = user.location.city
    //       let newUser = { photo, name, city }
    //       saveToLocalStorage(newUser)
    //       render()
    //     })
    //   })
  }
}

function updateToLocalStorage(objUser, idx) {
  let rawData = localStorage.getItem("arrUser")
  let arr = JSON.parse(rawData)
  arr[idx] = objUser // update data di array of object
  localStorage.setItem("arrUser", JSON.stringify(arr))
}

function save(e) {
  e.preventDefault()
  let nameEl = document.getElementById("name")
  let cityEl = document.getElementById("city")
  let tmp = {}
  tmp.name = nameEl.value
  tmp.city = cityEl.value

  saveToLocalStorage(tmp)

  render()
}

function update(e) {
  e.preventDefault()
  let nameEl = document.getElementById("updatedName")
  let cityEl = document.getElementById("updatedCity")
  let idxEl = document.getElementById("updatedIdx")
  let tmp = {}
  tmp.name = nameEl.value
  tmp.city = cityEl.value

  let idx = Number(idxEl.value)

  updateToLocalStorage(tmp, idx)

  render()
}

function deleteUser(idx, name) {
  if (confirm(`Are you sure you want to delete ${name} ?`)) {
    let rawData = localStorage.getItem("arrUser")
    let arr = JSON.parse(rawData)
    arr.splice(idx, 1)
    localStorage.setItem("arrUser", JSON.stringify(arr))

    render()
  }
}

function injectData(idx) {
  let rawData = localStorage.getItem("arrUser")
  let arr = JSON.parse(rawData)
  let name = arr[idx].name
  let city = arr[idx].city

  document.getElementById("updatedName").value = name
  document.getElementById("updatedCity").value = city
  document.getElementById("updatedIdx").value = idx
}