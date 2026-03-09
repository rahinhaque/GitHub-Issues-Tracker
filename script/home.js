//button toggleing
document.addEventListener("click", () => {
  const buttons = document.querySelectorAll(".filter-btn");

  // Classes for the active state
  const activeClasses = [
    "bg-[#4F46E5]",
    "hover:bg-[#4338CA]",
    "text-white",
    "px-8",
  ];

  // Classes for the inactive state
  const inactiveClasses = [
    "bg-white",
    "border",
    "border-[#E2E8F0]",
    "hover:bg-[#F8FAFC]",
    "text-[#64748B]",
    "hover:text-[#1F2937]",
    "px-6",
  ];

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // 1. Remove active classes and add inactive classes to ALL buttons
      buttons.forEach((b) => {
        b.classList.remove(...activeClasses);
        b.classList.add(...inactiveClasses);
      });

      // 2. Add active classes and remove inactive classes from the CLICKED button
      btn.classList.remove(...inactiveClasses);
      btn.classList.add(...activeClasses);
    });
  });
});

let allFetchedCards = [];

//main js codes of fetching and showing cards and modal etc.
const loadAllCards = async () => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = `<div class="col-span-1 md:col-span-2 lg:col-span-4 flex justify-center py-20"><span class="loading loading-spinner text-primary loading-lg scale-150"></span></div>`;

  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();
  allFetchedCards = data.data;
  displayAllCards(allFetchedCards);
};

const displayAllCards = (cards) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  const issuesCountElement = document.getElementById("issues");
  issuesCountElement.innerText = `${cards.length} Issues`;

  cards.forEach((card) => {
    console.log(card);
    const div = document.createElement("div");
    div.className = "h-full";
    div.innerHTML = `
    
        <div onclick="showCardModal(${card.id})"
            class="bg-white cursor-pointer rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden text-left relative flex flex-col h-full"
          >
            <!-- Top Border -->
            <div class="absolute top-0 left-0 right-0 h-1 ${card.status.toLowerCase() === "open" ? "bg-[#10B981]" : "bg-[#A855F7]"}"></div>

            <div class="p-5 flex-1">
              <!-- 1st div: Header -->
              <div class="flex items-center justify-between mb-4">
                <div
                  class="w-[32px] h-[32px] ${card.status.toLowerCase() === "open" ? "bg-[#ECFDF5]" : "bg-[#F3E8FF]"} rounded-full flex items-center justify-center"
                >
                  <img
                    src="${card.status.toLowerCase() === "open" ? "assets/Open-Status.png" : "assets/Closed- Status .png"}"
                    alt="${card.status}"
                    class="w-4 h-4 object-contain"
                  />
                </div>
                <div
                  class="font-semibold px-3 py-1 rounded-full text-[12px] uppercase ${
                    card.priority.toLowerCase() === "high"
                      ? "bg-[#FEF2F2] text-[#EF4444]"
                      : card.priority.toLowerCase() === "medium"
                        ? "bg-[#FEFCE8] text-[#EAB308]"
                        : card.priority.toLowerCase() === "low"
                          ? "bg-[#F1F5F9] text-[#64748B]"
                          : "bg-gray-100 text-gray-500"
                  }"
                >
                  ${card.priority}
                </div>
              </div>

              <!-- 2nd Div: Title & Description -->
              <div class="mb-4">
                <h2
                  class="text-[17px] font-bold text-[#1F2937] leading-tight mb-2"
                >
                  ${card.title}
                </h2>
                <p class="text-[#64748B] text-[14px] line-clamp-2">
                  ${card.description}
                </p>
              </div>

              <!-- 3rd div: Badges -->
              <div class="flex items-center gap-2 mb-2 flex-wrap w-full">
                ${card.labels
                  .map((label) => {
                    let badgeHTML = "";
                    if (label.toLowerCase() === "bug") {
                      badgeHTML = `<div class="bg-[#FEF2F2] border border-[#FECACA] text-[#EF4444] px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 uppercase tracking-wide w-fit whitespace-nowrap"><i class="fa-solid fa-bug text-[10px]"></i> BUG</div>`;
                    } else if (label.toLowerCase() === "help wanted") {
                      badgeHTML = `<div class="bg-[#FEFCE8] border border-[#FEF08A] text-[#EAB308] px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 uppercase tracking-wide w-fit whitespace-nowrap"><i class="fa-solid fa-circle-question text-[10px]"></i> HELP WANTED</div>`;
                    } else if (label.toLowerCase() === "enhancement") {
                      badgeHTML = `<div class="bg-[#ECFDF5] border border-[#A7F3D0] text-[#10B981] px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 uppercase tracking-wide w-fit whitespace-nowrap"><i class="fa-solid fa-wand-magic-sparkles text-[10px]"></i> ENHANCEMENT</div>`;
                    } else {
                      badgeHTML = `<div class="bg-gray-100 border border-gray-200 text-gray-600 px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 uppercase tracking-wide w-fit whitespace-nowrap">${label.toUpperCase()}</div>`;
                    }
                    return badgeHTML;
                  })
                  .join("")}
              </div>
            </div>

            <hr class="border-[#E2E8F0] m-0" />

            <!-- 4th div: Footer -->
            <div
              class="p-5 pt-3 text-[#64748B] text-[13px] flex flex-col gap-1.5 bg-white"
            >
              <p>#${card.id} by ${card.author}</p>
              <p>${card.createdAt}</p>
            </div>
          </div>
  
    `;
    cardContainer.append(div);
  });
};

