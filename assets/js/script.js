function addMilestone() {
    let milestoneInput = document.getElementById("milestoneInput");
    let startYearInput = document.getElementById("startYear");
    let endYearInput = document.getElementById("endYear");
    let categorySelect = document.getElementById("categorySelect");

    let milestoneText = milestoneInput.value.trim();
    let startYear = startYearInput.value.trim();
    let endYear = endYearInput.value.trim();
    let category = categorySelect.value.trim();
    
    if (!milestoneText || !startYear || !endYear || !category) {
        alert("Silakan masukkan milestone, tahun mulai, tahun selesai, dan kategori!");
        return;
    }

    let listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between align-items-center";
    listItem.textContent = `${milestoneText} (${startYear} - ${endYear}) - ${category}`;

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Hapus";
    deleteButton.className = "btn btn-danger btn-sm";
    deleteButton.onclick = function() {
        listItem.remove();
        saveMilestones();
    };

    listItem.appendChild(deleteButton);
    document.getElementById("milestoneList").appendChild(listItem);

    milestoneInput.value = "";
    startYearInput.value = "";
    endYearInput.value = "";
    categorySelect.selectedIndex = 0;

    saveMilestones();
}

function saveMilestones() {
    let milestones = [];
    document.querySelectorAll("#milestoneList li").forEach(item => {
        let text = item.firstChild.textContent.trim();
        let lastDashIndex = text.lastIndexOf(" - ");
        let category = text.substring(lastDashIndex + 3).trim();
        let yearsPart = text.substring(text.indexOf("(") + 1, lastDashIndex).trim();
        let [startYear, endYear] = yearsPart.split(" - ");

        milestones.push({ milestoneText: text, startYear, endYear, category });
    });

    localStorage.setItem("milestones", JSON.stringify(milestones));
    alert("Milestones berhasil disimpan!");
}

function downloadAsPDF() {
    let milestones = JSON.parse(localStorage.getItem("milestones")) || [];
    let { jsPDF } = window.jspdf;
    let doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.text("Milestones:\n\n", 10, 10);

    let y = 20;
    milestones.forEach(milestone => {
        let milestoneText = `${milestone.milestoneText} (${milestone.startYear} - ${milestone.endYear}) - ${milestone.category}`;
        doc.text(milestoneText, 10, y);
        y += 10;
    });

    doc.save("milestones.pdf");
}