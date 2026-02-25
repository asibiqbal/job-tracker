let total = document.getElementById("total");
let interview = document.getElementById("interview");
let rejected = document.getElementById("rejected");
let availableJobs = document.getElementById("available-jobs");
let interviewList = [];
let rejectedList = [];
const cardItems = document.getElementById("card");
const getMain = document.querySelector("main");
const interviewSection = document.getElementById("interview-section");
const rejectedSection = document.getElementById("rejected-section");
const allBtn = document.getElementById("all-btn");
const interviewBtn = document.getElementById("interview-btn");
const rejectedBtn = document.getElementById("rejected-btn");


function getCount() {
  const totalCount = cardItems.children.length;
  total.innerText = totalCount;

  if (!interviewSection.classList.contains("hidden")) {
    availableJobs.innerText =
      interviewList.length + " of " + totalCount + " Jobs";
  } else if (!rejectedSection.classList.contains("hidden")) {
    availableJobs.innerText =
      rejectedList.length + " of " + totalCount + " Jobs";
  } else {
    availableJobs.innerText = totalCount + " Jobs";
  }

  interview.innerText = interviewList.length;
  rejected.innerText = rejectedList.length;
}

getCount();


function toggleStyle(id) {
  allBtn.classList.remove("bg-[#3B82F6]", "text-white");
  interviewBtn.classList.remove("bg-[#3B82F6]", "text-white");
  rejectedBtn.classList.remove("bg-[#3B82F6]", "text-white");

  allBtn.classList.add("bg-white", "text-[#64748B]");
  interviewBtn.classList.add("bg-white", "text-[#64748B]");
  rejectedBtn.classList.add("bg-white", "text-[#64748B]");

  const getSelected = document.getElementById(id);
  getSelected.classList.remove("bg-white", "text-[#64748B]");
  getSelected.classList.add("bg-[#3B82F6]", "text-white");

  if (id == "interview-btn") {
    cardItems.classList.add("hidden");
    rejectedSection.classList.add("hidden");
    interviewSection.classList.remove("hidden");
    renderInterview();
  } else if (id == "rejected-btn") {
    cardItems.classList.add("hidden");
    interviewSection.classList.add("hidden");
    rejectedSection.classList.remove("hidden");
    renderRejected();
  } else if (id == "all-btn") {
    cardItems.classList.remove("hidden");
    interviewSection.classList.add("hidden");
    rejectedSection.classList.add("hidden");
  }

  getCount();
}

getMain.addEventListener("click", function (event) {
  if (event.target.classList.contains("int-btn")) {
    const card = event.target.closest(".bg-white");
    const intBtn = card.querySelector(".int-btn");
    const rejBtn = card.querySelector(".reject-btn");

    intBtn.disabled = true;
    rejBtn.disabled = true;
    intBtn.classList.add("opacity-50", "cursor-not-allowed");
    rejBtn.classList.add("opacity-50", "cursor-not-allowed");
    const jobDescription = card.querySelector(".job-description").innerText;

    if (!interviewList.some((item) => item.jobDescription === jobDescription)) {
      const cardDetails = {
        jobDescription,
        jobTitle: card.querySelector(".job-title").innerText,
        jobQueries: card.querySelector(".job-queries").innerText,
        jobApply: "Interview",
        jobDetails: card.querySelector(".job-details").innerText,
      };
      interviewList.push(cardDetails);
      card.querySelector(".job-apply").innerText = "Interview";
    }
    getCount();
  } else if (event.target.classList.contains("reject-btn")) {
    const card = event.target.closest(".bg-white");
    const jobDescription = card.querySelector(".job-description").innerText;
    const intBtn = card.querySelector(".int-btn");
    const rejBtn = card.querySelector(".reject-btn");

    intBtn.disabled = true;
    rejBtn.disabled = true;
    intBtn.classList.add("opacity-50", "cursor-not-allowed");
    rejBtn.classList.add("opacity-50", "cursor-not-allowed");
    if (!rejectedList.some((item) => item.jobDescription === jobDescription)) {
      const cardDetails = {
        jobDescription,
        jobTitle: card.querySelector(".job-title").innerText,
        jobQueries: card.querySelector(".job-queries").innerText,
        jobApply: "Rejected",
        jobDetails: card.querySelector(".job-details").innerText,
      };
      rejectedList.push(cardDetails);
      card.querySelector(".job-apply").innerText = "Rejected";
    }
    getCount();
  } else if (event.target.classList.contains("delete-btn")) {
    const card = event.target.closest(".bg-white");
    const jobTitle = card.querySelector(".job-description").innerText;

    card.remove();

    interviewList = interviewList.filter(
      (item) => item.jobDescription !== jobTitle,
    );

    rejectedList = rejectedList.filter(
      (item) => item.jobDescription !== jobTitle,
    );

    renderInterview();
    renderRejected();

    getCount();
  } else if (event.target.classList.contains("move-to-reject")) {
    const jobTitle = event.target
      .closest(".bg-white")
      .querySelector("h2").innerText;
    const itemToMove = interviewList.find(
      (item) => item.jobDescription === jobTitle,
    );

    interviewList = interviewList.filter(
      (item) => item.jobDescription !== jobTitle,
    );

    if (
      itemToMove &&
      !rejectedList.some((i) => i.jobDescription === jobTitle)
    ) {
      itemToMove.jobApply = "Rejected";
      rejectedList.push(itemToMove);
    }

    renderInterview();
    getCount();
  } else if (event.target.classList.contains("move-to-interview")) {
    const jobTitle = event.target
      .closest(".bg-white")
      .querySelector("h2").innerText;
    const itemToMove = rejectedList.find(
      (item) => item.jobDescription === jobTitle,
    );

    rejectedList = rejectedList.filter(
      (item) => item.jobDescription !== jobTitle,
    );

    if (
      itemToMove &&
      !interviewList.some((i) => i.jobDescription === jobTitle)
    ) {
      itemToMove.jobApply = "Interview";
      interviewList.push(itemToMove);
    }

    renderRejected();
    getCount();
  }
});

