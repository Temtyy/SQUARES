function createEnum(items) { //items is an array of the elements inside
    let newEnum = {};
    for (let i = 0; i < items.length; i++) {
        newEnum[items[i]] = i;
    }
    return Object.freeze(newEnum);
}