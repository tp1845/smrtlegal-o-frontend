"use client";

import DashboardLayout from "@/layouts/dashboard";
import Card from "@/components/card";
import Stepper from "@/components/stepper";
import { useEffect, useState } from "react";
import Button from "@/components/button";
import searchsvg from "@/assets/search.svg";

import NewProjectContext from "@/context/new-project";
import { useRouter, usePathname } from "next/navigation";
import { message } from "antd";
import * as api from "@/api";

import ServerError from "@/popups/server-error";
import ServerSuccess from "@/popups/server-success";


export default function NewProjectLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [steps, setSteps] = useState([
    {
      label: "Add project details",
      slug: "",
    },
    {
      label: "Upload Document",
      slug: "step-3",
    },
    {
      label: "Edit Document",
      slug: "edit-document",
    },
  ]);

  const [popup, setPopup] = useState({
    server_error: {
      visible: false,
      message: "",
    },
    server_success: {
      title: "Success",
      visible: false,
      message: "",
    },
  });

  const [docCount, setDocCount] = useState(-1);

  const [project, setProject] = useState({
    name: "",
    leads: {},
    user: {},
    notes: "",
    duedate: "",
    reminderdate: "",
    content: "",
    ai_summary: "",
    team: "",
    members: [],
    external_collaborators: [],
    signatories: [],
    documentname: "",
    document: null,
    docContent: null,
    type: "",
    category: "",
    approvers: [],
    final_approver: {
      label: "Not selected",
      value: null,
    },
    save_for_future: false,
  });

  const [activeStep, setActiveStep] = useState("");

  const [aiSummaryData, setAiSummaryData] = useState([]);

  const onChangeActiveStep = (step) => {
    setActiveStep(step.slug);
    router.push("/new-project/" + step.slug);
  };

  const handlePrev = () => {
    const currentIndex = steps.findIndex((item) => item.slug == activeStep);
    if(currentIndex > 0){
      const targetStep = steps[currentIndex - 1];
      onChangeActiveStep(targetStep);
    }    
  };

  const handleNext = () => {
    let status = true;
    if (status) {
      if(activeStep == steps[0].slug){
        setActiveStep(steps[1].slug);
        router.push("/new-project/"+steps[1].slug);
      }else if (activeStep == steps[1].slug){
        setActiveStep(steps[2].slug);
        router.push("/new-project/"+steps[2].slug);
      }else if(activeStep == steps[2].slug){
        handleCreateProject();
      }
    }
  };

  const isCanPrev = () => {
    if (activeStep == steps[0].slug) {
      return false;
    }
    return true;
  };

  const isCanNext = () => {
    if (activeStep == steps[0].slug){
      if (!project.name || !project.duedate) {
        return false;
      }
    } else if (activeStep == steps[1].slug){
      if (!project.documentname/* || !project.type || !project.category*/) {
        return false;
      }
    } else if(activeStep == steps[2].slug){

    }
    return true;
  };

  const analyzingMessage = "Simplifying legal docs with AI magic! Just a sec...almost done!";
  const handleCreateProject = async () => {
    message.open({
      key: "analyzing",
      type: "loading",
      content: analyzingMessage,
      duration: 0,
    });

    let promise = new Promise(async (resolve, reject) => {
      const fd = new FormData();
      fd.append("document", project.document);
      fd.append("documentname", project.documentname);
      fd.append("docContent", project.docContent);
      fd.append('summaryhtml', project.docContent);

      for (let key in project) {
        fd.append(key, project[key]);
      }

      fd.set("final_approver", JSON.stringify(project.final_approver));
      if (project.team) {
        fd.set("team", JSON.stringify(project.team));
      }

      project.approvers.forEach((member) => {
        fd.append("approvers[]", JSON.stringify(member));
      });

      project.members.forEach((member) => {
        fd.append("members[]", JSON.stringify(member));
      });

      project.external_collaborators.forEach((member) => {
        fd.append("external_collaborators[]", JSON.stringify(member));
      });

      project.signatories.forEach((member) => {
        fd.append("signatories[]", JSON.stringify(member));
      });

      fd.set("leads", JSON.stringify(project.leads));

      fd.set("save_for_future", project.save_for_future ? 1 : 0);

      api.create_project(fd).then((data) => {
        const errors = data.errors ? Object.values(data.errors) : [];
        if (errors.length || data.exception) {
          const message = Object.values(errors).flat(1).join(" ") || data.message;
          setPopup({
            ...popup,
            server_error: {
              visible: true,
              message,
            },
          });
          reject('done');
        }
        resolve('done');
      });
    });

    await promise.then(() => {
      message.destroy("analyzing");
      router.push("/active-projects"); // [COMMENTED-YH-0]
      message.open({
        type: 'success',
        content: (
          <span dangerouslySetInnerHTML={{ __html: `Your document is ready! <a style="color: #4096ff;" href="/active-projects">Click here</a> to view.` }} />
        ),
        duration: 30 * 1000,
      });
    });
  };
  
  const fetchData = async () => {
    try {
      const { data } = await api.get_document_count();
      setDocCount(data);
    } catch (error) {
      // Handle any errors here
    }
  };

  useEffect(() => {
    fetchData();
    const segments = location.pathname.split("/");
    segments.pop();
    const step = segments.pop();
    if (["new-project"].includes(step)) {
      setActiveStep("");
    }
    if (["step-3", "edit-document"].includes(step)) {
      setActiveStep(step);
    }
  }, []);

  useEffect(() => {

  }, [pathname])

  return (
    <DashboardLayout>
      <div className="lg:pl-[270px] pl-0 pt-[116px] pr-[15px] relative pb-[100px]"> {/*pt-[150px] => pt-[116px]// [COMMENTED-YH-1]*/}
        <Card className={`px-[36px] lg:max-w-[1128px] md:w-full mx-auto`}> {/*${final ? 'w-[100%]' : 'max-w-[800px]'} => // [COMMENTED-YH-1]*/}
          <Stepper steps={steps} active={activeStep} onChange={onChangeActiveStep} />

          <NewProjectContext.Provider value={{ project, docCount, setProject, handleNext }}>
            {children}
          </NewProjectContext.Provider>
        </Card>
        <div className="fixed bottom-0 z-[2] left-0 right-0 border-t p-[15px] bg-[#fff] lg:pl-[270px] pl-0 ">
          <div className={`mx-auto max-w-[1128px] flex items-center justify-between`}>
            <Button
              {...{ disabled: !isCanPrev() }}
              onClick={handlePrev}
              icon={searchsvg}
              label="Previous"
              className="border border-[#1860CC] !text-[#1860CC] font-bold !w-auto text-[14px] px-[20px]"
            />
            <Button
              {...{ disabled: !isCanNext() }}
              onClick={handleNext}
              label={(activeStep==steps[2].slug)?"Save & Start Project":"Save and Continue"}
              className="bg-[#1860CC] !text-white font-bold !w-auto text-[14px] px-[20px]"
            />
          </div>
        </div>

        <ServerError
          open={popup.server_error.visible}
          title="Error"
          message={popup.server_error.message}
          onClose={() => {
            setPopup({ ...popup, server_error: { visible: false } });
          }}
        />

        <ServerSuccess
          open={popup.server_success.visible}
          title={popup.server_success.title}
          message={popup.server_success.message}
          onClose={() => {
            setPopup({ ...popup, server_success: { visible: false } });
          }}
        />
      </div>
    </DashboardLayout>
  );
}
