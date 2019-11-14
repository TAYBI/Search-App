// Author : Bilal TAYBI
// Github Link : https://github.com/TAYBI

// Get elements
const keyword = document.getElementById("keyword");
const form = document.getElementById("form");
const limit = document.getElementById("limit");
const sort = document.getElementById("sortby");

form.addEventListener("submit", e => {
  e.preventDefault();
  // fetch the Api
  fetch(
    `https://www.reddit.com/search.json?q=${keyword.value}&limit=${limit.value}&sort=${sort.value}`
  )
    .then(response => response.json())
    .then(data => data.data.children.map(children => children.data))
    .then(result => {
      // If we foud no results
      if (result.length === 0) {
        document.querySelector(
          ".notfound"
        ).innerHTML = `<div class="sorry2"><p>Sorry, we couldn't find any result for: ${keyword.value}</p></div>`;
      }

      // get result ant put them all in the  result element
      let grids = "";
      // Element in for every post in the result
      result.forEach(element => {
        const img = element.preview
          ? element.preview.images[0].source.url
          : "image-not-available.jpg";

        grids += `<div class="card">
        <div class="card-img">
          <img src="${img}" alt="Not Found" />
        </div>
        <h1 class="card-title">${element.title}</h1>
        <p class="card-text">${element.selftext.substring(0, 250)}
        </p>
        <a class="btn" href="${element.url}" target="_blanck">Read More</a>
      </div>`;
      });
      document.querySelector(".result").innerHTML = grids;

      //using substring method to make the max len 250 words
    })
    .catch(error => alert(`something  has been wrong: ${error}`));
});
