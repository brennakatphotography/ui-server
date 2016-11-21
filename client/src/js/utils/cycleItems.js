export default (action, timeout) => {
  let active = true;
  const again = list => {
    if (!active) return;
    action(list);
    setTimeout(() => again(list.slice(1).concat(list[0])), timeout);
  };
  again.cancel = () => active = false;
  return again;
};
