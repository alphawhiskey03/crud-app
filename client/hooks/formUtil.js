import { useEffect, useState } from "react";
const useFormUtil = (initialState, callback) => {
  const [state, setState] = useState(initialState);
  const onSubmit = (e) => {
    e.preventDefault();
    callback(state);
  };
  const onChange = (e) => {
    setState((currState) => ({
      ...currState,
      [e.target.name]: e.target.value,
    }));
  };
  //   useEffect(() => {
  //     console.log(state);
  //   }, [state]);
  return {
    onSubmit,
    onChange,
    state,
  };
};

export default useFormUtil;
