import {useEffect, useState} from 'react';

interface useHttpProps {
  host?: string;
  action: string;
  method?: 'POST' | 'GET';
  body?: object;
  r?: number;
}

interface useHttpResult {
  status: 0 | 1;
  message: string;
  data: string | object;
}

const useHttp = (props: useHttpProps) => {
  const {
    host = 'https://api.cctv3.net/api',
    action,
    method = 'GET',
    body = Object.create(null),
    r = 0,
  } = props;

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<useHttpResult>(Object.create(null));

  useEffect(() => {
    if (method == 'GET') {
      setLoading(true);
      const buildGetParams = Object.keys(body)
        .map(it => `${it}=${body[it]}`)
        .join('&');
      console.log({useHttpGetParams: buildGetParams});
      const _action = `${action}?${buildGetParams}`;
      fetch(`${host}/${_action}`, {method: 'GET'})
        .then(response => {
          if (response.status == 200) {
            return response.json();
          } else {
            return {status: 0, message: `Couldn't access ${_action}`};
          }
        })
        .then(json => {
          setResult(json);
          setLoading(false);
        });
    } else if (method == 'POST') {
      setLoading(true);
      fetch(`${host}/${action}`, {method: 'POST', body: JSON.stringify(body)})
        .then(response => {
          if (response.status == 200) {
            return response.json();
          } else {
            return {status: 0, message: `Couldn't access ${action}`};
          }
        })
        .then(json => {
          setResult(json);
          setLoading(false);
        });
    }
    return function () {};
  }, [r]);

  return {
    loading,
    result,
  };
};

export default useHttp;
