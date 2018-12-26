### React with Typescript and dva.js

##### 实现

1. css module with typescript
2. use dva
3. write test
4. mock data

##### 项目过程中需要注意的坑

1. 因为在`router.tsx`中会加载 model，所有在`index.tsx`中就不用加载`app.model(count)`，否则会报错。详情请看[dva/issue:533](https://github.com/dvajs/dva/issues/533)

2. `dva/dynamic`的`d.ts`文件不对，需要改为

```
import { ComponentType } from 'react';
import { DvaInstance } from './index';
 declare const dynamic: (opts: {
  app: DvaInstance,
  models?: () => PromiseLike<any>[],
  component: () => PromiseLike<any>,
}) => ComponentType<any>;
export default dynamic;
```

详情请看[dva/issue:1758](https://github.com/dvajs/dva/issues/1758)

3. Typescript 使用 css module
   使用`typings-for-css-modules-loader`，前提是需要`npm run reject`在`config/webpack.config.dev.js`中修改, 然后使用`import * as Style form './style.scss'`

参考[TypeScript 中使用 CSS Modules](https://juejin.im/post/59c62f8e6fb9a00a51439ad5)

```
{
  test: /\.scss$/,
  use: [
    {
      loader: 'style-loader'
    },
    {
        loader: 'typings-for-css-modules-loader',
        options: {
            modules: true,
            namedExport: true,
            camelCase: true,
            minimize: true,
            localIdentName: "[local]_[hash:base64:5]"
        }
    },
    {
        loader: 'sass-loader',
        options: {
            outputStyle: 'expanded',
            sourceMap: true
        }
    }
  ]
}
```

4. 使用修饰器需要加上

```
"experimentalDecorators": true,
```

5. dva 如何做单元测试

参考 [dva/pulls:15](https://github.com/dvajs/dva-example-user-dashboard/pull/15)
具体代码 [dva/pulls:15 files](https://github.com/dvajs/dva-example-user-dashboard/pull/15/files)
参考 [jest with react](https://jestjs.io/docs/zh-Hans/tutorial-react)
[shallow spec demo](https://github.com/airbnb/enzyme/blob/master/packages/enzyme-test-suite/test/ShallowWrapper-spec.jsx)
[3 ways to test mapStateToProps and mapDispatchToProps](https://jsramblings.com/2018/01/15/3-ways-to-test-mapStateToProps-and-mapDispatchToProps.html)

[Testing a React-Redux app using Jest and Enzyme](https://medium.com/netscape/testing-a-react-redux-app-using-jest-and-enzyme-b349324803a9)
[Home.spec.js](https://github.com/Gethyl/ReactReduxTestingUsingJestEnzyme/blob/master/__test__/Home.spec.js)

6. Home.test.tsx 中的 readonly 错误

```

describe("Home Component", () => {
    it("Home Component Will Render", () => {
        const wrapper = enzyme.shallow(<Home />);
        console.log(wrapper.debug());
        wrapper.find("button").simulate("click");
        expect(wrapper.state().count).toEqual(1);
    });
});

// 类型“Readonly<{}>”上不存在属性“count”。
```

改成

```
expect(wrapper.state("count")).toEqual(0)
```

7. mock 数据测试

[一个 webpack 搭建的 mock 案例演示](https://github.com/ToNiQian/mockjs)

这里增加了一个`scripts/mock.js`，在`package.json`中增加了一个`script`, `"mock": "node scripts/mock.js"`, 在`App.tsx`中增加`(process.env.NODE_ENV === "mock") && (require("../../mock/todos"));`

8. build 加本地测试

```
yarn global add serve

serve -s build -p 5001
```

9. tslint autoFixOnSave 失效
   https://github.com/Microsoft/vscode-tslint/issues/136


在设置里加上 {"tslint.autoFixOnSave": true}

10. .editorconfig 配合 Prettier 使用

https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

editor.formatOnSave: false 这个缩进和尾部加;， 都可以在eslint或者tslint中设置，开启eslint-autoFixOnSave或者tslint-autoFixOnSave即可


11. HtmlWebpackPlugin.getHooks is not a function

> TypeError: HtmlWebpackPlugin.getHooks is not a function

https://github.com/jantimon/html-webpack-plugin/issues/998

```
 new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),

 yarn add html-webpack-plugin@next -D
```

12. 使用React.lazy来动态加载组件

13. 使用webpack.dllPlugin把react, react-dom等第三方组件打包成vendor.dll.js，能够提高打包速度，和减少main.js的大小