function renderInterview() {
  interviewSection.innerHTML = "";
  
  
  if (interviewList.length === 0) {
    interviewSection.innerHTML = `
    <div class="flex flex-col items-center justify-center py-20 text-center">
        <i class="fa-solid fa-folder-open text-5xl text-gray-300 mb-4"></i>
        <h3 class="text-xl font-bold text-[#002C5C]">No Jobs Available</h3>
        <p class="text-gray-500 mt-2">Check back soon for new job opportunities</p>
      </div>
    `
    return;
  }

  for (let interviews of interviewList) {
    let div = document.createElement("div");
    div.className = "bg-white rounded-sm p-6 mb-4 relative";
    div.innerHTML = `
        <h2 class="job-description font-semibold text-lg text-[#002C5C]">${interviews.jobDescription}</h2>
        <p class="job-title text-[#64748B] mt-1">${interviews.jobTitle}</p>
        <p class="job-queries text-[#64748B] my-5 text-sm">${interviews.jobQueries}</p>
        <button class="job-apply text-[#002C5C] my-2 text-sm bg-[#EEF4FF] px-3 py-2 font-semibold uppercase">${interviews.jobApply}</button>
        <p class="job-details text-[#323B49] mb-5">${interviews.jobDetails}</p>
        <button class="move-to-reject text-red-500 bg-red-100 px-3 py-2 text-sm font-semibold uppercase rounded-sm border border-red-500">Move to Reject</button>
    `;
    interviewSection.appendChild(div);
  }
}

function renderRejected() {
  rejectedSection.innerHTML = "";

 
  if (rejectedList.length === 0) {
    rejectedSection.innerHTML = `
      <div class="flex flex-col items-center justify-center py-20 text-center">
        <i class="fa-solid fa-circle-check text-5xl text-gray-300 mb-4"></i>
        <h3 class="text-xl font-bold text-[#002C5C]">No Rejected Applications</h3>
        <p class="text-gray-500 mt-2">You haven't rejected any job applications yet.</p>
      </div>
    `
  
    return;
  }

  for (let rejects of rejectedList) {
    let div = document.createElement("div");
    div.className = "bg-white rounded-sm p-6 mb-4 relative";
    div.innerHTML = `
        <h2 class="job-description font-semibold text-lg text-[#002C5C]">${rejects.jobDescription}</h2>
        <p class="job-title text-[#64748B] mt-1">${rejects.jobTitle}</p>
        <p class="job-queries text-[#64748B] my-5 text-sm">${rejects.jobQueries}</p>
        <button class="job-apply text-red-500 my-2 text-sm bg-red-50 px-3 py-2 font-semibold uppercase">${rejects.jobApply}</button>
        <p class="job-details text-[#323B49] mb-5">${rejects.jobDetails}</p>
        <button class="move-to-interview text-green-500 bg-green-100 px-3 py-2 text-sm font-semibold uppercase rounded-sm border border-green-500">Move to Interview</button>
    `;
    rejectedSection.appendChild(div);
  }
}

getCount();

