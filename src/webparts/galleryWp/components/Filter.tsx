import * as React from "react";
import {useRef} from 'react';

const Filter:React.FC<{onSumbit: (text:string) => void}>=(props)=> {
  const picTagTextInput = useRef<HTMLInputElement>(null);
    const SumbitHandler = (event:React.FormEvent) => {
       event.preventDefault();
       const enterdText= picTagTextInput.current.value;
      //  if(enterdText.trim().length === 0) {
      //   return;
      //  }
       console.log('clicked!')
       props.onSumbit(enterdText);
     };
  return(
  <form>
    <label> sort by tag </label>
    <input type='text' id='text' ref={picTagTextInput} onChange={SumbitHandler}/>
    {/* <button>Submit</button> */}
  </form>
  );
};

export default Filter;
 



// function Filters(props:any) {
//   const ImgTagOnChanged = (event:any) => {
//       props.onChangeFilter(event.target.value);
//     };
// const imgTag = props.ImgTag
// return(
// <div>
//   <Label>search by tag</Label>
//   <input type='text'/>
//   <button>Sumbit</button>
// </div>
// );
// }
// export default Filters;
