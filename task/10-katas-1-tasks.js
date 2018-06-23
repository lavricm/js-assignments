'use strict';

/**
 * Returns the array of 32 compass points and heading.
 * See details here:
 * https://en.wikipedia.org/wiki/Points_of_the_compass#32_cardinal_points
 *
 * @return {array}
 *
 * Example of return :
 *  [
 *     { abbreviation : 'N',     azimuth : 0.00 ,
 *     { abbreviation : 'NbE',   azimuth : 11.25 },
 *     { abbreviation : 'NNE',   azimuth : 22.50 },
 *       ...
 *     { abbreviation : 'NbW',   azimuth : 348.75 }
 *  ]
 */
function createCompassPoints() {
    let sides = ['N','E','S','W'];  
    let arr=[], d=11.25, cnt=-1;
    function cp(str){
        cnt++;
        return {abbreviation: str,  azimuth: d*cnt};
    }
    for(let i=0; i<4; i++){
        let side1=sides[i], side2=sides[(i+1)%4];
        arr.push(cp(side1));
        if (i % 2 == 0){
            arr.push(cp(side1 + 'b' + side2));
            arr.push(cp(side1 + side1 + side2));
            arr.push(cp(side1 + side2 + 'b' + side1));
            arr.push(cp(side1 + side2));
            arr.push(cp(side1 + side2 + 'b' + side2));
            arr.push(cp(side2 + side1 + side2));
            arr.push(cp(side2 + 'b' + side1));
        }
        else {
            arr.push(cp(side1 + 'b' + side2));
            arr.push(cp(side1 + side2 + side1));
            arr.push(cp(side2 + side1 + 'b' + side1));
            arr.push(cp(side2 + side1));
            arr.push(cp(side2 + side1 + 'b' + side2));
            arr.push(cp(side2 + side2 + side1));
            arr.push(cp(side2 + 'b' + side1));
        }
    } return arr;
    // use array of cardinal directions only!
}


/**
 * Expand the braces of the specified string.
 * See https://en.wikipedia.org/wiki/Bash_(Unix_shell)#Brace_expansion
 *
 * In the input string, balanced pairs of braces containing comma-separated substrings
 * represent alternations that specify multiple alternatives which are to appear at that position in the output.
 *
 * @param {string} str
 * @return {Iterable.<string>}
 *
 * NOTE: The order of output string does not matter.
 *
 * Example:
 *   '~/{Downloads,Pictures}/*.{jpg,gif,png}'  => '~/Downloads/*.jpg',
 *                                                '~/Downloads/*.gif'
 *                                                '~/Downloads/*.png',
 *                                                '~/Pictures/*.jpg',
 *                                                '~/Pictures/*.gif',
 *                                                '~/Pictures/*.png'
 *
 *   'It{{em,alic}iz,erat}e{d,}, please.'  => 'Itemized, please.',
 *                                            'Itemize, please.',
 *                                            'Italicized, please.',
 *                                            'Italicize, please.',
 *                                            'Iterated, please.',
 *                                            'Iterate, please.'
 *
 *   'thumbnail.{png,jp{e,}g}'  => 'thumbnail.png'
 *                                 'thumbnail.jpeg'
 *                                 'thumbnail.jpg'
 *
 *   'nothing to do' => 'nothing to do'
 */
function* expandBraces(str) {
    let stack = [], prnt = [];
    let regExpr = /\{([^{}]+)\}/;
    stack.push(str); 
    while (stack.length > 0){
        let curr = stack.pop();
        let match = curr.match(regExpr);
        if (match){
            let subStr = match[1].split(",");
            subStr.forEach((value) => {stack.push(curr.replace(match[0], value));});
        }
        else if (prnt.indexOf(curr) == -1) {
            prnt.push(curr);
            yield curr;
        }
    }
}



/**
 * Returns the ZigZag matrix
 *
 * The fundamental idea in the JPEG compression algorithm is to sort coefficient of given image by zigzag path and encode it.
 * In this task you are asked to implement a simple method to create a zigzag square matrix.
 * See details at https://en.wikipedia.org/wiki/JPEG#Entropy_coding
 * and zigzag path here: https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/JPEG_ZigZag.svg/220px-JPEG_ZigZag.svg.png
 *
 * @param {number} n - matrix dimension
 * @return {array}  n x n array of zigzag path
 *
 * @example
 *   1  => [[0]]
 *
 *   2  => [[ 0, 1 ],
 *          [ 2, 3 ]]
 *
 *         [[ 0, 1, 5 ],
 *   3  =>  [ 2, 4, 6 ],
 *          [ 3, 7, 8 ]]
 *
 *         [[ 0, 1, 5, 6 ],
 *   4 =>   [ 2, 4, 7,12 ],
 *          [ 3, 8,11,13 ],
 *          [ 9,10,14,15 ]]
 *
 */
