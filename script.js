var ideaBody = document.querySelector('.input-body');
var ideaTitle = document.querySelector('.input-title');
var storedItems = [];
var ul = document.querySelector('ul');
var filterInput = document.querySelector('.search-input');
var saveBtn = document.querySelector('.save-btn');
var upBtn = document.querySelector('.up-btn');
var quality = 'swill';


function appendList() {
  var newIdea = document.createElement('li');
  newIdea.classList.add('idea-item');
  if (ideaTitle.value == 0 || ideaBody.value == 0 ) {
    newIdea.innerText = null;
  } else {
    newIdea.innerHTML = `
      <div class="top-row">
        <h3>${ideaTitle.value}</h3>
        <button class="delete-btn">button</button>
      </div>  
      <p>${ideaBody.value}</p>
      <button class="up-btn">up</button>
      <button class="down-btn">down</button>
      <span class="quality-rate">quality: <span class="quality">${quality}</span></span>`;
    ul.appendChild(newIdea);
    saveIdea(ideaTitle.value, ideaBody.value); 
  }
}

function deleteItem(e) {
  if (e.target.className === 'delete-btn') {
    e.target.parentNode.parentNode.remove(document.querySelector('.idea-item'));
  }
}


function formReset() {
  console.log(ideaTitle);
  console.log(ideaBody);
  ideaTitle.value = '';
  ideaBody.value = '';
}

function filterNames() {
  var filterValue = filterInput.value.toUpperCase();
  var ul = document.querySelector('.idea-list');
  var li = ul.querySelectorAll('.idea-item');
  for (var i = 0; i < li.length; i++) {
    var title = li[i].getElementsByTagName('h3')[0];
    if (title.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
      li[i].style.display = '';      
    } else {
      li[i].style.display = 'none';
    }
  }
}

function Idea(title, idea, quality, id) {
  this.title = title;
  this.idea = idea;
  this.quality = quality || 'swill';
  this.id = id || Date.now();
}

function saveIdea(event, ideaTitle, ideaBody) {
  var idea = new Idea(ideaTitle, ideaBody);
  if (localStorage.getItem('idea') === null){ 
    event.preventDefault();
    storedItems.push(idea);
    localStorage.setItem('storedItems', JSON.stringify(storedItems));
    appendList();
    formReset();
  }
}

filterInput.addEventListener('keyup', filterNames, true);


saveBtn.addEventListener('click', saveIdea);
ul.addEventListener('click', deleteItem);






// var ideaBody = document.querySelector('.idea-body');
// var ideaTitle = document.querySelector('.idea-title');
// var saveBtn = document.querySelector('.save-btn');
// var storedItems = [];
// var unorderedList = document.querySelector('ul');
// var upBtn;
// var quality = 'swill'
// var filterInput = document.querySelector('.search-bar');

// function appendList(e) {
//     var newIdea = document.createElement('li');
//     if (ideaTitle.value == 0 || ideaBody.value == 0) {
//         newIdea.innerText = null
//     } else {
//         newIdea.innerHTML =`
//         <li class="card idea-item">
//           <h3 contenteditable>${ideaTitle.value}</h3> 
//           <span class="delete-container"><button class="delete">
//           <img class="delete-btn" src="images/delete.svg" ></button></span>
//           <p contenteditable>${ideaBody.value}</p> 
//           <span class="up-arrow"><button class="up"><img class="up-pic" src="images/upvote.svg">
//           </button></span>
//           <span class="down-arrow">
//           <button class="down"><img class="down-pic" src="images/downvote.svg"></button></span>
//           <span class="quality-rate"><p class="quality-btn">quality: <span class="quality">${quality}</span></p></span>
//         </li>`
//         var listIdeas = document.querySelector("ul");
//         listIdeas.appendChild(newIdea);
//     }
// }

// function clearOut() {
//   ideaTitle.value = '';
//   ideaBody.value = '';
// }

