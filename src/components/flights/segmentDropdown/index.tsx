import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { Segment } from "../../../helpers/rawFlightConverter/convertedRawFlightInterface";
import { Box, Divider, Typography } from "@mui/material";

export default function SegmentsDropDown(props: { data: Segment }) {
  return (
    <Box margin={"20px"}>
      <RouteTimeline data={props.data} />
      <Divider />
    </Box>
  );
}

interface IRouteTimeline {
  data: Segment;
}

function RouteTimeline(props: IRouteTimeline) {
  return (
    <Timeline
      sx={{
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}
    >
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot variant="outlined" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
        >
          <Typography
            fontSize={"16px"}
          >{`${props.data.departureDate}, ${props.data.departureTime} - ${props.data.departureAirport}`}</Typography>
          <Typography fontSize={"14px"} color="gray">
            Travel time: {props.data.duration}
          </Typography>
          <Typography fontSize={"14px"} color="gray">
            Carrier: {props.data.carrier}
          </Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot variant="outlined" />
        </TimelineSeparator>
        <TimelineContent>
          {" "}
          <Typography
            fontSize={"16px"}
          >{`${props.data.arrivalDate}, ${props.data.arrivalTime} - ${props.data.arrivalAirport}`}</Typography>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
