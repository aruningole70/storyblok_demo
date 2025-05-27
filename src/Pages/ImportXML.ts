import { XMLParser } from "fast-xml-parser";

export const importXML = (xmlData: string) => {
  const parser = new XMLParser();
  const jsonObj = parser.parse(xmlData);
  return jsonObj;
};
