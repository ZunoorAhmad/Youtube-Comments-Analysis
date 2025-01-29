document.addEventListener("DOMContentLoaded", function () {
    function updateDateTime() {
        const now = new Date();
        const formattedDate = now.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
        const formattedTime = now.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });
        document.getElementById("dateTime").innerText = `${formattedDate} | ${formattedTime}`;
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);
});
