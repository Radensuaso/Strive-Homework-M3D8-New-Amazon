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

  // url to fetch from
  const url = "https://striveschool-api.herokuapp.com/api/product/"

  // Fetch the Api and post the new object
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(submittedItem),
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGRjNjA5ZmIzNTgxNzAwMTVjMjI3MGMiLCJpYXQiOjE2MjUwNTUzOTEsImV4cCI6MTYyNjI2NDk5MX0.4rreCWruc8iinYHIIdhbPTQo52bs9c82UeMWN-fKg0o",

        "Content-Type": "application/json",
      },
    })
    if (response.ok) {
      document.querySelector("#success-container .text-success").innerText =
        "Your Item was Submitted with Success"
    }
  } catch (err) {
    document.querySelector("#error-container .text-danger").innerText = err
  }
}
