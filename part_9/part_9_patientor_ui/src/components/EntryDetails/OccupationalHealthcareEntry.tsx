import { Typography } from "@mui/material";
import { type OccupationalHealthcareEntry, Diagnosis } from "../../types";
import { BaseEntry } from ".";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";

interface Props {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}

const OccupationalHealthcareEntry: React.FC<Props> = ({ entry, diagnoses }) => {
  return (
    <BaseEntry
      entry={entry}
      diagnoses={diagnoses}
      icon={<HealthAndSafetyIcon />}
    >
      <Typography variant="body1">Employer: {entry.employerName}</Typography>
      <Typography
        variant="body1"
        sx={{ display: entry.sickLeave ? "inherit" : "none" }}
      >
        Sickleave: {entry.sickLeave?.startDate} - {entry.sickLeave?.startDate}
      </Typography>
    </BaseEntry>
  );
};

export default OccupationalHealthcareEntry;
