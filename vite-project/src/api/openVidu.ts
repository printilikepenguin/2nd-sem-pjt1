import { liveAxios } from "./http";
import { broadcastInfo } from "../types/DataTypes";

const http = liveAxios();

const url = "/live/broadcast";

async function getLiveStartToken(data: {
    accessToken: string;
    liveBroadcastId: number;
}): Promise<string> {
    const res = await http.post(url + `/start`, data);
    return res.data.data.token;
}

async function getLiveJoinToken(data: { liveBroadcastId: number }) {
    const res = await http.post(url + `/participation`, data);
    return res.data.data.token;
}

async function stopLive(data: {
    accessToken: string;
    liveBroadcastId: number;
}) {
    return http.post(url + `/stop`, data);
}

// 라이브 예약하기 함수
async function reserveLive(broadcastInfo: broadcastInfo) {
    try {
        const response = await http.post(url + `/reservation`, broadcastInfo);
        const responseData = response.data;
        return responseData;
    } catch (error) {
        console.log("라이브 예약 실패");
        throw error;
    }
}

// 예약된 라이브 조회
async function getLivePlanAPI(params: {
    page: number;
    size: number;
}, accessToken: string) {
    const response = await http.get(`${url}/reservation`, {
        params: params,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken
        }
    });
    return response.data.data;
}

// 라이브 상세 조회
async function getLiveDetailAPI(params: {broadcastId: number}, accessToken: string) {
    const response = await http.get(`${url}/info`, {
        params: params,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken
        }
    });
    return response.data.data;
}

// 예약된 라이브 삭제
async function deleteLivePlanAPI(params: {broadcastId: number}, accessToken: string) {
    await http.delete(`${url}/reservation`, {
        params: params,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken
        }
    });
}

// 예약된 라이브 수정
async function editLivePlanAPI(data: {broadcastId: number, broadcastInfo: broadcastInfo}, accessToken: string) {
    await http.put(`${url}/reservation`, data, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken
        }
    });
}

// 종료된 라이브 방송목록 조회
async function getEndedLiveAPI(params: {page: number, size: number}, accessToken: string) {
    const response = await http.get(`${url}/stop`, {
        params: params,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken
        }
    });
    return response.data.broadcastInfoList;
}


// async function createSessionDeprecated(sessionId: string): Promise<string> {
//     try {
//         const options = {
//             url: OPENVIDU_SERVER_URL + "api/sessions",
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: "Basic T1BFTlZJRFVBUFA6c3NhZnk",
//             },
//         };
//         if (type === "broadcast") {
//             Object.assign(options, {
//                 data: { customSessionId: sessionId },
//             });
//         } else {
//             options.method = "GET";
//             options.url += "/" + sessionId;
//         }
//         const response: AxiosResponse = await axios(options);
//         return (response.data as { id: string }).id; // The sessionId
//     } catch (error) {
//         console.log("createSession error");
//         return Promise.reject(error);
//     }
// }
// async function createTokenDeprecated(sessionId: string): Promise<string> {
//     try {
//         const response: AxiosResponse = await axios.post(
//             OPENVIDU_SERVER_URL +
//                 "api/sessions/" +
//                 sessionId +
//                 "/connection",
//             {},
//             {
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: "Basic T1BFTlZJRFVBUFA6c3NhZnk",
//                 },
//             }
//         );
//         return (response.data as { token: string }).token; // The token
//     } catch (error) {
//         console.log("createToken error");
//         return Promise.reject(error);
//     }
// }
// const getTokenDeprecated = async (): Promise<string> => {
//     try {
//         if (session === null) throw new Error("No active session");
//         const sessionIds = await createSessionDeprecated(mySessionId);
//         console.log("getToken sessionIds :");
//         // console.log(sessionIds);
//         const token = await createTokenDeprecated(sessionIds);
//         console.log("getToken token :");
//         // console.log(token);
//         return token;
//     } catch (error) {
//         return Promise.reject(error);
//     }
// };

export { getLiveStartToken, getLiveJoinToken, stopLive, reserveLive, getLivePlanAPI, getLiveDetailAPI, deleteLivePlanAPI, editLivePlanAPI, getEndedLiveAPI };
