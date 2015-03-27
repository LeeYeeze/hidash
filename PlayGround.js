/**
 * Created by yizeli on 3/23/15.
 */

function bestTimeToBuyAndSellStocks(arr,k) {


}

function editDistance() {

}

function waterTrap() {


}

function largestRectangle() {


}

function getLIS(arr) {

}

function getLCS(A, B) {

}

function twoSum() {

}

function threeSum() {

}

function longestPalindrome() {

}

function isValidBST() {

}

function medianOf2SortedArray() {

}

function validParenthesis() {

}

function removeDuplicatesFromSortedArray() {

}

function wildCardMatching(s, p) {
    var i = 0;
    var j = 0;
    var mark = -1;
    var star = -1;
    while (i < s.length) {
        if (j< p.length && (p.charAt(j)=='.' || p.charAt(j) == s.charAt(i))) {
            i++;
            j++;
        } else if (j < p.length && p.charAt(j) == '*') {
            star = j++;
            mark = i;

        } else if (star!=-1){
            j = star+1;
            i = ++mark;
        } else {
            return;
        }
        while (j< p.length && p.charAt(j) == '*') {
            j++;
        }
        return j == p.length;
    }


}