function getZigZagMatrix(n) {
    let i=0, j=0, ok=0;
    let arr=Array(n).fill([]).map(()=>Array(n).fill(0));
    for(let s=0; s<=2*(n-1); s++){
        if(s%2===0){
            i=Math.min(s, n-1);
            j=s-i;
            while(i>=0 && i<n && j>=0 && j<n){
                arr[i][j]=ok; ok++;
                i--; 
                j++;
            }
        }
        else{
            j=Math.min(s, n-1);
            i=s-j;
            while(i>=0 && i<n && j>=0 && j<n){
                arr[i][j]=ok; ok++;
                i++; 
                j--;
            }
        }
    } return arr;
}


/**
 * Returns true if specified subset of dominoes can be placed in a row accroding to the game rules.
 * Dominoes details see at: https://en.wikipedia.org/wiki/Dominoes
 *
 * Each domino tile presented as an array [x,y] of tile value.
 * For example, the subset [1, 1], [2, 2], [1, 2] can be arranged in a row (as [1, 1] followed by [1, 2] followed by [2, 2]),
 * while the subset [1, 1], [0, 3], [1, 4] can not be arranged in one row.
 * NOTE that as in usual dominoes playing any pair [i, j] can also be treated as [j, i].
 *
 * @params {array} dominoes
 * @return {bool}
 *
 * @example
 *
 * [[0,1],  [1,1]] => true
 * [[1,1], [2,2], [1,5], [5,6], [6,3]] => false
 * [[1,3], [2,3], [1,4], [2,4], [1,5], [2,5]]  => true
 * [[0,0], [0,1], [1,1], [0,2], [1,2], [2,2], [0,3], [1,3], [2,3], [3,3]] => false
 *
 */
function canDominoesMakeRow(dominoes) {
    let count = new Array(7).fill(0);
    dominoes.forEach(element => {
        if (element[0] == element[1]){
            if (count[element[0]] != 0){
                count[element[0]] += 2;
            }
            else {
                count[element[0]] += 0.5;
            }
        }
        else {
            for (let i = 0; i < 2; i++){
                if (count[element[i]] % 1 != 0){
                    count[element[i]] += 0.5;
                }
                else {
                    count[element[i]]++;
                }
            }
        }
    });
    let countOnes = count.reduce((prev, curr) => prev + curr % 2, 0);
    return (countOnes % 2 != 0 || countOnes > 2) ? false : true;
    /* throw new Error('Not implemented');
    let rez=[[]];
    rez[0]=dominoes.shift();
    let ctrl=0;
    while(ctrl!=dominoes.length && dominoes.length>0){
        for(let i=0; i<dominoes.length; i++){
            if(dominoes[i][0]===rez[rez.length-1][0] ){
                rez[rez.length]=dominoes[i].reverse();
                dominoes.splice(i, 1);
            }
            else if(dominoes[i][1]===rez[rez.length-1][0]){
                rez[rez.length]=dominoes[i];
                dominoes.splice(i, 1);
            }
        }
        ctrl=dominoes.length;
    }
    return (dominoes.length===0); */

}      

/**
 * Returns the string expression of the specified ordered list of integers.
 *
 * A format for expressing an ordered list of integers is to use a comma separated list of either:
 *   - individual integers
 *   - or a range of integers denoted by the starting integer separated from the end integer in the range by a dash, '-'.
 *     (The range includes all integers in the interval including both endpoints)
 *     The range syntax is to be used only for, and for every range that expands to more than two values.
 *
 * @params {array} nums
 * @return {bool}
 *
 * @example
 *
 * [ 0, 1, 2, 3, 4, 5 ]   => '0-5'
 * [ 1, 4, 5 ]            => '1,4,5'
 * [ 0, 1, 2, 5, 7, 8, 9] => '0-2,5,7-9'
 * [ 1, 2, 4, 5]          => '1,2,4,5'
 */
function extractRanges(nums) {
    let s='', p=nums[0], l=0, ctrl=0;
    for(let i=1; i<nums.length;){
            ctrl=0;
            while(p+1===nums[i]){
                ctrl++;
                p++;
                i++;
                if(i===nums.length && ctrl>=2){s=s+`${nums[l]}-${nums[i-1]},`; return s.slice(0, s.length-1);}
                else if(i===nums.length){
                    for(l; l<i; l++){
                        s=s+`${nums[l]},`;
                    }
                    return s.slice(0, s.length-1);
                }
            }
            if(ctrl<2){
                for(l; l<i; l++){
                    s=s+`${nums[l]},`;
                }
                l=i;
                i++;
                p=nums[i-1];
            }
            else{
                s=s+`${nums[l]}-${nums[i-1]},`
                l=i;
                p=nums[i];
                i++;
            }
    }
    return s.slice(0, s.length-1);
}

module.exports = {
    createCompassPoints : createCompassPoints,
    expandBraces : expandBraces,
    getZigZagMatrix : getZigZagMatrix,
    canDominoesMakeRow : canDominoesMakeRow,
    extractRanges : extractRanges
};
