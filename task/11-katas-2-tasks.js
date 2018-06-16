'use strict';

/**
 * Returns the bank account number parsed from specified string.
 *
 * You work for a bank, which has recently purchased an ingenious machine to assist in reading letters and faxes sent in by branch offices.
 * The machine scans the paper documents, and produces a string with a bank account that looks like this:
 *
 *    _  _     _  _  _  _  _
 *  | _| _||_||_ |_   ||_||_|
 *  ||_  _|  | _||_|  ||_| _|
 *
 * Each string contains an account number written using pipes and underscores.
 * Each account number should have 9 digits, all of which should be in the range 0-9.
 *
 * Your task is to write a function that can take bank account string and parse it into actual account numbers.
 *
 * @param {string} bankAccount
 * @return {number}
 *
 * Example of return :
 *
 *   '    _  _     _  _  _  _  _ \n'+
 *   '  | _| _||_||_ |_   ||_||_|\n'+     =>  123456789
 *   '  ||_  _|  | _||_|  ||_| _|\n'
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '| | _| _|| ||_ |_   ||_||_|\n'+     => 23056789
 *   '|_||_  _||_| _||_|  ||_| _|\n',
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '|_| _| _||_||_ |_ |_||_||_|\n'+     => 823856989
 *   '|_||_  _||_| _||_| _||_| _|\n',
 *
 */
function parseBankAccount(bankAccount) {
    let xd=bankAccount;
    let p=0, s=bankAccount.length/3;
    let st=''; 
    while(p<s){
        if(xd.slice(p, p+3)===' _ ' && xd.slice(p+s, p+s+3)==='| |' && xd.slice(p+2*s, p+2*s+3)==='|_|') st=st+`${0}`;
        if(xd.slice(p, p+3)==='   ' && xd.slice(p+s, p+s+3)==='  |' && xd.slice(p+2*s, p+2*s+3)==='  |') st=st+`${1}`;
        if(xd.slice(p, p+3)===' _ ' && xd.slice(p+s, p+s+3)===' _|' && xd.slice(p+2*s, p+2*s+3)==='|_ ') st=st+`${2}`;
        if(xd.slice(p, p+3)===' _ ' && xd.slice(p+s, p+s+3)===' _|' && xd.slice(p+2*s, p+2*s+3)===' _|') st=st+`${3}`;
        if(xd.slice(p, p+3)==='   ' && xd.slice(p+s, p+s+3)==='|_|' && xd.slice(p+2*s, p+2*s+3)==='  |') st=st+`${4}`;
        if(xd.slice(p, p+3)===' _ ' && xd.slice(p+s, p+s+3)==='|_ ' && xd.slice(p+2*s, p+2*s+3)===' _|') st=st+`${5}`;
        if(xd.slice(p, p+3)===' _ ' && xd.slice(p+s, p+s+3)==='|_ ' && xd.slice(p+2*s, p+2*s+3)==='|_|') st=st+`${6}`;
        if(xd.slice(p, p+3)===' _ ' && xd.slice(p+s, p+s+3)==='  |' && xd.slice(p+2*s, p+2*s+3)==='  |') st=st+`${7}`;
        if(xd.slice(p, p+3)===' _ ' && xd.slice(p+s, p+s+3)==='|_|' && xd.slice(p+2*s, p+2*s+3)==='|_|') st=st+`${8}`;
        if(xd.slice(p, p+3)===' _ ' && xd.slice(p+s, p+s+3)==='|_|' && xd.slice(p+2*s, p+2*s+3)===' _|') st=st+`${9}`;
        p+=3;
    }
    return st;
}


/**
 * Returns the string, but with line breaks inserted at just the right places to make sure that no line is longer than the specified column number.
 * Lines can be broken at word boundaries only.
 *
 * @param {string} text
 * @param {number} columns
 * @return {Iterable.<string>}
 *
 * @example :
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 26 =>  'The String global object',
 *                                                                                                'is a constructor for',
 *                                                                                                'strings, or a sequence of',
 *                                                                                                'characters.'
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 12 =>  'The String',
 *                                                                                                'global',
 *                                                                                                'object is a',
 *                                                                                                'constructor',
 *                                                                                                'for strings,',
 *                                                                                                'or a',
 *                                                                                                'sequence of',
 *                                                                                                'characters.'
 */
