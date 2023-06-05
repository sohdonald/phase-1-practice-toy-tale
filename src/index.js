let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  function renderToys() {
    fetch("http:localhost:3000/toys")
      .then((res) => res.json())
      .then((array) => {
        array.forEach((toy) => {
          const collection = document.querySelector("#toy-collection");
          const toyCard = document.createElement("div");
          toyCard.setAttribute("class", "card");

          const toyName = document.createElement("h2");
          toyName.textContent = toy.name;

          // append toyName to toyCard
          toyCard.append(toyName);

          // append toyCard to toy-collection div aka collection
          collection.append(toyCard);

          //add img src
          const toyImage = document.createElement("img");
          const toyImageSite = toy.image;

          toyImage.setAttribute("src", toyImageSite);
          toyImage.setAttribute("class", "toy-avatar");
          toyCard.append(toyImage);

          // add <p>
          const likeNo = document.createElement("p");
          likeNo.textContent = `${toy.likes.toString()} Likes`;
          toyCard.append(likeNo);

          // add button
          const likeButton = document.createElement("button");
          likeButton.setAttribute("classs", "like-btn");

          //get id
          const toyId = toy.id;
          likeButton.setAttribute("id", toyId);
          likeButton.textContent = "Like ❤️";
          likeButton.addEventListener("click", (e) => {
            console.log(toyId, e.target, "clicked");
            //likeNo.textContent = `${(toy.likes + 1).toString()} Likes`;
            updateToy(toyId, toy.likes + 1, likeNo);
          });
          // likeButton not working
          toyCard.append(likeButton);
        });
      });
    //    .then(data => console.log(data))
  }

  renderToys();

  function updateToy(id, value, likeNo) {
    fetch(`http:localhost:3000/toys/${id}`, {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      body: JSON.stringify({
        likes: value,
      }),
    })
      .then((res) => res.json())
      .then((toy) => {
        likeNo.textContent = `${(toy.likes).toString()} Likes`;
        });
  }

  function postToy() {
    fetch("http:localhost:3000/toys", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      body: JSON.stringify({
        name: "Jessie",
        image:
          "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
        likes: 0,
      })
        .then((res) => res.json())
        .then(console.log(toys)),
    });
  }

  //   headers:
  // {
  //   "Content-Type": "application/json",
  //   Accept: "application/json"
  // }

  // body: JSON.stringify({
  //   "likes": newNumberOfLikes
  // })
});
