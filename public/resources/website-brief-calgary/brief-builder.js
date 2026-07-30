(() => {
  const form = document.querySelector("#brief-form");
  const preview = document.querySelector("#brief-preview");
  const meter = document.querySelector("#completion-meter");
  const status = document.querySelector("#brief-status");
  const copyButton = document.querySelector("#copy-brief");
  const printButton = document.querySelector("#print-brief");

  if (!form || !preview || !meter || !status || !copyButton || !printButton) return;

  const textFields = [
    "business",
    "website",
    "offer",
    "problem",
    "goal",
    "audience",
    "action",
    "content",
    "proof",
    "constraints",
    "timeline",
    "budget",
    "success",
    "review",
  ];

  const value = (name) => {
    const field = form.elements.namedItem(name);
    return field && "value" in field ? field.value.trim() : "";
  };

  const selected = (name) =>
    [...form.querySelectorAll(`input[name="${name}"]:checked`)].map((field) => field.value);

  const line = (label, content) => (content ? `${label}: ${content}` : `${label}: To be confirmed`);

  const buildBrief = () => {
    const pages = selected("pages");
    const features = selected("features");
    const answers = textFields.map(value);
    const completedText = answers.filter(Boolean).length;
    const groupsCompleted = Number(pages.length > 0) + Number(features.length > 0);
    const completion = Math.round(((completedText + groupsCompleted) / (textFields.length + 2)) * 100);

    meter.textContent = `${completion}% outlined`;

    if (completedText === 0 && groupsCompleted === 0) {
      preview.textContent = "Start answering the questions to build your project brief.";
      return;
    }

    const business = value("business") || "Website project";
    const output = [
      `${business.toUpperCase()} — WEBSITE PROJECT BRIEF`,
      "",
      "1. BUSINESS AND PROJECT",
      line("Existing website", value("website")),
      line("Offer", value("offer")),
      line("Problem to solve", value("problem")),
      "",
      "2. GOAL AND AUDIENCE",
      line("Primary goal", value("goal")),
      line("Primary audience", value("audience")),
      line("Desired visitor action", value("action")),
      "",
      "3. PROPOSED SCOPE",
      line("Likely pages", pages.join(", ")),
      line("Likely capabilities", features.join(", ")),
      "",
      "4. CONTENT, PROOF, AND CONSTRAINTS",
      line("Content readiness", value("content")),
      line("Available proof", value("proof")),
      line("Brand or technical constraints", value("constraints")),
      "",
      "5. DELIVERY AND SUCCESS",
      line("Ideal launch window", value("timeline")),
      line("Working budget", value("budget")),
      line("Definition of success", value("success")),
      line("Decision-makers and review process", value("review")),
      "",
      "OPEN QUESTIONS",
      "Which assumptions should be validated before the scope is finalized?",
      "Which items are essential for launch, and which can follow later?",
      "Who owns content, third-party accounts, hosting, analytics, and ongoing updates?",
      "",
      "Created with the free Veloste Website Brief Builder",
      "https://www.veloste.com/resources/website-brief-calgary/",
    ];

    preview.textContent = output.join("\n");
  };

  form.addEventListener("input", buildBrief);
  form.addEventListener("change", buildBrief);
  form.addEventListener("reset", () => {
    window.setTimeout(() => {
      buildBrief();
      status.textContent = "The builder has been cleared.";
    }, 0);
  });

  copyButton.addEventListener("click", async () => {
    const brief = preview.textContent;
    if (!brief || brief.startsWith("Start answering")) {
      status.textContent = "Add a few project details before copying the brief.";
      return;
    }

    try {
      await navigator.clipboard.writeText(brief);
      copyButton.textContent = "Copied";
      status.textContent = "The website brief has been copied to your clipboard.";
      window.setTimeout(() => {
        copyButton.textContent = "Copy brief";
      }, 1800);
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(preview);
      selection.removeAllRanges();
      selection.addRange(range);
      status.textContent = "The brief is selected. Use your device’s copy command.";
    }
  });

  printButton.addEventListener("click", () => {
    if (preview.textContent.startsWith("Start answering")) {
      status.textContent = "Add a few project details before printing the brief.";
      return;
    }
    window.print();
  });

  buildBrief();
})();
