$(document).ready(function() {
    /*
    for (let i = 0; i < squares.length; i++) {
        let upgrade = document.createElement("div")
        upgrade.id = "square-" + i

        upgrade.innerHTML = "<div class=\"box-id\">#" + i + "</div>"

        if (squares[i].type == "currency") {
            upgrade.classList = "box currency"
            upgrade.innerHTML += "<div class='currency-title'>" + capitalizeString(squares[i].currencyName) + "</div>"
            upgrade.innerHTML += "<div class='currency-value'>" + format(player.currencies[squares[i].currencyName]) + "</div>"
            upgrade.innerHTML += "<div class='currency-rate'>" + "(<span id='" + squares[i].currencyName + "-rate'>0</span>/s)</div>"
        } else if (squares[i].type == "upgrade") {
            upgrade.classList = "box upgrade"
            upgrade.innerHTML += "<div class='upgrade-level'>[Level <span id='upgrade-level-" + i + "'>0</span> / <span id='upgrade-max-level-" + i + "'>" + format(squares[i].maxLevel, true) + "</span>]"
            upgrade.innerHTML += "<div class='upgrade-desc'>" + upgradeText(squares[i].effectText, i, squares[i].effectDisplay()) + "</div>"
            upgrade.innerHTML += "<div class='upgrade-effect'>" + upgradeText(squares[i].effectText, i, squares[i].effect(), true) + "</div>"
            upgrade.innerHTML += "<div class='upgrade-cost' id='upgrade-maxed-" + i + "'>Costs " + "<span id='upgrade-cost-" + i + "'>" + squares[i].cost.toString() + "</span>" + " " + capitalizeString(squares[i].currency) + "</div>"
            upgradeSquares[upgradeSquares.length] = upgrade
        }
        $("#game").append(upgrade)
    }
    */
    let upgradeNumber = 0;
    for (let i = 0; i < squares.length; i++) {
        let upgradeSquareSettings = { id: "square-" + i }
        if (squares[i].type == "currency") {
            upgradeSquareSettings["class"] = "box currency"
            if (squares[i].currencyName != "flux") {
                upgradeSquareSettings["class"] += " " + squares[i].currencyName + "-square"
            }
        } else if (squares[i].type == "upgrade") {
            upgradeSquareSettings["class"] = "box upgrade"
        }
        let upgrade = $("<div>", upgradeSquareSettings)
        upgrade.append($("<div>", { class: "box-id" }).text("#" + i))
        if (squares[i].type == "currency") {
            upgrade.append($("<div>", { class: "currency-title" }).text(capitalizeString(squares[i].currencyName)))
            upgrade.append($("<div>", { class: "currency-value", id: squares[i].currencyName + "-value" }).text(0))
            upgrade.append($("<div>", { class: "currency-rate" }).html('(<span id="' + squares[i].currencyName + '-rate">0</span>/s)'))
            upgrade.append($("<div>", { class: "buy-max hidden", id: squares[i].currencyName + "-buy-max", onClick: () => buyMax(squares[i].currencyName) }).text("Buy Max"))
        } else if (squares[i].type == "upgrade") {
            upgrade.append($("<div>", { class: "upgrade-level" }).html("[Level <span id='upgrade-level-" + i + "'>0</span> / <span id='upgrade-max-level-" + i + "'>" + format(squares[i].maxLevel, true) + "</span>]"))
            upgrade.append($("<div>", { class: "upgrade-desc" }).html(upgradeText(squares[i].effectText, i, squares[i].effectDisplay())))
            upgrade.append($("<div>", { class: "upgrade-effect" }).html(upgradeText(squares[i].effectText, i, squares[i].effect(), true)))
            upgrade.append($("<div>", { class: "upgrade-cost", id: "upgrade-maxed-" + i }).html("Costs " + "<span id='upgrade-cost-" + i + "'>" + format(squares[i].cost) + "</span>" + " " + capitalizeString(squares[i].currency)))
            if (!squares[i].unlocked()) {
                upgrade.css( "display: none" );
            }
            upgrade.data("upgrade-id", upgradeNumber)
            upgrade.data("square-id", i)
            upgrade.on("click", function() {
                buyUpgrade($(this).data("upgrade-id"))
            })
            upgradeSquares[upgradeNumber] = upgrade
            upgradeNumber++
        }

        $("#game").append(upgrade)
    }
})

function buyMax() {} //placeholder, remove later