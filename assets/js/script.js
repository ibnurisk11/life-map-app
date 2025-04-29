function addMilestone() {
    let milestoneInput = document.getElementById("milestoneInput");
    let startYearInput = document.getElementById("startYear");
    let endYearInput = document.getElementById("endYear");

    let milestoneText = milestoneInput.value.trim();
    let startYear = startYearInput.value.trim();
    let endYear = endYearInput.value.trim();
    
    if (milestoneText === "" || startYear === "" || endYear === "") {
        alert("Silakan masukkan milestone, tahun mulai, dan tahun selesai!");
        return;
    }

    let listItem = document.createElement("li");
    listItem.textContent = `${milestoneText} (${startYear} - ${endYear})`;

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Hapus";
    deleteButton.onclick = function() {
        listItem.remove();
    };

    listItem.appendChild(deleteButton);
    document.getElementById("milestoneList").appendChild(listItem);

    milestoneInput.value = "";
    startYearInput.value = "";
    endYearInput.value = "";
}