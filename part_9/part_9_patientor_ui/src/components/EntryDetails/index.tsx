//import { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";

import HealthCheckEntry from "./HealthcheckEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";
import HospitalEntry from "./HospitalEntry";

import { Entry, Diagnosis } from "../../types";
import { assertNever } from "../../utils";

interface BaseProps {
  entry: Entry;
  diagnoses: Diagnosis[];
  children?: React.ReactNode;
  icon: React.ReactElement;
}

interface EntryProps {
  entry: Entry;
  diagnoses: Diagnosis[];
}

export const BaseEntry: React.FC<BaseProps> = ({
  diagnoses,
  entry,
  icon,
  children,
}: BaseProps) => {
  return (
    <Box sx={{ border: "solid", borderColor: "lightgrey", mb: "0.2rem" }}>
      <Typography variant="body1">
        Date: {entry.date}
        {"   "}
        {icon}
      </Typography>
      <Typography variant="body1">Description: {entry.description}</Typography>
      <Typography variant="body1">Specialist: {entry.specialist}</Typography>
      {children && <div>{children}</div>}
      <Typography
        variant="body2"
        sx={{ fontWeight: 700, mt: "1rem", ml: "2rem" }}
      >
        diagnoses
      </Typography>
      <ul>
        {entry.diagnosisCodes?.map((d) => (
          <li key={d}>
            <Typography variant="body2">
              {d}{" "}
              {diagnoses.find((dl) => dl.code === d)?.name ??
                "Unknown diagnosis code"}
            </Typography>
          </li>
        ))}
      </ul>
    </Box>
  );
};

const EntryDetails: React.FC<EntryProps> = ({
  diagnoses,
  entry,
}: EntryProps) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <>
          <HospitalEntry entry={entry} diagnoses={diagnoses} />
        </>
      );
    case "OccupationalHealthcare":
      return (
        <>
          <OccupationalHealthcareEntry entry={entry} diagnoses={diagnoses} />
        </>
      );
    case "HealthCheck":
      return (
        <>
          <HealthCheckEntry entry={entry} diagnoses={diagnoses} />
        </>
      );
    default:
      assertNever(entry);
  }
};

export default EntryDetails;
