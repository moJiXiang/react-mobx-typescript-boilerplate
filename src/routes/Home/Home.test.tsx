import * as enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import * as React from "react";
import Home from "./Home";

enzyme.configure({adapter: new Adapter()});

describe("Home Component", () => {
    it("Home Component Will Render", () => {
        const wrapper = enzyme.shallow(<Home />);
        expect(wrapper.state("count")).toEqual(0);
    });
});
