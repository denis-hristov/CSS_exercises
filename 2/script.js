var AppletViewsTable = (function () {
    let data = [];

    function init(json) {
        data = json?.AppletView || [];

        if (!Array.isArray(data) || data.length === 0) {
            document.getElementById("applet-views-table").innerText = "No records to display.";
            return;
        }

        renderTable();
    }

    function renderTable() {
        const container = document.getElementById("applet-views-table");
        container.innerHTML = ""; // Clear previous content

        // Header
        const headers = ["UUID", "Version UUID", "Fields"];
        headers.forEach(text => {
            const div = document.createElement("div");
            div.className = "grid-header";
            div.innerText = text;
            container.appendChild(div);
        });

        // Data rows
        data.forEach(item => {
            const uuidDiv = document.createElement("div");
            uuidDiv.className = "grid-cell";
            uuidDiv.innerText = item.uuid;

            const versionUuidDiv = document.createElement("div");
            versionUuidDiv.className = "grid-cell";
            versionUuidDiv.innerText = item.versionuuid;

            const fieldsDiv = document.createElement("div");
            fieldsDiv.className = "grid-cell";
            fieldsDiv.innerText = JSON.stringify(item.fields, null, 2);

            container.appendChild(uuidDiv);
            container.appendChild(versionUuidDiv);
            container.appendChild(fieldsDiv);
        });
    }

    return {
        init
    };
})();
