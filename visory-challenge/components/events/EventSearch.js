import { useState } from "react";
import Button from "../ui/Button";
import classes from "./EventSearch.module.css";

function EventsSearch(props) {
  const date = new Date();
  const today =
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1) +
    "-" +
    date.getDate() +
    "T00:00";
  const [startDate, setStartDate] = useState(props.startDate);
  const [endtDate, setEndDate] = useState(props.endDate);
  const [postcode, setPostcode] = useState(props.postcode);

  function handleStartDate(event) {
    setStartDate(event.target.value);
  }
  function handleEndDate(event) {
    setEndDate(event.target.value);
  }
  function handlePostcode(event) {
    setPostcode(event.target.value);
  }
  function submitHandler(event) {
    event.preventDefault();

    props.onSearch(startDate, endtDate, postcode);
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.controls}>
        <div className={classes.control}>
          <label>
            Start date &nbsp;
            <input
              type="datetime-local"
              name="startDate"
              value={startDate}
              onChange={handleStartDate}
              min={today}
            />
          </label>
          <label>
            End date &nbsp;
            <input
              type="datetime-local"
              name="endDate"
              value={endtDate}
              onChange={handleEndDate}
              min={startDate ? startDate : today}
            />
          </label>
          <label>
            Post code &nbsp;
            <input
              type="number"
              name="postcode"
              value={postcode}
              onChange={handlePostcode}
            />
          </label>
        </div>
      </div>
      <Button>Find Events</Button>
    </form>
  );
}

export default EventsSearch;
