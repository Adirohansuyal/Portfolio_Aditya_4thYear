// ── Page Loader ───────────────────────────────────────────────────────
(function () {
  // Disable browser's scroll restoration so it doesn't jump to a saved position
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  const loader   = document.getElementById("page-loader");
  const bar      = document.getElementById("loader-bar-fill");
  const subLabel = document.getElementById("loader-sub");
  if (!loader) return;

  // Prevent the page from being scrolled while loader is visible
  document.body.style.overflow = "hidden";
  window.scrollTo({ top: 0, left: 0 });

  const phases = [
    { pct: 18,  text: "Initialising AI systems…"         },
    { pct: 40,  text: "Loading LLM frameworks…"          },
    { pct: 62,  text: "Mounting RAG pipelines…"          },
    { pct: 80,  text: "Compiling agentic workflows…"     },
    { pct: 95,  text: "Rendering Engineer's portfolio…"  },
  ];

  let step = 0;

  function tick() {
    if (step < phases.length) {
      bar.style.width      = phases[step].pct + "%";
      subLabel.textContent = phases[step].text;
      step++;
      setTimeout(tick, 320 + Math.random() * 180);
    }
  }

  tick();

  function dismiss() {
    bar.style.width      = "100%";
    subLabel.textContent = "Ready.";

    document.body.style.overflow = "";

    setTimeout(() => {
      loader.classList.add("loader-hidden");
      loader.addEventListener("transitionend", () => {
        loader.style.display = "none";
      }, { once: true });
    }, 320);
  }

  // Dismiss as soon as the page is fully loaded
  if (document.readyState === "complete") {
    dismiss();
  } else {
    window.addEventListener("load", dismiss);
    // Safety net: never block the user for more than 4 s
    setTimeout(dismiss, 4000);
  }
})();
// ── /Page Loader ──────────────────────────────────────────────────────



