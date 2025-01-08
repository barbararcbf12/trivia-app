import React, { useId } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

type ToggleSelectorProps = {
  value: string | number | null;
  onChange: (e: any) => void;
  options: any[];
  label?: string;
  exclusive?: boolean;
}

export default function ToggleSelector({ value, onChange, options, label, exclusive=true }: ToggleSelectorProps) {
  const id = useId();

  return (
    <div className="flex gap-2 items-center">
      <span>{label}</span>
      <ToggleButtonGroup
        size="small"
        color="primary"
        value={ value }
        exclusive={ exclusive }
        onChange={ onChange }
      >
        { options?.map(option => (
          <ToggleButton
            key={ id }
            id={ id }
            value={ option.value }
            selected={ value === option.value }
          >
            { option.name }
          </ToggleButton>
        )) }
      </ToggleButtonGroup>
    </div>
  );
}