// neovim btw
giveCardsOnClicks();
clickDashboardDropDownButton();

let previousCardId = '';


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

    var dashboardColumnDropUpButton = document.getElementById('dashboardColumnDropUpButton');

    if (window.getComputedStyle(dashboardColumnDropUpButton).display === 'block'){
        collapseDashboardPanel();
    }
}

function constructSideBar(selectedCardId, cards){
    var dashboardPanel = document.getElementById('dashboardColumn');
    dashboardColumn.classList.remove('col-12');
    dashboardColumn.classList.add('col-12', 'col-md-4', 'col-lg-3');
    dashboardColumn.style.marginBottom = '20px';

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
    var contentPanelHeadingRow = contentPanelColumn.querySelector('#conentPanelHeadingRow');
    var contentPanelContent = document.getElementById('contentPanelContent');

    removePreviousCardContent(selectedCard, contentPanelHeadingRow, contentPanelContent);

    showSelectedCardContent(selectedCard, contentPanelColumn, contentPanelHeadingRow, contentPanelContent);
}

function removePreviousCardContent(selectedCard, contentPanelHeadingRow, contentPanelContent){
    if (previousCardId != ''){
        contentPanelHeadingRow.removeChild(conentPanelHeadingRow.querySelector(`#${previousCardId}ContentPanelHeader`));

        var previousPanelContent = contentPanelContent.querySelector(`#${previousCardId}ContentShowing`);
        contentPanelContent.removeChild(previousPanelContent);
    }

    previousCardId = selectedCard.id;
}

function showSelectedCardContent(selectedCard, contentPanelColumn, contentPanelHeadingRow){
    contentPanelColumn.removeAttribute('hidden');
    var selectedCardFooterRow = document.getElementById(`${selectedCard.id}FooterRow`).cloneNode(true);
    selectedCardFooterRow.id = `${selectedCard.id}ContentPanelHeader`;
    contentPanelHeadingRow.appendChild(selectedCardFooterRow);

    var contentToShowInPanel = document.getElementById(`${selectedCard.id}ContentHidden`).cloneNode(true);
    contentToShowInPanel.id = `${selectedCard.id}ContentShowing`;
    contentToShowInPanel.removeAttribute('hidden');
    contentPanelContent.appendChild(contentToShowInPanel);

    var contentPanelCard = contentPanelColumn.querySelector('#contentPanelCard');
    if (selectedCard.id == 'MyCard'){
        contentPanelCard.style.backgroundImage = "url('images/caves.jpg')";
        contentPanelCard.style.backgroundRepeat = "no-repeat";
        contentPanelCard.style.backgroundSize = "cover";
        contentPanelCard.style.backgroundPosition = "center";

    } else {
        contentPanelCard.style.backgroundImage = "";
    }
}

function clickDashboardDropDownButton(){
    var dashboardDropUpButton = document.getElementById('dashboardColumnDropUpButton');
    dashboardDropUpButton.style.cursor = 'pointer';
    dashboardDropUpButton.addEventListener('click', collapseDashboardPanel);
}

function collapseDashboardPanel(){
    var dashboardDropUpButton = document.getElementById('dashboardColumnDropUpButton');
    dashboardDropUpButton.classList.remove('fa-circle-chevron-up');
    dashboardDropUpButton.classList.add('fa-circle-chevron-down');
    dashboardDropUpButton.id = 'dashboardColumnDropDownButton'
    dashboardDropUpButton.removeEventListener('click', collapseDashboardPanel);
    dashboardDropUpButton.addEventListener('click', expandDashboardPanel);

    document.body.classList.add('hide-cards');
}

function expandDashboardPanel(){
    var dashboardDropDownButton = document.getElementById('dashboardColumnDropDownButton');
    dashboardDropDownButton.classList.remove('fa-circle-chevron-down');
    dashboardDropDownButton.classList.add('fa-circle-chevron-up');
    dashboardDropDownButton.id = 'dashboardColumnDropUpButton'
    dashboardDropDownButton.removeEventListener('click', expandDashboardPanel);
    dashboardDropDownButton.addEventListener('click', collapseDashboardPanel);

    document.body.classList.remove('hide-cards');
}


