import { APIReview } from "@/types/APIReview";
import { API } from "@/utils/api";
import axios, { AxiosResponse } from "axios";

export async function getReviews(): Promise<AxiosResponse<APIReview[]>> {
    return axios.get(API.reviews());
}
