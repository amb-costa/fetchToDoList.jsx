import React, { useEffect, useState } from "react";


//Constructor for whole list
//Using same code for to-do list using react project
//Updating it so it works with fetch

//create your first component
const Home = () => {
	//textIn: string container for text written on input
	//textStay: array container for recording elements on input
  //userURL: page containing the to-do list
  let [textIn, setTextIn] = useState("");
  let [textStay, setTextStay] = useState([]);
  let userURL = "https://assets.breatheco.de/apis/fake/todos/user/beinganidiot";

  //creatingUser: will create/POST new user
  //reloads page so user is settled before building list
  const creatingUser = () => {
    fetch(userURL, {
      mode: "no-cors",
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify([])
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .then(()=>window.location.reload(false))
  }


  //main fetch: will GET data from user, so it can render it to the list
  //if there's no user, will call creatingUser to create it
  const gettingData = () => {
    fetch(userURL, {
      mode: "no-cors",
      headers: {"Content-Type" : "application/json"}
    })
    .then(response => response.json())
    .then(data => {
      if (data.msg == "This use does not exists, first call the POST method first to create the list for this username") {
        creatingUser()
      } else {
        let newArray = textStay.concat(data);
        setTextStay(newArray)
      }
    });
  } 
  useEffect(gettingData,[]);

  //puttingData: adding data to user, receiving said data in form of array
  //just adding data to the JSON archive, REACT structure will display it
  const puttingData = (array) => {
    fetch(userURL, {
      method: "PUT",
      headers :{"Content-Type": "application/json"},
      body: JSON.stringify(array)
    })
    .then(response => response.json())
    .then(data => console.log(data));
  }

  //deletingData: will erase whole list and user
  //will call creatingUser so a new list is created and the page reloads
  const deletingData = () => {
    fetch(userURL, {
      method:"DELETE",
      headers :{"Content-Type": "application/json"},
      body: []
    })
    .then(response => response.json())
    .then(creatingUser())
  }

  //input receives text, submits when pressing enter
  //text concats to array container, erases value on input
  //map will create <li> elements with each value
  //trash icon will appear when li is hovered
  //h4 will display amount of items

  //deleting tasks: if there's no task left, will delete whole user and create a new one
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
        let newArray = textStay.concat({label:textIn, done:false});
        setTextStay(newArray);
        puttingData(newArray);
				setTextIn("")}}}
          ></input>
          <button type="button" onClick={deletingData}>Delete list!</button>
        </li>
		{textStay.map((line, index) => (
			<li key={index} id="listElement">{line.label}
			<i className="fas fa-trash-alt" onClick={()=>{
        let newArray = textStay.filter((i, current) => index!=current);
        setTextStay(newArray);
        {newArray.length==0? deletingData(): puttingData(newArray)}}}></i></li>
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
