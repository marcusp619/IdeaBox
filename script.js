var saveBtn = document.querySelector('.save-btn');
var storedItems = [];

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
  appendElement(obj);
  if (localStorage.getItem('idea') === null){    
    storedItems.push(idea);
    console.log(storedItems);
    localStorage.setItem('storedItems', JSON.stringify(storedItems));
  }
}

fucntion appendElement(obj) {

}

saveBtn.addEventListener('click', saveIdea);
