import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { SxProps, Theme } from "@mui/material";

import { Diagnosis } from "../../types";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface Props {
  diagnosisList: Diagnosis[];
  onChange: (selectedDiagnoses: string[]) => void;
  sx: SxProps<Theme> | undefined;
}

export default function DiagnosesSelector({
  diagnosisList,
  onChange,
  sx,
}: Props) {
  const [diagnoses, setDiagnoses] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof diagnoses>) => {
    const {
      target: { value },
    } = event;
    setDiagnoses(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value,
    );
    onChange(diagnoses);
  };

  return (
    <div>
      <FormControl sx={sx} fullWidth>
        <InputLabel id="demo-multiple-checkbox-label">Diagnoses</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={diagnoses}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {diagnosisList.map((d) => (
            <MenuItem key={d.code} value={d.code}>
              <Checkbox checked={diagnoses.includes(d.code)} />
              <ListItemText primary={d.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
