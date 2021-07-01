const itemID = new URLSearchParams(window.location.search).get("itemID")

// url to fetch from
const url = "https://striveschool-api.herokuapp.com/api/product/"

// check if there's an Id on on search, if so let the url be modified by it
const endPoint = itemID ? url + itemID : url

//method to use depending if there's an ID or not
const method = itemID ? "PUT" : "POST"

//Check if theres an Id of search if so change the item imputs to what they had previously, and change the method to put

const checkId = async function () {
  if (itemID) {
    const submitEditBtn = document.querySelector("#submit-edit-btn")
    submitEditBtn.className = "btn btn-warning"
    submitEditBtn.innerText = "Edit"

    document.querySelector("#delete-btn").classList.remove("d-none")

    try {
      const response = await fetch(endPoint, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGRjNjA5ZmIzNTgxNzAwMTVjMjI3MGMiLCJpYXQiOjE2MjUwNTUzOTEsImV4cCI6MTYyNjI2NDk5MX0.4rreCWruc8iinYHIIdhbPTQo52bs9c82UeMWN-fKg0o",
        },
      })

      const item = await response.json()

      document.getElementById("product-name").value = item.name
      document.getElementById("product-brand").value = item.brand
      document.getElementById("product-price").value = item.price
      document.getElementById("product-description").value = item.description
      document.getElementById("product-image").value = item.imageUrl
    } catch (err) {
      document.querySelector("#error-container .text-danger").innerText = err
    }
  }
}

//function to submit or modify item
const submitItem = async (event) => {
  // prevent the default behavior of the form
  event.preventDefault()

  //submitted Item as an object
  const submittedItem = {
    name: document.getElementById("product-name").value,
    brand: document.getElementById("product-brand").value,
    price: document.getElementById("product-price").value,
    description: document.getElementById("product-description").value,
    imageUrl: document.getElementById("product-image").value,
  }

  // Fetch the Api and post the new object
  try {
    const response = await fetch(endPoint, {
      method,
      body: JSON.stringify(submittedItem),
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGRjNjA5ZmIzNTgxNzAwMTVjMjI3MGMiLCJpYXQiOjE2MjUwNTUzOTEsImV4cCI6MTYyNjI2NDk5MX0.4rreCWruc8iinYHIIdhbPTQo52bs9c82UeMWN-fKg0o",

        "Content-Type": "application/json",
      },
    })

    const item = await response.json()
    if (response.ok) {
      const alertSuccess = document.querySelector(".alert-success")
      if (itemID) {
        alertSuccess.classList.remove("d-none")
        alertSuccess.innerText = `Your Item with the ID:${item._id} was Edited with Success!`
      } else {
        alertSuccess.classList.remove("d-none")
        alertSuccess.innerText = `Your Item was Submitted with Success! Item ID: ${item._id}`
      }
    }
  } catch (err) {
    if (err) {
      const alertDanger = document.querySelector(".alert-danger")
      alertDanger.classList.remove("d-none")
      alertDanger.innerText = err
    }
  }
}

//function to delete an Item from the API
const deleteItem = async function () {
  const confirmed = confirm("Are you sure you want to delete this?")
  if (confirmed) {
    try {
      const response = await fetch(endPoint, {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGRjNjA5ZmIzNTgxNzAwMTVjMjI3MGMiLCJpYXQiOjE2MjUwNTUzOTEsImV4cCI6MTYyNjI2NDk5MX0.4rreCWruc8iinYHIIdhbPTQo52bs9c82UeMWN-fKg0o",
        },
      })

      const alertSuccess = document.querySelector(".alert-success")
      if (response.ok) {
        alertSuccess.classList.remove("d-none")
        alertSuccess.innerText = `Your Item was Deleted with Success!`
      }
    } catch (err) {
      if (err) {
        const alertDanger = document.querySelector(".alert-danger")
        alertDanger.classList.remove("d-none")
        alertDanger.innerText = err
      }
    }
  }
}

//window onload
window.onload = () => {
  checkId()
}
