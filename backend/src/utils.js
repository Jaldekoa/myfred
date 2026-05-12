const { FRED_API_URL, FRED_API_KEY } = process.env;

function constructURL(req) {
  const { series_id } = req.params;

  const params = new URLSearchParams({
    series_id: series_id,
    api_key: FRED_API_KEY,
    file_type: "json",
    ...req.query,
  });

  return `${FRED_API_URL}?${params.toString()}`;
}

export { constructURL };