// function deleteItem(e) {
//   if (e.target.className === 'delete-btn') {
//     e.target.parentNode.parentNode.parentNode.remove(document.querySelector('ul'));
//   }
// }

// function filterNames() {
//   var filterValue = filterInput.value.toUpperCase();
//   var ul = document.querySelector('.idea-list');
//   var li = ul.querySelectorAll('.idea-item');
//   for (var i = 0; i < li.length; i++) {
//     var title = li[i].getElementsByTagName('h3')[0];
//     if (title.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
//       li[i].style.display = '';      
//     } else {
//         li[i].style.display = 'none';
//       }
//     }
// }

// function saveIdea(e) {
//   e.preventDefault();
//   var ideaTitle = document.querySelector('.idea-title').value;
//   var ideaBody = document.querySelector('.idea-body').value;
//   var idea = new Idea(ideaTitle, ideaBody);
//   if (localStorage.getItem('idea') === null){    
//     storedItems.push(idea);
//     localStorage.setItem('storedItems', JSON.stringify(storedItems));
//     appendList();
//     clearOut();
//   }
// }

// saveBtn.addEventListener('click', saveIdea);

// filterInput.addEventListener('keyup', filterNames);

// unorderedList.addEventListener('click', deleteItem);

// unorderedList.addEventListener('mouseover', function(e) {
//   e.preventDefault();
//   if (e.target.className === 'up') {
//     e.target.childNodes[0].removeAttribute('src');
//     e.target.childNodes[0].setAttribute('src', 'images/upvote-hover.svg')
//   }
// })

// unorderedList.addEventListener('mouseout', function(e) {
//   e.preventDefault();
//   if (e.target.className === 'up') {
//     e.target.childNodes[0].removeAttribute('src');
//     e.target.childNodes[0].setAttribute('src', 'images/upvote.svg');
//   }
// })


// unorderedList.addEventListener('mouseover', function(e) {
//   e.preventDefault();
//   if (e.target.className === 'down') {
//     e.target.removeAttribute('src');
//     e.target.setAttribute('src', 'images/downvote-hover.svg')
//   }
// })

// unorderedList.addEventListener('mouseout', function(e) {
//   e.preventDefault();
//   if (e.target.className === 'down') {
//     e.target.removeAttribute('src');
//     e.target.setAttribute('src', 'images/downvote.svg');
//   }
// })


// unorderedList.addEventListener('mouseover', function(e) {
//   console.log(e);
//   e.preventDefault();
//   if (e.target.className === 'delete-btn') {
//     e.target.childNodes[0].setAttribute('src', 'images/delete-hover.svg')
//   console.log('mouseover')
//   }
// })

// unorderedList.addEventListener('mouseout', function(e) {
//   e.preventDefault();
//   if (e.target.className === 'delete-btn') {
//     e.target.childNodes[0].removeAttribute('src');
//     e.target.childNodes[0].setAttribute('src', 'images/delete.svg');
//   }
// })

// unorderedList.addEventListener('click', function(e) {
//   e.preventDefault();
//   if (e.target.className === 'up-pic' && quality === 'swill') {
//     quality = "plausible";
//     document.querySelector('.quality-btn').innerText = "quality: plausible";
//   }else if (e.target.className === 'up-pic' && quality === 'plausible'){
//     quality = "genuis";
//     document.querySelector('.quality-btn').innerText = "quality: genuis";
//   }
//     })

// unorderedList.addEventListener('click', function(e) {
//   e.preventDefault();
//   if (e.target.className === 'down-pic' && quality === 'genuis') {
//     quality = "plausible";
//     document.querySelector('.quality-btn').innerText = "quality: plausible";
//   }else if (e.target.className === 'down-pic' && quality === 'plausible'){
//     quality = "swill";
//     document.querySelector('.quality-btn').innerText = "quality: swill";
//   }
//     })

// unorderedList.addEventListener('click', function(e) {
//   e.preventDefault();
//   if (e.target.className === 'down') {
//     document.querySelector('.quality-btn').innerText = "plausible"
//   } 
// })
