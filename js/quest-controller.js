'use strict';
var gLastRes = null;


$(document).ready(init);

function init() {
    createQuestsTree();

}
//hides the game-start section and shows the quest section
function onStartGuessing() {
    $('.game-start').hide()
    renderQuest();
    $('.quest').show()
}
//selects the <h2> inside quest and update its text by the currQuest text
function renderQuest() {
    var curr = getCurrQuest()
    $('.quest h2').text(curr.txt)
}

function renderVictory() {
    $('.quest').hide()
    $('.victory').show()
}

function onUserResponse(res) {
    var currQuest = getCurrQuest()
    if (isChildless(currQuest)) {
        if (res === 'yes') {
            renderVictory()
        } else {
            $('.quest').hide()
            $('.new-quest').show('slow')
            setTimeout(function() {
                $('.new-quest h2').text('Teach me please!')
            }, 2000)

        }
    } else {
        gLastRes = res
        moveToNextQuest(res);
        renderQuest();
    }
}

function onAddGuess() {
    if ($('#newQuest').val() && $('#newGuess').val()) {
        addGuess($('#newQuest').val(), $('#newGuess').val(), gLastRes)
        onRestartGame();
    } else {
        return
    }
}


function onRestartGame() {
    $('.victory').hide()
    $('.new-quest').hide();
    $('.game-start').show();
    gLastRes = null;
    restartQuests()
    renderQuest()
}