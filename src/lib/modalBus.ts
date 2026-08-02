const EVENT = "portfolio:modal-open-change";

export function setModalOpen(open: boolean) {
  window.dispatchEvent(new CustomEvent(EVENT, { detail: open }));
}

export function onModalOpenChange(callback: (open: boolean) => void) {
  const handler = (e: Event) => callback((e as CustomEvent<boolean>).detail);
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
}
