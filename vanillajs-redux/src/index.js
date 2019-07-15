const { createStore } = Redux;

const lightDiv = document.getElementsByClassName("light")[0];
const switchBtn = document.getElementById("switch-btn");

const counterHeadings = document.getElementsByTagName("h1")[0];
const plusBtn = document.getElementById("plus-btn");
const minusBtn = document.getElementById("minus-btn");



//액션 생성함수 정의
const toggleSwitch = () => ({ type: TOGGLE_SWITCH });
const increment = diff => ({ type: INCREMENT, diff });
const decrement = () => ({ type: DECREMENT });

// #state 초기값 설정 - state에 값이 없으면 변수변경해도 적용 안됨.
const initalState = {
  light: false,
  counter: 0
};

// #reducer 생성(실제 동작)
function reducer(state = initalState, action) {
  console.log(
    "initalState > " + JSON.stringify(state),
    action.type,
    !state.light
  );
  switch (action.type) {
    case TOGGLE_SWITCH:
      return {
        ...state,
        light: !state.light
      };
    case INCREMENT:
      return {
        ...state,
        counter: state.counter + action.diff
      };
    case DECREMENT:
      return {
        ...state,
        counter: state.counter - 1
      };
    default:
      return state;
  }
}
//console.log(reducer(initalState, decrement()));

// #Redux Store create
const store = createStore(reducer);

// #render 함수 정의
const render = () => {
  const state = store.getState();
  console.log("getState >> ", JSON.stringify(state));
  const { light, counter } = state;
  if (turnOn(light)) {
    handlerLight("green", "끄기");
  } else {
    handlerLight("gray", "켜기");
  }
  counterHeadings.innerText = counter;
  console.log(
    counterHeadings.innerText,
    switchBtn.innerText,
    lightDiv.style.background
  );
};

function turnOn(light) {
  return light;
}
function handlerLight(color, text) {
  lightDiv.style.background = color;
  switchBtn.innerText = text;
}

// #render()
render();

// #subscribe()
store.subscribe(render);

// #Event Bind
switchBtn.onclick = () => {
  store.dispatch(toggleSwitch());
};

plusBtn.onclick = () => {
  store.dispatch(increment(1));
};

minusBtn.onclick = () => {
  store.dispatch(decrement());
};
// const listener = () =>console.log('Updated!');
// const unsubscribe = store.subscribe(listener);