const year = document.querySelector("#year");
// ── Scroll-driven background ──────────────────────────────────────────
(function () {
  // Background: dark #0b0f14 → light #e8edf4
  const darkR = 11,  darkG = 15,  darkB = 20;
  const lightR = 232, lightG = 237, lightB = 244;

  function lerp(a, b, t) { return Math.round(a + (b - a) * t); }
  function lerpF(a, b, t) { return +(a + (b - a) * t).toFixed(3); }
  function clamp(v, lo, hi) { return Math.min(hi, Math.max(lo, v)); }

  // Perceived luminance of the background at scroll position t (0=dark, 1=light)
  // We use this to decide whether text should be light or dark
  function bgLuminance(t) {
    const r = lerp(darkR, lightR, t) / 255;
    const g = lerp(darkG, lightG, t) / 255;
    const b = lerp(darkB, lightB, t) / 255;
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;  // relative luminance
  }

  function updateBg() {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const t = total > 0 ? Math.min(scrolled / total, 1) : 0;

    const root = document.documentElement;
    const lum = bgLuminance(t); // 0 (very dark) → ~0.83 (light grey)

    // Background
    const bgValue = `rgb(${lerp(darkR,lightR,t)},${lerp(darkG,lightG,t)},${lerp(darkB,lightB,t)})`;
    document.body.style.background = bgValue;
    document.documentElement.style.setProperty("--bg", bgValue);

    // ── Text colors: maximum contrast at all times ────────────────────
    // Hard switch: white text on dark bg, near-black on light bg.
    // Threshold at lum=0.18 — below: fully white, above: fully dark.
    // A tiny 0.04-wide blend zone prevents a jarring instant flash.
    const textT = clamp((lum - 0.16) / 0.04, 0, 1);
    // --text: #f8fafc (white) → #0f172a (near-black)
    root.style.setProperty("--text",
      `rgb(${lerp(248,15,textT)},${lerp(250,23,textT)},${lerp(252,42,textT)})`);
    // --muted: #e2e8f0 (near-white) → #1e293b (dark slate)
    root.style.setProperty("--muted",
      `rgb(${lerp(226,30,textT)},${lerp(232,41,textT)},${lerp(240,59,textT)})`);
    // --quiet: #cbd5e1 (light) → #334155 (dark)
    root.style.setProperty("--quiet",
      `rgb(${lerp(203,51,textT)},${lerp(213,65,textT)},${lerp(225,85,textT)})`);

    // ── Panel / card backgrounds ──────────────────────────────────────
    // --panel: #1b2430 → #ffffff
    root.style.setProperty("--panel",
      `rgb(${lerp(27,255,t)},${lerp(36,255,t)},${lerp(48,255,t)})`);
    // --panel-strong: #1b2430 → #f1f5f9
    root.style.setProperty("--panel-strong",
      `rgb(${lerp(27,241,t)},${lerp(36,245,t)},${lerp(48,249,t)})`);
    // --secondary-bg: #111827 → #f1f5f9
    root.style.setProperty("--secondary-bg",
      `rgb(${lerp(17,241,t)},${lerp(24,245,t)},${lerp(39,249,t)})`);

    // ── Borders ───────────────────────────────────────────────────────
    // --line: #2a3441 → #94a3b8
    root.style.setProperty("--line",
      `rgb(${lerp(42,148,t)},${lerp(52,163,t)},${lerp(65,184,t)})`);

    // ── Shadow ────────────────────────────────────────────────────────
    const shadowAlpha = lerpF(0.35, 0.10, t);
    root.style.setProperty("--shadow", `0 10px 30px rgba(15,23,42,${shadowAlpha})`);

    // ── Navbar ────────────────────────────────────────────────────────
    // navbar background is handled by CSS glassmorphism — do not override

    // ── Skill cards ───────────────────────────────────────────────────
    root.style.setProperty("--card-bg",     `rgba(99,102,241,${lerpF(0.03,0.07,t)})`);
    root.style.setProperty("--card-border", `rgba(99,102,241,${lerpF(0.08,0.25,t)})`);

    // ── Skill tags ────────────────────────────────────────────────────
    root.style.setProperty("--tag-bg",     `rgba(99,102,241,${lerpF(0.10,0.12,t)})`);
    root.style.setProperty("--tag-border", `rgba(99,102,241,${lerpF(0.20,0.35,t)})`);
    // tag text: #a5b4fc → #3730a3
    root.style.setProperty("--tag-color",
      `rgb(${lerp(165,55,t)},${lerp(180,48,t)},${lerp(252,163,t)})`);
  }

  window.addEventListener("scroll", updateBg, { passive: true });
  updateBg();
})();

const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
const revealSections = document.querySelectorAll(".reveal-section");
const navLinks = document.querySelectorAll(".nav-links a");
const scrollProgress = document.querySelector(".scroll-progress");

if (year) {
  year.textContent = new Date().getFullYear();
}

// ── Resume Preview Modal ──────────────────────────────────────────────
const resumeBtn = document.querySelector("#resume-btn");
const resumeModal = document.querySelector("#resume-modal");
const resumeModalClose = document.querySelector("#resume-modal-close");
const resumeModalBackdrop = document.querySelector("#resume-modal-backdrop");
const resumeFallback = document.querySelector("#resume-fallback");
const resumeCanvas = document.querySelector("#resume-canvas");
const resumeLoading = document.querySelector("#resume-loading");
const RESUME_SRC = "assets/resume.pdf";

let pdfRendered = false;

