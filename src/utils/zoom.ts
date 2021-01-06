export const callAPI = async () => {
  const res = await fetch('https://api.cogef.org/zoom').then(res => res.json());
  return res;
};
