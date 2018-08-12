let ideaBody = document.querySelector('.idea-body');
let ideaTitle = document.querySelector('.idea-title');
let saveBtn = document.querySelector('.save-btn');
let storedItems = [];
let unorderedList = document.querySelector('ul');
let quality = 'swill'
let filterInput = document.querySelector('.search-bar');

function appendList(e)  {
    e.preventDefault();
    let ideaId = Date.now();
    let ideaTitle = document.querySelector('.idea-title').value;
    let ideaBody = document.querySelector('.idea-body').value;
    if (ideaTitle == 0 || ideaBody == 0) {
        newIdea.innerText = null
    } else {
        addNewCard(ideaId, ideaTitle, ideaBody)
    }
}

function addNewCard(ideaId, ideaTitle, ideaBody, quality='swill'){
  let newIdea = document.createElement('li');
  newIdea.innerHTML =`
        <li class="card" data-name=${ideaId}>
          <h3 class="edit-h" contenteditable >${ideaTitle}</h3> 
          <span class="delete-container"><button class="delete">
          <img class="delete-btn" src="images/delete.svg" ></button></span>
          <p class="edit-p" contenteditable>${ideaBody}</p> 
          <span class="up-arrow"><button class="up"><img class="up-pic" src="images/upvote.svg">
          </button></span>
          <span class="down-arrow">
          <button class="down"><img class="down-pic" src="images/downvote.svg"></button></span>
          <span class="quality-rate"><p class="quality-btn">quality: <span class="quality">${quality}</span></p></span>
        </li>`
        let listIdeas = document.querySelector("ul");
        saveIdea(ideaTitle, ideaBody, ideaId);
        listIdeas.appendChild(newIdea);
}

function deleteItem(e) {
  if (e.target.className === 'delete-btn') {
    let cardId = e.path[3].attributes[1].value
    removeFromStorage(cardId)
    e.target.parentNode.parentNode.parentNode.remove(document.querySelector('ul'));
  }
}

function removeFromStorage(cardId){
  for(let key in localStorage){
    if(key == cardId){
      localStorage.removeItem(key)
    }
  }
}


function clearOut() {
  ideaTitle.value = '';
  ideaBody.value = '';
}

function Idea(title, idea, id, quality) {
  this.title = title;
  this.idea = idea;
  this.id = id;
  this.quality = quality || 'swill';
}


function filterNames() {
  let filterValue = filterInput.value.toUpperCase();
  let ul = document.querySelector('.idea-list');
  let li = ul.querySelectorAll('.card');
  for (let i = 0; i < li.length; i++) {
    let title = li[i].getElementsByTagName('h3')[0];
    if (title.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
      li[i].style.display = '';      
    } else {
        li[i].style.display = 'none';
      }
    }
}

function saveIdea(ideaTitle, ideaBody, ideaId) {
  let idea = new Idea(ideaTitle, ideaBody, ideaId);
  console.log(idea);
  if (localStorage.getItem('idea') === null) {    
    localStorage.setItem(`${idea.id}`, JSON.stringify(idea));
    clearOut();
  }
}

function editIdea(e) {
  let elementId = $(e.target).parent().data('name');
  let ideaBody = $(e.target).parent().find('p').text(); 
  let ideaTitle = $(e.target).parent().find('h3').text();
  saveIdea(ideaTitle, ideaBody, elementId);
}

 document.addEventListener("DOMContentLoaded", function(){
  if (localStorage.length > 0){
  for(let key in localStorage){
      idea = JSON.parse(localStorage.getItem(key))
      addNewCard(idea.id, idea.title, idea.idea, idea.quality) 
   }
 }
 });






saveBtn.addEventListener('click', appendList);

filterInput.addEventListener('keyup', filterNames);

unorderedList.addEventListener('click', deleteItem);

unorderedList.addEventListener('keyup', function(e) {
  let key = e.which || e.keyCode;
  if (key === 13){
    editIdea(e);
  }
});

unorderedList.addEventListener('click', function(e) {
    e.preventDefault();
    if (e.target.className === 'delete-btn') {
        e.target.parentNode.parentNode.parentNode.remove(document.querySelector('ul'));
    } 
});

unorderedList.addEventListener('mouseover', function(e) {
  e.preventDefault();
  if (e.target.className === 'up-pic') {
    e.target.removeAttribute('src');
    e.target.setAttribute('src', 'images/upvote-hover.svg')
  }
})

unorderedList.addEventListener('mouseout', function(e) {
  e.preventDefault();
  if (e.target.className === 'up-pic') {
    e.target.removeAttribute('src');
    e.target.setAttribute('src', 'images/upvote.svg');
  }
})

unorderedList.addEventListener('mouseover', function(e) {
  e.preventDefault();
  if (e.target.className === 'down-pic') {
    e.target.removeAttribute('src');
    e.target.setAttribute('src', 'images/downvote-hover.svg')
  }
})

unorderedList.addEventListener('mouseout', function(e) {
  e.preventDefault();
  if (e.target.className === 'down-pic') {
    e.target.removeAttribute('src');
    e.target.setAttribute('src', 'images/downvote.svg');
  }
})

unorderedList.addEventListener('mouseover', function(e) {
    e.preventDefault();
    if (e.target.className === 'delete-btn') {
        e.target.removeAttribute('src')
        e.target.setAttribute('src','images/delete-hover.svg');
    } 
});

unorderedList.addEventListener('mouseout', function(e) {
  e.preventDefault();
  if (e.target.className === 'delete-btn') {
    e.target.removeAttribute('src');
    e.target.setAttribute('src', 'images/delete.svg')
  console.log('mouseover')
  }
})

unorderedList.addEventListener('click', function(e) {
  e.preventDefault();
  if (e.target.className === 'up-pic' && quality === 'swill') {
    quality = "plausible";
    document.querySelector('.quality-btn').innerText = "quality: plausible";
  } else if (e.target.className === 'up-pic' && quality === 'plausible'){
    quality = "genuis";
    document.querySelector('.quality-btn').innerText = "quality: genuis";
  }
    })

unorderedList.addEventListener('click', function(e) {
  e.preventDefault();
  if (e.target.className === 'down-pic' && quality === 'genuis') {
    quality = "plausible";
    document.querySelector('.quality-btn').innerText = "quality: plausible";
  } else if (e.target.className === 'down-pic' && quality === 'plausible'){
    quality = "swill";
    document.querySelector('.quality-btn').innerText = "quality: swill";
  }
    })

