import React from "react";
import { XMLParser } from "fast-xml-parser";

const ImportData = ({
  onParsedData,
}: {
  onParsedData: (data: any) => void;
}) => {
  const handleImportXML = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const xmlText = e.target?.result as string;
      const parser = new XMLParser();
      try {
        const jsonObj = parser.parse(xmlText);
        console.log("Parsed XML Response:", jsonObj);

        // ✅ Extract story correctly
        const story = jsonObj?.root?.story;
        if (!story) {
          alert("Invalid XML structure: Missing root.story");
          return;
        }

        onParsedData(story); // ✅ Send only the story object
      } catch (error) {
        console.error("Error parsing XML:", error);
      }
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <label htmlFor="xml-import" style={{ cursor: "pointer" }}>
        <span
          style={{
            padding: "8px",
            backgroundColor: "#eee",
            display: "inline-block",
          }}
        >
          Import XML
        </span>
      </label>
      <input
        id="xml-import"
        type="file"
        accept=".xml"
        style={{ display: "none" }}
        onChange={handleImportXML}
      />
    </div>
  );
};

export default ImportData;
