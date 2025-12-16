import { Typography } from "@mui/material";
import { type HospitalEntry, Diagnosis } from "../../types";
import { BaseEntry } from ".";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

interface Props {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}

const HospitalEntry: React.FC<Props> = ({ entry, diagnoses }) => {
  return (
    <BaseEntry entry={entry} diagnoses={diagnoses} icon={<LocalHospitalIcon />}>
      <Typography variant="body1">
        Discarge: {entry.discharge?.date} {entry.discharge?.criteria}
      </Typography>
    </BaseEntry>
  );
};

export default HospitalEntry;
