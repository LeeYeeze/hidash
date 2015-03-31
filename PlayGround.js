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

function mergeSort(arr) {
    if  (!Array.isArray(arr) || arr.length < 2) {
        return;
    }
    mergeSortHelper(arr, 0, arr.length-1,[]);

}

function mergeSortHelper(arr, left, right, helper) {
    if (left>=right) {
        return;
    }
    var mid = Math.floor((left+right)/2);
    mergeSortHelper(arr,left,mid,helper);
    mergeSortHelper(arr,mid+1,right,helper);
    for (var i = left ; i <=right; i++) {
        helper[i] = arr[i];
    }
    var index = left;
    var walker1 = left;
    var walker2 = mid+1;
    while (index<=right) {
        if (walker2>right || (walker1<mid+1 && helper[walker1]<=helper[walker2])) {
            arr[index++] = helper[walker1++];
        } else {
            arr[index++] = helper[walker2++];
        }
    }


}
var a = [9,8,7,1,2,3,4,5];
mergeSort(a);
console.log(a);



