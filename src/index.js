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

  function makeToy(toy) {
      const collection = document.querySelector("#toy-collection");
      const toyCard = document.createElement("div");
      toyCard.setAttribute("class", "card");

      //adds toy name
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
        
        // number of likes is being added here
        updateToy(toyId, toy.likes++, likeNo);
        // toy.likes++ works every time button clicks
        // toy.likes + 1 only works once
      });
      // likeButton not working
      toyCard.append(likeButton);
  }

  function renderToys() {
    fetch("http:localhost:3000/toys")
      .then((res) => res.json())
      .then((array) => {
        array.forEach(makeToy);
        });
      };
    //    .then(data => console.log(data))
  

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
        
        //this verifies the number of likes
        likeNo.textContent = `${(toy.likes).toString()} Likes`;
        
        //verify likes going up
        
        
        //check to see if we have value change is correct
        
        //like button only works once
        });
  }

  const newToyForm = document.querySelector("form");
  // add new toy using the post
  // add event listener for submit
  // addEventListener is the function, (e) => {} is callback function
  newToyForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // how do we turn off preventDefault so we can see
    // like number increasing?
    const getImage = document.querySelector("input[name='image']");
    const getName = document.querySelector("input[name='name']");
    const inputImage = getImage.value;
    const inputName = getName.value;


    postToy(inputName, inputImage, 0);
  });

  // unique value is id, created by database json
  function postToy(toyName, toyImage, toyLikes) {
    
    
    fetch(`http:localhost:3000/toys`, {
      method: "POST",
      // we need to get the form "add-toy-form" from index.html
      // add submit to actual form itself
      // need to get element from html
      // can't access html within post


      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // headers value is an object
      },

      body: JSON.stringify({
        //name: "Jessie",
        name: toyName,
        image: toyImage,
        
        //image:
          //"https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
        likes: toyLikes,
      })
      // how do we define object in js?

      // {
      //   name: "bob"
      // }

      // name would be key
      // bob would be value

        
    })
    .then((res) => res.json())
    .then( (data) => 
    // render the data to the DOM
    // DOM is document object model
(
    makeToy(data))
)    // second .then is what makes changes in DOM
    // second .then needed to display on DOM   
  }
  
});
