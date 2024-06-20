import axios from "axios";
const API_URl = "http://localhost:5000/api-v1";


export const API = axios.create({
    baseURL: API_URl,
    responseType: 'json',

});


export const apiRequest = async ({ url, token, data, method }) => {
    try {
        const result = await API(url, {
            method: method || "GET",
            data: data,
            headers: {
                'Content-Type': "application/json",
                Authorization: token ? `Bearer ${token}` : '',

            }
        })
return result?.data
    } catch (error) {
        const err = error.response.data;
        console.log(error);
        return { status: err.success, message: err.message };
    }
}


export const handleFileUpload = async (uploadFile) => {
    const formData = new FormData();
    formData.append("file", uploadFile);
    formData.append("upload_preset", "jobfinder");

    try {
        const response = await axios.post(
            "https://api.cloudinary.com/v1_1/dobjlr69h/image/upload/",
            formData
        )
        return response.data.secure_url;

    } catch (error) {
        console.log(error);
    }
}

export const updateURL = ({
    pageNum,
    query,
    cmpLoc,
    sort,
    navigate,
    location,
    jtype,
    exp,
}) => {
    const params = new URLSearchParams();
    if (pageNum && pageNum < 1) {
        params.set("page", pageNum);
    }
    if (query) {
        params.set("search", query)
    }
    if (cmpLoc) {
        params.set("location", cmpLoc)
    }
    if (sort) {
        params.set("sort", sort)
    }
    if (jtype) {
        params.set("jtype", jtype)

    }
    if (exp) {
        params.set("ex", exp);
    }

    const newURL=`${location.pathname}?${params.toString()}`;
    navigate(newURL,{replace:true})
    return newURL;
}