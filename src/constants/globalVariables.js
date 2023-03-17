//const SERVER_URL = "http://141.95.127.215:7328/";
//const MINI_GRAPH_DATA_URL = 'http://141.95.127.215:7328/get:short';
//const FULL_GRAPH_DATA_URL = 'http://141.95.127.215:7328/get:full';
const SERVER_URL = "http://localhost:7328/";
const MINI_GRAPH_DATA_URL = 'http://localhost:7328/get:short';
const FULL_GRAPH_DATA_URL = 'http://localhost:7328/get:full';
const MEDIA_SERVER_URL = 'http://141.95.127.215:8082/media-server'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const formatNumberToK = (num) => {
    num = num.toString().replace(/[^0-9.]/g, '');
    if (num < 1000) {
        return num;
    }
    let si = [
        { v: 1E3, s: "K" },
        { v: 1E6, s: "M" },
        { v: 1E9, s: "B" }
    ];
    let index;
    for (index = si.length - 1; index > 0; index--) {
        if (num >= si[index].v) {
            break;
        }
    }
    return (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[index].s;
}

export { MEDIA_SERVER_URL, ITEM_HEIGHT, ITEM_PADDING_TOP, SERVER_URL, MINI_GRAPH_DATA_URL, FULL_GRAPH_DATA_URL, formatNumberToK }