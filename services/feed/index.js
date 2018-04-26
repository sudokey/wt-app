export function getPosts(params = {}) {
  let url = 'https://whotrades.com/capi/activity_stream/0/0/feed/json?lcid=en&orderBy=rank&enableRecommendations=true&init=1';

  if (params.boundary) {
    url = `${url}&boundary=${params.boundary}`;
  }

  if (params.boundaryRecordId) {
    url = `${url}&boundaryRecordId=${params.boundaryRecordId}`;
  }

  return fetch(url)
    .then(resp => resp.json())
    .then((data) => {
      if (!data || !data.result || !data.result.ok) {
        throw data;
      }

      return data.result;
    });
}
