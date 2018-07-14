var saveBtn = document.querySelector('.save-btn');
var storedItems = [];
var ideaTitle = document.querySelector('.idea-title');
var ideaBody = document.querySelector('.idea-body');
var unorderedList = document.querySelector('ul');

function Idea(title, idea, quality) {
  this.title = title;
  this.idea = idea;
  this.quality = quality;
}

function saveIdea(e) {
  e.preventDefault();
  var ideaTitle = document.querySelector('.idea-title').value;
  var ideaBody = document.querySelector('.idea-body').value;

  var idea = new Idea(ideaTitle, ideaBody);
  appendElement(idea);
  if (localStorage.getItem('idea') === null){    
    storedItems.push(idea);
    console.log(storedItems);
    localStorage.setItem('storedItems', JSON.stringify(storedItems));
    appendList();
    clearOut();
  }
}

function appendElement(obj) {
 console.log(obj);
}

saveBtn.addEventListener('click', saveIdea);

function appendList() {
    var newIdea = document.createElement('li');
    if (ideaTitle.value == 0 || ideaBody.value == 0) {
        newIdea.innerText = null
    } else {
        newIdea.innerHTML =`
        <h3 contenteditable>${ideaTitle.value}</h3>
        <span> <button class="delete">
        <img class="delete-btn"src="images/delete.svg"></button></span>
        <p contenteditable>${ideaBody.value}</p>
        <span class="up-arrow"><button class="up">
        <img class= "down" src="images/upvote.svg"></button></span>
        <span class="down-arrow">
        <button class="down"><img src="images/downvote.svg"></button></span>
        <span class="quality-rate">quality:</span>`
        var listIdeas = document.querySelector("ul");
        listIdeas.appendChild(newIdea);
    }
}
unorderedList.addEventListener('click', function(e) {
    e.preventDefault();
    if (e.target.className === 'delete-btn') {
        e.target.parentNode.parentNode.parentNode.remove(document.querySelector('ul'));
    }
    console.log('delete me')
    console.log(e)
})

function clearOut() {
  ideaTitle.value = '';
  ideaBody.value = '';
}


