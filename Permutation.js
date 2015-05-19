/**
 * Created by yizeli on 4/25/15.
 */
Array.matrix = function(numrows, numcols, initial){
    var arr = [];
    for (var i = 0; i < numrows; ++i){
        var columns = [];
        for (var j = 0; j < numcols; ++j){
            columns[j] = initial;
        }
        arr[i] = columns;
    }
    return arr;
};

function countingInversion(arr) {

}

function countingPermutationWithKInversions(n, k){
    var dp = Array.matrix(n+1,(n-1)*n/2+1,0);
    dp[0][0] = 1;
    for (var i = 1; i <= n; i++) {
        var sum = 0;
        for (var j = 0; j <=n*(n-1)/2; j++) {
            sum += dp[i-1][j];
            if (j >= i) {
                sum -= dp[i-1][j-i];
            }
            dp[i][j] = sum;
        }
    }
    //console.log(dp);
    return dp;
}

function countingPermutationWithKAdjacentSwaps(n, k, mod){
    var dp = Array.matrix(n+1,k+1,0);
    dp[0][0] = 1;
    for (var i = 1; i <= n; i++) {
        var sum = 0;
        for (var j = 0; j <=k; j++) {
            sum += dp[i-1][j];
            sum = sum % mod;
            if (j >= i) {
                sum += mod;
                sum -= dp[i-1][j-i];
                sum = sum % mod;
            }
            dp[i][j] = sum;
        }
    }
    var res = 0;
    for (var j = k; j >= 0; j-=2) {
        res+= dp[n][j];
    }
    return res;
}

function getAllPermutation(n) {
    var res = 1;
    for (var i = 1; i <= n; i++) {
        res*=i;
    }
    return res;
}

function countingPermutationWithKSwapAtMost(n,k,mod) {
    var dp = Array.matrix(n+1, k+1, 0);
    var res = 0;
    dp[0][0] = 1;
    for (var i = 1; i <= n; i++) {
        dp[i][0] = 1;
        for (var j = 1; j <= k; j++) {
            dp[i][j] = (dp[i-1][j] + (((i-1)*dp[i-1][j-1])%mod))%mod;
        }
    }


    for (var i = 0; i <= k; i++) {
        res += dp[n][i];
        res = res % mod;
    }

    return res;
}

function getNextPermutation() {

}

function getPermutations() {

}



console.log(countingPermutationWithKAdjacentSwaps(3,2,1000000007));
console.log(countingPermutationWithKSwapAtMost(3,2,1000000007));
