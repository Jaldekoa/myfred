const { FRED_API_URL, FRED_API_KEY } = process.env;

function constructURL(req) {
  const { series_id } = req.params;
  const filteredQuery = filterParams(req);

  const params = new URLSearchParams({
    series_id: series_id,
    api_key: FRED_API_KEY,
    file_type: "json",
    ...filteredQuery,
  });

  return `${FRED_API_URL}?${params.toString()}`;
}

function filterParams(req) {
  const allowedParams = [
    "observation_start",
    "observation_end",
    "units",
    "frequency",
    "aggregation_method",
  ];

  const filteredQuery = Object.keys(req.query)
    .filter((key) => allowedParams.includes(key))
    .reduce((obj, key) => {
      obj[key] = req.query[key];
      return obj;
    }, {});

  return filteredQuery;
}

export { constructURL, filterParams };
