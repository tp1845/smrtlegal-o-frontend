import * as api from '@/api'

export const setCookie = (name, value, exdays) => {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = name + "=" + c_value;
}

export const getCookie = (cookie, name) => {
    var i, x, y, ARRcookies = cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == name) {
            return unescape(y);
        }
    }
}

export const getAttrFromName = (name) => {
    const parts = name?.split(' ');
    if(parts){
        return parts.length >= 2 ? parts[0].charAt(0).toUpperCase() + " " + parts[1].charAt(0).toUpperCase() : name.charAt(0).toUpperCase()
    }else{
        return ''
    }
}


export const getRoleFromProjectBySlug = (project, role, roles = []) => {
    const members = project.team && project.team.members && project.team.members.length ? project.team.members : [];
    const targetRole = roles.find(row => row.slug == role) || {};
    const member = members.find(member => member.pivot.role_id == targetRole.id)
   
    return member ? (member.fname ? member.fname + ' ' + member.lname : member.email) : '-';
}

export const getRandomColor = () => {
    return Math.floor(Math.random()*16777215).toString(16);
}

export const getAbsolutePathToDocument = (path) => {
    path = path || ''
    return path ? api.getEndPoint() + '/' + path.replace('public', 'storage') : false
}