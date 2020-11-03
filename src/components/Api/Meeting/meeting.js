import api from '../../../lib/api';
async function PostMeeting(body){
    const serverUrl = `http://localhost:3000/api/meetings`;
    const response = await fetch(serverUrl, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    if (response.ok){
        return response.json();
    }
    else {
        return false
    }
}

async function GetMeetings(contactId) {
    const response = api.get(`/api/meetings/${contactId}`);
    return response;
}

/*async function GetMeetings(contactId) {
    const serverUrl = `http://localhost:3000/api/meetings/${contactId}`;
    const response = await fetch(serverUrl, {
        method: "GET"
    });
    const data = response.json();
    return data;
}*/

const GetMultiContactsMeetings = (contacts) => {
    const response = api.get(`/api/meetings/contacts/${contacts}`);
    return response;
}


async function UpdateMeeting(meetingId, body) {
    const serverUrl = `http://localhost:3000/api/meetings/${meetingId}`;
    console.log(body);
    const response = await fetch(serverUrl, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const data = response.json();
    return data;
}

async function DeleteMeetingLog(meetingId) {
    const serverUrl = `http://localhost:3000/api/meetings/${meetingId}`;
    const response = await fetch(serverUrl, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if(response.ok){
        return true;
    }
    else {
        return false;
    }
}

async function UpdateContacts(contactId,meetingId){
    const serverUrl = `http://localhost:3000/api/meetings/${meetingId}/contacts/${contactId}`;
    const response = await fetch(serverUrl, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const data = response.json();
    return data;
}

async function RemoveContacts(contactId,meetingId){
    const serverUrl = `http://localhost:3000/api/meetings/${meetingId}/contacts/${contactId}`;
    const response = await fetch(serverUrl, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const data = response.json();
    return data;
}

export {GetMeetings,UpdateMeeting,PostMeeting,DeleteMeetingLog,UpdateContacts,RemoveContacts,GetMultiContactsMeetings};