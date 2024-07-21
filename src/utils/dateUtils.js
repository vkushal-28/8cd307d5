export const seconds_to_days_hours_mins_secs_str = (seconds) => {
  // day, h, m and s
  var days = Math.floor(seconds / (24 * 60 * 60));
  seconds -= days * (24 * 60 * 60);
  var hours = Math.floor(seconds / (60 * 60));
  seconds -= hours * (60 * 60);
  var minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;
  return (
    (0 < days ? days + " day, " : "") +
    (0 < hours ? hours + " h, " : "") +
    minutes +
    "m and " +
    seconds +
    "s"
  );
};
