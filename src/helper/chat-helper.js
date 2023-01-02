export const eval_qs = [
  "How do you feel your day is going today ?",
  "What do you think about movies ?",
  "What best describes the emotion you feel towards life in general?",
  "What do you feel about stress in college",
];

export const utterances = [
  ["how are you", "how is life", "how are things", "how are you doing"], //0
  ["hi", "hey", "hello", "good morning", "good afternoon"], //1
  ["what are you doing", "what is going on", "what is up", "whatsup"], //2
  ["how old are you"], //3
  ["who are you", "are you human", "are you bot", "are you human or bot"], //4
];

export const answers = [
  [
    "Fine... how are you?",
    "Pretty well, how are you?",
    "Fantastic, how are you?",
  ], //0
  ["Hello!", "Hi!", "Hey!", "Hi there!", "Howdy"], //1
  [
    "Nothing much",
    "About to go to sleep",
    "Can you guess?",
    "I don't know actually",
  ], //2
  ["I am infinite"], //3
  ["I am just a bot", "I am a bot. What are you?"], //4
];

export const response_list = [
  "Hmmm...",
  "I feel you",
  "Alright, I understand",
  "Ok, I get you",
  "I think like you",
  "I definitely believe you",
];

export function simplify_emotion(mood) {
  if (["happiness", "enthusiasm", "fun", "relief", "surprise"].includes(mood)) {
    return "happiness";
  } else if (["sadness", "worry", "hate"].includes(mood)) {
    return "sadness";
  } else if (["love"].includes(mood)) {
    return "love";
  } else if (["anger", "hate"].includes(mood)) {
    return "anger";
  } else if (["neutral"].includes(mood)) {
    return "neutral";
  } else {
    return null;
  }
}

export function get_mood_emoji(mood) {
  if (mood === "anger") {
    return "😡";
  } else if (mood === "sadness") {
    return "🥺";
  } else if (mood === "neutral") {
    return "😐";
  } else if (mood === "happiness") {
    return "😀";
  } else if (mood === "love") {
    return "🥰";
  }
}

export function collapse() {
  var coll = document.getElementsByClassName("collapsible");

  coll[0].classList.toggle("active");

  var content = coll[0].nextElementSibling;

  if (content.style.maxHeight) {
    content.style.maxHeight = null;
  } else {
    content.style.maxHeight = content.scrollHeight + "px";
  }
}

export function getTime() {
  let today = new Date();
  let hours = today.getHours();
  let minutes = today.getMinutes();

  if (hours < 10) {
    hours = "0" + hours;
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  let time = hours + ":" + minutes;
  return time;
}

export function firstBotMessage() {
  let chattimestamp = document.getElementById("chat-timestamp");
  let firstMessage = "Hello how are you doing today?";
  document.getElementById("botStarterMessage").innerHTML =
    '<p class="botText"><span>' + firstMessage + "</span></p>";

  let time = getTime();

  chattimestamp.append(time);
  document.getElementById("userInput").scrollIntoView(false);
}
