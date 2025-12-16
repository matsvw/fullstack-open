import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Table,
  Button,
  TableHead,
  Typography,
  TableCell,
  TableRow,
  TableBody,
} from "@mui/material";
import axios from "axios";

import { PatientFormValues, Patient, EntryType } from "../../types";
import { getAxiosErrorMessages } from "../../utils";
import AddPatientModal from "../AddPatientModal";

import HealthRatingBar from "../HealthRatingBar";

import patientService from "../../services/patients";

interface Props {
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}

const PatientListPage = ({ patients, setPatients }: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewPatient = async (values: PatientFormValues) => {
    try {
      const patient = await patientService.create(values);
      setPatients(patients.concat(patient));
      setModalOpen(false);
    } catch (e: unknown) {
      console.log(e);
      if (axios.isAxiosError(e)) {
        const messages = getAxiosErrorMessages(e);
        const message = `Error adding patient:\n${messages.join("\n")}`;
        setError(message);
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  // This does not work, since at this stage we have not loaded entries yet.
  const getRating = (patient: Patient): number => {
    if (!patient?.entries) {
      console.log("No entries");
      return 4;
    }

    const entries = patient.entries.reverse();
    console.log(entries);
    const rating =
      entries.find((e) => e.type === EntryType.HealthCheck)
        ?.healthCheckRating ?? 4;

    return rating;
  };

  return (
    <div className="App">
      <Box>
        <Typography align="center" variant="h6">
          Patient list
        </Typography>
      </Box>
      <Table style={{ marginBottom: "1em" }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Occupation</TableCell>
            <TableCell>Health Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(patients).map((patient: Patient) => (
            <TableRow key={patient.id}>
              <TableCell>
                <Link to={`/patients/${patient.id}`}>{patient.name}</Link>
              </TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>{patient.occupation}</TableCell>
              <TableCell>
                <HealthRatingBar rating={getRating(patient)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Patient
      </Button>
    </div>
  );
};

export default PatientListPage;
