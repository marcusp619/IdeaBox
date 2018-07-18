var ideaBody = document.querySelector('.idea-body');
var ideaTitle = document.querySelector('.idea-title');
var saveBtn = document.querySelector('.save-btn');
var storedItems = [];
var unorderedList = document.querySelector('ul');
var quality = 'swill'
var filterInput = document.querySelector('.search-bar');

function appendList(e) {
    e.preventDefault();
    var ideaId = Date.now();
    var ideaTitle = document.querySelector('.idea-title').value;
    var ideaBody = document.querySelector('.idea-body').value;
    var newIdea = document.createElement('li');
    if (ideaTitle == 0 || ideaBody == 0) {
        newIdea.innerText = null
    } else {
        newIdea.innerHTML =`
        <li class="card">
          <h3 class="fix" contenteditable data-name=${ideaId}>${ideaTitle}</h3> 
          <span class="delete-container"><button class="delete">
          <img class="delete-btn" src="images/delete.svg" ></button></span>
          <p contenteditable>${ideaBody}</p> 
          <span class="up-arrow"><button class="up"><img class="up-pic" src="images/upvote.svg">
          </button></span>
          <span class="down-arrow">
          <button class="down"><img class="down-pic" src="images/downvote.svg"></button></span>
          <span class="quality-rate"><p class="quality-btn">quality: <span class="quality">${quality}</span></p></span>
        </li>`
        var listIdeas = document.querySelector("ul");
        saveIdea(ideaTitle, ideaBody, ideaId);
        listIdeas.appendChild(newIdea);
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

function deleteItem(e) {
  var element = document.querySelector('h3').getAttribute('data-name');
  if (e.target.className === 'delete-btn') {
    e.target.parentNode.parentNode.parentNode.remove(document.querySelector('ul'));
  }
  // localStorage.removeItem(element);
}

function filterNames() {
  var filterValue = filterInput.value.toUpperCase();
  var ul = document.querySelector('.idea-list');
  var li = ul.querySelectorAll('.card');
  for (var i = 0; i < li.length; i++) {
    var title = li[i].getElementsByTagName('h3')[0];
    if (title.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
      li[i].style.display = '';      
    } else {
        li[i].style.display = 'none';
      }
    }
}

function saveIdea(ideaTitle, ideaBody, ideaId) {
  var idea = new Idea(ideaTitle, ideaBody, ideaId);
  console.log(idea);
  if (localStorage.getItem('idea') === null) {    
    localStorage.setItem(`${idea.id}`, JSON.stringify(idea));
    clearOut();
  }
}

function editIdea() {
  var ideaBody = document.querySelector('p').innerText;
  var ideaTitle = document.querySelector('h3').innerText;
  var element = document.querySelector('h3').getAttribute('data-name');
  saveIdea(ideaTitle, ideaBody, element);
}

// document.addEventListener("DOMContentLoaded", function(){
//   if (localStorage !== null){
//     var savedIdeas = JSON.parse(localStorage.getItem('storedItems'))
//     for (i = 0; i < savedIdeas.length; i++){
//     //this keeps readds everything that was already in storage after refresh
//       storedItems.push(savedIdeas[i]);
//       localStorage.setItem('storedItems', JSON.stringify(storedItems));
//       appendList(savedIdeas[i].title, savedIdeas[i].idea)
//     }
//   }
// });
saveBtn.addEventListener('click', appendList);

filterInput.addEventListener('keyup', filterNames);

unorderedList.addEventListener('click', deleteItem);

unorderedList.addEventListener('keypress', function(e) {
  var key = e.which || e.keyCode;
  if (key === 13) {
    editIdea();
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

