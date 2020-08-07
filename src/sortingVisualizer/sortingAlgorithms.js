
//Merge-Sort Begin
export function mergeSort(array) {
	//T:-O(nlogn),S:-O(n)
	var start=Date.now();
	if(array.length<=1){
		return array;
	}
    const animations = [];
	const auxiliaryArray = array.slice();
	divide(array,auxiliaryArray,0,array.length-1,animations);
	var end=Date.now();
	animations.push(end-start);
	return animations;
	
}

function divide(originalArray,auxiliaryArray,lowIndex,highIndex,animations){
	if(lowIndex===highIndex){
		return;
	}
	const middleIndex = Math.floor((lowIndex+highIndex)/2);
	divide(auxiliaryArray,originalArray,lowIndex,middleIndex,animations);
	divide(auxiliaryArray,originalArray,middleIndex+1,highIndex,animations);
	merge(originalArray,auxiliaryArray,lowIndex,middleIndex,highIndex,animations);
}

function merge(originalArray,auxiliaryArray,lowIndex,middleIndex,highIndex,animations){
	let originalPtr1 = lowIndex;
	let originalPtr2 = middleIndex+1;
    let headPtr = lowIndex;
  
	while(originalPtr1<=middleIndex && originalPtr2<=highIndex){
		animations.push([originalPtr1,originalPtr2]);
        animations.push([originalPtr1,originalPtr2]);
		if(auxiliaryArray[originalPtr1]<=auxiliaryArray[originalPtr2]){
            animations.push([headPtr,auxiliaryArray[originalPtr1]]);
			originalArray[headPtr++] = auxiliaryArray[originalPtr1++];
		}
		else{
            animations.push([headPtr,auxiliaryArray[originalPtr2]]);
			originalArray[headPtr++] = auxiliaryArray[originalPtr2++];
        }
       
	}
	while(originalPtr1<=middleIndex){
		animations.push([originalPtr1,originalPtr1]);
		animations.push([originalPtr1,originalPtr1]);
        animations.push([headPtr,auxiliaryArray[originalPtr1]]);
		originalArray[headPtr++] = auxiliaryArray[originalPtr1++];
	}
	while(originalPtr2<=highIndex){
		animations.push([originalPtr2,originalPtr2]);
		animations.push([originalPtr2,originalPtr2]);
        animations.push([headPtr,auxiliaryArray[originalPtr2]]);
		originalArray[headPtr++] = auxiliaryArray[originalPtr2++];
	}
		
}
//Merge-Sort End


//swap-begin
function swap(array,i,j){
	var temp=array[i];
	array[i]=array[j];
	array[j]=temp;
}
//swap-end

//random-int-generate-begin
export function getRandomIntegerFromInterval(min,max){
  return Math.floor(Math.random()*(max-min+1)+min);
}


//random-int-generate-end




// Array-Shuffle-Start
export function doDurstenFeldShuffle(array){
	//T:-O(n),s:-O(1)
	var j;
	for(var i=array.length-1;i>=0;i--){
	   j=Math.floor(Math.random()*(i+1));
	   swap(array,i,j)
	}
}
//Array-Shuffle-End


//bubble-sort-begin
export function bubbleSort(array){
	//T:-O(n^2),s:-O(1)
	//var sound = new Audio("");
	var start=Date.now();
	const animations=[];
	for(var pass=0;pass<array.length-1;pass++){
        for(var j=1;j<array.length-pass;j++){
			animations.push(['compareBars',j-1,j,array[j-1],array[j]]);
			animations.push(['compareBarsRevert',j-1,j,array[j-1],array[j]]);
			if(array[j-1]>array[j]){
				animations.push(['swapBars',j-1,j,array[j-1],array[j]]);
				animations.push(['swapBarsRevert',j-1,j,array[j-1],array[j]]);
				swap(array,j-1,j);
			}
		}
		animations.push(['finalPosition',array.length-1-pass]);
	}
	animations.push(['finalPosition',0]);
	var end=Date.now();
	animations.push(end-start);
	return animations;

}
//bubble-sort-end


