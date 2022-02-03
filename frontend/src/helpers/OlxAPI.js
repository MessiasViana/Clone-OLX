import Cookies from "js-cookie";
import qs from "qs";

const BASEAPI = 'http://alunos.b7web.com.br:501';

const apiFetchPost = async (endpoint, body) => {
    if(!body.token) {
        let token = Cookies.get('token');
        if(token) {
            body.token = token;
        }
    }

    const res = await fetch(BASEAPI+endpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'appication/json'
        },
        body:JSON.stringify(body)
    });
    const json = await res.json();

    if(json.notallowed) {
        window.location.href = '/login';
        return
    }

    return json;
}

const apiFetchGet = async (endpoint, body) => {
    if(!body.token) {
        let token = Cookies.get('token')
        if(token) {
            body.token = token;
        }
    }

    const res = await fetch(`${BASEAPI+endpoint}?${qs.stringify(body)}`);
    const json = await res.json();

    if(json.notallowed) {
        window.location.href = '/login';
        return
    }

    return json;
}

const OlxAPI = {
    login:async (email, password) => {
        const json = await apiFetchPost(
            'user/login',
            {email, password}
        );
        return json;
    }
};

export default () => OlxAPI;