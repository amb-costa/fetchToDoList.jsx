import React, { useState } from "react";

//create your first component
const Home = () => {
	//textIn: string container for text written on input
	//textStay: array container for recording elements on input
  let [textIn, setTextIn] = useState("");
  let [textStay, setTextStay] = useState([]);

  //input receives text, submits when pressing enter
  //text concats to array container, erases value on input
  //map will create <li> elements with each value
  //trash icon will appear when li is hovered
  //h4 will display amount of items
  return (
    <div id="container">
      <h1>To-Do list!</h1>
      <ul>
        <li>
          <input
            type="text"
            onChange={(e) => setTextIn(e.target.value)}
            placeholder="What do you need to do?"
            value={textIn}
			onKeyDown={(e)=> {if(e.key==="Enter") {
				setTextStay(textStay.concat(textIn));
				setTextIn("");}}}
          ></input>
        </li>
		{textStay.map((line, index) => (
			<li key={line} id="listElement">{line}
			<i className="fas fa-trash-alt" onClick={()=>
			setTextStay(textStay.filter((i, current) => index!=current))}></i></li>
		  ))}
      </ul>
	  <h4 style={{fontSize:20, marginTop:50}}>{(textStay.length==0)?
		"No tasks, add a task!" :
		textStay.length + " items"
	  }</h4>
    </div>
  );
};

export default Home;
