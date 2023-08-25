"use client";
import Button from "@/components/button";
import Card from "@/components/card";
import DescriptionBox from "@/components/description-box";
import SmallTabs from "@/components/small-tabs";
import { useEffect, useState } from "react";
import sharesvg from "@/assets/share.svg";
import invitesvg from "@/assets/invite.svg";
import SharePopUp from "@/popups/share";
import InvitePopUp from "@/popups/invite";
import { useProject } from "@/context/project";
import Prompt from "@/popups/prompt";
import ServerSuccess from "@/popups/server-success";
import Highlighter from "react-highlight-words";
import FullViewDescription from "@/components/full-view";
import SummaryViewDescription from "@/components/summary-view";
import * as api from "@/api";

export default function FullView() {
  const { project, roles, setProject } = useProject();

  const [tabs, setTabs] = useState([
    {
      label: "Full view",
      slug: "full-view",
    },
    {
      label: "Summary",
      slug: "summary",
    },
  ]);

  const [share, setShare] = useState({});

  const [activeTab, setActiveTab] = useState(tabs[0]);

  const [description, setDescription] = useState("");

  const [spanId, setSpanId] = useState("");

  const [popup, setPopUp] = useState({
    share: false,
    invite: false,
    confirm: false,
    success: {
      visible: false,
      message: "",
    },
  });

  const handleClickShare = () => {
    setPopUp({
      ...popup,
      share: true,
    });
  };

  const handleClickInvite = () => {
    setPopUp({
      ...popup,
      invite: true,
    });
  };

  const handleShare = (shareForm) => {
    setShare(shareForm);
    setPopUp({
      ...popup,
      confirm: true,
    });
  };

  const handleConfirm = () => {
    setPopUp({
      ...popup,
      confirm: false,
      success: {
        visible: true,
        message:
          "You have successfully shared this project  to external collaborator(s).",
      },
    });
  };

  const sumDoc = async (content) => {
    const openAiResponse = await api
      .openAI_summarize_document({
        content: content,
        max_tokens: "80",
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
    const response = await sumDoc(content);

    setDescription(response);
  };

  return (
    <div className="relative grid grid-cols-[1fr_400px] gap-2 items-center mb-6">
      <div className="grid grid-cols-[1fr_1fr] gap-3 absolute right-0 top-[-70px]">
        <Button
          label="Share"
          className="bg-[#F0F6FF] !text-[#1860CC]  border px-[16px] !py-[8px] border-[#1860CC] rounded text-[14px]"
          icon={sharesvg}
          onClick={handleClickShare}
        />
        <Button
          label="Invite"
          className="bg-[#F0F6FF] !text-[#1860CC] border px-[16px] !py-[8px] border-[#1860CC] rounded text-[14px]"
          icon={invitesvg}
          onClick={handleClickInvite}
        />
      </div>
      <Card>
        <SmallTabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
        {["summary"].includes(activeTab.slug) ? (
          <div className="max-h-[500px] overflow-y-auto text-[14px] pt-4 mt-2 full-view-desc">
            <SummaryViewDescription content={project?.summaryhtml} />
          </div>
        ) : (
          <div className="max-h-[500px] overflow-y-auto text-[14px] pt-4 mt-2 full-view-desc">
            <FullViewDescription
              content={project?.document?.content}
              onClick={handleClickDescription}
              spanId={spanId}
            />
          </div>
        )}
      </Card>
      <div>
        <DescriptionBox description={description} />
      </div>
      <SharePopUp
        open={popup.share}
        roles={roles}
        project={project}
        onClose={() => setPopUp({ ...popup, share: false })}
        onShare={(data) => handleShare(data)}
      />
      <InvitePopUp
        open={popup.invite}
        roles={roles}
        project={project}
        onClose={() => setPopUp({ ...popup, invite: false })}
        onInvite={() =>
          setPopUp({
            ...popup,
            invite: false,
            success: {
              visible: true,
              message:
                "You have successfully invited external collaborator(s) to this project.",
            },
          })
        }
      />
      <Prompt
        open={popup.confirm}
        title="Share project"
        message={`You are about to share the project to ${share.email}, 
                    are you sure you’d like to proceed?`}
        onConfirm={handleConfirm}
        onClose={() => setPopUp({ ...popup, confirm: false })}
      />
      <ServerSuccess
        open={popup.success.visible}
        title="All good!"
        message={popup.success.message}
        onClose={() =>
          setPopUp({
            ...popup,
            success: { ...popup.success, visible: false },
            share: false,
          })
        }
      />
    </div>
  );
}
