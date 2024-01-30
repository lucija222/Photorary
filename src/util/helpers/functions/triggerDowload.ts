export const dowloadAndCleanup = (imgObjUrl: string, filename: string) => {

    const body = document.querySelector("body");   
    const temporaryAnchor = document.createElement("a");
    temporaryAnchor.href = imgObjUrl;
    temporaryAnchor.style.display = "none";
    temporaryAnchor.setAttribute("download", `${filename}.jpg`);
    body?.appendChild(temporaryAnchor);

    temporaryAnchor.click();

    setTimeout(() => {
        body?.removeChild(temporaryAnchor);
        URL.revokeObjectURL(imgObjUrl);
    }, 500);
};