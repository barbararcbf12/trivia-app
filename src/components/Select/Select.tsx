import { FormControl, MenuItem, Select as SelectMUI } from "@mui/material";
import React from "react";
import type { CategoryProps } from "../../types/triviaApi";

type SelectProps = {
  id: string;
  onChange: (e: any) => void;
  value: string;
  options: CategoryProps[];
  label?: string;
}

export default function Select({ id, onChange, value, options, label }: SelectProps) {
  return (
    <FormControl size="small">
      <div className="flex gap-2 items-center">
        <span>{ label }</span>
        <SelectMUI
          labelId={ id }
          id={ id }
          value={ value }
          onChange={ onChange }
          size="small"
        >
          { options.map((option) => (
            <MenuItem key={ option.id } value={ option.id }>
              { option.name }
            </MenuItem>
          )) }
        </SelectMUI>
      </div>
    </FormControl>
);
}