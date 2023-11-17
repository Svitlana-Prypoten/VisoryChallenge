export default async function handler(req, res) {
  if (req.method === "GET") {
    const { page, startDate, endDate, postcode } = req.query;
    let basePath = `https://app.ticketmaster.com/discovery/v2/events?apikey=${process.env.api_key_ticketmaster}&locale=*&countryCode=AU&sort=date,asc`;
    if (page) {
      basePath += `&page=${page - 1}`;
    }
    const filterStartDate =
      startDate !== "undefined" && startDate !== "null" && startDate !== ""
        ? new Date(startDate)
        : new Date();
    const filterEndDate =
      endDate !== "undefined" && endDate !== "null" && endDate !== ""
        ? new Date(endDate)
        : null;
    if (
      isNaN(filterStartDate) ||
      isNaN(filterEndDate) ||
      (filterStartDate > filterEndDate && filterEndDate)
    ) {
      res.status(200).json({
        message: "Incorrect filters values",
        isError: true,
        events: [],
        pagesCount: 0,
        currentPage: 0,
        filters: {
          startDate: startDate,
          endDate: endDate,
          postcode: postcode,
        },
      });
    }
    const formatedtStartDate = filterStartDate.toISOString().slice(0, 19);
    const formatedEndDate = filterEndDate
      ? filterEndDate.toISOString().slice(0, 19)
      : null;
    if (filterStartDate) {
      basePath += `&startDateTime=${formatedtStartDate}Z`;
    }
    if (filterEndDate) {
      basePath += `&endDateTime=${formatedEndDate}Z`;
    }

    if (postcode !== "null" && postcode !== "undefined" && postcode !== "") {
      basePath += `&postalCode=${postcode}`;
    }
    try {
      const result = await fetch(basePath);
      const data = await result.json();
      if (data && data._embedded && data._embedded.events) {
        res.status(200).json({
          message: "Success",
          events: data._embedded.events,
          pagesCount: data.page.totalPages,
          currentPage: data.page.number,
          query: req.query,
          filters: {
            startDate: formatedtStartDate,
            endDate: formatedEndDate,
            postcode: postcode,
          },
        });
      } else {
        res.status(200).json({
          message: "No data found",
          events: [],
          pagesCount: 0,
          currentPage: 0,
          filters: {
            startDate: startDate,
            endDate: endDate,
            postcode: postcode,
          },
        });
      }
    } catch (error) {
      res.status(500).json({ message: "Data is not available" });
      return;
    }
  }
}
