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

//main js codes of fetching and showing cards and modal etc.
const loadAllCards = async () => {
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();
  // console.log(data.data);
  displayAllCards(data.data);
};

const displayAllCards = (cards) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  cards.forEach((card) => {
    console.log(card);
    const div = document.createElement("div");
    div.className = "h-full";
    div.innerHTML = `
    
        <div
            class="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden text-left relative flex flex-col h-full"
          >
            <!-- Top Green Border -->
            <div class="absolute top-0 left-0 right-0 h-1 bg-[#10B981]"></div>

            <div class="p-5 flex-1">
              <!-- 1st div: Header -->
              <div class="flex items-center justify-between mb-4">
                <div
                  class="w-[32px] h-[32px] bg-[#ECFDF5] rounded-full flex items-center justify-center"
                >
                  <img
                    src="assets/Open-Status.png"
                    alt="status"
                    class="w-4 h-4 object-contain"
                  />
                </div>
                <div
                  class="bg-[#FEF2F2] text-[#EF4444] font-semibold px-3 py-1 rounded-full text-[12px]"
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
              <div class="flex items-center gap-2 mb-2 flex-wrap">
                ${card.labels
                  .map((label) => {
                    let badgeHTML = "";
                    if (label.toLowerCase() === "bug") {
                      badgeHTML = `<div class="bg-[#FEF2F2] border border-[#FECACA] text-[#EF4444] px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 uppercase tracking-wide"><i class="fa-solid fa-bug text-[10px]"></i> BUG</div>`;
                    } else if (label.toLowerCase() === "help wanted") {
                      badgeHTML = `<div class="bg-[#FEFCE8] border border-[#FEF08A] text-[#EAB308] px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 uppercase tracking-wide"><i class="fa-solid fa-circle-question text-[10px]"></i> HELP WANTED</div>`;
                    } else if (label.toLowerCase() === "enhancement") {
                      badgeHTML = `<div class="bg-[#ECFDF5] border border-[#A7F3D0] text-[#10B981] px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 uppercase tracking-wide"><i class="fa-solid fa-wand-magic-sparkles text-[10px]"></i> ENHANCEMENT</div>`;
                    } else {
                      badgeHTML = `<div class="bg-gray-100 border border-gray-200 text-gray-600 px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 uppercase tracking-wide">${label.toUpperCase()}</div>`;
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

loadAllCards();