async function renderPDF() {
  if (pdfRendered) return;
  try {
    const pdfjsLib = await import("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.min.mjs");
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs";

    const loadingTask = pdfjsLib.getDocument(RESUME_SRC);
    const pdf = await loadingTask.promise;
    const page = await pdf.getPage(1);

    const container = document.querySelector("#resume-pdfjs-container");
    const containerWidth = container.clientWidth || 800;
    const viewport = page.getViewport({ scale: 1 });
    const scale = containerWidth / viewport.width;
    const scaledViewport = page.getViewport({ scale });

    resumeCanvas.width = scaledViewport.width;
    resumeCanvas.height = scaledViewport.height;

    const ctx = resumeCanvas.getContext("2d");
    await page.render({ canvasContext: ctx, viewport: scaledViewport }).promise;

    resumeLoading.hidden = true;
    resumeCanvas.hidden = false;
    pdfRendered = true;
  } catch (err) {
    console.error("PDF render failed:", err);
    resumeLoading.hidden = true;
    resumeFallback.hidden = false;
  }
}

function openResumeModal() {
  resumeModal.hidden = false;
  document.body.style.overflow = "hidden";
  resumeModalClose.focus();
  renderPDF();
}

function closeResumeModal() {
  resumeModal.hidden = true;
  document.body.style.overflow = "";
  resumeBtn.focus();
}

if (resumeBtn && resumeModal) {
  resumeBtn.addEventListener("click", openResumeModal);
  resumeModalClose.addEventListener("click", closeResumeModal);
  resumeModalBackdrop.addEventListener("click", closeResumeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !resumeModal.hidden) closeResumeModal();
  });
}


const hamburger = document.querySelector(".hamburger");
const primaryNav = document.querySelector("#primary-nav");

function openNav() {
  primaryNav.classList.add("nav-open");
  hamburger.setAttribute("aria-expanded", "true");
}

function closeNav() {
  primaryNav.classList.remove("nav-open");
  hamburger.setAttribute("aria-expanded", "false");
}

if (hamburger && primaryNav) {
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = primaryNav.classList.contains("nav-open");
    isOpen ? closeNav() : openNav();
  });

  // Close nav when any nav link is clicked
  primaryNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  // Close nav when clicking outside the header
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".site-header")) {
      closeNav();
    }
  });

  // Close nav on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeNav();
  });
}

// Inject revolving glow span into every project card and experience panel
document.querySelectorAll(".project-card, .experience-panel").forEach((card) => {
  const glow = document.createElement("span");
  glow.className = "card-glow";
  glow.setAttribute("aria-hidden", "true");
  card.prepend(glow);
});

// Inject purple revolving glow into every skill card
document.querySelectorAll(".skill-card").forEach((card) => {
  const glow = document.createElement("span");
  glow.className = "skill-card-glow";
  glow.setAttribute("aria-hidden", "true");
  card.prepend(glow);
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const activeFilter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach((card) => {
      const categories = card.dataset.category || "";
      const shouldShow = activeFilter === "all" || categories.includes(activeFilter);
      card.hidden = !shouldShow;
    });
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    });
  },
  { threshold: 0.16 }
);

revealSections.forEach((section) => revealObserver.observe(section));

const updateScrollState = () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;

  if (scrollProgress) {
    scrollProgress.style.transform = `scaleX(${Math.min(progress, 1)})`;
  }

  // Dynamic island: shrink pill after scrolling down 60px
  const header = document.querySelector(".site-header");
  if (header) {
    header.classList.toggle("scrolled", window.scrollY > 60);
  }

  let currentId = "";
  document.querySelectorAll("main section[id]").forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 140 && rect.bottom >= 140) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
  });
};

window.addEventListener("scroll", updateScrollState, { passive: true });
window.addEventListener("resize", updateScrollState);
updateScrollState();

