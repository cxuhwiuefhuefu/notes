const strArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y'];

// Math.random()

const random = function(n) {
    let str = '';

    for(let i = 0; i < n; i++) {
        let index = Math.floor( Math.random() * 52 );
        str += strArr[index];
    }

    return str;
}

export {random}















