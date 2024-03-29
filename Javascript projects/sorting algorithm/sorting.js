const bubbleSort = (arr) => {
    for(let i = 0; i < arr.length; i++){
        for(let j = i + 1; j < arr.length; j++){
            if(arr[i] > arr[j]){
                let temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}
const selectionSort = (arr) =>{
    for (let i = 0; i < arr.length - 1; i++){
        min_index = i;
        for(let j = i + 1; j < arr.length; j++){
            if(arr[min_index] > arr[j]){
                min_index = j;
            }
        }
        if(arr[min_index] != i){
            let temp = arr[min_index];
            arr[min_index] = arr[i];
            arr[i] = temp; 
        }
    }
    return arr;
}
// function merge(left, right) {
//     let sortedArr = []
//     while (left.length && right.length) {
//       if (left[0] < right[0]) {
//         sortedArr.push(left.shift())
//       } else {
//         sortedArr.push(right.shift())
//       }
//     }
//    return [...sortedArr, ...left, ...right]
// }
// function mergeSort(arr) {
//     if (arr.length <= 1) return arr
//     let mid = Math.floor(arr.length / 2)
//     let left = mergeSort(arr.slice(0, mid))
//     let right = mergeSort(arr.slice(mid))
//     return merge(left, right)
// }

const mergeSort = (arr, start, end) =>{
    if(start >= end){
        return;
    }
    var mid = start + parseInt((end - start)/2);
    mergeSort(arr, start, mid);
    mergeSort(arr, mid+1, end);
    return merge(arr, start, mid, end);
}
const merge = (arr, left, mid, right) =>{

    var leftArray = new Array(mid - left + 1);      
    var rightArray = new Array(right - mid);

    for(let i = 0; i < (mid - left + 1); i++){
        leftArray[i] = arr[left + i];
    }
    for(let j = 0; j < right - mid; j++){
        rightArray[j] = arr[mid + j + 1];
    }

    var i, j , k;
    i = 0;
    j = 0; 
    k = left;

    while(i < (mid - left + 1) && j < right - mid){
        if(leftArray[i] <= rightArray[j]){
            arr[k] = leftArray[i];
            i++;
        }else{
            arr[k] = rightArray[j];
            j++;
        }
        k++;
    }

    while(i < (mid - left + 1)){
        arr[k] = leftArray[i];
        i++;
        k++;
    }
    while(j < right - mid){
        arr[k] = rightArray[j];
        j++;
        k++;
    }
    return arr;
}