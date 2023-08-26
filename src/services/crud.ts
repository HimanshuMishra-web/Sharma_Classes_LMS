import {CrudRequest} from "@crud/core";
import {NODE_API_BASE_URL} from "../constants";
import {enqueueSnackbar} from "notistack";
export class CrudFactory extends CrudRequest {
    baseUrl = NODE_API_BASE_URL;
    getUrl = (...segments) =>
        segments.reduce((url, segment) => url + segment, this.baseUrl);

    async retrieve(url, data = {}, requestOptions = {}) {
        return this.send({
            method: "GET",
            url: `retrieve/${url}`,
            data,
            ...requestOptions,
        });
    }
    async post(url, data = {}, requestOptions = {}) {
        return this.send({
            method: "POST",
            url,
            data,
            ...requestOptions,
        });
    }
    async create(url, data = {}, requestOptions = {}) {
        return this.send({
            method: "POST",
            url: `create/${url}`,
            data,
            ...requestOptions,
        });
    }

    async update(url, data = {}, requestOptions = {}) {
        return this.send({
            method: "POST",
            url: `update/${url}`,
            data,
            ...requestOptions,
        });
    }

    async delete(url, data, requestOptions = {}) {
        return this.send({
            method: "POST",
            url: `delete/${url}`,
            data,
            ...requestOptions,
        });
    }

    notify({message,type}){
        enqueueSnackbar({
            message,
            variant:type
        })
    }

    async send(requestOptions = {}) {
        const {url, data, method, notify = true} = requestOptions;

        const options = {
            ...requestOptions.ajaxOptions,
            method,
        };

        let fullUrl;

        options.headers = {
            ...options.headers,
            Accept: "application/json",

        };
        if(localStorage.getItem("token")){
            options.headers.Authorization = localStorage.getItem("token");
        }

        if (!(data instanceof FormData)) {
            options.headers["Content-Type"] = "application/json";
        }

        fullUrl = this.getUrl(url);

        if (options.method === "GET") {
            const queryString = new URLSearchParams(data);
            fullUrl += `?${queryString}`;
        } else if (data instanceof FormData) {
            options.body = data;
        } else {
            options.body = JSON.stringify(data);
        }

        let res = {
            data: [],
            message: "",
            type: "error",
            errors: [],
        };

        try {
            this.call("loading", [true]);
            const response = await fetch(fullUrl, options);
            // if (response.status === 200 || response.status === 201) {
                res = await response.json();
                const {type, message} = res;
                if (options.method !== "GET" && notify) {
                    this.notify({
                        message,
                        type,
                    });
                }
            // } else {
            //     // noinspection ExceptionCaughtLocallyJS
            //     throw new Error(`${response.status} : ${response.statusText}`);
            // }
        } catch (e) {
            this.call("loading", [false]);
            // console.log(e);
            this.notify({
                message: e.message,
                type: "error",
            });
            throw e;
        } finally {
            this.call("loading", [false]);
        }

        const {type} = res;

        if (type === "error") throw res;
        return res;
    }
}

export const $crud = new CrudFactory();