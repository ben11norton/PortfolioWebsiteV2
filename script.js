// neovim btw
let previousCardId = '';

giveCardsOnClicks();
function giveCardsOnClicks(){
    var dashboardCards = document.querySelectorAll('[id$="Card"]');

    for (let i = 0; i < dashboardCards.length; i++){
        dashboardCards[i].addEventListener('click', function(){
            showSelectedCardPage(dashboardCards[i], dashboardCards);
        })
    }
}

function showSelectedCardPage(selectedCard, dashboardCards){
    constructSideBar(selectedCard.id, dashboardCards);
    constructConentPanel(selectedCard);
}

function constructSideBar(selectedCardId, cards){
    var dashboardPanel = document.getElementById('dashboardColumn');
    dashboardColumn.classList.remove('col-12');
    dashboardColumn.classList.add('col-3');

    for (let i = 0; i < cards.length; i++){
        if (cards[i].id == selectedCardId) {
            cards[i].parentNode.style.display = 'none';

        } else {
            cards[i].parentNode.classList.remove('col-md-4', 'col-lg-3');
            cards[i].parentNode.classList.add('col-12');
            cards[i].parentNode.style.display = 'block';
        }
    }
}

function constructConentPanel(selectedCard){
    var contentPanelColumn = document.getElementById('contentPanelColumn');
    contentPanelColumn.removeAttribute('hidden');
    var contentPanelHeadingRow = contentPanelColumn.querySelector('#conentPanelHeadingRow');
    var selectedCardFooterRow = document.getElementById(`${selectedCard.id}FooterRow`).cloneNode(true);
    selectedCardFooterRow.id = `${selectedCard.id}ContentPanelHeader`;
    contentPanelHeadingRow.appendChild(selectedCardFooterRow);

    if (previousCardId != ''){
        contentPanelHeadingRow.removeChild(conentPanelHeadingRow.querySelector(`#${previousCardId}ContentPanelHeader`));
    }

    previousCardId = selectedCard.id;
}



