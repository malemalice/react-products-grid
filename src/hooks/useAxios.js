import { useState, useContext } from 'react'
import axios from 'axios'

// Import hooks
import useUrlBuilder from './useUrlBuilder'
// import useAlert from './useAlert'
// Import Contexts
// import SessionContext from '@/contexts/Session'

// type Params = {
//   url: string,
//   params: any,
//   options: any,
// }

export default ({
  method = 'GET',
  url: _url,
  params: _params = {},
  headers: _headers = {},
  options: _options = {},
}) => {
  const initialState = {
    isFetching: false,
    isError: false,
    statusCode: null,
    code: null,
    message: null,
    data: null,
  }

  // Define state first
  const [state, setState] = useState(initialState)

  // Get keycloak context
  // const session = useContext(SessionContext)

  // Define url
  const url = useUrlBuilder(_url)

  // Define default arguments
  const args = {
    method,
    url,
    data: null,
    params: {},
    headers: {},
  }

  const options = {
    authenticated: true,
    authenticationPrefix: 'Bearer',
    ..._options,
  }

  // Define request headers
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ..._headers,
  }

  // Set authorization headers if request is authenticated
  // if (options.authenticated && session.token) {
  //   headers.Authorization = `${options.authenticationPrefix} ${session.token}`
  // }

  // Set params headers
  args.headers = headers

  // Define request send method
  // $FlowFixMe
  const send = (_args = {}, successCb = undefined, errorCb = undefined) => {
    // send http request
    // Set isFetching to true, for loading purpose
    setState({
      ...initialState,
      isFetching: true,
    })

    // send request to server
    setTimeout(() => {
      axios({
        crossDomain: true,
        // withCredentials: true, // to make express session id persistent
        ...args,
        ..._args,
      })
        .then((response) => {
          if (response.data) {
            setState((prevState) => ({
              ...prevState,
              statusCode: response.status,
              data: response.data,
            }))

            // console.log(response)
            // useAlert(response)

            if (successCb) successCb(response.data)
          }
        })
        .catch((error) => {
          let statusCode = null
          let code = 'HTTPRequestError'
          let message = 'HTTP Request Error'
          let data = null

          if (error.response) {
            statusCode = error.response.status
            data = error.response
          }

          setState((prevState) => ({
            ...prevState,
            isError: true,
            statusCode,
            code,
            message,
            data,
          }))

          // useAlert(error.response)

          if (errorCb) errorCb({ statusCode, code, message })
        })
        .then(() => {
          setState((prevState) => ({
            ...prevState,
            isFetching: false,
          }))
        })
    }, 2000)
  }

  return [state, send]
}
