let total = document.getElementById("total");
let interview = document.getElementById("interview");
let rejected = document.getElementById("rejected");
let availableJobs = document.getElementById("available-jobs");
let interviewList = [];
let rejectedList = [];
const cardItems = document.getElementById("card");
const getMain = document.querySelector("main");
const getFiltered = document.getElementById("filtered-section");

// get the three button
const allBtn = document.getElementById("all-btn");
const interviewBtn = document.getElementById("interview-btn");
const rejectedBtn = document.getElementById("rejected-btn");

// function to get the counts
function getCount() {
  total.innerText = cardItems.children.length;
  availableJobs.innerText = cardItems.children.length;
  interview.innerText = interviewList.length;
  rejected.innerText = rejectedList.length;
}
getCount();

// changing button color when clicked
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

    if(id == 'interview-btn'){
    cardItems.classList.add('hidden')
    getFiltered.classList.remove('hidden')
renderInterview()
    }

    else if(id == 'all-btn'){
    cardItems.classList.remove('hidden')
    getFiltered.classList.add('hidden')
    }
    else if(id == 'rejected-btn'){
  cardItems.classList.add('hidden')
  getFiltered.classList.remove('hidden')
  renderRejected()
}
}

getMain.addEventListener("click", function (event) {
  if (event.target.classList.contains('int-btn')) {
    const parentNode = event.target.parentNode;
    const jobDescription =
      parentNode.parentNode.querySelector(".job-description").innerText;
    const jobTitle =
      parentNode.parentNode.querySelector(".job-title").innerText;
    const jobQueries =
      parentNode.parentNode.querySelector(".job-queries").innerText;
    const jobApply =
      parentNode.parentNode.querySelector(".job-apply").innerText;
    const jobDetails =
      parentNode.parentNode.querySelector(".job-details").innerText;

      
    parentNode.querySelector(".job-apply").innerText = "Applied";
    parentNode.querySelector(".job-apply").classList.add('uppercase');
    const cardDetails = {
      jobDescription,
      jobTitle,
      jobQueries,
      jobApply : 'Applied',
      jobDetails,
    };

    const interviewExist = interviewList.find(
      (item) => item.jobDescription == cardDetails.jobDescription,
    );

  const interviewBtn = parentNode.querySelector(".int-btn");
const rejectBtn = parentNode.querySelector(".reject-btn");

interviewBtn.disabled = true;
rejectBtn.disabled = true;

interviewBtn.classList.add("opacity-50", "cursor-not-allowed");
rejectBtn.classList.add("opacity-50", "cursor-not-allowed");

    // if (!interviewExist) {
    //   interviewList.push(cardDetails)   
    // }

      interviewList.push(cardDetails)   
      renderInterview()
    getCount()

  }
  else if (event.target.classList.contains('reject-btn')) {

  const parentNode = event.target.parentNode;

  const jobDescription =
    parentNode.parentNode.querySelector(".job-description").innerText;

  const jobTitle =
    parentNode.parentNode.querySelector(".job-title").innerText;

  const jobQueries =
    parentNode.parentNode.querySelector(".job-queries").innerText;

  const jobDetails =
    parentNode.parentNode.querySelector(".job-details").innerText;

  parentNode.querySelector(".job-apply").innerText = "Rejected";
  parentNode.querySelector(".job-apply").classList.add('uppercase');

  const cardDetails = {
    jobDescription,
    jobTitle,
    jobQueries,
    jobApply: "Rejected",
    jobDetails,
  };

 const interviewBtn = parentNode.querySelector(".int-btn");
const rejectBtn = parentNode.querySelector(".reject-btn");

interviewBtn.disabled = true;
rejectBtn.disabled = true;

interviewBtn.classList.add("opacity-50", "cursor-not-allowed");
rejectBtn.classList.add("opacity-50", "cursor-not-allowed");

  rejectedList.push(cardDetails);

  renderRejected();
  getCount();
}
  
    
});

function renderInterview() {
getFiltered.innerHTML = '' 
for(let interviews of interviewList){
    console.log(interviews)
    let div = document.createElement('div')
    div.className = 'bg-white rounded-sm p-6 mb-4 relative'
    div.innerHTML = `
                <h2 class="job-description font-semibold text-lg text-[#002C5C]">${interviews.jobDescription}</h2>
                <p class="job-title text-[#64748B] mt-1">${interviews.jobTitle}</p>
                <p class="job-queries text-[#64748B] my-5 text-sm">${interviews.jobQueries}</p>
                <button class="job-apply text-[#002C5C] my-2 text-sm bg-[#EEF4FF] px-3 py-2 font-semibold uppercase">${interviews.jobApply}</button>
                <P class="job-details text-[#323B49] mb-5">${interviews.jobDetails}</P>
                <button
                    class="int-btn text-[#10B981] font-semibold uppercase py-2 px-3 border rounded-sm border-[#10B981] mr-2">Interview</button>
                <button
                    class="text-[#EF4444] font-semibold uppercase py-2 px-3 border rounded-sm border-[#EF4444]">Rejected</button>
                <div>
                    <img class="cursor-pointer border-[#F1F2F4] border-2 rounded-full p-2 absolute top-6 right-0"
                        src="img/delete.png" alt="">
                </div>
    `
    getFiltered.appendChild(div);
}
}
function renderRejected() {

  getFiltered.innerHTML = '';

  for (let rejects of rejectedList) {

    let div = document.createElement('div');
    div.className = 'bg-white rounded-sm p-6 mb-4 relative';

    div.innerHTML = `
      <h2 class="job-description font-semibold text-lg text-[#002C5C]">${rejects.jobDescription}</h2>
      <p class="job-title text-[#64748B] mt-1">${rejects.jobTitle}</p>
      <p class="job-queries text-[#64748B] my-5 text-sm">${rejects.jobQueries}</p>
      <button class="job-apply text-[#EF4444] my-2 text-sm bg-[#FEE2E2] px-3 py-2 font-semibold uppercase">${rejects.jobApply}</button>
      <p class="job-details text-[#323B49] mb-5">${rejects.jobDetails}</p>
                  <button
                    class="int-btn text-[#10B981] font-semibold uppercase py-2 px-3 border rounded-sm border-[#10B981] mr-2">Interview</button>
                <button
                    class="text-[#EF4444] font-semibold uppercase py-2 px-3 border rounded-sm border-[#EF4444]">Rejected</button>
                <div>
                    <img class="cursor-pointer border-[#F1F2F4] border-2 rounded-full p-2 absolute top-6 right-0"
                        src="img/delete.png" alt="">
                </div>
    `;

    getFiltered.appendChild(div);
  }
}
