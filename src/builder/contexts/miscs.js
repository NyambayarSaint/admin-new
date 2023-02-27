import RecursiveIterator from 'recursive-iterator';

var toString = Object.prototype.toString;

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

/**
 * @param {*} any
 * @returns {Boolean}
 */
function isObject(any) {
    return any !== null && typeof any === 'object';
}

/**
 * @param {*} any
 * @returns {String}
 */
function getType(any) {
    return toString.call(any).slice(8, -1);
}

/**
 * @param {*} any
 * @returns {*}
 */
function shallowCopy(any) {
    var type = getType(any);
    switch (type) {
        case 'Object':
            return {};
        case 'Array':
            return [];
        case 'Date':
            return new Date(any);
        case 'RegExp':
            return new RegExp(any);
        case 'Number':
        case 'String':
        case 'Boolean':
        case 'Undefined':
        case 'Null':
            return any;
        default:
            return String(any);
    }
}

/**
 * @param {*} any
 * @param {Boolean} [deep]
 * @returns {*}
 */
function makeTrackable(any, deep = false) {
    if (!deep || !isObject(any)) {
        return shallowCopy(any);
    }

    var map = new Map();
    var rootNode = shallowCopy(any);
    map.set(any, rootNode);

    for (var { parent, node, key, path } of new RecursiveIterator(any, 1, true)) {
        var parentNode = map.get(parent);
        var cloneNode = shallowCopy(node);
        parentNode[key] = cloneNode;
        if (parentNode.component) parentNode.track = path.filter(x => isNumeric(x))
        map.set(node, cloneNode);
    }

    map.clear();

    return rootNode;
}

const isEqual = (arg1, arg2) => {
    if (JSON.stringify(arg1) === JSON.stringify(arg2)) return true
    else return false
}
const processStyleString = (indices) => {

    const targetNode = document.querySelector(`[kind="component"][data-track="${indices}"]`)
    if (!targetNode) throw new Error('No such target for given indices')

    const styleAttributes = targetNode.getAttribute('style')
    if (!styleAttributes) throw new Error('Target has no style attributes!')

    const semiColonSplit = styleAttributes.split(';')
    const styleAttributesObject = {}

    semiColonSplit.forEach(arg => {
        const [key, value] = arg.split(':')
        if (key && value) styleAttributesObject[key.replace(' ', '')] = value
    })

    return styleAttributesObject
}
const getNodeByIndices = (indices) => {
    const targetNode = document.querySelector(`[kind="component"][data-track="${indices}"]`)
    if (!targetNode) throw new Error('No such target for given indices')
    return targetNode
}

const kebabize = (str) => str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? "-" : "") + $.toLowerCase())

export {
    makeTrackable,
    isEqual,
    processStyleString,
    kebabize,
    getNodeByIndices
}







// roundLayer = (givenComponentList, indices, round, selectorArray, track, arrayToCollect) => {

//     const thisIndex = indices[0]
//     if (typeof round === "undefined") round = -1; round++
//     if (!arrayToCollect) arrayToCollect = []
//     if (!track) track = ''


//     if (thisIndex) {
//         indices.shift()

//         if (selectorArray) selectorArray.push(`.children[${thisIndex}]`)
//         else selectorArray = [`[${thisIndex}]`]

//         this.roundLayer(givenComponentList, indices, round, selectorArray)
//     } else {
//     }
// }








/*

componentRemoveReducer = (array, sourceIndex, cb) => {
        return array.reduce(
            (acc, item) => {
                // acc -> short for "accumulator" (array)
                // item -> the current array item

                // so that we don't overwrite the item parameter
                const newItem = item;

                if (item.children) {
                    // here is the recursive call
                    newItem.children = this.componentRemoveReducer(item.children, sourceIndex, cb);
                }
                if (!isEqual(newItem.track, sourceIndex)) {
                    // here's where acc takes the new item
                    acc.push({ ...newItem });
                } else {
                    cb(newItem)
                }
                // we always have to return acc
                return acc;
            },
            // initialize accumulator (empty array)
            []
        );
    };
    componentAddReducer = (array, targetIndex, instanceCopy, lastPointer) => {
        return array.reduce(
            (acc, item) => {
                // acc -> short for "accumulator" (array)
                // item -> the current array item

                // so that we don't overwrite the item parameter
                const newItem = item;

                if (item.children) {
                    // here is the recursive call
                    newItem.children = this.componentAddReducer(item.children, targetIndex, instanceCopy, lastPointer);
                }
                if (JSON.stringify(newItem.track) === JSON.stringify(targetIndex)) {
                    if (lastPointer === "m") {
                        acc.push({ ...newItem, track: null, children: [{ ...instanceCopy }] });
                    } else {
                        if (lastPointer === "up") acc.push({ ...instanceCopy, track: null })
                        acc.push({ ...newItem, track: null });
                        if (lastPointer === "down") acc.push({ ...instanceCopy, track: null })
                    }
                } else {
                    acc.push({ ...newItem, track: null });

                }
                // we always have to return acc
                return acc;
            },
            // initialize accumulator (empty array)
            []
        );
    };

*/



/*

Object.byString = (o, s) => {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o
}
// Object.byString(clonedCompositionData, selectorArray)

*/