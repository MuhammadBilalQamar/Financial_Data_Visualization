import React from "react";
import { useState } from "react";
export default function DropDownSelections({ onChange }) {
  const options = [
    { value: "LIN_monthly_var", label: "LIN_monthly_var" },
    { value: "XOM_monthly_var", label: "XOM_monthly_var" },
    { value: "CMCSA_monthly_var", label: "CMCSA_monthly_var" },
    { value: "ABBV_monthly_var", label: "ABBV_monthly_var" },
    { value: "AMD_monthly_var", label: "AMD_monthly_var" },
    { value: "LLY_monthly_var", label: "LLY_monthly_var" },
    { value: "PM_monthly_var", label: "PM_monthly_var" },
    { value: "DIS_monthly_var", label: "DIS_monthly_var" },
    { value: "COST_monthly_var", label: "COST_monthly_var" },
    { value: "MS_monthly_var", label: "MS_monthly_var" },
    { value: "WMT_monthly_var", label: "WMT_monthly_var" },
    { value: "HD_monthly_var", label: "HD_monthly_var" },
    { value: "META_monthly_var", label: "META_monthly_var" },
    { value: "NKE_monthly_var", label: "NKE_monthly_var" },
    { value: "UNH_monthly_var", label: "UNH_monthly_var" },
    { value: "VZ_monthly_var", label: "VZ_monthly_var" },
    { value: "UPS_monthly_var", label: "UPS_monthly_var" },
    { value: "ABT_monthly_var", label: "ABT_monthly_var" },
    { value: "NFLX_monthly_var", label: "NFLX_monthly_var" },
    { value: "V_monthly_var", label: "V_monthly_var" },
    { value: "ADBE_monthly_var", label: "ADBE_monthly_var" },
    { value: "NVDA_monthly_var", label: "NVDA_monthly_var" },
    { value: "PEP_monthly_var", label: "PEP_monthly_var" },
    { value: "ORCL_monthly_var", label: "ORCL_monthly_var" },
    { value: "MSFT_monthly_var", label: "MSFT_monthly_var" },
    { value: "JNJ_monthly_var", label: "JNJ_monthly_var" },
    { value: "AAPL_monthly_var", label: "AAPL_monthly_var" },
    { value: "KO_monthly_var", label: "KO_monthly_var" },
    { value: "NEE_monthly_var", label: "NEE_monthly_var" },
    { value: "AVGO_monthly_var", label: "AVGO_monthly_var" },
    { value: "MCD_monthly_var", label: "MCD_monthly_var" },
    { value: "TXN_monthly_var", label: "TXN_monthly_var" },
    { value: "DHR_monthly_var", label: "DHR_monthly_var" },
    { value: "CRM_monthly_var", label: "CRM_monthly_var" },
    { value: "CSCO_monthly_var", label: "CSCO_monthly_var" },
    { value: "TMO_monthly_var", label: "TMO_monthly_var" },
    { value: "AMZN_monthly_var", label: "AMZN_monthly_var" },
    { value: "ACN_monthly_var", label: "ACN_monthly_var" },
    { value: "MRK_monthly_var", label: "MRK_monthly_var" },
    { value: "CVX_monthly_var", label: "CVX_monthly_var" },
    { value: "PG_monthly_var", label: "PG_monthly_var" },
    { value: "MA_monthly_var", label: "MA_monthly_var" },
  ];
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    if (onChange) {
      onChange(event.target.value);
    }
  };
  return (
    <select value={selectedOption} onChange={handleChange}>
      {options.map((option, index) => (
        <option key={index} value={option.label}>
          {option.label || "Select an option"}
        </option>
      ))}
    </select>
  );
}
