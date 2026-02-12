let upgradeSquares = []

let lastTime = 0;
let fps = 0;

let inCutscene = false;

function loop(currentTime) {
    const deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;
    //fps counter
    fps = 1 / deltaTime;

    if (fps != "Infinity") $( "#fpsCounter" ).text("FPS: " + Math.round(fps))
    //can buy loop
    for (let i = 0; i < upgradeSquares.length; i++) {
        let object = upgradeSquares[i]
        if (canBuy(object)) {
            object.addClass("can-buy")
        }
        else {
            object.removeClass("can-buy")
        }
        if (!squares[upgradeSquares[i].data("square-id")].unlocked()) {
            object.addClass("hidden");
        }
        else {
            object.removeClass("hidden");
        }
    }
    //flux currency stuff
    player.currencies["flux"] = player.currencies["flux"].add(getFluxGain(deltaTime));
    $( "#flux-value" ).text(format(player.currencies["flux"]));
    $( "#flux-rate" ).text(format(getFluxGain(1)));
    requestAnimationFrame(loop);
    //alpha currency stuff
    if (squares[5].unlocked()) {
        $( "#square-5" ).removeClass("hidden");
        player.currencies["alpha"] = player.currencies["alpha"].add(getAlphaGain(deltaTime));
        $( "#alpha-value" ).text(format(player.currencies["alpha"]));
        $( "#alpha-rate" ).text(format(getAlphaGain(1)));
    }
    else
    {
        $( "#square-5" ).addClass("hidden");
    }
    // story
    if (player.state < gameState.fluxPart2 && player.currencies.flux.gte(1e30) && !inCutscene) {
        flux1Cutscene();
    }
    if (player.state < gameState.alphaPart1 && player.currencies.flux.gte(1e100) && !inCutscene) {
        flux2Cutscene();
    }
}

$(document).ready(function() {
    requestAnimationFrame(loop);
})

function canBuy(object) {
    if (player.currencies[squares[object.data("square-id")].currency].gte(squares[object.data("square-id")].cost)) {
        return true;
    }
    return false;
}

function buyUpgrade(e) {
    let square = squares[upgradeSquares[e].data("square-id")];
    if (player.currencies[square.currency].gte(square.cost)) {
        player.currencies[square.currency] = player.currencies[square.currency].sub(square.cost);
        square.level = square.level.add(1);
        player.upgrades[e] = player.upgrades[e].add(1);
        square.cost = square.cost.mul(square.costMult).mul(square.level.pow(square.costExponent)).mul((square.level.lte(10)) ? (1) : (square.level.pow(square.level.pow(square.costUltraExponent))));
        $( "#upgrade-level-" + upgradeSquares[e].data("square-id")).text(square.level.toString());
        $( "#upgrade-effect-" + upgradeSquares[e].data("square-id")).text(format(square.effect()));
        $( "#upgrade-cost-" + upgradeSquares[e].data("square-id")).text(format(square.cost));
        if (square.onBuy) {
            square.onBuy();
        }
    }
}

function getFluxGain(deltaTime) {
    let gain = new Decimal(1)
    gain = gain.mul(squares[1].effect())
    gain = gain.mul(deltaTime)
    if (player.devSpeed) {
        gain = gain.mul(player.devSpeed)
    }
    gain = softcap(gain, new Decimal(1e100), 0.5)
    return gain
}

function getAlphaGain(deltaTime) {
    let gain = new Decimal(1);
    gain = gain.mul(squares[6].effect());
    gain = gain.mul(deltaTime);
    return gain;
}

function softcap(points, softcap, exponent) {
    if (points.lte(softcap)) {
        return points;
    }
    else {
        return softcap.mul(new Decimal(points.div(softcap)).pow(exponent));
    }
}