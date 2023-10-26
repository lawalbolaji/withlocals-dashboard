import { http, HttpResponse } from "msw";
import * as hosts from "../../data/hosts.json";

export const hostsMockHandler = http.get("https://www.withlocals.com/api/v1/hosts/search", () => {
    return HttpResponse.json(hosts);
});
