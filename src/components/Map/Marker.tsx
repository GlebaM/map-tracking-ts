import { useState } from "react";
import styles from "./Marker.module.scss";
import Popover from "@mui/material/Popover";
import StyledPopupItem from "../Styled/StyledPopupItem";
import { IconButton } from "@mui/material";

const Marker = ({
  pointCount,
  arrLength,
  markerName,
  status,
  battery,
  carType,
  range,
}: markerType) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handlePopoverOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const popupContent = [
    `Name: ${markerName}`,
    `Status: ${status?.toLowerCase()}`,
    `Range: ${`${range}km`}`,
    `Battery: ${battery}%`,
    `Car type: ${carType?.toLowerCase()}`,
  ];

  const open = Boolean(anchorEl);

  return (
    <div
      style={{
        width: `${46 + (pointCount || 0 / arrLength) * 4}px`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <IconButton
        className={`${styles.marker} ${
          status?.toLowerCase() === "unavailable" &&
          styles["marker--unavailable"]
        } `}
        onMouseEnter={!!markerName ? handlePopoverOpen : () => {}}
        onBlur={!!markerName ? handlePopoverClose : () => {}}
        onMouseLeave={handlePopoverClose}
        onClick={handlePopoverOpen}
      >
        {markerName ? (
          <img src="/m8.png" alt={markerName} />
        ) : (
          <img src="/m1.png" alt={markerName || "car"} />
        )}
        {pointCount && pointCount > 0 && (
          <p
            className={`${styles.marker__badge} ${styles["marker__badge--car"]}`}
          >
            {pointCount}
          </p>
        )}
      </IconButton>
      {!!carType && (
        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: "none",
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          disableRestoreFocus
        >
          {popupContent.map((item) => (
            <StyledPopupItem key={item}>{item}</StyledPopupItem>
          ))}
        </Popover>
      )}
    </div>
  );
};

export default Marker;
