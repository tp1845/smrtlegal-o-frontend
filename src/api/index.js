"use clinet";

import { setCookie } from "@/utils/helpers";

// const API_ENDPOINT = "https://7139-83-234-227-11.ngrok-free.app";
const API_ENDPOINT = "http://localhost:8000";
const getToken = () => {
  return localStorage.getItem("token") ?? "";
};

const headers = {
  "content-type": "application/json",
  accept: "application/json",
};

const request = (...data) => {
  return fetch(...data).then((response) => {
    if (response.status == 401 && response.statusText == "Unauthorized") {
      setCookie("token", "");
      if (location.pathname != "/signin") {
        location.href = "/signin";
      }
    }
    return response;
  });
};

import Echo from "laravel-echo";
import Pusher from "pusher-js";

export function getEndPoint() {
  return API_ENDPOINT;
}

export function initPusher(user) {
  window.echoInstance = new Echo({
    broadcaster: "pusher",
    key: "35a2bae16f9fe596d52c",
    cluster: "mt1",
    forceTLS: true,
    authorizer: (channel, options) => {
      return {
        authorize: (socketId, callback) => {
          fetch(API_ENDPOINT + "/broadcasting/auth", {
            method: "POST",
            body: JSON.stringify({
              socket_id: socketId,
              channel_name: channel.name,
            }),
            headers: {
              ...headers,
              authorization: `Bearer ${getToken()}`,
            },
          })
            .then((response) => response.json())
            .then((response) => {
              callback(null, response);
            })
            .catch((error) => {
              console.error(error);
              callback(error);
            });
        },
      };
    },
  });
}

export function signup(data) {
  return request(API_ENDPOINT + "/api/auth/register", {
    method: "POST",
    body: JSON.stringify({
      ...data,
    }),
    headers,
  });
}

export function resend(data) {
  return request(API_ENDPOINT + "/api/auth/resend", {
    method: "POST",
    body: JSON.stringify({
      ...data,
    }),
    headers,
  });
}

export function signin(data) {
  return request(API_ENDPOINT + "/api/auth/login", {
    method: "POST",
    body: JSON.stringify({
      ...data,
    }),
    headers,
  });
}

export function me() {
  return request(API_ENDPOINT + "/api/auth/me", {
    method: "GET",
    headers: {
      ...headers,
      authorization: `Bearer ${getToken()}`,
    },
  });
}

export function forgot(data) {
  return request(API_ENDPOINT + "/api/auth/forgot", {
    method: "POST",
    body: JSON.stringify({
      ...data,
    }),
    headers,
  });
}

export function reset(data) {
  return request(API_ENDPOINT + "/api/auth/reset", {
    method: "POST",
    body: JSON.stringify({
      ...data,
    }),
    headers,
  });
}

export function reset_password(data) {
  return request(API_ENDPOINT + "/api/profile/password-reset", {
    method: "POST",
    body: JSON.stringify({
      ...data,
    }),
    headers: {
      ...headers,
      authorization: `Bearer ${getToken()}`,
    },
  });
}

export function googleauth() {
  return request(API_ENDPOINT + "/api/auth/google/redirect", {
    method: "GET",
    headers,
  });
}

export function update_profile(fd) {
  return request(API_ENDPOINT + "/api/profile", {
    method: "POST",
    body: fd,
    headers: {
      authorization: `Bearer ${getToken()}`,
      accept: "application/json",
    },
  });
}

export function get_profile_teams() {
  return request(API_ENDPOINT + "/api/profile/teams", {
    method: "GET",
    headers: {
      ...headers,
      authorization: `Bearer ${getToken()}`,
    },
  });
}

export function roles() {
  return request(API_ENDPOINT + "/api/roles", {
    method: "GET",
    headers: {
      ...headers,
      authorization: `Bearer ${getToken()}`,
    },
  });
}

export function get_settings() {
  return request(API_ENDPOINT + "/api/profile/settings", {
    method: "GET",
    headers: {
      ...headers,
      authorization: `Bearer ${getToken()}`,
    },
  });
}

