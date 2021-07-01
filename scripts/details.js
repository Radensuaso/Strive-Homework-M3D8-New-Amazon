const getAndDisplaySelectedItem = async function (url, itemID) {
  const response = await fetch(url + itemID, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGRjNjA5ZmIzNTgxNzAwMTVjMjI3MGMiLCJpYXQiOjE2MjUwNTUzOTEsImV4cCI6MTYyNjI2NDk5MX0.4rreCWruc8iinYHIIdhbPTQo52bs9c82UeMWN-fKg0o",
    },
  })

  const item = await response.json()
  console.log(item)

  const main = document.querySelector("main")

  main.innerHTML = `<div class="jumbotron jumbotron-fluid">
  <div class="container">
    
  </div>
</div>
<div id="detail-container" class="container">
  <div class="row">
    <div class="col-12 col-sm-10 col-md-8 col-lg-6">
    <h2 class="display-4">${item.name}</h2>
      <ul class="list-group">
        <li class="list-group-item"><strong>Item ID: </strong>${item._id}</li>
        <li class="list-group-item"><strong>Created: </strong>${item.createdAt}</li>
        <li class="list-group-item"><strong>Updated: </strong>${item.updatedAt}</li>
      </ul>
      <div class="d-flex justify-content-start mt-2">
        <a href="../backoffice.html?itemID=${item._id}" type="button" class="btn btn-warning mr-3">Edit</a>
      </div>
    </div>
  </div>
</div>`

  const jumbotron = document.querySelector("main .jumbotron")
  jumbotron.style = `height: 40vh;
                    background: url(${item.imageUrl});
                    background-size: 13rem;
                    background-position: center;`
}

window.onload = () => {
  const url = "https://striveschool-api.herokuapp.com/api/product/"
  const itemID = new URLSearchParams(window.location.search).get("itemID")

  getAndDisplaySelectedItem(url, itemID)
}
