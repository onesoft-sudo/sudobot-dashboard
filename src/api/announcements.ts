import { API } from "@/utils/api";
import axios from "axios";

export function getAnnouncements() {
    return axios.get(API.announcements());
}
