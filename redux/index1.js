const createStore = function (reducer, initState) {
  let state = initState;
  let listeners = [];

  function subscribe(listener) {
    listeners.push(listener);
  }

  function dispatch(action) {
    state = reducer(state, action);

    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
  }

  function getState() {
    return state;
  }

  return {
    subscribe,
    dispatch,
    getState,
  };
};

let state = {
  counter: {
    count: 0,
  },
  info: {
    name: "name1",
    description: "description1",
  },
};

function counterReducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return {
        count: state.count + 1,
      };
    case "DECREMENT":
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
}

function InfoReducer(state, action) {
  switch (action.type) {
    case "SET_NAME":
      return {
        ...state,
        name: action.name,
      };
    case "SET_DESCRIPTION":
      return {
        ...state,
        description: action.description,
      };
    default:
      return state;
  }
}

function combineReducers(reducers) {
  const reducerKeys = Object.keys(reducers);
  return function combination(state = {}, action) {
    const nextState = {};

    for (let i = 0; i < reducerKeys.length; i++) {
      const key = reducerKeys[i];
      const reducer = reducers[key];
      const previousStateForKey = state[key];

      const nextStateForKey = reducer(previousStateForKey, action);

      nextState[key] = nextStateForKey;
    }
    return nextState;
  };
}

const reducer = combineReducers({
  counter: counterReducer,
  info: InfoReducer,
});

let initState = {
  counter: {
    count: 0,
  },
  info: {
    name: "前端九部",
    description: "我们都是前端爱好者！",
  },
};
console.log(reducer);
let store = createStore(reducer, initState);

store.subscribe(() => {
  let state = store.getState();
  console.log(state.counter.count, state.info.name, state.info.description);
});
/*自增*/
store.dispatch({
  type: "INCREMENT",
});

/*修改 name*/
store.dispatch({
  type: "SET_NAME",
  name: "前端九部2号",
});
