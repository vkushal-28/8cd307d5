import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";

dayjs.extend(localizedFormat);
dayjs.extend(isToday);
dayjs.extend(isYesterday);

export const groupCallsByDate = (calls) => {
  const grouped = {};

  calls.forEach((call) => {
    let dateLabel;
    const callDate = dayjs(call.created_at);
    if (callDate.isToday()) {
      dateLabel = "Today";
    } else if (callDate.isYesterday()) {
      dateLabel = "Yesterday";
    } else {
      dateLabel = callDate.format("dddd, D MMM YYYY");
    }

    if (!grouped[dateLabel]) {
      grouped[dateLabel] = [];
    }
    grouped[dateLabel].push(call);
  });

  return grouped;
};
