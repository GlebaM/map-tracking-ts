import { useState } from "react";
import styles from "./Marker.module.scss";
import Popover from "@mui/material/Popover";
import StyledPopupItem from "../Styled/StyledPopupItem";
import { IconButton } from "@mui/material";

const MarkerPoi = ({
  pointCount,
  arrLength,
  address,
  category,
  name,
}: markerPoiType) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handlePopoverOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const city = address?.slice(0, 1).toLocaleUpperCase() + address?.slice(1);
  const popupPoiContent = [
    `Place Name: ${name}`,
    `City: ${city}`,
    `Category: ${category}`,
  ];

  const open = Boolean(anchorEl);

  return (
    <div
      style={{
        width: `${36 + (pointCount || 0 / arrLength) * 1.3}px`,
        height: `${36 + (pointCount || 0 / arrLength) * 1.3}px`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <IconButton
        className={styles.marker}
        onMouseEnter={handlePopoverOpen}
        onBlur={handlePopoverClose}
        onMouseLeave={handlePopoverClose}
        onClick={handlePopoverOpen}
        aria-owns={open ? "mouse-over-popover" : undefined}
        color="success"
      >
        {name ? (
          category.toLocaleLowerCase() === "ciekawe miejsca" ? (
            <img src="/cool-places.png" alt={name} />
          ) : category.toLocaleLowerCase() === "stacje kolejowe" ? (
            <img src="/train.png" alt={name} />
          ) : (
            <img src="/gnome.png" alt={name} />
          )
        ) : (
          <p className={styles.marker__circle}></p>
        )}
        {pointCount && pointCount > 0 && (
          <p
            className={`${styles.marker__badge} ${styles["marker__badge--poi"]}`}
          >
            {pointCount}
          </p>
        )}
      </IconButton>
      {name && (
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
          {popupPoiContent.map((item) => (
            <StyledPopupItem key={item}>{item}</StyledPopupItem>
          ))}
        </Popover>
      )}
    </div>
  );
};

export default MarkerPoi;