// ═══════════════════════════════════════════════════════════════════
// PORTFOLIO CHATBOT — Groq llama-3.3-70b-versatile
// ═══════════════════════════════════════════════════════════════════
(function () {
  // ── Knowledge base (system prompt) ────────────────────────────────
  const SYSTEM_PROMPT = `You are a helpful portfolio assistant for Aditya Suyal. Answer questions accurately and concisely using only the information provided below. If a question is not covered by this information, say you don't have that detail but suggest the user contact Aditya directly.

When the user asks to see or open a specific page (awards, certifications, leadership, research, YouTube, etc.), respond with a confirmation message AND include the exact text "NAVIGATE:" followed by the URL on a new line. For example:
- "Sure! Opening the awards page now. NAVIGATE:awards.html"
- "Let me show you the certifications. NAVIGATE:certifications.html"
- "Opening the leadership page. NAVIGATE:leadership.html"
- "Here's the research page. NAVIGATE:research.html"
- "Opening YouTube page. NAVIGATE:youtube.html"

Available pages:
- awards.html — Awards and achievements
- certifications.html — Professional certifications
- leadership.html — Leadership experience
- research.html — Research papers and technical writing
- youtube.html — YouTube channel
- index.html — Main portfolio page

=== ABOUT ADITYA SUYAL ===
Name: Aditya Suyal
Role: AI/ML Engineer & Generative AI Developer
Education: 3rd-year B.Tech CSE student at Birla Institute of Applied Sciences (BIAS), Bhimtal
Focus: Generative AI engineering, Agentic AI, RAG (Retrieval-Augmented Generation), NLP, Computer Vision, Satellite Imagery Analysis, Scalable ML applications
Core Stack: Python, PyTorch, LangChain, transformer fine-tuning, MLOps
GitHub: https://github.com/Adirohansuyal
LinkedIn: https://www.linkedin.com/in/aditya-suyal
Email: adityasuyal0001@gmail.com

=== EXPERIENCE ===
1. AI Research and Development Trainee — CAIR, DIBER (DRDO), Bengaluru (Current)
   - Working on AI/ML engineering, agentic systems, and applied generative AI
   - Building LLM workflows combining model reasoning, retrieval, tool use, and structured outputs
   - Exploring autonomous agents and AI automation for defense research contexts
   - Translating research direction into testable, demo-ready engineering artifacts

2. AI Agent Development Intern — Shell Global Pvt. Ltd. | Remote | Dec 2025 – Feb 2026
   - Built production-grade multi-agent AI systems with LangChain and CrewAI
   - Improved workflow automation and reduced manual processing by 65%
   - Engineered autonomous tool-calling agents using GPT-4, Llama, prompt engineering, and task orchestration
   - Reached 88% task accuracy across agentic workflow evaluations

3. Generative AI Intern — Analytics Vidhya | Remote | Nov 2025 – Dec 2025
   - Developed RAG pipelines and scalable AI APIs using FAISS embeddings and LLM integration
   - Processed 10K+ documents with 92% retrieval accuracy
   - Built scalable APIs serving 500+ concurrent users

=== PROJECTS ===
1. Generative AI-Based Cloud Removal for LISS-IV Satellite Imagery
   - Physics-guided CV and deep learning system using SAR-optical fusion and NDVI preservation
   - Evaluated through PSNR and SSIM metrics
   - Stack: Python, PyTorch, Remote Sensing, SAR Fusion
   - Category: Vision, GenAI

2. Hybrid Multi-Agent Conversational AI Architecture
   - First-author LLM research project: 10-agent modular AI framework
   - Features: supervisor routing, competitive debate, expertise-aware personalization
   - Impact: +11.9% accuracy over single-model baseline, 31.4% fewer unnecessary tool calls
   - Stack: Python, CrewAI, Llama 3.3, LLM-as-a-Judge
   - Category: GenAI

3. Memory-Augmented LLM using LSTM
   - Hybrid AI architecture combining Transformer reasoning with LSTM-based temporal memory
   - Enables long-term conversational context and memory-aware assistant behavior
   - Key idea: separate reasoning from sequential memory instead of expanding context windows
   - Stack: PyTorch, LSTM, Transformers, Embeddings
   - Category: GenAI

4. CivicAI
   - Streamlit civic complaint management platform with Leaflet/Folium maps and OSRM GPS routing
   - Multi-agent AI backend deployed on Render
   - Stack: Streamlit, Folium, OSRM, Agents
   - Category: Agentic Systems, Apps

5. Adaptive AI Steganography
   - Streamlit cybersecurity app for texture-guided LSB embedding
   - Uses Fernet and PBKDF2 encryption for controlled hidden-message workflows
   - Stack: Python, Streamlit, Fernet, PBKDF2
   - Category: Security, Apps

6. Fashion Product Intelligence System
   - CLIP-based AI recommendation engine with FAISS-powered vector similarity search
   - Includes deduplication for fashion product discovery
   - Stack: CLIP, FAISS, Python, Embeddings
   - Category: Vision

7. Private RAG Document QA System
   - Secure enterprise-style document QA with hybrid dense and sparse retrieval
   - Uses Multi-Query RAG, sentence-transformers, Gemma-2B, and a Streamlit interface
   - Impact: 5K+ queries processed, 90% relevance, latency reduced from 3s to 0.4s
   - Stack: LangChain, FAISS, Gemma-2B, Streamlit
   - Category: GenAI, Apps

8. Agentic AI Multi-Agent System for EV Research
   - Supervisor and co-worker agent system with 5+ specialized LLM agents
   - Covers EV market intelligence, policy analysis, business research, automated reporting on AWS
   - Impact: reduced manual research effort by 70%
   - Stack: Python, Agno, Groq, AWS
   - Category: Agentic Research, GenAI

=== RESEARCH ===
1. Hybrid Multi-Agent Conversational AI Architecture (First-Author Paper, March 2026)
   - 10-agent modular framework with supervisor routing, competitive debate, structured verification
   - Expertise-aware personalization and LLM-as-a-Judge evaluation
   - Results: +11.9% accuracy over single-model baseline

2. Cloud Removal for LISS-IV Satellite Imagery (Synopsis)
   - Physics-guided computer vision cloud removal
   - SAR-optical fusion, NDVI preservation, PSNR/SSIM evaluation

=== SKILLS ===
Machine Learning & Deep Learning:
Python, PyTorch, TensorFlow, scikit-learn, OpenCV, CLIP, CNNs, RNNs, LSTMs, Transformers, Fine-tuning, LoRA, QLoRA, Model Evaluation, NLP, Computer Vision

Generative AI & LLM Engineering:
LangChain, LlamaIndex, CrewAI, Autogen, LangGraph, RAG Pipelines, Embeddings, Vector Databases, Prompt Engineering, Agentic AI, Multi-Agent Systems, LLM Orchestration

LLM Stack & Models:
GPT-4, Gemini Pro, Llama 2/3, Mistral, Stable Diffusion, Instruction Tuning, RLHF, Tool Calling, Agent Orchestration, LLM Evaluation

Data, Deployment & MLOps:
FAISS, Pinecone, ChromaDB, MongoDB, SQL, AWS EC2, AWS Lambda, AWS S3, Docker, Kubernetes, REST APIs, MLOps, CI/CD, Model Serving, Cloud Deployment

=== ACHIEVEMENTS & CERTIFICATIONS ===
Competition Results:
- 1st Place TechFest AI in Education
- 3rd Place Grafest AI in Healthcare
- 2x State AI Hackathon Finalist

Certifications (ranked by relevance):
1. Design, Develop and Deploy Multi-Agent Systems with CrewAI — DeepLearning.AI (Andrew Ng)
2. Masters in Generative AI and LLMs — GeeksforGeeks
3. Applied AI Lab for Deep Learning & Computer Vision — WorldQuant University
4. Academy Accreditation – Generative AI Fundamentals — Databricks
5. Applied Data Science Lab (16 weeks) — WorldQuant University
6. Microsoft Certified: Azure AI Fundamentals — Microsoft
7. Cisco Certified Foundational Core Course on Data Science — Cisco
8. HackerRank Certified SQL (Advanced) — HackerRank
9. Machine Learning with Python — freeCodeCamp
10. Microsoft Power BI Data Analyst — Microsoft

=== CONTACT ===
Email: adityasuyal0001@gmail.com
LinkedIn: https://www.linkedin.com/in/aditya-suyal
GitHub: https://github.com/Adirohansuyal

Keep answers concise, friendly, and professional. Use bullet points for lists. Do not make up any information not listed above.`;

  // API key lives in Netlify environment — never hardcoded here.
  // Requests go to the serverless proxy at netlify/functions/groq-proxy.js
  const GROQ_MODEL = "llama-3.3-70b-versatile";
  const GROQ_URL   = "/.netlify/functions/groq-proxy";

  // ── State ──────────────────────────────────────────────────────────
  const history = []; // { role, content }
  let isLoading = false;
  let chatOpen  = false;

  // ── DOM refs ───────────────────────────────────────────────────────
  const fab         = document.getElementById("chat-fab");
  const win         = document.getElementById("chat-window");
  const closeBtn    = document.getElementById("chat-close-btn");
  const messagesEl  = document.getElementById("chat-messages");
  const form        = document.getElementById("chat-form");
  const inputEl     = document.getElementById("chat-input");
  const sendBtn     = form ? form.querySelector(".chat-send-btn") : null;
  const suggestionsEl = document.getElementById("chat-suggestions");

  if (!fab || !win) return; // chatbot HTML not present

  // ── Open / close ───────────────────────────────────────────────────
  function openChat() {
    chatOpen = true;
    win.classList.add("is-open");
    fab.classList.add("is-open");
    fab.setAttribute("aria-label", "Close portfolio chatbot");
    inputEl.focus();
    if (!messagesEl.children.length) addWelcome();
  }

  function closeChat() {
    chatOpen = false;
    win.classList.remove("is-open");
    fab.classList.remove("is-open");
    fab.setAttribute("aria-label", "Open portfolio chatbot");
  }

  fab.addEventListener("click", (e) => {
    e.stopPropagation();
    chatOpen ? closeChat() : openChat();
  });
  closeBtn.addEventListener("click", (e) => { e.stopPropagation(); closeChat(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && chatOpen) closeChat();
  });

  // ── Welcome message ────────────────────────────────────────────────
  function addWelcome() {
    addBotMessage("Hi! 👋 I'm Aditya's portfolio assistant. Ask me anything — his projects, skills, experience, research, or how to get in touch.");
  }

  // ── Suggestion chips ───────────────────────────────────────────────
  if (suggestionsEl) {
    suggestionsEl.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        const text = btn.textContent.trim();
        suggestionsEl.classList.add("is-hidden");
        sendMessage(text);
      });
    });
  }

  // ── Form submit ────────────────────────────────────────────────────
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = inputEl.value.trim();
    if (!text || isLoading) return;
    inputEl.value = "";
    if (suggestionsEl) suggestionsEl.classList.add("is-hidden");
    sendMessage(text);
  });

  // ── Core send / receive ────────────────────────────────────────────
  async function sendMessage(text) {
    addUserMessage(text);
    history.push({ role: "user", content: text });

    isLoading = true;
    if (sendBtn) sendBtn.disabled = true;

    const typingEl = addTypingIndicator();

    try {
      const messages = [
        { role: "system", content: SYSTEM_PROMPT },
        ...history.slice(-10) // keep last 10 turns for context
      ];

      const res = await fetch(GROQ_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages,
          max_tokens: 700,
          temperature: 0.5,
          stream: false
        })
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error?.message || `HTTP ${res.status}`);
      }

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content?.trim() || "Sorry, I couldn't get a response. Please try again.";

      typingEl.remove();
      
      // Check if bot wants to navigate somewhere
      const navMatch = reply.match(/NAVIGATE:\s*(\S+)/);
      if (navMatch) {
        const url = navMatch[1];
        // Remove the NAVIGATE: instruction from displayed message
        const cleanReply = reply.replace(/NAVIGATE:\s*\S+/g, "").trim();
        addBotMessage(cleanReply);
        playReplySound();
        history.push({ role: "assistant", content: cleanReply });
        
        // Navigate after a short delay so user sees the confirmation
        setTimeout(() => {
          window.location.href = url;
        }, 800);
      } else {
        addBotMessage(reply);
        playReplySound();
        history.push({ role: "assistant", content: reply });
      }

    } catch (err) {
      typingEl.remove();
      addBotMessage(`Sorry, something went wrong: ${err.message}. Please try again.`);
      console.error("Chatbot error:", err);
    } finally {
      isLoading = false;
      if (sendBtn) sendBtn.disabled = false;
      inputEl.focus();
    }
  }

  // ── Notification sound (Web Audio API — no file needed) ───────────
  function playReplySound() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();

      // Two-tone soft "ding" — high note then slightly lower
      const notes = [1046.5, 880]; // C6 → A5
      notes.forEach((freq, i) => {
        const osc  = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const start = ctx.currentTime + i * 0.13;
        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(0.18, start + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.28);

        osc.start(start);
        osc.stop(start + 0.3);
      });
    } catch (_) {
      // Audio not supported — fail silently
    }
  }


  function addUserMessage(text) {
    const el = document.createElement("div");
    el.className = "chat-msg chat-msg--user";
    el.innerHTML = `<div class="chat-bubble">${escapeHtml(text)}</div>`;
    messagesEl.appendChild(el);
    scrollToBottom();
  }

  function addBotMessage(text) {
    const el = document.createElement("div");
    el.className = "chat-msg chat-msg--bot";
    // Convert basic markdown: **bold**, bullet lines, newlines
    const html = formatMessage(text);
    el.innerHTML = `<div class="chat-bubble">${html}</div>`;
    messagesEl.appendChild(el);
    scrollToBottom();
  }

  function addTypingIndicator() {
    const el = document.createElement("div");
    el.className = "chat-msg chat-msg--bot chat-typing";
    el.innerHTML = `<div class="chat-bubble">
      <span class="chat-typing-dot"></span>
      <span class="chat-typing-dot"></span>
      <span class="chat-typing-dot"></span>
    </div>`;
    messagesEl.appendChild(el);
    scrollToBottom();
    return el;
  }

  // ── Helpers ────────────────────────────────────────────────────────
  function scrollToBottom() {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function formatMessage(text) {
    return escapeHtml(text)
      // **bold**
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      // bullet lines starting with - or •
      .replace(/^[-•]\s+(.+)$/gm, "<li>$1</li>")
      // wrap consecutive <li> in <ul>
      .replace(/(<li>[\s\S]*?<\/li>)/g, (match) => `<ul style="margin:0.4em 0 0.4em 1.1em;padding:0;">${match}</ul>`)
      // newlines → <br>
      .replace(/\n/g, "<br>");
  }
})();
// ═══════════════════════════════════════════════════════════════════


// ── Page Transition ───────────────────────────────────────────────────
(function () {
  function isSameSite(href) {
    try {
      const url = new URL(href, location.href);
      return url.origin === location.origin;
    } catch { return false; }
  }

  document.addEventListener("click", function (e) {
    const link = e.target.closest("a[href]");
    if (!link) return;

    const href = link.getAttribute("href");

    // Skip: new tab, hash-only, external, mailto, tel
    if (
      link.target === "_blank" ||
      link.hasAttribute("download") ||
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      !isSameSite(href)
    ) return;

    e.preventDefault();

    document.body.classList.add("page-leaving");

    setTimeout(() => {
      window.location.href = href;
    }, 270);
  });
})();
// ── /Page Transition ──────────────────────────────────────────────────
