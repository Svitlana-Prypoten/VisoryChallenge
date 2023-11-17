export default function EventDetails(props) {
  return (
    <>
      <h2>{props.title}</h2>
      <h3>Start date {props.startDate}</h3>
      <div>{props.description}</div>
    </>
  );
}
