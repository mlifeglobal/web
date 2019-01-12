export const loadState = (stateKey = "state") => {
  try {
    const serializedState = localStorage.getItem(stateKey);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

export const saveState = (state, stateKey = "state") => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(stateKey, serializedState);
  } catch (err) {
    // ignore the write error for now
  }
};

export const clearState = () => {
  try {
    localStorage.clear();
  } catch (err) {
    // ignore clear error
  }
};
