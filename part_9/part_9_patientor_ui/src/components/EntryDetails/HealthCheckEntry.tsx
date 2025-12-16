//import { Typography } from "@mui/material";
import { type HealthCheckEntry, Diagnosis } from "../../types";
import { BaseEntry } from ".";
import HealthRatingBar from "../HealthRatingBar";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";

interface Props {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}

const HealthCheckEntry: React.FC<Props> = ({ entry, diagnoses }) => {
  return (
    <BaseEntry entry={entry} diagnoses={diagnoses} icon={<MonitorHeartIcon />}>
      <HealthRatingBar rating={entry.healthCheckRating} />
    </BaseEntry>
  );
};

export default HealthCheckEntry;
