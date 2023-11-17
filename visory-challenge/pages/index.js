import { useState } from "react";
import Head from "next/head";
import EventList from "@/components/events/EventList";
import EventsSearch from "@/components/events/EventSearch";
import Pagination from "@/components/ui/Pagination";
import ErrorAlert from "@/components/ui/ErrorAlert";

function Home(props) {
  const [events, setEvents] = useState(props.events);
  const [currentPage, setCurrentPage] = useState(props.currentPage + 1);
  const [pagesCount, setPagesCount] = useState(props.pagesCount);
  const [filterStartDate, setFilterStartDate] = useState(null);
  const [filterEndDate, setFilterEndDate] = useState(null);
  const [postcode, setPostcode] = useState(null);
  const [isError, setIsError] = useState(false);

  const findEventsHandler = (startDate, endDate, postcode) => {
    fetch(
      `/api/events/?page=${currentPage}&startDate=${startDate}&endDate=${endDate}&postcode=${postcode}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setEvents(data.events);
        setPagesCount(data.pagesCount);
        setCurrentPage(data.currentPage + 1);
        setFilterStartDate(data.filters.startDate);
        setFilterEndDate(data.filters.endDate);
        setPostcode(data.filters.postcode);
      });
  };

  function newPageHandler(page) {
    fetch(
      `/api/events/?page=${page}&startDate=${filterStartDate}&endDate=${filterEndDate}&postcode=${postcode}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setEvents(data.events);
        setPagesCount(data.pagesCount);
        setCurrentPage(data.currentPage + 1);
        setFilterStartDate(data.filters.startDate);
        setFilterEndDate(data.filters.endDate);
        setPostcode(data.filters.postcode);
      });
  }
  return (
    <>
      <Head>
        <title>Ticketmaster Events</title>
        <meta
          name="description"
          content="Find a lot of great events in Australia"
        />
      </Head>
      <EventsSearch
        onSearch={findEventsHandler}
        startDate={filterStartDate}
        endDate={filterEndDate}
      />
      {isError && (
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
      )}
      {(!events || events.length === 0) && (
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
      )}
      <EventList items={events} />
      <Pagination
        pagesCount={pagesCount}
        currentPage={currentPage}
        onPageChange={newPageHandler}
      />
    </>
  );
}
export async function getStaticProps() {
  try {
    const res = await fetch(
      `https://app.ticketmaster.com/discovery/v2/events?apikey=${process.env.api_key_ticketmaster}&locale=*&countryCode=AU&sort=date,asc`
    );
    const data = await res.json();
    return {
      props: {
        events: data._embedded.events,
        pagesCount: data.page.totalPages,
        currentPage: data.page.number,
        data: data,
      },
      revalidate: 300,
    };
  } catch (error) {
    res.status(500).json({ message: "Data is not available" });
    return;
  }
}
export default Home;
