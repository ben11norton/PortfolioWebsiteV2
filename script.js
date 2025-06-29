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

    var contentPanelCard = contentPanelColumn.querySelector('#contentPanel');
    contentPanelCard.style.background = getSelectedCardPanelFeatures(selectedCard.id);
}

function getSelectedCardPanelFeatures(cardId){
    let backgroundColor = '';

    switch(cardId){
        case 'MyCard':
            giveMyCardWidgetsOnHover();
            givePhotoContentDropdown();
            backgroundColor = '#2C595B';
            break;
        case 'ExperienceCard':
            backgroundColor = '#203354';
            break;
        default:
            backgroundColor = '';
            break;
    }

    return backgroundColor;
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

function giveMyCardWidgetsOnHover(){
    var myContentPhotoWidgets = document.querySelectorAll('.myContentPhotoWidget');

    for(let i = 0; i < myContentPhotoWidgets.length; i++){
        myContentPhotoWidgets[i].addEventListener('mouseover', function(){
            var mouseHover = true;
            photoWidgetHover(myContentPhotoWidgets[i], mouseHover);
        })

        myContentPhotoWidgets[i].addEventListener('mouseleave', function(){
            var mouseHover = false;
            photoWidgetHover(myContentPhotoWidgets[i], mouseHover);
        })

        myContentPhotoWidgets[i].addEventListener('click', function(){
            selectPhotoWidget(myContentPhotoWidgets[i]);
        })
    }
}

function photoWidgetHover(photoWidget, mouseHover){
    var photoWidgetText = photoWidget.querySelector('.hiddenPhotoWidgetText');
    let currentPhotoWidgetTextTimeout;

    if(mouseHover) {
        photoWidget.style.transition = '0.5s ease';
        // photoWidget.style.width = `${photoWidget.parentNode.parentNode.offsetWidth * 0.5}px`;
        photoWidget.style.width = '200px';
        photoWidget.classList.remove('justify-content-center');
        photoWidget.classList.add('justify-content-start');
        photoWidgetText.classList.add('visible');

    } else {
        photoWidgetText.classList.remove('visible');

        var photoWidgetWidth = parseInt(photoWidget.style.width.replace('px', ''));
        photoWidget.style.width = '80px';
        var setBackToCenterAlignment = photoWidgetWidth == 80;

        if(setBackToCenterAlignment) {
            photoWidget.classList.remove('justify-content-start');
            photoWidget.classList.add('justify-content-center');
        }
    }
}

function selectPhotoWidget(selectedPhotoWidget){
    var selectedImageToShow = selectedPhotoWidget.querySelector('img').src;
    var photoWidgetContentPanel = document.getElementById('photoWidgetContentPanel');
    photoWidgetContentPanel.style.backgroundImage = `url('${selectedImageToShow}')`;
}

function givePhotoContentDropdown(){
    var myContentPhotoWidgetDropdown = document.getElementById('myContentPhotoWidgetDropdown');
    myContentPhotoWidgetDropdown.addEventListener('click', expandPhotoWidgetDropdown)
}

function expandPhotoWidgetDropdown(){
    var myContentPhotoWidgetDropdown = document.getElementById('myContentPhotoWidgetDropdown');
    myContentPhotoWidgetDropdown.style.transition = '0.5s ease';
    myContentPhotoWidgetDropdown.style.width = '200px';
    myContentPhotoWidgetDropdown.style.height = '300px';

    var dropdownIcon = myContentPhotoWidgetDropdown.querySelector('i');
    dropdownIcon.classList.remove('fa-circle-chevron-down');
    dropdownIcon.classList.add('fa-circle-chevron-up');

    myContentPhotoWidgetDropdown.removeEventListener('click', expandPhotoWidgetDropdown);
    myContentPhotoWidgetDropdown.addEventListener('click', collapsePhotoWidgetDropDown);
}

function collapsePhotoWidgetDropDown(){
    var myContentPhotoWidgetDropdown = document.getElementById('myContentPhotoWidgetDropdown');
    myContentPhotoWidgetDropdown.style.width = '80px';
    myContentPhotoWidgetDropdown.style.height = '40px';

    var dropdownIcon = myContentPhotoWidgetDropdown.querySelector('i');
    dropdownIcon.classList.remove('fa-circle-chevron-up');
    dropdownIcon.classList.add('fa-circle-chevron-down');

    myContentPhotoWidgetDropdown.removeEventListener('click', collapsePhotoWidgetDropDown);
    myContentPhotoWidgetDropdown.addEventListener('click', expandPhotoWidgetDropdown);
}

