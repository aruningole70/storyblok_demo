import React, { useState } from "react";
import { importXML } from "./ImportXML";
import { Button } from "@mui/material";

const XMLImporter = (props: any) => {
  const { setJsonData } = props;
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const xmlContent = e.target?.result as string;
        const json = importXML(xmlContent);
        console.log("Parsed JSON:", json.root);
        setJsonData(json);
      };
      reader.readAsText(file);
    }
  };
  return (
    <div>
      <input
        type="file"
        accept=".xml"
        onChange={handleFileUpload}
        style={{ display: "none" }}
        id="xmlInput"
      />
      <Button
        color="inherit"
        onClick={() => document.getElementById("xmlInput")?.click()}
      >
        Upload XML
      </Button>

      {/* {jsonData && <pre>{JSON.stringify(jsonData, null, 2)}</pre>} */}
    </div>
  );
};

export default XMLImporter;
