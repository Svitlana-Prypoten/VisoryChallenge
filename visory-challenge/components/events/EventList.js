import EventItem from "./EventItem";
import classes from "./EventList.module.css";

function EventList(props) {
  const { items } = props;

  return (
    <ul className={classes.list}>
      {items.map((event) => (
        <EventItem
          key={event.id}
          id={event.id}
          title={event.name}
          location={event._embedded.venues[0].name}
          date={event.dates.start.localDate}
          image={event.images[2].url}
        />
      ))}
    </ul>
  );
}

export default EventList;
