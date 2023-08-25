import { useEffect, useState } from "react";
import * as api from "@/api";

export default function SummaryViewDescription({ content = "" }) {
  const [html, setHtml] = useState("");

  useEffect(() => {
    let html = content;
    setHtml(html);
  }, [content]);

  return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
}
