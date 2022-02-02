import styles from "./MapNew.module.scss";

const Marker = ({ pointCount, arrLength, markerName }: any) => {
  console.log(markerName);
  return (
    <button
      className={`${styles.marker} ${styles["marker--cluster"]}`}
      style={{
        width: `${32 + pointCount / arrLength}px`,
        height: `${32 + pointCount / arrLength}px`,
      }}
    >
      {markerName ? (
        <img src="/car.png" alt={markerName} />
      ) : (
        <img src="/m4.png" alt={markerName} />
      )}
      <p>{pointCount}</p>
    </button>
  );
};

export default Marker;
