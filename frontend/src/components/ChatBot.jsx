import React, { useState, useEffect } from "react";
import Axios from "axios";
import jwt_decode from "jwt-decode";
import { API_KEY, url, auth_token } from "../App";
import "../css/chat.css";

import {
  eval_qs,
  utterances,
  answers,
  response_list,
  simplify_emotion,
  get_mood_emoji,
  collapse,
  getTime,
  firstBotMessage,
} from "../helper/chat-helper";

const ChatBotComponent = (props) => {
  const [message, setMessage] = useState("");
  
  let count = 0;

  // Retrieves the response

  async function getHardResponse(userText) {
    let botLoader = '<p class="botTextLoader botText"><span></span></p>';
    let chatbox = document.getElementById("chatbox");
    let textInput = document.getElementById("textInput");
    chatbox.innerHTML+=botLoader;
    textInput.disabled = true;

    let { preset, ans } = await getBotResponse(userText);

    let loaders = document.getElementsByClassName('botTextLoader')
    for (let i=0;i<loaders.length;i++){
      loaders[i].setAttribute('hidden', true)
     }

    textInput.disabled = false;

    displayBotResponse(ans);

    if (!preset && count < eval_qs.length) {
      setTimeout(() => {
        displayBotResponse(eval_qs[count]);
        count += 1;
      }, 3000);
    }

    document.getElementById("chat-bar-bottom").scrollIntoView(true);
  }

  //Gets the text input from the input box and processes it
  function getResponse() {
    let textInput = document.getElementById("textInput");
    let userText = textInput.value;

    if (userText === "") {
      return;
    }

    displayUserResponse(userText);

    setTimeout(() => {
      getHardResponse(userText);
    }, 1000);
  }


  function heartButton() {
    displayUserResponse("❤️");

    displayBotResponse("😍");
  }

  function displayBotResponse(text) {
    let chatbox = document.getElementById("chatbox");
    let botHtml = '<p class="botText"><span>' + text + "</span></p>";
    setTimeout(() => {
      chatbox.innerHTML+=botHtml;
    }, 1000);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);
  }

  function displayUserResponse(text) {
    let textInput = document.getElementById("textInput");
    let chatbox = document.getElementById("chatbox");
    let userHtml = '<p class="userText"><span>' + text + "</span></p>";

    textInput.value = ("");
    chatbox.innerHTML+=userHtml;
    document.getElementById("chat-bar-bottom").scrollIntoView(true);
  }

  let prev = -1;

  let emotion_list = [];

  async function post_emotion(input) {
    let options = {
      method: "post",
      url: url + "emotion",
      headers: {
        Authorization: "Bearer " + auth_token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        message: input,
      },
    };

    let response = await Axios(options);

    let responseOK = await (response && response.status === 200);

    if (responseOK) {
      let data = response.data["emotion"];
      return data;
    } else {
      return null;
    }
  }

  function get_preset_response(string) {
    let item;

    for (let x = 0; x < utterances.length; x++) {
      for (let y = 0; y < utterances[x].length; y++) {
        if (utterances[x][y] === string) {
          let items = answers[x];
          item = items[Math.floor(Math.random() * items.length)];
          return item;
        }
      }
    }
    return null;
  }

  async function getBotResponse(input) {
    input = input.replace("?", "").toLowerCase();
    input = input.replace(/^[ ]+|[ ]+$/g, "");
    // Simple responses
    let ans = get_preset_response(input);
    let preset = false;
    if (ans) {
      preset = true;
      return { preset, ans };
    } else if (input === "goodbye") {
      collapse();
      return { preset: null, ans: null };
    }
    let emotion = await post_emotion(input);
    emotion = simplify_emotion(emotion);
    if (emotion !== null) {
      // get_final_emotion(emotion);
      check_full_list(emotion);

      let ind = (Math.random() * response_list.length) | 0;
      while (response_list[ind] === response_list[prev]) {
        ind = (Math.random() * response_list.length) | 0;
      }
      prev = ind;
      ans = response_list[ind];
      return { preset, ans };
    }
  }

  function check_full_list(mood) {
    let moodmessage = get_mood_emoji(mood) + " " + mood;
    set_emotion(mood);
  
    displayBotResponse(moodmessage);
    setTimeout(() => {
      collapse();
    }, 3000);

    // }
  }

  async function set_emotion(mood) {
    // let user_id = decoded_token["user_id"];
    let options = {
      method: "post",
      url: url + "mood",
      headers: {
        Authorization: "Bearer " + auth_token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        user_id: jwt_decode(auth_token).user_id,
        current_mood: mood,
      },
    };

    let response = await Axios(options);

    try {
      let responseOK = await (response && response.status === 201);

      if (responseOK) {
        sentiment_recommend()
      }
    } catch (err) {
      console.error("Unable to update mood");
    }
  }


  // var close = document.getElementsByClassName("closebtn");
  // var i;

  // // Loop through all close buttons
  // for (i = 0; i < close.length; i++) {
  //   // When someone clicks on a close button
  //   close[i].onclick = function () {
  //     // Get the parent of <span class="closebtn"> (<div class="alert">)
  //     var div = this.parentElement;

  //     // Set the opacity of div to 0 (transparent)
  //     div.style.opacity = "0";

  //     // Hide the div after 600ms (the same amount of milliseconds it takes to fade out)
  //     setTimeout(function () {
  //       div.style.display = "none";
  //     }, 600);
  //   };
  // }
  // Press enter to send a message
  function inputText(e) {
    let checkempty = message;
    if (checkempty !== "" && e.which === 13) {
      getResponse();
    }
  }

  async function sentiment_recommend() {
    let options = {
      method: "get",
      url: url + "sentiment_recommend",
      headers: {
        Authorization: "Bearer " + `${auth_token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const response = await Axios(options);

    if (response && response.status === 200) {
      let genrenames = response.data.genre;
      const res1 = await Axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&with_genres=${genrenames}`
      );
      
      if(res1 && res1.status === 200){
        let final_res = res1.data.results
        console.log(final_res);
        props.sentiment_recom(final_res);
      }
      
    }
  };


  useEffect(() => {
    collapse();
    firstBotMessage();
  }, []);
  return (
    <>
      <div className="chat-bar-collapsible">
        <button
          id="chat-button"
          onClick={collapse}
          type="button"
          className="collapsible"
        >
          <i id="chat-icon" className="fa fa-fw fa-comments-o"></i>
        </button>

        <div className="content">
          <div className="full-chat-block">
            <div className="outer-container">
              <div className="chat-container">
                <div id="chatbox">
                  <h5 id="chat-timestamp"></h5>
                  <p id="botStarterMessage" className="botText">
                    <span>Loading...</span>
                  </p>
                </div>

                <div className="chat-bar-input-block">
                  <div id="userInput">
                    <input
                      id="textInput"
                      className="input-box"
                      type="text"
                      name="msg"
                      onKeyDown={inputText}
                      onChange={(event) => setMessage(event.target.value)}
                      placeholder="Tap 'Enter' to send a message"
                    ></input>

                    <p></p>
                  </div>

                  <div className="chat-bar-icons">
                    <i
                      id="chat-icon"
                      // style="color: crimson;"
                      className="fa fa-fw fa-heart"
                      style={{color:"red"}}
                      onClick={heartButton}
                    ></i>
                    <i
                      id="chat-icon"
                      // style="color: #333;"
                      className="fa fa-fw fa-send"
                      style={{color:"black"}}
                      onClick={getResponse}
                    ></i>
                  </div>
                </div>

                <div id="chat-bar-bottom">
                  <p></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBotComponent;
