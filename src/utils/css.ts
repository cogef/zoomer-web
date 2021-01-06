export const setCssVar = (name: string, value: string, el?: HTMLElement | null) => {
  (el || document.documentElement).style.setProperty(name, value);
};

export const getCssVar = (name: string, el?: HTMLElement | null) => {
  return getComputedStyle(el || document.documentElement).getPropertyValue(name);
};
