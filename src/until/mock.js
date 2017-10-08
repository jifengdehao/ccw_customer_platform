import Mock from 'mock'
import config from '../../config/config.js'

const URI = config.apiDomain

// 登陆
Mock.mock(URI + '/user/login', {
  'success': true,
  'errors': [],
  'data': {
    'userName': 'adminTest',
    'id': 1,
    'img': null,
    'token': '35882fc40f9f2f224cc7486f41676110'
  }
})
// 单个用户列表用户详细数据
Mock.mock(URI + '/user/search', {
  'success': true,
  'errors': [],
  'data': {
    'list': [
      {
        'id': 1,
        'name': 'admin',
        'alias': '老板',
        'pwd': '08036c3a05dead0a9e62540ec801461a',
        'status': '1',
        'phone': '18080091166',
        'deleted_at': null,
        'created_at': '2017-07-06 10:41:30',
        'updated_at': '2017-08-14 18:29:23',
        'extend': '{\'loginToken\':\'35882fc40f9f2f224cc7486f41676110\'}'
      },
      {
        'id': 4,
        'name': 'root',
        'alias': '老板',
        'pwd': '4846bb538463e7a0a98accecdc0355dc',
        'status': '1',
        'phone': '18080091133',
        'eleted_at': null,
        'created_at': '2017-07-06 10:41:30',
        'updated_at': '2017-07-10 09:47:19',
        'extend': null
      },
      {
        'id': 7,
        'name': 'hahhah',
        'alias': null,
        'pwd': '2f71d04555cc7afda719f5299d85a303',
        'status': '0',
        'phone': '18080091166',
        'deleted_at': null,
        'created_at': '2017-11-30 00:00:00',
        'updated_at': '2017-07-10 19:27:46',
        'extend': null
      }
    ],
    'allCount': 3
  }
})
