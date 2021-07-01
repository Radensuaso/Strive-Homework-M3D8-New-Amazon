const generateCard = (item) => {
  return `
  <div class="card shadow">
  <img class="img-fluid" src=${item.imageUrl} class="card-img-top" alt="${item.name} picture" />
  <div class="card-body">
    <h5 class="card-title">${item.name}</h5>
    <p class="card-text"><strong>Brand:</strong> ${item.brand}</p>
    <p class="description card-text">${item.description}</p>
    <div class="d-flex justify-content-between">
      <a class="btn btn-info" href="../details.html?itemID=${item._id}" role="button">See Details</a>
      <span class="badge badge-primary d-flex align-items-center px-2">€${item.price}</span>
    </div>
  </div>
    `
}

const isLoading = async function (loading) {
  const spinner = document.querySelector(".spinner-grow")
  console.log(spinner)
  if (loading) {
    spinner.classList.remove("d-none")
  } else {
    spinner.classList.add("d-none")
  }
}

const displayItems = async (url) => {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGRjNjA5ZmIzNTgxNzAwMTVjMjI3MGMiLCJpYXQiOjE2MjUwNTUzOTEsImV4cCI6MTYyNjI2NDk5MX0.4rreCWruc8iinYHIIdhbPTQo52bs9c82UeMWN-fKg0o",
      },
    })

    const items = await response.json()
    console.log(items)

    isLoading(false)

    const cardRow = document.getElementById("card-row")

    if (items.length > 0) {
      items.forEach((item) => {
        const col = document.createElement("div")
        col.classList.add("col-12", "col-sm-6", "col-md-4", "mb-3")
        col.innerHTML = generateCard(item)

        cardRow.appendChild(col)
      })
    }
  } catch (err) {
    document.querySelector("#error-container .text-danger").innerText = err
  }
}

window.onload = () => {
  const url = "https://striveschool-api.herokuapp.com/api/product/"

  displayItems(url)
}
