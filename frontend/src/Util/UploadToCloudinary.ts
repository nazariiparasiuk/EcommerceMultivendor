export const uploadToCloudinary = async (pics:any) => {
    const cloud_name = "dplfrp3ye"
    const upload_preset = "first_preset"

    if(pics) {
        const data = new FormData()
        data.append("file", pics)
        data.append("upload_preset", upload_preset)
        data.append("cloud_name", cloud_name)
        
        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
            method: "post",
            body: data
        })

        const fileData = await res.json()
        return fileData.url;
    } else {
        console.log("error: image not found")
    }
}