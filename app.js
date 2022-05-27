//Selector
const search_form = document.querySelector(".search_form");
const app_btn = document.querySelector(".app_btn");
const search_input = document.querySelector(".search_input");

app_btn.addEventListener("click", (e) => {
  if (e.target.classList.contains('fa-sun')){
    document.querySelector('body').classList.add('theme')
    app_btn.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }
  else{
    app_btn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    document.querySelector('body').classList.remove('theme')
  }
});

// Base url
let url = "https://api.github.com/users/";

//Listing Submit Event
search_form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (!search_input.value) return alert("Please enter a name");
  getUserData(search_input.value);
});

//Get user data when user click form submit
async function getUserData(username) {
  try {
    const res = await fetch(url + username);
    const data = await res.json();
    if (data.message === "Not Found")
      return alert("Please enter a valid username");
    //Best Patrice Destructure Data
    const {
      avatar_url,
      name,
      bio,
      followers,
      following,
      public_repos,
      company,
      location,
      twitter_username,
    } = data;
    console.log(data);
    //Output
    let output = `
    <div class="image">
        <img src="${avatar_url}" alt="">
    </div>
    <div class="user_data">
        <h2>${name}</h2>
        <p>${bio}</p>
        <ul>
            <li>Followers: <strong>${followers}</strong></li>
            <li>Following: <strong>${following}</strong></li>
            <li>Repos: <strong>${public_repos} </strong></li>
            <li>Location: <strong>${location}</strong></li>
            <li><strong>Twitter: </strong> ${
              twitter_username === null
                ? "you don't have account"
                : twitter_username
            }</li>
            <li><strong>Company: </strong>${
              company === ""
                ? "Please add your company name in github"
                : company
            } </li>
        </ul>
        
        <div class="repo">
            
        </div>
    </div>
 `;
    document.querySelector(".wrapper").innerHTML = `<div class="info"></div>`;
    const info = document.querySelector(".info");
    //Out Info
    info.innerHTML = output;
    let imageWidth = document.querySelector(".image").clientWidth;
    let image = document.querySelector(".image");
    image.style.cssText = `height: ${imageWidth}px`;
    // When User Search After Value is empty
    search_input.value = "";

    userRepo(username);
  } catch (error) {
    console.log(error.message);
  }
}

//Fetch User Repo
async function userRepo(username) {
  try {
    const res = await fetch(url + username + "/repos");
    const data = await res.json();

    let repos = "";
    data.forEach(({ html_url, name }) => {
      console.log(name);
      repos += `<a href="${html_url}">${name}</a>`;
    });
    document.querySelector(".repo").innerHTML = repos;
  } catch (error) {
    console.log(error.message);
  }
}

window.addEventListener("resize", function () {
  if (document.querySelector(".image")) {
    let imageWidth = document.querySelector(".image").clientWidth;
    let image = document.querySelector(".image");
    image.style.cssText = `height: ${imageWidth}px`;
  }
});
