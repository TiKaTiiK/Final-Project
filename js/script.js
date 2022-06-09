let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
};

let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
    cartItem.classList.remove('active');
};

let cartItem = document.querySelector('.cart-items-container');

document.querySelector('#cart-btn').onclick = () =>{
    cartItem.classList.toggle('active');
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
};

window.onscroll = () =>{
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
};




/* bee animation */

window.onload = function() {
    var flakes = [];
    var types = ['🐝','🐝','🐝'];
    for(var i = 0, len = 240; i < len; i++) {
      flakes.push('<i>' + types[i%3]  + '</i>');
    }  document.getElementById('bee').innerHTML = flakes.join('');
  };
  


/* slider script*/


let slider = document.querySelector('.slider');
let clones = [];

let items = [...document.querySelectorAll('.slider-item')];
let images = [...document.querySelectorAll('.img-div')];

images.forEach((image, idx) => {
    image.style.backgroundImage = 'url(./images/'+(idx+1)+'.jpg)';
});

items.forEach(item => {
    let clone = item.cloneNode(true);
    clone.classList.add('clone');
    slider.appendChild(clone);
    clones.push(clone);   
});

var scrollContainer = document.getElementsByClassName("slider-wrap")[0];
scrollContainer.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    scrollContainer.scrollLeft += evt.deltaY;
});

window.addEventListener('resize', onLoad);

function onLoad(){
}
onLoad();



//accordion
let accordion = document.getElementsByClassName('container');
for (let i = 0; i < accordion.length; i++) {
    accordion[i].addEventListener('click', function() {
        this.classList.toggle('active2');
        $(".posts")[0].classList.toggle('active3');
    });
}

// checkout div

$(document).ready(function(){
    $("#times").click(function(){
            $("#cart").remove();
    });
  });


  // ajax js 

let mainWraperPost = document.getElementById("post-block");
let overlay = document.getElementById('overlay');
let overlayContent = document.getElementById('content');
let closeOverlay = document.getElementById('close');
let closeOverlayPost = document.getElementById('close-2');

let addButton = document.getElementById ('add-post');
let postOverlay = document.getElementById ('overlay-add');
let form = document.getElementById ('form');


function ajax(url, callback) {
    let request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener ('load', function (){
        let data = JSON.parse(request.responseText);
        callback(data);
    });
    request.send();
}

ajax('https://jsonplaceholder.typicode.com/posts', function(data){
    printData(data);
});

function printData(data) {
    data.forEach(item => {
        createPost(item);
    });
}

function createPost (item) {
    let divWrapper = document.createElement('div');
    divWrapper.classList.add('posts');
    //divWrapper.classList.add('active3');
    divWrapper.setAttribute('data-id', item.id);
    divWrapper.addEventListener('click', function(event){
        postOverlay.classList.remove('active');
        let id = event.target.getAttribute('data-id');
        openOverlay(id);
    });

    let h2Tag =document.createElement('h2');
    h2Tag.innerText = item.id;

    let h3Tag = document.createElement('h3');
    h3Tag.innerText = item.title;

    let deleteButton = document.createElement('button');
    deleteButton.innerText = "Detele Post";
    deleteButton.classList.add('delete');
    deleteButton.setAttribute('data-id', item.id);

    divWrapper.appendChild(h2Tag);
    divWrapper.appendChild(h3Tag);
    divWrapper.appendChild(deleteButton);

    deleteButton.addEventListener('click', function(event){
        event.stopPropagation(); // ar gadasces mshobels
        let id = event.target.getAttribute('data-id');
        deletePost(id);
        divWrapper.classList.add('hide');
    });
    mainWraperPost.appendChild(divWrapper);
    accordion.appendChild(mainWraperPost);
   
}



function openOverlay(id) { 
    if  (id !== null) {
        overlay.classList.add('active');
        let url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    
        ajax(url, function(data){
            overlayFunction(data);
        });
    } else {
        overlay.classList.add('active');
        let h2Tag =document.createElement('h2');
        h2Tag.innerText = "Item.id === null !";
        }
}

function deletePost(id) {
    let url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    fetch(url, {
        method: 'DELETE',
    });
    
}

function overlayFunction (item) {
    let h2Tag =document.createElement('h2');
    h2Tag.innerText = item.id;

    let description = document.createElement('p');
    description.innerText = item.body;

    let title = document.createElement('h3');
    title.innerText = item.title;

    overlayContent.innerText = '';
    overlayContent.appendChild(h2Tag);
    overlayContent.appendChild(title);
    overlayContent.appendChild(description);
}

closeOverlay.addEventListener("click", function() {
    overlay.classList.remove('active');
});

addButton.addEventListener('click', function() {
    overlay.classList.remove('active');
    postOverlay.classList.add('active');
});

closeOverlayPost.addEventListener("click", function() {   
    postOverlay.classList.remove('active');
});

form.addEventListener('submit', function(event) {
    event.preventDefault(); // vachereb default action-s
    let item = {  
        title: event.target[0].value,
        body: event.target[1].value,
    };

    fetch ('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
            'content-type': 'application/json; charset-UTF-8',
        },
    })
    .then((response) => response.json())
    .then((json) => console.log(json));
        console.log(item);
    item.id = mainWraperPost.childNodes.length +=0;
    createPost(item);
    postOverlay.classList.remove('active');
});