//selection-sort-begin
export function selectionSort(array){
	//T:-O(n^2),s:-O(1)
	const animations=[];
	var start=Date.now();
	for(var currentIdx=0;currentIdx<array.length-1;currentIdx++){
		var minimumIdx=currentIdx;
		//animations.push(['pivotColor',currentIdx]);
		for(var swapIdx=currentIdx+1;swapIdx<array.length;swapIdx++){
			animations.push(['compareBars',swapIdx,minimumIdx,array[swapIdx],array[minimumIdx]]);
			animations.push(['compareBarsRevert',swapIdx,minimumIdx,array[swapIdx],array[minimumIdx]]);
			if(array[swapIdx]<array[minimumIdx])minimumIdx=swapIdx;
		}
		animations.push(['swapBars',currentIdx,minimumIdx,array[currentIdx],array[minimumIdx]]);
		animations.push(['swapBarsRevert',currentIdx,minimumIdx,array[currentIdx],array[minimumIdx]]);
		animations.push(['finalPosition',currentIdx]);
		swap(array,currentIdx,minimumIdx);
	}
	animations.push(['finalPosition',array.length-1]);
	var end=Date.now();
	animations.push(end-start);
	return animations;
}
//selection-sort-end


//insertion-sort-begin
export function insertionSort(array){
	 var start=Date.now();
	 const animations=[];
	 for(var fixedIdx=1;fixedIdx<array.length;fixedIdx++){
		  for(var compareIdx=fixedIdx;compareIdx>0;compareIdx--){
			  animations.push(['compareBars',compareIdx,compareIdx-1,array[compareIdx],array[compareIdx-1]]);
			  animations.push(['compareBarsRevert',compareIdx,compareIdx-1,array[compareIdx],array[compareIdx-1]]);
			  if(array[compareIdx]<array[compareIdx-1]){
				 animations.push(['swapBars',compareIdx,compareIdx-1,array[compareIdx],array[compareIdx-1]]);
				 animations.push(['swapBarsRevert',compareIdx,compareIdx-1,array[compareIdx],array[compareIdx-1]]);
				 swap(array,compareIdx,compareIdx-1);
			  }
		  }
	 }
	 for(var i=0;i<array.length;i++){
          animations.push(['finalPosition',i]);
	 }
	 var end=Date.now();
	 animations.push(end-start);
	 return animations;


}
//insertion-sort-end


//quick-sort-begin
export function quickSort(array){
	//T:- O(nlogn),S:-O(1)
   const animations=[];
   var start=Date.now();
   quickSortHelper(array,0,array.length-1,animations);
   var end=Date.now();
   animations.push(end-start);
   return animations;
}

function quickSortHelper(array,startIdx,endIdx,animations){
	if(startIdx>=endIdx)return;
	var pivotIdx=startIdx;
	var leftIdx=startIdx+1
	var rightIdx=endIdx;
	animations.push(['pivotColor',pivotIdx]);
	while (rightIdx>=leftIdx){
		animations.push(['compareBars',leftIdx,rightIdx,array[leftIdx],array[rightIdx]]);
		animations.push(['compareBarsRevert',leftIdx,rightIdx,array[leftIdx],array[rightIdx]]);
		if(array[leftIdx]>array[pivotIdx] && array[rightIdx]<array[pivotIdx]){
			animations.push(['swapBars',leftIdx,rightIdx,array[leftIdx],array[rightIdx]]);
			animations.push(['swapBarsRevert',leftIdx,rightIdx,array[leftIdx],array[rightIdx]]);
			swap(array,leftIdx,rightIdx);
		}
		if(array[leftIdx]<=array[pivotIdx])leftIdx++;
		if(array[rightIdx]>=array[pivotIdx])rightIdx--;
	}
   animations.push(['swapBars',pivotIdx,rightIdx,array[pivotIdx],array[rightIdx]]);
   animations.push(['swapBarsRevert',pivotIdx,rightIdx,array[pivotIdx],array[rightIdx]]);
   animations.push(['pivotColorRevert',pivotIdx]);
   animations.push(['finalposition',rightIdx]);
   swap(array,pivotIdx,rightIdx);
   var isLeftSubArraySmaller = (rightIdx-1-startIdx) < (endIdx-(rightIdx+1));
   if(isLeftSubArraySmaller){
	   quickSortHelper(array,startIdx,rightIdx-1,animations);
	   quickSortHelper(array,rightIdx+1,endIdx,animations);
   }
   else{
	   quickSortHelper(array,rightIdx+1,endIdx,animations);
	   quickSortHelper(array,startIdx,rightIdx-1,animations);
   }

}
//quick-sort-end


//tim-sort-begin
export function timSort(){
	

}
//tim-sort-end

