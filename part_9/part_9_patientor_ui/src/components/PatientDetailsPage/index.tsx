import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";

import { Patient, Gender, Diagnosis } from "../../types";
import patientService from "../../services/patients";

import EntryDetails from "../EntryDetails";

interface Props {
  diagnoses: Diagnosis[];
}

const PatientDetailsPage = ({ diagnoses }: Props) => {
  const [patient, setPatient] = useState<Patient>();
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

  return (
    <div className="App">
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
      </Box>
    </div>
  );
};

export default PatientDetailsPage;
