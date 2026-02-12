function flux1Cutscene() {
    inCutscene = true;
    alert("...");
    alert("...?");
    alert("There's... someone here?");
    alert("...Oh!");
    alert("You must be the player!");
    alert("The previous world master told me a lot about you, er...");
    alert("...crap, I forgot your name...");
    alert("...hey, can you tell me what's your name?");
    player.name = prompt("Enter your name:");
    alert("Ah, right, " + player.name + "! Cool name!");
    alert("By the way, I see you've gotten a lot of flux!");
    alert("I'm guessing it's getting boring. Wait a bit, I'm gonna check something...");
    setTimeout(function() {
        alert("I was right! The last world master left an upgrade here.");
        alert("Just gotta figure out how to give you that. Can't be that hard, right?");
        let extendedTimeout = Math.random() * 400;
        setTimeout(function() {
            console.error(`Uncaught TypeError: can't access property "style", document.getElementById(...) is null`);
            console.log("Crap...");
            extendedTimeout += Math.random() * 300;
        }, 1250 + extendedTimeout)
        setTimeout(function() {
            console.error(`Uncaught TypeError: can't access property "style", document.getElementById(...) is null`);
            console.log("Again?");
            extendedTimeout += Math.random() * 200;
        }, 2000 + extendedTimeout)
        setTimeout(function() {
            console.error(`Uncaught TypeError: can't access property "style", document.getElementById(...) is null`);
            console.log(">:(");
        }, 2500 + extendedTimeout)
        setTimeout(function() {
            player.state = gameState.fluxPart2;
            alert("There we go! Finally...");
            alert("So, I've unlocked a new upgrade for you. It should last you for a while.");
            alert("I'll be back in a bit, to see how you're doing.")
            inCutscene = false;
        }, 3250 + extendedTimeout)
    }, 4500)
}

function flux2Cutscene() {
    alert("Hey, I'm back, how's the flux goi-");
    alert("WHAT HAPPENED!?");
    alert("Oh no, that's not supposed to happen!");
    alert("What do I do, what do I do?");
    alert("...");
    alert("Okay, calm down...");
    alert("...");
    alert("Right, so here's what we're going to do.");
    alert("I'll give you a flux softcap, but I'll also unlock a new layer for you.")
    if (confirm("Sounds okay?")) {
        alert("Good! The layer should be unlocked now.");
        alert("I made this one myself, so I wanna see what you think!");
    }
    else {
        alert("...");
        alert("You're getting it anyway.");
        alert("I just unlocked it for you.");
        alert("I made this one myself, so I wanna see what you think.");
    }
    player.state = gameState.alphaPart1;
}

function alpha1Cutscene() {
    alert("...");
    alert("I screwed up the max level code.");
    alert("I'll try fixing that later. For now, you have this.");
}