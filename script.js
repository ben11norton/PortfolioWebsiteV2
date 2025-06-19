// neovim btw

giveCardsOnClicks();
function giveCardsOnClicks(){
  document.getElementById('MyCard').addEventListener('click', showMyPersonalPage);
  document.getElementById('ProjectsCard').addEventListener('click', showMyProjectsPage);
  document.getElementById('ExperienceCard').addEventListener('click', showMyExperiencePage);
  document.getElementById('ContactCard').addEventListener('click', showMyContactPage);
}

function showMyPersonalPage(){
  var dashboardPanel = document.getElementById('dashboardColumn');
  dashboardColumn.classList.remove('col-12');
  dashboardColumn.classList.add('col-3');

  var cards = dashboardColumn.querySelectorAll('[id$="Card"]');
  debugger;

  for(let i = 0; i < cards.length; i++){
    var cardId = cards[i].id;

    if(cardId.includes('My')){
      cards[i].parentNode.style.display = 'none';

    } else{
      cards[i].parentNode.classList.remove('col-md-4', 'col-lg-3');
      cards[i].parentNode.classList.add('col-12');
    }
  }

  var contentPanelColumn = document.getElementById('contentPanelColumn');
  contentPanelColumn.removeAttribute('hidden');
}

function showMyProjectsPage(){

}

function showMyExperiencePage(){

}

function showMyContactPage(){

}

