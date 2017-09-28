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
    const price = +(document.getElementById("modal-price") as HTMLInputElement).value;
    const areaCode = (document.getElementById("phone-area-code") as HTMLInputElement).value;
    const field1 = (document.getElementById("phone-field-1") as HTMLInputElement).value;
    const field2 = (document.getElementById("phone-field-2") as HTMLInputElement).value;
    const phone = `+1${areaCode}${field1}${field2}`;

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
          <label htmlFor="modal-price">Price(USD)</label>
          <input 
            type="number" 
            step="0.01"
            min="0.01"
            max="2000"
            className="modal-price" 
            id="modal-price"
            placeholder="10.00" />
          <label htmlFor="modal-phone">Phone Number</label>
          <div id="modal-phone" className="modal-phone">
            <input id="phone-area-code" type="tel" maxLength={3} placeholder="555"/>
            <input id="phone-field-1" type="tel" maxLength={3} placeholder="123"/>
            <input id="phone-field-2" type="tel" maxLength={4} placeholder="4567"/>
          </div>
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
      const target = event.target as HTMLElement;
      if(!(
        target.className === "modal" ||
        target.className === "modal-price" || 
        target.className === "modal-phone" ||
        target.className === "modal-form" ||
        target.className === "modal-button" ||
        target.tagName === "LABEL" ||
        target.tagName === "P" || 
        target.className === "modal-header" ||
        target.tagName === "INPUT" && 
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