export function update_settings(data) {
  return request(API_ENDPOINT + "/api/profile/settings", {
    method: "POST",
    body: JSON.stringify({
      ...data,
    }),
    headers: {
      ...headers,
      authorization: `Bearer ${getToken()}`,
    },
  });
}

export function get_categories() {
  return request(API_ENDPOINT + "/api/project/categories", {
    method: "GET",
    headers: {
      ...headers,
      authorization: `Bearer ${getToken()}`,
    },
  }).then((data) => data.json());
}

export function get_document_types() {
  return request(API_ENDPOINT + "/api/document/types", {
    method: "GET",
    headers: {
      ...headers,
      authorization: `Bearer ${getToken()}`,
    },
  }).then((data) => data.json());
}

export function get_document_count() {
  return request(API_ENDPOINT + "/api/document/getdocumentcount", {
    method: "GET",
    headers: {
      ...headers,
      authorization: `Bearer ${getToken()}`,
    },
  }).then((data) => data.json());
}

export function remove_member_from_team(data) {
  return request(API_ENDPOINT + "/api/team/" + data.team_id + "/member/remove", {
    method: "DELETE",
    body: JSON.stringify({
      ...data,
    }),
    headers: {
      ...headers,
      authorization: `Bearer ${getToken()}`,
    },
  });
}

export function update_role_on_team(data) {
  return request(API_ENDPOINT + "/api/team/" + data.team_id + "/member/update", {
    method: "PUT",
    body: JSON.stringify({
      ...data,
    }),
    headers: {
      ...headers,
      authorization: `Bearer ${getToken()}`,
    },
  });
}

export function add_member_to_team(data) {
  return request(API_ENDPOINT + "/api/team/" + data.team_id + "/member/add", {
    method: "POST",
    body: JSON.stringify({
      ...data,
    }),
    headers: {
      ...headers,
      authorization: `Bearer ${getToken()}`,
    },
  });
}

export function create_team(data) {
  return request(API_ENDPOINT + "/api/team", {
    method: "POST",
    body: JSON.stringify({
      ...data,
    }),
    headers: {
      ...headers,
      authorization: `Bearer ${getToken()}`,
    },
  });
}

export function get_notifications() {
  return request(API_ENDPOINT + "/api/profile/notifications", {
    method: "GET",
    headers: {
      ...headers,
      authorization: `Bearer ${getToken()}`,
    },
  }).then((data) => data.json());
}

export function accept_notification(notification) {
  return request(API_ENDPOINT + "/api/notification/" + notification.id + "/accept", {
    method: "POST",
    headers: {
      ...headers,
      authorization: `Bearer ${getToken()}`,
    },
  }).then((data) => data.json());
}

export function reject_notification(notification) {
  return request(API_ENDPOINT + "/api/notification/" + notification.id + "/reject", {
    method: "POST",
    headers: {
      ...headers,
      authorization: `Bearer ${getToken()}`,
    },
  }).then((data) => data.json());
}

export function mark_as_readed_notification(notification) {
  return request(API_ENDPOINT + "/api/notification/" + notification.id + "/read", {
    method: "POST",
    headers: {
      ...headers,
      authorization: `Bearer ${getToken()}`,
    },
  }).then((data) => data.json());
}

export function projects(params = {}) {
  const query = new URLSearchParams(params).toString();
  return request(API_ENDPOINT + "/api/profile/projects?" + query, {
    method: "GET",
    headers: {
      ...headers,
      authorization: `Bearer ${getToken()}`,
    },
  }).then((data) => data.json());
}

export function get_project(id) {
  return request(API_ENDPOINT + "/api/project/" + id, {
    method: "GET",
    headers: {
      ...headers,
      authorization: `Bearer ${getToken()}`,
    },
  }).then((data) => data.json());
}

export function request_to_change_role(data) {
  return request(API_ENDPOINT + "/api/project/" + data.project.value + "/member/" + data.user_id + "/role", {
    method: "PUT",
    body: JSON.stringify({
      role: data.role.value,
    }),
    headers: {
      ...headers,
      authorization: `Bearer ${getToken()}`,
    },
  }).then((data) => data.json());
}

