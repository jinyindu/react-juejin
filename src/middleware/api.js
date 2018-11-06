import fetchTimeout from '../utils/fetchTimeout'

// 检查请求状态
function checkStatus(response) {
  if (response.ok) {
    return response.json()
  }
  return Promise.reject({
    errcode: response.status,
    errmsg: response.statusText
  })
}
// 返回响应
function responseHandle(json) {
  if (json) {
    if (json.s === 1 || json.userId) {
      return json
    } else {
      return Promise.reject({
        errcode: json.s || -1,
        errmsg: json.m
      })
    }
  } else {
    return Promise.reject({
      errcode: -1,
      errmsg: '网络异常，请稍后重试'
    })
  }
}

function getStringify(params) {
  const arr = [];
  Object.keys(params).forEach(key => arr.push(key + '=' + params[key]));
  return arr.join('&');
}

const callApi = ({
  endpoint,
  params,
  method = 'GET',
  options,
  timeout
}) => {

  let url = endpoint
  const defaultOptions = {
    method,
    headers: {
      'Content-Type': 'application/json;'
    }
  }

  if ((method === 'GET' || method === 'get') && params) {
    if (url.search(/\?/) === -1) {
      url += '?' + getStringify(params);
    } else {
      url += '&' + getStringify(params);
    }
  }
  let body = undefined
  if ((method === 'POST' || method === 'post') && params) {
    body = JSON.stringify(params)
  }
  const opt = Object.assign({}, defaultOptions, options, {
    body
  })
  const time = timeout ? timeout : 4000;
  return fetchTimeout(url, opt, time)
    .then(checkStatus)
    .then(responseHandle)
    .catch((errcode, errmsg) => {
      return Promise.reject({
        errcode: errcode || -1,
        errmsg: errmsg || '网络异常，请稍后重试'
      })
    })
}
export const CALL_API = 'Call API';

export default store => next => action => {
  const callAPI = action[CALL_API];

  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let {
    endpoint
  } = callAPI
  const {
    types,
    params = null,
    method,
    timeout,
    options
  } = callAPI

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [requestType, successType, failureType] = types
  next(actionWith({
    type: requestType
  }))

  return callApi({
    endpoint,
    params,
    method,
    options,
    timeout
  }).then((response) => {
    next(actionWith({
      response,
      type: successType
    }));

    return {
      errcode: 0,
      errmsg: '',
      data: response.d || response
    }
  }, ({
    errcode,
    errmsg
  }) => {
    const actionObj = {
      type: failureType,
      errmsg: errmsg || '网络异常，请稍后重试',
      errcode: errcode || -1
    }
    next(actionWith(actionObj));
    return {
      errmsg,
      errcode
    };
  });
}