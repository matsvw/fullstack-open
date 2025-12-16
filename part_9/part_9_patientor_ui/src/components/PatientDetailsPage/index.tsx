import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";

import { Patient, Gender, Diagnosis, Entry } from "../../types";
import patientService from "../../services/patients";

import EntryDetails from "../EntryDetails";
import AddEntryForm from "./AddEntryForm";

interface Props {
  diagnoses: Diagnosis[];
}

const PatientDetailsPage = ({ diagnoses }: Props) => {
  const [patient, setPatient] = useState<Patient>();
  const [addEntry, setAddEntry] = useState(false);
  const { id: patientId } = useParams();

  useEffect(() => {
    const getPatient = async (id: string) => {
      const pt = await patientService.findById(id);
      setPatient(pt);
    };

    if (patientId) {
      getPatient(patientId);
    }
  }, [patientId]);

  if (!patient) {
    return <p>Loading...</p>;
  }

  const entryAdded = (entry: Entry) => {
    const newPatient = { ...patient, entries: patient.entries.concat(entry) };
    setPatient(newPatient);
    setAddEntry(false);
  };

  const showEntryForm = () => {
    window.scrollTo(0, 0); //ugy, but works for this purpose
    setAddEntry(true);
  };

  return (
    <div className="App">
      {addEntry && patientId && (
        <AddEntryForm
          patientId={patientId}
          onCancel={() => setAddEntry(false)}
          onNewEntry={entryAdded}
        />
      )}
      <Box sx={{ mt: "2rem" }}>
        <Typography variant="h6">
          {patient.name}
          {"   "}
          {patient.gender === Gender.Male && <MaleIcon />}
          {patient.gender === Gender.Female && <FemaleIcon />}
          {patient.gender === Gender.Other && <TransgenderIcon />}
        </Typography>
        <Typography variant="body1">ssn: {patient.ssn ?? "unknown"}</Typography>
        <Typography variant="body1">
          dob: {patient.dateOfBirth ?? "unknown"}
        </Typography>
        <Typography variant="body1">
          occupation: {patient.occupation}
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontWeight: 700, mb: "0.5rem", mt: "1rem" }}
        >
          entries
        </Typography>
        {patient.entries.map((e) => (
          <EntryDetails key={`entry_${e.id}`} entry={e} diagnoses={diagnoses} />
        ))}
        <br />
        <Button variant="contained" onClick={showEntryForm}>
          Add new entry
        </Button>
      </Box>
    </div>
  );
};

export default PatientDetailsPage;
