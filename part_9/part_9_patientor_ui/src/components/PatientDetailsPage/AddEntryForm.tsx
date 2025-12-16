import { useState, SyntheticEvent } from "react";
import {
  TextField,
  Grid,
  Button,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Box,
  Alert,
  Rating,
} from "@mui/material";

import { styled } from "@mui/material/styles";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import axios from "axios";
import {
  Entry,
  EntryFormValues,
  HealthCheckRating,
  Discharge,
  SickLeave,
  EntryType,
  Diagnosis,
} from "../../types";

import patientService from "../../services/patients";
import { assertNever, getAxiosErrorMessages } from "../../utils";
import DiagnosesSelector from "../EntryDetails/DiagnosesSelector";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

interface Props {
  onCancel: () => void;
  onNewEntry: (newEntry: Entry) => void;
  patientId: string;
  diagnoses: Diagnosis[];
}

interface EntryOption {
  value: EntryType;
  label: string;
}

const entryOptions: EntryOption[] = Object.values(EntryType).map((v) => ({
  value: v,
  label: v.toString(),
}));

const AddEntryForm = ({
  onCancel,
  onNewEntry,
  patientId,
  diagnoses,
}: Props) => {
  const emptySickLeave: SickLeave = { startDate: "", endDate: "" };
  const emptyDischarge: Discharge = { date: "", criteria: "" };
  const [error, setError] = useState("");
  const today = new Date();
  const defaultDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

  //BaseEntry fields
  const [entryType, setEntryType] = useState<EntryType>(EntryType.HealthCheck);
  const [description, setDescription] = useState("");
  const [entryDate, setEntryDate] = useState(defaultDate);
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<Array<string>>([]);

  //HealthCheckEntry fields
  const [healthCheckRating, setHealthCheckRating] =
    useState<HealthCheckRating>(0);

  //OccupationalHealthcareEntry fields
  const [employerName, setEmployerName] = useState("");
  const [sickLeave, setSickLeave] = useState<SickLeave>(emptySickLeave);

  //Hospital fields
  const [discharge, setDischarge] = useState<Discharge>(emptyDischarge);

  const clearFields = () => {
    setDescription("");
    setEntryDate(defaultDate);
    setSpecialist("");
    setDiagnosisCodes([]);
    setHealthCheckRating(0);
    setEmployerName("");
    setSickLeave(emptySickLeave);
    setDischarge(emptyDischarge);
    setError("");
  };

  const handleCancel = () => {
    clearFields();
    onCancel();
  };

  const addEntry = async (event: SyntheticEvent) => {
    event.preventDefault();

    try {
      const baseValues = {
        description,
        date: entryDate,
        specialist,
        diagnosisCodes,
      };

      let values: EntryFormValues;

      switch (entryType) {
        case EntryType.HealthCheck:
          values = {
            ...baseValues,
            type: EntryType.HealthCheck,
            healthCheckRating,
          };
          break;
        case EntryType.Hospital:
          values = { ...baseValues, type: EntryType.Hospital, discharge };
          break;
        case EntryType.OccupationalHealthcare:
          values = {
            ...baseValues,
            type: EntryType.OccupationalHealthcare,
            employerName,
            sickLeave,
          };
          break;
        default:
          assertNever(entryType);
          throw new Error(`Unsupported entry type ${entryType}`);
      }

      const newEntry = await patientService.addEntry(patientId, values);
      onNewEntry(newEntry);
    } catch (e: unknown) {
      console.log("Error:", e);
      if (axios.isAxiosError(e)) {
        const messages = getAxiosErrorMessages(e);
        const message = `Error creating journal entry:\n${messages.join("\n")}`;
        setError(message);
      } else {
        setError("Unknown error creating entry");
      }
    }
  };

  const onEntryTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const et = Object.values(EntryType).find((g) => g.toString() === value);
      if (et) {
        setEntryType(et);
      }
    }
  };

  return (
    <Box sx={{ pb: "2rem" }}>
      {error && (
        <Alert sx={{ whiteSpace: "pre-wrap" }} severity="error">
          {error}
        </Alert>
      )}
      <form onSubmit={addEntry}>
        <InputLabel sx={{ mt: "1rem" }}>Entry Type</InputLabel>
        <Select
          sx={{ mt: "0.8rem" }}
          label="Gender"
          fullWidth
          value={entryType}
          onChange={onEntryTypeChange}
        >
          {entryOptions.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <TextField
          sx={{ mt: "0.8rem" }}
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          sx={{ mt: "0.8rem" }}
          label="Date"
          type="date"
          focused
          fullWidth
          value={entryDate}
          onChange={({ target }) => setEntryDate(target.value)}
        />
        <TextField
          sx={{ mt: "0.8rem" }}
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <DiagnosesSelector
          diagnosisList={diagnoses}
          onChange={(val) => setDiagnosisCodes(val)}
          sx={{ mt: "0.8rem" }}
        />

        {entryType === EntryType.HealthCheck && (
          <StyledRating
            sx={{ mt: "0.8rem" }}
            value={4 - healthCheckRating}
            getLabelText={(value: number) =>
              `${value} Heart${value !== 1 ? "s" : ""}`
            }
            precision={1}
            max={4}
            onChange={(_event, newValue) => {
              setHealthCheckRating(4 - (newValue ?? 4));
            }}
            icon={<FavoriteIcon fontSize="inherit" />}
            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
          />
        )}

        {entryType === EntryType.OccupationalHealthcare && (
          <>
            <TextField
              sx={{ mt: "0.8rem" }}
              label="Employer"
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />

            <TextField
              sx={{ mt: "0.8rem" }}
              label="Skickleave start date"
              type="date"
              focused
              fullWidth
              value={sickLeave?.startDate}
              onChange={({ target }) =>
                setSickLeave({
                  endDate: sickLeave?.endDate ?? "",
                  startDate: target.value,
                })
              }
            />
            <TextField
              sx={{ mt: "0.8rem" }}
              label="Skickleave end date"
              type="date"
              focused
              fullWidth
              value={sickLeave?.endDate}
              onChange={({ target }) =>
                setSickLeave({
                  endDate: target.value,
                  startDate: sickLeave?.startDate ?? defaultDate,
                })
              }
            />
          </>
        )}
        {entryType === EntryType.Hospital && (
          <>
            <TextField
              sx={{ mt: "0.8rem" }}
              label="Discharge date"
              type="date"
              focused
              fullWidth
              value={discharge?.date}
              onChange={({ target }) =>
                setDischarge({
                  date: target.value,
                  criteria: discharge?.criteria ?? "",
                })
              }
            />

            <TextField
              sx={{ mt: "0.8rem" }}
              label="Discharge criteria"
              fullWidth
              value={discharge?.criteria}
              onChange={({ target }) =>
                setDischarge({
                  date: discharge?.date ?? defaultDate,
                  criteria: target.value,
                })
              }
            />
          </>
        )}
        <Grid sx={{ mt: "0.8rem" }}>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add Journal Entry
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddEntryForm;
