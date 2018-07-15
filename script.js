var ideaBody = document.querySelector('.idea-body');
var ideaTitle = document.querySelector('.idea-title');
var saveBtn = document.querySelector('.save-btn');
var storedItems = [];
var unorderedList = document.querySelector('ul');
var upBtn;


function appendList() {
    var newIdea = document.createElement('li');
    if (ideaTitle.value == 0 || ideaBody.value == 0) {
        newIdea.innerText = null
    } else {
        newIdea.innerHTML =`
        <li class="card">
          <h3 contenteditable>${ideaTitle.value}</h3> 
          <span class="delete-container"><button class="delete">
          <img class="delete-btn" src="images/delete.svg" ></button></span>
          <p contenteditable>${ideaBody.value}</p> 
          <span class="up-arrow"><button class="up"><img class="up-pic" src="images/upvote.svg">
          </button></span>
          <span class="down-arrow">
          <button class="down"><img class="down"src="images/downvote.svg"></button></span>
          <span class="quality-rate"><p class="quality-btn">quality: </p></span>
        </li>`
        console.log("this is the button" + upBtn)
        // searchIdeas()
        var listIdeas = document.querySelector("ul");
        listIdeas.appendChild(newIdea);
    }
}

// function searchIdeas(){
//   var search = document.querySelector('.search');
//   var ul = document.querySelector('ul');
//   var filter = search.value.toUpperCase();
//   for (i = 0; i < ul.length; i++) {
//      if (ideaTitle.value.innerHTML.toUpperCase().indexOf(filter) > -1 || ideaBody.value.innerHTML.toUpperCase().indexOf(filter) > -1) {
//             ideaTitle[i].style.display = "";
//             ideaBody[i].style.display ="";
//   }
// }
// }


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
    e.target.childNodes[0].setAttribute('src', 'images/upvote-hover.svg')
  }
})

unorderedList.addEventListener('mouseout', function(e) {
  e.preventDefault();
  if (e.target.className === 'up') {
    e.target.childNodes[0].removeAttribute('src');
    e.target.childNodes[0].setAttribute('src', 'images/upvote.svg');
  }
})


unorderedList.addEventListener('mouseover', function(e) {
  e.preventDefault();
  if (e.target.className === 'down') {
    e.target.removeAttribute('src');
    e.target.setAttribute('src', 'images/downvote-hover.svg')
  }
})

unorderedList.addEventListener('mouseout', function(e) {
  e.preventDefault();
  if (e.target.className === 'down') {
    e.target.removeAttribute('src');
    e.target.setAttribute('src', 'images/downvote.svg');
  }
})


unorderedList.addEventListener('mouseover', function(e) {
  console.log(e);
  e.preventDefault();
  if (e.target.className === 'delete-btn') {
    // e.target.childNodes[0].removeAttribute('src');
    e.target.childNodes[0].setAttribute('src', 'images/delete-hover.svg')
  console.log('mouseover')
  }
})

// unorderedList.addEventListener('mouseout', function(e) {
//   e.preventDefault();
//   if (e.target.className === 'delete-btn') {
//     e.target.childNodes[0].removeAttribute('src');
//     e.target.childNodes[0].setAttribute('src', 'images/delete.svg');
//   }
// })

unorderedList.addEventListener('click', function(e) {
  e.preventDefault();
  if (e.target.className === 'up-pic') {
    document.querySelector('.quality-btn').innerText = 'genuis'
    console.log('is this working? ')
  }
})

// if quality is pluasible, click upbtn and quality will be swill
// if quality is swill, click upbtn and quality will be genuis

// unorderedList.addEventListener('click', function(e) {
//   e.preventDefault();
//   if (e.target.className === 'down') {
//     document.querySelector('.quality-btn').innerText = "plausible"
//     console.log('is this working? ')
//   }
// })


