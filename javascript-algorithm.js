function mergeSort(arr) {
    let n = arr.length;
    if (n <= 1) return arr;

    const mid = Math.floor(n/2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    let i = 0, j = 0;
    let result = []

    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) result.push(left[i++]);
        else result.push(right[j++]);
    }
    return result.concat(left.slice(i)).concat(right.slice(j));
}

function binarySearch(arr, target) {
    let n = arr.length;
    let left = 0;
    let right = n - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        if(arr[mid] === target) return mid;  
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

function linearSearch(arr, target) {
    let n = arr.length;
    for (let i = 0; i < n; i++) {
        if(arr[i] === target) return i;
    }
    return -1;
}

function quickSort(arr, left = 0, right = arr.length - 1) {
    if (left >= right) return;

    let pivot = arr[right];
    let i = left;

    for (let j = left; j < right; j++) {
        if (arr[j] < pivot) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            i++;
        }
    }

    [arr[i], arr[right]] = [arr[right], arr[i]];

    quickSort(arr, left, i - 1);
    quickSort(arr, i + 1, right);
    return arr;
}

function fibonacciRecursive(n) {
    if (n <= 1) return n;
    return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}

function fibonacciDP(n){
    let dp =[0, 1];
    for (let i = 2; i <=n; i++) {
        dp[i] = dp[i - 1] + dp[i -2];
    }
    return dp[n];
}
