export function createElement(type: string, className?: string, text?: string) {
  const element = document.createElement(type);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}
