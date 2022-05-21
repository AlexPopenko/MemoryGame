"use strict"

//get and set the numner of images
const getNumOfImages = () => parseInt(sessionStorage.numberOfImages) || 24;
const setNumOfImages = num => sessionStorage.numberOfImages = num;
//get and set the player name
const getPlayerName = () => sessionStorage.playerName || "";
const setPlayerName = name => sessionStorage.playerName = name;


const preloadAndStoreImages = () => {
   
//preload blank and back of card images
const back = new Image();   
back.src = "images/back.png";
const blank = new Image();
blank.src = "images/blank.png"
    
//array for storing memory images
const images = [];
    
//get number of images needed to store
    const numberOfImages = getNumOfImages(); //get value that the user set
//preload images and store into array
    for(let i = 1; i <= numberOfImages; i++) // use value from settings
        {
        const img = new Image();
        img.src = "images/card_" + i + ".png";
        images.push(img);
            
    }
    return images;
};

const storeCardSrcs = images =>
{
   
    const srcs = [];
    if(Array.isArray(images))
      {
       images.forEach(img =>{
           //store two of each
           srcs.push(img.src);
           srcs.push(img.src);
       });
                     
       }
    return srcs;
};
//Create cards in html

function createCards(srcs){
    
    
    
    for(let i = 0; i < srcs.length; i++)
        {
            
            
            var card = document.createElement('img');
            
            card.setAttribute('src', 'images/back.png');
            card.setAttribute('id',i);
            card.setAttribute('data-src',(Math.floor(Math.random() * srcs.length)));
           card.addEventListener('click', flipCards); document.getElementById("cards").appendChild(card);
            
            
        }
    
}

//Associate images with card spots
const pictures = [];
function imagesToCards(){
    
    const images = [];
    //const pictures = [];
    const numberOfImages = getNumOfImages();
    
    for(let i = 1; i <= numberOfImages; i++) // use value from settings
        {
        const img = new Image();
        img.src = "images/card_" + i + ".png";
        images.push(img);
            
    }
    
    
    for(let i = 0; i < numberOfImages; i++)
        {
        const randNum = Math.floor(Math.random() * images.length);
            const randNum2 = Math.floor(Math.random() * images.length);
            pictures.splice(randNum, 0, images[i]);
            pictures.splice(randNum2, 0, images[i]);
            
        }
    
    return pictures;
}


      
      
//Card animations on click
function flipCards(){
    const blankImage = new Image();
    blankImage.src = "images/blank.png";
   var cardID = this.getAttribute('id');
        if(this.src != blankImage.src)
       {
           
               
              $('#'+this.id).fadeOut(500,"linear", function(){ 
          this.src = pictures[cardID].src});
           
        
           
    let thisSrc = pictures[cardID].src;
           let thisID = this.id;
          $('#'+this.id).fadeIn(500,"linear");
           setTimeout(function(){checkMatch(thisSrc, thisID) }, 500); 
               
           
    
       }
    
    

}


let firstCardChosen = false;
let firstCard = "";
let secondCard = "";
let firstID = "";
let secondID = "";
let totalMatched = 0;
let totalTries = 0;

function checkMatch(src, id){
    setTimeout(function(){
    if(firstCardChosen)
        {
            
            secondCard = src;
            
            secondID = id;
            if(firstCard == secondCard && firstID != secondID)
                {
                    setTimeout(function(){$('#'+firstID).slideUp(500);
                    $('#'+secondID).slideUp(500);}, 1000)
                    
                    
                    
//                document.getElementById(firstID).src = "images/blank.png"; 
//                document.getElementById(secondID).src = "images/blank.png";
                
                }
            else
            {
                setTimeout(function(){
                    $('#'+firstID).fadeOut(500,"linear", function(){ 
          this.src = "images/back.png";
               $('#'+firstID).fadeIn(500,"linear"); });
                $('#'+secondID).fadeOut(500,"linear", function(){ 
          this.src = "images/back.png";
               $('#'+secondID).fadeIn(500,"linear"); });
                    
                },2000);
                
            }
            firstCardChosen = false;
            
            
            
        }
    else
        {
    firstCardChosen = true;
            firstCard = src;
            firstID =id;
            
        }
        }, 500);
    
}


//$("#new_game").click(() => {
//    
//    //const srcs = ;
//        createCards(storeCardSrcs(preloadAndStoreImages()));
//    
//});
function updateScore(){
    
}


$(document).ready(() =>{
    $("#tabs").tabs();
    document.get
    let pictures = imagesToCards();
    createCards(storeCardSrcs(preloadAndStoreImages()));
    //document.getElementById("cardNum1").src = "images/card_2.png";
    
    
    //add click even handler for the save settings button
    $("#save_settings").click( () => { 
    //Save settings
setNumOfImages(parseInt( $("#num_cards").val() ) / 2);   //divide by to because the cards contain 2 of each card
        setPlayerName($("#player_name").val() );
        //reload page
        
        location.reload();
        
        
        
    
    });
    
});