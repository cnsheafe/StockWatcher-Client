import Header from "./Header";
import {Search, SearchProps} from "./Search";
import {Modal, ModalProps} from "./Modal";
import { shallow, mount } from "enzyme";
import {Provider} from "react-redux";
import * as React from "react";
import { createStore } from "redux";

import { Company } from "../store/schema";
// Prologue
// Each component should correctly render
// and correctly dispatch actions on each
// appropriate event handler

describe("React components:", () => {
  describe("Header", () => {
    it("should render correctly", () => {
      const wrapper = shallow(<Header />);
      expect(wrapper.find("div").hasClass("header")).toBe(true);
      expect(wrapper.find("h1").hasClass("header-title")).toBe(true);
    });
  });

  describe("Search", () => {
    let props: SearchProps;
    beforeEach(() => {
      props = {
        searchResults: []
      };
    });

    it("should render correctly with empty props", () => {
      const wrapper = shallow(
        <Search {...props}/>
      );

      expect(wrapper.find("section").hasClass("search")).toBe(true);
      expect(wrapper.find("h2").hasClass("hide")).toBe(true);
      expect(wrapper.find("ul").hasClass("hide")).toBe(true);
    });
    it("should render correctly with full props", () => {
      props.searchResults = [
        {
          symbol: "msft",
          name: "microsoft"
        },
        {
          symbol: "amd",
          name: "AMD"
        }
      ];

      const wrapper = shallow(
        <Search {...props}/>
      );
      expect(wrapper.find("section").hasClass("search")).toBe(true);
      expect(wrapper.find("h2").hasClass("hide")).toBe(false);
      expect(wrapper.find("ul").hasClass("hide")).toBe(false);
    });
  })

  describe("Modal", () => {
    let props: ModalProps;
    beforeEach(() => {
      props = {
        showModal: true,
        modalSymbol: "msft"
      };

    })
    it("should render", () => {
      const wrapper = mount(<Modal {...props}/>);
      expect(wrapper.find("#modal").hasClass("modal")).toBe(true);
    });
  })
});
