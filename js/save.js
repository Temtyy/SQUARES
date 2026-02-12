const gameState = createEnum([
    "fluxPart1", //beginning - 1e30 flux
    "fluxPart2", //1e30 flux - 1e100 flux/alpha unlock
    "alphaPart1", //alpha unlock - 1e100 alpha/alpha autobuyer unlock
    "alphaPart2", //1e100 alpha - 1e2000 alpha
])

let player = {
    name: "",
    state: gameState.fluxPart1,
    currencies: {
        "flux": new Decimal(0),
        "alpha": new Decimal(0),
    },
    upgrades: [
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
    ]
}

function serializePlayer(player) {
    let upgradeLevels = [];
    for (let i = 0; i < player.upgrades.length; i++) {
        upgradeLevels.push(player.upgrades[i].toString());
    }
    return {
        name: player.name,
        state: player.state,
        currencies: {
            flux: player.currencies.flux.toString(),
        },
        upgrades: upgradeLevels
    }
}

function save(isExporting) {
    let playerSave = serializePlayer(player);
    const saveFile = JSON.stringify(playerSave);
    if (isExporting) {
        navigator.clipboard.writeText(saveFile).then(
            function() {
                alert("Save exported to clipboard successfully.");
            },
            function(error)
            {
                alert(`Error while exporting save to clipboard: ${error}`);
            }
        )
    } else {
        localStorage.setItem("squares", saveFile)
        alert("Saved successfully.");
    }
}