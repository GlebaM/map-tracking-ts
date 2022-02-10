import { useState } from "react";
import styles from "./Marker.module.scss";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";

const PopupItem = styled(Typography)`
  padding-inline: 1rem;
  padding-block: 0.7rem;
  letter-spacing: 1px;
  font-weight: 900;
  font-size: 12px;
  font-size: 1.4rem;
  background: #0e194697;
  color: #fbf9f9;
  text-shadow: 0 0 0.1rem #eedada;
  border-bottom: 1px solid #e6e4e4;
  &:last-child {
    border-bottom: none;
  }
  & > span {
    text-decoration: underline;
  }
`;

const Marker = ({
  pointCount,
  arrLength,
  markerName,
  status,
  battery,
  carType,
  range,
}: markerType) => {
  const [mouseOver, setMouseOver] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const onClickHandler = (event: any) => {
    setMouseOver(true);
    setAnchorEl(event.currentTarget);
  };
  const onBlurHandler = () => {
    setMouseOver(true);
  };

  const handlePopoverOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <div
        style={{
          width: `${36 + (pointCount || 0 / arrLength) * 4}px`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography
          aria-owns={open ? "mouse-over-popover" : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
          onClick={handlePopoverOpen}
          sx={{ letterSpacing: "3px" }}
        >
          <button
            onMouseEnter={!!markerName ? onClickHandler : () => {}}
            onBlur={!!markerName ? onBlurHandler : () => {}}
            className={`${styles.marker} ${
              status?.toLowerCase() === "unavailable" &&
              styles["marker--unavailable"]
            } `}
            style={{
              width: `100%`,
            }}
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
          </button>
        </Typography>
        {mouseOver && (
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
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <PopupItem>
              Name: <span>{markerName}</span>
            </PopupItem>
            <PopupItem>
              Status: <span>{status?.toLowerCase()}</span>
            </PopupItem>
            <PopupItem>
              Range: <span>{`${range}km`}</span>
            </PopupItem>
            <PopupItem>
              Battery: <span>{battery}%</span>
            </PopupItem>
            <PopupItem>
              Car type: <span>{carType.toLowerCase()}</span>
            </PopupItem>
          </Popover>
        )}
      </div>
    </>
  );
};

export default Marker;
