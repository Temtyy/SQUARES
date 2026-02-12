function format(number, isMaxLevel) {
    if (isMaxLevel) {
        return number.toString()
    }
    if (number.lte(1e6)) {
        return number.toStringWithDecimalPlaces(2)
    } else {
        let exponent = number.log10().floor()
        return number.div(new Decimal(10).pow(exponent)).toStringWithDecimalPlaces(2) + "e" + exponent.toString()
    }
}

function upgradeText(text, id, effect, displayType) {
    if (displayType) {
        return "Currently: " + "<span id='upgrade-effect-" + id + "'>" + format(effect) + "</span>x."
    }
    return text.replace("|", "<span id='upgrade-base-" + id + "'>" + format(effect) + "</span>")
}

function capitalizeString(text) {
    return text.substring(0, 1).toUpperCase() + text.substring(1)
}