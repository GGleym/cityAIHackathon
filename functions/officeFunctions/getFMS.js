import { convertFmsData } from './convertFmsData';

const url =
  'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/fms_unit';
const token = '81144b0fe52aeb65fba5bfc37d81c25abd62f1f4';

export const getFMS = async query => {
  const result = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Token ' + token
    },
    body: JSON.stringify({ query: query })
  });
  const data = await result.json();
  return convertFmsData(data["suggestions"])
};
