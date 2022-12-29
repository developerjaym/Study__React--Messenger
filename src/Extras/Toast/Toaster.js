class ToastMoods {
  static get happy() {
    return "happy";
  }
  static get sad() {
    return "sad";
  }
}
class Toaster {
  static #TOAST_TIME = 3000;
  #toastComponent;
  #activeTimer = 0;
  constructor() {
    this.#toastComponent = null;
  }
  
  set toastComponent(newToastComponent) {
    this.#toastComponent = newToastComponent;
  }
  createToast(message, mood) {
    this.#toastComponent.clear();
    window.clearInterval(this.#activeTimer);
    this.#activeTimer = window.setTimeout(() => {
        console.log('clearing toast');
        this.#toastComponent.clear()
    }, Toaster.#TOAST_TIME)
    this.#toastComponent.createToast(message, mood)
  }
}

const toaster = new Toaster();
export { toaster, ToastMoods };
