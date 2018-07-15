var ideaBody = document.querySelector('.idea-body');
var ideaTitle = document.querySelector('.idea-title');
var saveBtn = document.querySelector('.save-btn');
var storedItems = [];
var unorderedList = document.querySelector('ul');
var upBtn = document.querySelector('.up');

function appendList() {
    var newIdea = document.createElement('li');
    if (ideaTitle.value == 0 || ideaBody.value == 0) {
        newIdea.innerText = null
    } else {
        newIdea.innerHTML =`
        <li class="card">
          <h3 contenteditable>${ideaTitle.value}</h3> 
          <span class="delete-container"><button class="delete">
          <img class="delete-btn"src="images/delete.svg" ></button></span>
          <p contenteditable>${ideaBody.value}</p> 
          <span class="up-arrow"><button class="up"><img src="images/upvote.svg">
          </button></span>
          <span class="down-arrow">
          <button class="down"><img class="down"src="images/downvote.svg"></button></span>
          <span class="quality-rate">quality:</span>
        </li>`
        var listIdeas = document.querySelector("ul");
        listIdeas.appendChild(newIdea);
    }
}

function clearOut() {
  ideaTitle.value = '';
  ideaBody.value = '';
}

function Idea(title, idea, quality) {
  this.title = title;
  this.idea = idea;
  this.quality = 'swill';
}

function saveIdea(e) {
  e.preventDefault();
  var ideaTitle = document.querySelector('.idea-title').value;
  var ideaBody = document.querySelector('.idea-body').value;
  var idea = new Idea(ideaTitle, ideaBody);
  console.log(localStorage.getItem('idea'));
  if (localStorage.getItem('idea') === null){    
    storedItems.push(idea);
    console.log(storedItems);
    localStorage.setItem('storedItems', JSON.stringify(storedItems));
    appendList();
    clearOut();
  }
}

saveBtn.addEventListener('click', saveIdea);

unorderedList.addEventListener('click', function(e) {
    e.preventDefault();
    if (e.target.className === 'delete-btn') {
        e.target.parentNode.parentNode.parentNode.remove(document.querySelector('ul'));
    } 
});

unorderedList.addEventListener('mouseover', function(e) {
  e.preventDefault();
  if (e.target.className === 'up') {
    e.target.childNodes[0].removeAttribute('src');
    e.target.childNodes[0].setAttribute('src', 'images/upvote-hover.svg');
  }
})

