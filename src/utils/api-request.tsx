import DefaultModal from "@/components/modal/default-modal";
import { AuthToken, onLogout } from "@/store/auth";
import axios from "axios";

axios.defaults.baseURL = (import.meta as any).env.VITE_API_URL;

const token = AuthToken();

export const ApiRequest = async <T = any>({
  endpoint,
  method,
  payload,
}: {
  endpoint: string;
  method: "GET" | "POST";
  payload?: any;
}): Promise<T> => {
  try {

    let headers : any = {
        'Content-Type': 'application/json',
        accept: "*/*",
      };

    token && (headers['Authorization'] = `Bearer ${token}`);

    const { data } = await axios({
      method,
      url: endpoint,
      data: payload ? JSON.stringify(payload) : undefined,
      headers,
    });

    return data; // Return only the response data
  } catch (error: any) {
    if (error.response?.status === 401) {
      // Handle unauthorized logout
      onLogout();
      //document.getElementById('unauthorized_layout')?.classList.remove('hidden');
      return error.response?.data || "An error occurred";
    }
    return error.response?.data || "An error occurred";
  }
};

export const DownloadApiRequest = async ({endpoint} : {endpoint: string}) => {
  let headers : any = {}
  token && (headers['Authorization'] = `Bearer ${token}`);
  const response = await axios.post(
      endpoint,
      {}, // Empty body, or add data if required
      {
        responseType: 'blob', // Important for file download
        headers
      }
    );

    /// Extract filename from Content-Disposition header
    const disposition = response.headers['content-disposition'];
    let filename = 'file.pdf';

    if (disposition && disposition.includes('filename=')) {
      const match = disposition.match(/filename="?([^"]+)"?/);
      if (match && match[1]) {
        filename = match[1];
      }
    }

    // Trigger download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
}