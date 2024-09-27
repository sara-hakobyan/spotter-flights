import { Box, Card, Divider, IconButton, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { IFlightConverted } from "../../../helpers/rawFlightConverter/convertedRawFlightInterface";
import { useCallback, useState } from "react";
import ArrowDownIcon from "@mui/icons-material/ArrowDropDownOutlined";
import ArrowUpIcon from "@mui/icons-material/ArrowDropUpOutlined";

import "./index.css";
import SegmentsDropDown from "../segmentDropdown";

interface IFlightCard {
  data: IFlightConverted;
}

export default function FlightDataCard(props: IFlightCard) {
  const [isOpen, setIsOpen] = useState(false);

  const handleArrBtn = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <>
      <Card className={"flight_card-container"}>
        <Box
          onClick={handleArrBtn}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box className="time">
            <Box className="img">
              <img
                src={props.data.carriers[0].logo}
                alt="carrier"
                style={{ width: "25px", height: "25px" }}
              />
            </Box>
            <Box className="routes">
              <Typography>
                {props.data.departureTime} - {props.data.arrivalTime}
              </Typography>
              <Typography>
                {props.data.carriers.map((c) => `${c.name}`)}
              </Typography>
            </Box>
          </Box>
          <Box className="duration-skyId">
            <Typography>{props.data.duration}</Typography>
            <Typography>
              {props.data.originCode} - {props.data.destinationCode}
            </Typography>
          </Box>
          <Box className="stops-count">
            <Typography>
              {props.data.stopCounts > 1
                ? `${props.data.stopCounts} stops`
                : props.data.stopCounts === 1
                ? `${props.data.stopCounts} stop`
                : "No Stops"}
            </Typography>
          </Box>
          <Box className="price">
            <Typography>{props.data.price}</Typography>
          </Box>
          <Box>
            <IconButton onClick={handleArrBtn}>
              {isOpen ? (
                <ArrowUpIcon fontSize="small" />
              ) : (
                <ArrowDownIcon fontSize="small" />
              )}
            </IconButton>
          </Box>
        </Box>
        {isOpen ? (
          <Box>
            <Divider className="divider" />
            {props.data.segments.map((c, index) => (
              <SegmentsDropDown key={index} data={c} />
            ))}
          </Box>
        ) : null}
      </Card>
    </>
  );
}
