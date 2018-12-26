// tslint:disable-next-line:no-var-requires
const Mock = require('mockjs');

Mock.mock('http://todo.json', 'get', {
  'list|3': [
    {
      name: '测试1',
      id: 'sss',
    },
  ],
});
