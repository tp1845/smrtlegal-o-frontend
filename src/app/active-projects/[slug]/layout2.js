"use client";

import DashboardLayout from "@/layouts/dashboard";
import Card from "@/components/card";
import Stepper from "@/components/stepper";
import { useEffect, useState } from "react";
import ProjectDetailsHeader from "@/components/project-details-header";
import Tabs from "@/components/tabs";
import ProjectContext from "@/context/project";
import * as api from "@/api";
import { useRouter } from "next/navigation";
import moment from "moment";
import { getRoleFromProjectBySlug } from "@/utils/helpers";

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
        doctype: data.document.type,
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

  return (
    <DashboardLayout>
      <div className="lg:pl-[270px] pl-0 pt-[90px] pr-[15px]">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleBack();
          }}
          className="flex text-[12px] items-center mb-3 font-bold"
        >
          <svg
            className="mr-2"
            width="14"
            height="10"
            viewBox="0 0 14 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.5 5H0.5"
              stroke="#222222"
              strokeWidth="1.71429"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 1.5L0.5 5L4 8.5"
              stroke="#222222"
              strokeWidth="1.71429"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to list
        </a>
        <ProjectDetailsHeader
          project={project}
          steps={steps}
          activeStep={activeStep}
          roles={roles}
        />
        <ProjectContext.Provider value={{ project, roles, setProject }}>
          <Tabs
            tabs={tabs}
            active={activeTab}
            className="mb-8"
            change={handleChangeTab}
          />
          {children}
        </ProjectContext.Provider>
      </div>
    </DashboardLayout>
  );
}
