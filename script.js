const videoElement = document.getElementById("video");
const startBtn = document.getElementById("btn-start");
const selectBtn = document.getElementById("btn-select");

async function selectMediaStream() {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
            videoElement.play();
        };
    } catch (e) {
        console.log(e);
    }
}

startBtn.addEventListener("click", async () => {
    if (!document.pictureInPictureElement) {
        try {
            //disable for awhile to avoid double request
            startBtn.disabled = true;
            //request picture in picture
            await videoElement.requestPictureInPicture();
            startBtn.disabled = false;
        } catch (e) {
            window.alert("Select Window first!");
        }
    } else {
        startBtn.disabled = true;
        await document.exitPictureInPicture();
        startBtn.disabled = false;
    }
});

selectBtn.addEventListener("click", selectMediaStream);
