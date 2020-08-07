import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import {mergeSort, bubbleSort,selectionSort, insertionSort, quickSort,getRandomIntegerFromInterval} from '/Applications/sortingVisualizer/sorting-visualizer/src/sortingVisualizer/sortingAlgorithms.js';


const originalBarColor='#454547';

class Main extends React.Component{
  constructor(props){
    super(props);
    this.state = {array:[],animationSpeed:100,size:0,sortingType:"selectionSort"};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.handleSortingType=this.handleSortingType.bind(this);
    
  }

  makeArray(){
    const array=[];
    for(var i=0;i<this.state.size;i++){
        array.push(getRandomIntegerFromInterval(0,this.state.size));
    }
    this.setState({array});

    

  }


  mergeSortAnimate(){
        const animations = mergeSort(this.state.array);
        for(let i=0;i<animations.length-1;i++){
           const bars = document.getElementsByClassName("array-bar");
           const isColorChangeForOverWrite = i%3!==2;
           if(isColorChangeForOverWrite){
               const barOneStyle = bars[animations[i][0]].style;
               const barTwoStyle = bars[animations[i][1]].style;
               const color = i%3===0 ? 'red' : 'green';
               setTimeout(()=>{barOneStyle.backgroundColor=color; barTwoStyle.backgroundColor=color},i*this.state.animationSpeed);
           }
           else{
              // eslint-disable-next-line
              setTimeout(()=>{const [bar,newHeight] = animations[i]; 
                              const barStyle = bars[bar].style;
                              barStyle.height=`${(100/this.state.array.length)*newHeight-4}%`; 
                              bars[bar].textContent=newHeight;
                            },i*this.state.animationSpeed);
           }

        }
        
       
  }



  animate(sortingType){
    var animations="";
    if(sortingType==="bubbleSort")animations=bubbleSort(this.state.array);
    else if(sortingType==="selectionSort")animations=selectionSort(this.state.array);
    else if(sortingType==="insertionSort")animations=insertionSort(this.state.array);
    else if(sortingType==="quickSort")animations=quickSort(this.state.array);
    for(var i=0;i<animations.length-1;i++){
        const bars = document.getElementsByClassName("array-bar");
        const color = animations[i][0];
        if(color==="pivotColor"){
          const barStyle=bars[animations[i][1]].style;
          setTimeout(()=>{  
            barStyle.backgroundColor='white';
           },i*this.state.animationSpeed);
           continue;
        }
        else if(color==="pivotColorRevert"){
          const barStyle=bars[animations[i][1]].style;
          setTimeout(()=>{  
            barStyle.backgroundColor=originalBarColor;
           },i*this.state.animationSpeed);
           continue;

        }
        else if(color==="finalPosition"){
          const barStyle=bars[animations[i][1]].style;
          setTimeout(()=>{  
            barStyle.backgroundColor='purple';
           },i*this.state.animationSpeed);
           continue;
        }
        // eslint-disable-next-line
        const [string,barOneIdx,barTwoIdx,barOneHeight,barTwoHeight] = animations[i]; 
        const barOne=bars[barOneIdx];
        const barOneStyle = barOne.style;
        const barTwo=bars[barTwoIdx];
        const barTwoStyle=barTwo.style;
        
        if(color==="compareBars"){
            setTimeout(()=>{  barOneStyle.backgroundColor='green'; 
                              barTwoStyle.backgroundColor='green';
                           },i*this.state.animationSpeed);
        }
        else if(color==="compareBarsRevert" || color==="swapBarsRevert"){
          setTimeout(()=>{  barOneStyle.backgroundColor=originalBarColor; 
                              barTwoStyle.backgroundColor=originalBarColor;
                           },i*this.state.animationSpeed);
        }
        else if(color==="swapBars"){
            // eslint-disable-next-line
            setTimeout(()=>{  barOneStyle.backgroundColor='red';
                              barTwoStyle.backgroundColor='red';
                              barOneStyle.height=`${(100/this.state.array.length)*barTwoHeight-4}%`; 
                              barTwoStyle.height=`${(100/this.state.array.length)*barOneHeight-4}%`;
                              barOne.textContent=barTwoHeight;
                              barTwo.textContent=barOneHeight;

                            },i*this.state.animationSpeed);
        }
      

    }
  }

    



  
  componentDidMount(){
    this.setState({
      array:[],
    });
  }
 
  handleSubmit(event){
    if(this.state.sortingType!=="mergeSort")
      this.animate(this.state.sortingType);
    else this.mergeSortAnimate();
    event.preventDefault();
  }
  handleChange(event){
    this.setState({size:event.target.value});
    this.makeArray();
    event.preventDefault();
  }
  
  handleSortingType(event){
    this.setState({sortingType:event.target.value});
    const sort = this.state.sortingType;
    const time = document.getElementsByClassName('timeComplexity');
    const space = document.getElementsByClassName('spaceComplexity');
    
    if(sort==="bubbleSort" || sort==="selectionSort" || sort==="insertionSort"){
      time.textContent="O(N^2)";
      space.textContent="O(1)";
    }
    else if(sort==="mergeSort"){
      time.textContent="O(NlogN)";
      space.textContent="O(N)";
    }
    else if(sort==="quickSort"){
      time.textContent="O(NlogN)";
      space.textContent="O(1)";
    }
       event.preventDefault();
  }
  
  render() {

    return (
      <>
      <div className="splitLeft left">
        <div className="content">
          <label>Sorting Visualizer</label>
          <form onSubmit={this.handleSubmit}>
             <input value={this.state.size} onChange={this.handleChange}/>
             <select value={this.state.sortingType} onChange={this.handleSortingType}>
               <option value="bubbleSort">Bubble Sort</option>
               <option value="selectionSort">Selection Sort</option>
               <option value="insertionSort">Insertion Sort</option>
               <option value="mergeSort">Merge Sort</option>
               <option value="quickSort">Quick Sort</option>
             </select>
             <input type="Submit" value="Submit"/>
          </form>

        </div>
      </div>

      <div className="splitRight right">
           { this.state.array && this.state.array.length>0 ? this.state.array.map((value,idx)=>(
                <div className="array-bar" key={idx} style={{height:`${(100/this.state.array.length)*value-4}%`}} >{value}</div>
           )): "Enter Input Size"}
    
      </div>
     
      </>
    );
  }

}


export default Main
ReactDOM.render(<Main />, document.getElementById('root'));