export function create_project(fd) {
  return request(API_ENDPOINT + "/api/project", {
    method: "POST",
    body: fd,
    headers: {
      authorization: `Bearer ${getToken()}`,
      accept: "application/json",
    },
  }).then((data) => data.json());
}

export function get_project_notifications(id) {
  return request(API_ENDPOINT + "/api/project/" + id + "/notifications", {
    method: "GET",
    headers: {
      ...headers,
      authorization: `Bearer ${getToken()}`,
    },
  }).then((data) => data.json());
}

export function get_archived_projects(params) {
  const query = new URLSearchParams(params).toString();
  return request(API_ENDPOINT + "/api/project/archived?" + query, {
    method: "GET",
    headers: {
      ...headers,
      authorization: `Bearer ${getToken()}`,
    },
  }).then((data) => data.json());
}

export function search_document_property(params) {
  const query = new URLSearchParams(params).toString();
  return request(API_ENDPOINT + "/api/document/search/propery?" + query, {
    method: "GET",
    headers: {
      ...headers,
      authorization: `Bearer ${getToken()}`,
    },
  }).then((data) => data.json());
}

export function select_document_property(params) {
  const query = new URLSearchParams(params).toString();
  return request(API_ENDPOINT + "/api/document/select/propery?" + query, {
    method: "GET",
    headers: {
      ...headers,
      authorization: `Bearer ${getToken()}`,
    },
  }).then((data) => data.json());
}

export function statistics() {
  return request(API_ENDPOINT + "/api/statistics", {
    method: "GET",
    headers: {
      ...headers,
      authorization: `Bearer ${getToken()}`,
    },
  }).then((data) => data.json());
}

export function convert_file_to_html(data) {
  return request(API_ENDPOINT + "/api/document/convert-to-html", {
    method: "POST",
    headers: {
      authorization: `Bearer ${getToken()}`,
      accept: "application/json",
    },
    body: data,
  }).then((data) => data.json());
}

export function openAI_summarize_document(data) {
  return request(API_ENDPOINT + "/api/openai/create-req", {
    method: "POST",
    headers: {
      authorization: `Bearer ${getToken()}`,
      accept: "application/json",
    },
    body: JSON.stringify(data),
  }).then((data) => data.json());
}

export function openAI_get_content(data) {
  return request(API_ENDPOINT + "/api/openai/get-response", {
    method: "POST",
    headers: {
      authorization: `Bearer ${getToken()}`,
      accept: "application/json",
    },
    body: JSON.stringify(data),
  }).then((data) => data.json());
}

export function send_email() {
  fetch('https://wirth-hats.onrender.com/api/SMTP/sendEmail', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          email: 'jfallhowe@gmail.com',
          html: `<div style="width: 400px; margin: auto; font-family: sans-serif; color: #737373;">
      <img src="https://i.ibb.co/2FsFjj6/logo.png">
      <div>Just a quick reminder that you have a project due soon. Here are the details:</div>
      <ul style="font-size: 16px; line-height: 24px;">
          <li class="padding-bottom: 10px;"><b>Due Date:</b> January 1, 2023</li>
          <li class="padding-bottom: 10px;"><b>Project Name:</b> First NDA.</li>
          <li class="padding-bottom: 10px;"><b>Team:</b> SMVRT team</li>
          <li class="padding-bottom: 10px;"><b>Document Type:</b> NDA</li>
      </ul>
      <a style="display: block; margin-top: 10px; width: 100%; height: 36px; gap: 16px; border-radius: 6px; border: 1px solid #737373; color: #000; text-decoration: none; padding-top: 14px;
      text-align: center; background-color: transparent;" href="http://135.181.185.159:3000/active-projects/95/">View Project</a>
    </div>`
      }) // Replace with your JSON payload
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
}

export function update_project_status(data) {
  return request(API_ENDPOINT + "/api/project/"+data.id+"/update", {
    method: "GET",
    headers: {
      authorization: `Bearer ${getToken()}`,
      accept: "application/json",
    },
    // body: JSON.stringify(data),
  }).then((data) => console.log(data));
}