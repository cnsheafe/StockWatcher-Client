import * as React from "react";
import { toggleModalDisplay, addWatchAsync } from "../store/actions";
import { Company } from "../store/schema";
import store, { IState } from "../store/store";
import { connect } from "react-redux";

export interface ModalProps {
  showModal: boolean,
  modalSymbol: string
}

export class Modal extends React.Component<ModalProps, {}> {
  private bodyElement: HTMLElement;
  private keyCallback: (event: KeyboardEvent)  => void;
  private mouseCallback: (event: MouseEvent) => void;
  private dimCSS: string = "dim-background";

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const symbol = this.props.modalSymbol;
    let tmp = document.getElementById("modal-price") as HTMLInputElement;
    const price: number = +tmp.value;
    tmp = document.getElementById("modal-phone") as HTMLInputElement;
    const phone = tmp.value;

    store.dispatch(addWatchAsync(symbol, price, phone))
      .then(status => {
        if(status) {
          this.bodyElement
            .removeEventListener("keyup", this.keyCallback);
          this.bodyElement
            .removeEventListener("click", this.mouseCallback);
        }
      });
  }

  render() {

    return (
      <div id="modal" className={this.props.showModal ? "modal" : "hide"}>
        <h3 className="modal-header">SMS Alert for Stock Price</h3>
        <p className="modal-explanation">
          Set up a text message alert for when a stock price exceeds
          a specified price. Note: phone numbers are NOT stored. Rates
          for your data-provider do apply. Messaging is only supported for
          USA numbers. 
        </p>
        <form className="modal-form" onSubmit={e => this.handleSubmit(e)}>
          <label htmlFor="modal-price">Price</label>
          <input 
            type="number" 
            step="0.01"
            min="0.01"
            max="2000"
            className="modal-price" 
            id="modal-price"/>
          <label htmlFor="modal-phone" >Phone Number</label>
          <input type="tel" className="modal-phone" id="modal-phone"/>
          <button 
            type="submit" 
            className="modal-button">Submit
          </button>
        </form>
      </div>
    )
  }

  componentDidMount() {
    this.bodyElement = document.getElementsByTagName("body")[0] as HTMLElement;
   
    this.keyCallback = (event: KeyboardEvent) => {
      // Look for ESC Key
      if (event.which === 27 && this.props.showModal) {
        store.dispatch(toggleModalDisplay());


        this.bodyElement
          .removeEventListener("keyup", this.keyCallback);
        this.bodyElement
          .removeEventListener("click", this.mouseCallback);
      }
    }

    this.mouseCallback = (event: MouseEvent) => {
      console.log(event.target);
      console.log(this.props.showModal);
      const target = event.target as HTMLElement;
      console.log(target.tagName);
      console.log(target.className);
      if(!(
        target.className === "modal" ||
        target.className === "modal-price" || 
        target.className === "modal-phone" ||
        target.className === "modal-form" ||
        target.className === "modal-button" ||
        target.tagName === "LABEL" ||
        target.tagName === "P" || 
        target.className === "modal-header" && 
        this.props.showModal
      )) 
      {
        store.dispatch(toggleModalDisplay());

        this.bodyElement
          .removeEventListener("keyup", this.keyCallback);
        this.bodyElement
          .removeEventListener("click", this.mouseCallback);
      }
    }

  }

  componentDidUpdate() {

    this.bodyElement.classList.toggle(this.dimCSS);
    if (this.props.showModal) {
      this.bodyElement.addEventListener("keyup", this.keyCallback);
      this.bodyElement.addEventListener("click", this.mouseCallback);
    }
  }
}

function mapStateToProps(state: IState) {
  return {
    showModal: state.showModal,
    modalSymbol: state.modalSymbol
  }
}

export default connect(mapStateToProps)(Modal);