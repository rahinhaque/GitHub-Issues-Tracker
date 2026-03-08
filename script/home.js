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