document.getElementById("btnAll").addEventListener("click", () => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = `<div class="col-span-1 md:col-span-2 lg:col-span-4 flex justify-center py-20"><span class="loading loading-spinner text-primary loading-lg scale-150"></span></div>`;

  setTimeout(() => {
    displayAllCards(allFetchedCards);
  }, 400); // 400ms simulate fetching time so spinner is visible
});

document.getElementById("btnOpen").addEventListener("click", () => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = `<div class="col-span-1 md:col-span-2 lg:col-span-4 flex justify-center py-20"><span class="loading loading-spinner text-primary loading-lg scale-150"></span></div>`;

  setTimeout(() => {
    const openCards = allFetchedCards.filter(
      (card) => card.status.toLowerCase() === "open",
    );
    displayAllCards(openCards);
  }, 400);
});

document.getElementById("btnClosed").addEventListener("click", () => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = `<div class="col-span-1 md:col-span-2 lg:col-span-4 flex justify-center py-20"><span class="loading loading-spinner text-primary loading-lg scale-150"></span></div>`;

  setTimeout(() => {
    const closedCards = allFetchedCards.filter(
      (card) => card.status.toLowerCase() === "closed",
    );
    displayAllCards(closedCards);
  }, 400);
});

//modal functions..
async function showCardModal(cardId) {
  // console.log(cardId )
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${cardId}`,
  );
  const data = await res.json();
  displayModal(data.data);

  document.getElementById("my_modal_1").showModal();
}
const displayModal = (data) => {
  console.log(data);
  const modal = document.getElementById("my_modal_1");
  modal.innerHTML = `
      <div
        class="modal-box w-11/12 max-w-2xl bg-white p-6 sm:p-8 rounded-2xl shadow-xl"
      >
        <h1
          class="font-bold text-[24px] sm:text-[26px] text-[#1F2937] mb-3 leading-tight"
        >
          ${data.title}
        </h1>

        <!-- Subtitle section -->
        <div
          class="flex flex-wrap items-center gap-2 sm:gap-3 text-[#64748B] text-[14px] mb-6"
        >
          <div
            class="${data.status.toLowerCase() === "open" ? "bg-[#4ad091]" : "bg-[#9154d3]"} text-white px-3 py-1 rounded-full text-[13px] font-medium"
          >
            ${data.status}
          </div>
          <span class="text-[#94A3B8] text-[10px]"
            ><i class="fa-solid fa-circle"></i
          ></span>
          <p>Opened by ${data.author}</p>
          <span class="text-[#94A3B8] text-[10px]"
            ><i class="fa-solid fa-circle"></i
          ></span>
          <p>${data.createdAt}</p>
        </div>

        <!-- Badges -->
        <div class="flex items-center gap-2 mb-6 flex-wrap">
          ${data.labels
            .map((label) => {
              let badgeHTML = "";
              if (label.toLowerCase() === "bug") {
                badgeHTML = `<div class="bg-[#FEF2F2] border border-[#FECACA] text-[#EF4444] px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 uppercase tracking-wide w-fit whitespace-nowrap"><i class="fa-solid fa-bug text-[10px]"></i> BUG</div>`;
              } else if (label.toLowerCase() === "help wanted") {
                badgeHTML = `<div class="bg-[#FEFCE8] border border-[#FEF08A] text-[#EAB308] px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 uppercase tracking-wide w-fit whitespace-nowrap"><i class="fa-solid fa-circle-question text-[10px]"></i> HELP WANTED</div>`;
              } else if (label.toLowerCase() === "enhancement") {
                badgeHTML = `<div class="bg-[#ECFDF5] border border-[#A7F3D0] text-[#10B981] px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 uppercase tracking-wide w-fit whitespace-nowrap"><i class="fa-solid fa-wand-magic-sparkles text-[10px]"></i> ENHANCEMENT</div>`;
              } else {
                badgeHTML = `<div class="bg-gray-100 border border-gray-200 text-gray-600 px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 uppercase tracking-wide w-fit whitespace-nowrap">${label.toUpperCase()}</div>`;
              }
              return badgeHTML;
            })
            .join("")}
        </div>

        <!-- Description -->
        <div class="mb-7">
          <p class="text-[#64748B] text-[15px] sm:text-[16px] leading-relaxed">
            ${data.description}
          </p>
        </div>

        <!-- Assignee & Priority Box -->
        <div
          class="bg-[#F8FAFC] rounded-xl p-5 sm:p-6 mb-8 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-24 lg:gap-32 w-full"
        >
          <div class="flex-1">
            <h2 class="text-[#64748B] text-[15px] mb-1.5 font-medium">
              Assignee:
            </h2>
            <h1 class="text-[#1F2937] font-semibold text-[17px]">
              ${data.assignee}
            </h1>
          </div>
          <div class="flex-1">
            <h2 class="text-[#64748B] text-[15px] mb-1.5 font-medium">
              Priority:
            </h2>
            <div
              class="bg-[${data.priority.toLowerCase() === "high" ? "#EF4444" : data.priority.toLowerCase() === "low" ? "#10B981" : "#EAB308"}] text-white px-3.5 py-1 rounded-full text-[12px] font-medium w-fit uppercase inline-block"
            >
              ${data.priority}
            </div>
          </div>
        </div>

        <div class="modal-action mt-0 flex justify-end">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button
              class="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-6 py-2.5 rounded-lg font-medium text-[15px] transition-all cursor-pointer"
            >
              Close
            </button>
          </form>
        </div>
      </div>
  `;
};

loadAllCards();
