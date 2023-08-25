"use client";

import DashboardLayout from "@/layouts/dashboard";
import { useEffect, useState } from "react";
import ProjectDetailsHeader from "@/components/project-details-header";
import Tabs from "@/components/tabs";
import ProjectContext from "@/context/project";
import * as api from "@/api";
import { useRouter } from "next/navigation";
import moment from "moment";
import { getRoleFromProjectBySlug } from "@/utils/helpers";
import { Divider } from 'antd';
import Progress from "@/components/project-progress";
import FullViewDescription from "@/components/full-view";
import $ from 'jquery';
import Sidebar from './sidebar'

export default function ProjectDetailsLayout({ children }) {
  const { push } = useRouter();

  const [project, setProject] = useState({
    collaborators: [],
    members: [],
    approvers: [],
  });
  const [roles, setRoles] = useState([]);

  const [tabs, setTabs] = useState([
    {
      label: "General",
      slug: "",
    },
    {
      label: "Full view",
      slug: "full-view",
    },
    {
      label: "Summary",
      slug: "summary",
    },
    {
      label: "Forum",
      slug: "forum",
    },
    {
      label: "History",
      slug: "history",
    },
  ]);

  const [activeTab, setActiveTab] = useState(tabs[0]);

  const [steps, setSteps] = useState([
    {
      label: "In Progress",
      slug: "in-progress",
    },
    {
      label: "Internal Approval",
      slug: "internal-approval",
    },
    {
      label: "New Version Sent",
      slug: "new-version-sent",
    },
    {
      label: "New Version Received",
      slug: "new-version-received",
    },
    {
      label: "To Sign",
      slug: "to-sign",
    },
  ]);

  const [activeStep, setActiveStep] = useState("internal-approval");

  const onChangeActiveStep = (step) => {
    setActiveStep(step.slug);
  };

  useEffect(() => {
    const [host, page, id, tab] = location.pathname.split("/");
    api.get_project(id).then(({ data }) => {
      setProject({
        ...project,
        id: data.id,
        name: data.name,
        doctype: data.document?.type,
        updated_at: moment(data.updated_at).format("ll"),
        created_at: moment(data.created_at).format("ll"),
        due_date: moment(data.due_date).format("ll"),
        status: data.status,
        lead: getRoleFromProjectBySlug(project, "lead", roles),
        owner: getRoleFromProjectBySlug(project, "owner", roles),
        description: data.summary ?? "",
        team: data.team,
        ai_summary: data.ai_summary,
        summaryhtml: data.summaryhtml,
        document: data.document,
      });
    });

    api
      .roles()
      .then((data) => data.json())
      .then((data) => {
        if (data && data.data) {
          setRoles(data.data);
        }
      });

    const currentTab = tabs.find((t) => t.slug == tab);
    if (currentTab) {
      setActiveTab(currentTab);
    } else {
      setActiveTab(tabs[0]);
    }
  }, []);

  const handleBack = () => {
    push("/active-projects");
  };

  const handleChangeTab = (tab) => {
    if (project?.id) {
      setActiveTab(tab);
      push("/active-projects/" + project.id + "/" + tab.slug);
    }
  };

  // New function
  const [description, setDescription] = useState('');
  const [spanId, setSpanId] = useState('');

  
  /*// [COMMENTED-YH-2] 
  const sumDoc = async (contentValue) => {
    var results = ''
    $('#description').html('');
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const API_KEY = "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";
    let controller = null; // Store the AbortController instance

    controller = new AbortController();
    const signal = controller.signal;
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{
            role: "user",
            // content: `Write a concise and easy-to-understand summary of the given contract that distills its content, focusing on making it accessible for a 5th grader. The summary should include the structure of the document. As an AI, follow these steps to generate the best results:
            //             Step 1: Familiarize yourself with the contents of the contract, paying attention to its key sections, clauses, and provisions.
            //             Step 2: Identify the most important and relevant information within the contract that needs to be summarized. This should include crucial terms, obligations, and any significant legal implications.
            //             Step 3: Keep in mind the goal of making the summary concise and easily understandable for a 5th grader. Use simple language, avoid jargon, and break down complex concepts into more digestible explanations.
            //             Step 4: Outline the structure of the document in the summary, clearly indicating the main sections and their respective summaries. This will help provide an overview of the entire contract and make it easier for readers to navigate.
            //             Step 5: Begin the summary by introducing the purpose and parties involved in the contract. Then, proceed to summarize each section, highlighting the key points while maintaining a clear and straightforward writing style.
            //             Step 6: Once you have completed the initial summary, review it to ensure it meets the criteria of being concise and easy to understand. Make any necessary revisions or adjustments to achieve the desired level of clarity.
            //             Step 7: Proofread the final summary to correct any grammatical errors or inconsistencies, ensuring that it maintains its accessibility for a 5th grader.
            //             Placeholders:
            //             Key sections, clauses, and provisions of the contract
            //             Purpose and parties involved in the contract
            //             Main sections and their respective summaries
            //             This is contract: [${contentValue}]`
            content: `Role: You are a skilled editor and lawer, known for your ability to simplify complex text while preserving its meaning. You have a strong understanding of readability principles and how to apply them to improve text comprehension.
                      Instruction: Simplify the following contract to improve its readability, ensuring its core meaning remains intact: [${contentValue}].`
          }],
          max_tokens: 300,
          top_p: 1,
          temperature: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
          stream: true, // For streaming responses
        }),
        signal, // Pass the signal to the fetch request
      });

      // Read the response as a stream of data
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      while (true) {
        const {
          done,
          value
        } = await reader.read();
        if (done) {
          break;
        }
        // Massage and parse the chunk of data
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");
        const parsedLines = lines
          .map((line) => line.replace(/^data: /, "")
            .trim()) // Remove the "data: " prefix
          .filter((line) => line !== "" && line !== "[DONE]") // Remove empty lines and "[DONE]"
          .map((line) => JSON.parse(line)); // Parse the JSON string

        for (const parsedLine of parsedLines) {
          const { choices } = parsedLine;
          const { delta } = choices[0];
          const { content } = delta;
          // Update the UI with the new content
          if (content) {
            $('#description').append(content)
            results = results + content;
            setDescription(results)
          }
        }
      }
    } catch (error) {
      // Handle fetch request errors
      console.log('error', error)
      if (signal.aborted) {
        setDescription('Request aborted.')
      } else {
        setDescription('Error occurred while generating.')
      }
    } finally {
      controller = null; // Reset the AbortController instance
      console.log(results)
      setDescription(results)
    }
  };
  */// [COMMENTED-YH-2]
  const sumDoc = async (content) => {
    const openAiResponse = await api
      .openAI_summarize_document({
        content: content,
        max_tokens: "500",
        prompt: "Summarize this for a second-grade student: ",
      })
      .then(({ data }) => {
        return new Promise((resolve, reject) => {
          resolve(data.choices.map((row) => row.text).join(" "));
        });
      });

    return openAiResponse;
  };
  const handleClickDescription = async (event) => {
    setDescription("Loading ...");
    const content = event?.target?.closest("span")?.parentNode?.innerText;
    setSpanId(event?.target?.closest("span")?.parentNode.id);
    /*// [MODIFIED-YH-2]
    const openAiResponse = await api
      .openAI_get_content({
        content: content,
      })
      .then(({ data }) => {
        setDescription(data);  
      });
    */
           
  //  const response = await sumDoc(content);// [COMMENTED-YH-2]
  //  setDescription(response);// [COMMENTED-YH-2]
  };

  return (
    <DashboardLayout>
      <div className="lg:pl-[270px] pl-0 pt-[90px]">
        {/* header */}
        <div className="text-[24px] text-[#212936] Eina03 font-bold flex">
          <a href="#"
            onClick={(e) => {
              e.preventDefault();
              handleBack();
            }}>
            <svg className="w-[20px] mr-[10px] mt-[-3px]" height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h48v48h-48z" fill="none" /><path d="M40 22h-24.34l11.17-11.17-2.83-2.83-16 16 16 16 2.83-2.83-11.17-11.17h24.34v-4z" />
            </svg></a>
          <div className="mr-[20px]">{project.name}</div>
          <Progress status={project.status} />
        </div>
        {/* end header */}

        <div className="flex" style={{ borderTop: '1px solid #d7d7d7e0' }}>
          <div className="grid grid-cols-3 grid-flow-col gap-4 mr-[10px] pt-[20px] pr-[10px]">
            <div className="col-span-2 bg-white p-[20px] rounded-[6px]">
              <FullViewDescription
                content={project?.summaryhtml}
                onClick={handleClickDescription}
                spanId={spanId}
              />
            </div>
            <div className="bg-white p-[20px] rounded-[6px]">
              <div className="text-[16px] text-[#8792A8] font-bold">Description</div>
              <div id="description">{description}</div>
            </div>
          </div>
          <div className="w-[100px] p-[20px]" style={{ borderLeft: '1px solid #d7d7d7e0' }}>
            <Sidebar />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
