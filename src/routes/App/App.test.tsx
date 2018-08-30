import createLoading from "dva-loading";
import { effects } from "dva/saga";
import * as enzyme from "enzyme";
// tslint:disable-next-line:no-implicit-dependencies
import * as Adapter from "enzyme-adapter-react-16";
import * as React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import count from "../../models/count";
import { delay } from "../../services/delay";
import ConnectedApp, { App } from "./App";

const mockStore = configureMockStore();

enzyme.configure({ adapter: new Adapter() });

describe("Count Model", () => {
  it("effects would work", () => {
    const { call, put } = effects;
    const sagas = count.effects;
    const saga = sagas.addWithDelay;
    const generator = saga({type: "count/addWithDelay"}, { call, put });

    let next = generator.next();
    expect(next.value).toEqual(call(delay, 500));

    next = generator.next();
    expect(next.value).toEqual(put({ type: "add" }));
  });
});

describe("App add_btn button would work", () => {
  let wrapper, store;
  const loading = createLoading();
  loading.effects = count.effects;
  beforeEach(() => {
    const initialState = {
      count: 0,
      loading,
    };
    store = mockStore(initialState);
    wrapper = enzyme.mount(<Provider store={store} ><ConnectedApp /></Provider>);
  });

  it("Props count is 0", () => {
    expect(wrapper.find(App).prop("count")).toBe(0);
    expect(wrapper.find("button").length).toBe(1);
  });
});
