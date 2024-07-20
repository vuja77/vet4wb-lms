"use client";
import React, { useEffect, useState } from "react";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

const DocxViewer = ({ file }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    const loadDocx = async () => {
      const response = await fetch(file);
      const arrayBuffer = await response.arrayBuffer();

      // Ovde možete parsirati sadržaj DOCX fajla
      const doc = await Document.load(arrayBuffer);
      const text = doc
        .getBody()
        .map((paragraph) => paragraph.getText())
        .join("\n");
      setContent(text);
    };

    loadDocx();
  }, [file]);

  return (
    <div className="w-screen h-screen">
      <pre>{content}</pre>
    </div>
  );
};

export default DocxViewer;
