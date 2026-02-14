function dialog(actor, content, emotion, htmlObject, htmlClass) {
    return new Promise((resolve) => {
        const dialogEl = $("#dialogBox")[0];
        $("#dialogBox > #actor").html(actor);
        dialogEl.showModal();
        const contentBox = $("#dialogBox > #content");
        $("#dialogBox > #closeDialogBtn").hide();
        for (let i = 0; i < content.length; i++) {
            setTimeout(function() {
                contentBox.html(contentBox.html() + (htmlObject ? "<" + htmlObject + " class='" + htmlClass + "'>" : "") + content[i] + "</" + htmlObject + ">");
            }, 50 * i);
        }
        setTimeout(function() {
            $("#dialogBox > #closeDialogBtn").show();
        }, 50 * (content.length + 1));
        dialogEl.addEventListener("close", function handler() {
            contentBox.html("");
            dialogEl.removeEventListener("close", handler);
            resolve(dialogEl.returnValue);
        });
    });
}

async function flux1Cutscene() {
    inCutscene = true;
    await dialog("???", "...", "blank");
    await dialog("???", "...?", "blank");
    await dialog("???", "There's... someone here?", "blank")
    await dialog("???", "...Oh!", "blank")
    await dialog("???", "You must be the player!", "happy")
    await dialog("???", "The previous world master told me a lot about you, er...", "happy")
    await dialog("???", "...crap, I forgot your name...", "blank", "sub")
    await dialog("???", "...hey, can you tell me what's your name?", "blank")
    player.name = prompt("Enter your name (you can change this later):");
    await dialog("???", "Ah, right, " + player.name + "! Cool name!", "happy");
    await dialog("[PLACEHOLDER NAME]", "I am [PLACEHOLDER NAME], the new master of this world!")
    await dialog("[PLACEHOLDER NAME]", "By the way, I see you've gotten a lot of flux!", "happy");
    await dialog("[PLACEHOLDER NAME]", "I'm guessing it's getting boring. Wait a bit, I'm gonna check something...", "focused");
    setTimeout(async function() {
        await dialog("[PLACEHOLDER NAME]", "I was right! The last world master left an upgrade here.", "happy");
        await dialog("[PLACEHOLDER NAME]", "Just gotta figure out how to give you that. Can't be that hard, right?", "smile");
        let extendedTimeout = Math.random() * 600;
        setTimeout(function() {
            console.error(`Uncaught TypeError: can't access property "style", document.getElementById(...) is null`);
            console.log("Crap...");
            extendedTimeout += Math.random() * 500;
        }, 1250 + extendedTimeout)
        setTimeout(function() {
            console.error(`Uncaught TypeError: can't access property "style", document.getElementById(...) is null`);
            console.log("Again?");
            extendedTimeout += Math.random() * 300;
        }, 2000 + extendedTimeout)
        setTimeout(function() {
            console.error(`Uncaught TypeError: can't access property "style", document.getElementById(...) is null`);
            console.log(">:(");
            extendedTimeout += Math.random() * 300;
        }, 2500 + extendedTimeout)
        setTimeout(async function() {
            player.state = gameState.fluxPart2;
            await dialog("[PLACEHOLDER NAME]", "There we go! Finally...", "relieved");
            await dialog("[PLACEHOLDER NAME]", "So, I've unlocked a new upgrade for you. It should last you for a while.", "smile");
            await dialog("[PLACEHOLDER NAME]", "I'll be back in a bit, to see how you're doing. Goodbye for now!", "smile");
            inCutscene = false;
        }, 3250 + extendedTimeout)
    }, 4500)
}

async function flux2Cutscene() {
    inCutscene = true;
    await dialog("[PLACEHOLDER NAME]", "Hey, I'm back, how's the flux goi-", "smile");
    await dialog("[PLACEHOLDER NAME]", "WHAT HAPPENED!?", "panicked");
    await dialog("[PLACEHOLDER NAME]", "Oh no, that's not supposed to be like this! Your flux gain isn't supposed to go up this fast!", "panicked");;
    await dialog("[PLACEHOLDER NAME]", "What do I do, what do I do?", "panicked");
    await dialog("[PLACEHOLDER NAME]", "...", "panicked");
    await dialog("[PLACEHOLDER NAME]", "Okay, calm down...", "calmingDown");
    await dialog("[PLACEHOLDER NAME]", "...", "calmingDown");
    await dialog("[PLACEHOLDER NAME]", "Right, so here's what we're going to do.", "neutral");
    await dialog("[PLACEHOLDER NAME]", "I'll give you a flux softcap, but I'll also unlock a new layer for you.", "neutral");
    if (confirm("Sounds okay?")) {
        await dialog("[PLACEHOLDER NAME]", "Good! The layer should be unlocked now.", "smile");
        await dialog("[PLACEHOLDER NAME]", "I made this one myself, so I wanna see what you think!", "happy");
    }
    else {
        
        await dialog("[PLACEHOLDER NAME]", "You're getting it anyway.", "irritated");
        await dialog("[PLACEHOLDER NAME]", "I just unlocked it for you.", "neutral");
        await dialog("[PLACEHOLDER NAME]", "I made this one myself, so I wanna see what you think.", "smile");
    }
    player.state = gameState.alphaPart1;
    inCutscene = false;
}

async function alpha1Cutscene() {
    inCutscene = true;
    await dialog("[PLACEHOLDER NAME]", "...", "irritated");
    await dialog("[PLACEHOLDER NAME]", "I screwed up the max level code.", "dissapointed");
    await dialog("[PLACEHOLDER NAME]", "I'll try fixing that later. For now, you have this.", "neutral");
    inCutscene = false;
}

async function alpha2Cutscene() {
    inCutscene = true;
    await dialog("[PLACEHOLDER NAME]", "I'm guessing this is getting boring.", "neutral");
    await dialog("[PLACEHOLDER NAME]", "Here, I'll add something I've been working on.", "smile");
    await dialog("[PLACEHOLDER NAME]", "There are a few upgrades behind this one, so it should keep you occupied for a bit.", "smile");
    await dialog("[PLACEHOLDER NAME]", "I'm gonna go make some coffee. I'll see you soon!", "smile");
    player.state = gameState.alphaPart2;
    inCutscene = false;
}

async function alpha3Cutscene() {
    inCutscene = true;
    await dialog("[PLACEHOLDER NAME]", "Hey, I'm ba-", "smile");
    await dialog("[PLACEHOLDER NAME]", "Oh god, what happened to the framerate!?", "panicked");
    await dialog("[PLACEHOLDER NAME]", "Why did this happen...", "panicked");
    await dialog("[PLACEHOLDER NAME]", "...oh. Right.", "dissapointed");
    await dialog("[PLACEHOLDER NAME]", "I'll... decrease square #10's max level and current level to 3. For now it should help.", "neutral");
    await dialog("[PLACEHOLDER NAME]", "The new square should also be unlocked now.", "neutral");
    squares[10].level = new Decimal(3);
    squares[10].maxLevel = new Decimal(3);
    player.upgrades[8] = new Decimal(3);
    $("#upgrade-level-10").text(3);
    $("#upgrade-max-level-10").text(3);
    player.state = gameState.alphaPart3;
    inCutscene = false;
}