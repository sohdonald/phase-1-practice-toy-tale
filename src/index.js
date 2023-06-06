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
          // this is the where we make the like button
         
          likeButton.setAttribute("classs", "like-btn");

          //get id
          const toyId = toy.id;
          likeButton.setAttribute("id", toyId);
          likeButton.textContent = "Like ❤️";
          likeButton.addEventListener("click", (e) => {
            console.log(toyId, e.target, "clicked");
            //likeNo.textContent = `${(toy.likes + 1).toString()} Likes`;
            updateToy(toyId, toy.likes++, likeNo);
            // toy.likes++ works every time button clicks
            // toy.likes + 1 only works once
          });
          // likeButton not working
          toyCard.append(likeButton);
        });
      });
    //    .then(data => console.log(data))
  }

  renderToys();

  function updateToy(id, value, likeNo) {
    // how do we know like number is increasing?
    // id is the index number for the object list
    console.log(value);
    // sending info to change
    // const newValue = value + 1
    // track back unexpected behavior

    console.log(likeNo);

    fetch(`http:localhost:3000/toys/${id}`, {
      method: "PATCH",
      // POST would make new object list
      // PUT replaces existing object, need copy of original object to avoid bugs 
      // change value in object element
      // increase the number of likes
      // what's changing the value?


      headers: {
        "Content-Type": "application/json",
        // shape of the data
        Accept: "application/json",
      },

      body: JSON.stringify({
        // json.stringify changes value
        //likes: value simply maps the value, doesn't change it
        likes: value++,
        // value++ increases like number each click
      }),
    })
      .then((res) => res.json())
      // .then callback that runs when promise is resolved
      
      .then((toy) => {
        // toy is the object that got changed
        // need to change the value

        // promise has 3 states
        // pending, fullfilled, rejected
        
        // What can I log to answer my question
        // what I think I know vs what I actually know
        
        
        // need to know promise is working
        // self diagnosis
        // this needs to be callback function 
        // to work more than once
        
        //this adds the number of likes
        likeNo.textContent = `${(toy.likes).toString()} Likes`;
        
        //verify likes going up
        
        
        //check to see if we have value change is correct
        
        //like button only works once
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