function* wrapText(text, columns) {
    let arr=text.split(' ');
    let s=0, l=0;
    for(let i=0; i<arr.length; ){
        s=0;
        l=i;
        while(i<arr.length && s+(arr[i]).length<=columns){
            s+=(arr[i]).length+1;
            i++;
        }
        s--;
        let ar='';
        for(l; l<i; l++){
            ar=ar+' '+arr[l];
        }
        yield ar.substr(1, ar.length-1); 
    }
   
}


/**
 * Returns the rank of the specified poker hand.
 * See the ranking rules here: https://en.wikipedia.org/wiki/List_of_poker_hands.
 *
 * @param {array} hand
 * @return {PokerRank} rank
 *
 * @example
 *   [ '4♥','5♥','6♥','7♥','8♥' ] => PokerRank.StraightFlush
 *   [ 'A♠','4♠','3♠','5♠','2♠' ] => PokerRank.StraightFlush
 *   [ '4♣','4♦','4♥','4♠','10♥' ] => PokerRank.FourOfKind
 *   [ '4♣','4♦','5♦','5♠','5♥' ] => PokerRank.FullHouse
 *   [ '4♣','5♣','6♣','7♣','Q♣' ] => PokerRank.Flush
 *   [ '2♠','3♥','4♥','5♥','6♥' ] => PokerRank.Straight
 *   [ '2♥','4♦','5♥','A♦','3♠' ] => PokerRank.Straight
 *   [ '2♥','2♠','2♦','7♥','A♥' ] => PokerRank.ThreeOfKind
 *   [ '2♥','4♦','4♥','A♦','A♠' ] => PokerRank.TwoPairs
 *   [ '3♥','4♥','10♥','3♦','A♠' ] => PokerRank.OnePair
 *   [ 'A♥','K♥','Q♥','2♦','3♠' ] =>  PokerRank.HighCard
 */
const PokerRank = {
    StraightFlush: 8,
    FourOfKind: 7,
    FullHouse: 6,
    Flush: 5,
    Straight: 4,
    ThreeOfKind: 3,
    TwoPairs: 2,
    OnePair: 1,
    HighCard: 0
}

function getPokerHandRank(hand) {
    throw new Error('Not implemented');
    let arr=['2', '3', '4', '5', '6', '7', '8', '10', 'J', 'Q', 'K', 'A'];
    hand.sort((a,b)=>(arr.indexOf(a.slice(0, a.length-1))-arr.indexOf(b.slice(0, b.length-1))));
    function c(x){
        return x.slice(0, x.length-1);
    }
    function m(x){
        return x[x.length-1];
    }

}


/**
 * Returns the rectangles sequence of specified figure.
 * The figure is ASCII multiline string comprised of minus signs -, plus signs +, vertical bars | and whitespaces.
 * The task is to break the figure in the rectangles it is made of.
 *
 * NOTE: The order of rectanles does not matter.
 * 
 * @param {string} figure
 * @return {Iterable.<string>} decomposition to basic parts
 * 
 * @example
 *
 *    '+------------+\n'+
 *    '|            |\n'+
 *    '|            |\n'+              '+------------+\n'+
 *    '|            |\n'+              '|            |\n'+         '+------+\n'+          '+-----+\n'+
 *    '+------+-----+\n'+       =>     '|            |\n'+     ,   '|      |\n'+     ,    '|     |\n'+
 *    '|      |     |\n'+              '|            |\n'+         '|      |\n'+          '|     |\n'+
 *    '|      |     |\n'               '+------------+\n'          '+------+\n'           '+-----+\n'
 *    '+------+-----+\n'
 *
 *
 *
 *    '   +-----+     \n'+
 *    '   |     |     \n'+                                    '+-------------+\n'+
 *    '+--+-----+----+\n'+              '+-----+\n'+          '|             |\n'+
 *    '|             |\n'+      =>      '|     |\n'+     ,    '|             |\n'+
 *    '|             |\n'+              '+-----+\n'           '+-------------+\n'
 *    '+-------------+\n'
 */
function* getFigureRectangles(figure) {
   throw new Error('Not implemented');
}


module.exports = {
    parseBankAccount : parseBankAccount,
    wrapText: wrapText,
    PokerRank: PokerRank,
    getPokerHandRank: getPokerHandRank,
    getFigureRectangles: getFigureRectangles
};
