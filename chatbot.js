// ═══════════════════════════════════════════════════════════════════
// PORTFOLIO CHATBOT — Groq llama-3.3-70b-versatile
// Works on all pages. Detects current page and shows a relevant
// welcome message + page summary when navigated to from another page.
// ═══════════════════════════════════════════════════════════════════
(function () {

  // ── Page detection ─────────────────────────────────────────────────
  const PAGE = (function () {
    const path = window.location.pathname.split("/").pop() || "index.html";
    if (path === "awards.html")         return "awards";
    if (path === "certifications.html") return "certifications";
    if (path === "research.html")       return "research";
    if (path === "youtube.html")        return "youtube";
    if (path === "leadership.html")     return "leadership";
    return "home";
  })();

  // ── Page-specific welcome messages ────────────────────────────────
  const WELCOME = {
    home:
      "Hi! 👋 I'm Aditya's portfolio assistant. Ask me anything — his projects, skills, experience, research, or how to get in touch.",
    awards:
      "🏆 You're on the **Awards & Recommendations** page!\n\nHere you'll find:\n- **1st Place** — NASA Space Hackathon 2025 (North India Zone)\n- **1st Place** — TechFest AI in Education\n- **3rd Place** — Grafest AI in Healthcare\n- **2× State AI Hackathon Finalist**\n- A letter of recommendation from the HOD, BIAS\n\nAsk me anything about Aditya's achievements!",
    certifications:
      "📜 You're on the **Certifications** page!\n\nThis page lists 10 ranked certifications including:\n- Multi-Agent Systems with CrewAI (DeepLearning.AI)\n- Masters in Generative AI & LLMs (GeeksforGeeks)\n- Azure AI Fundamentals (Microsoft)\n- Applied AI Lab (WorldQuant University)\n\nAsk me about any specific certification!",
    research:
      "🔬 You're on the **Research** page!\n\nAditya has two research works:\n- **First-Author Paper** (March 2026): Hybrid Multi-Agent Conversational AI Architecture — +11.9% accuracy over single-model baseline\n- **Synopsis**: Generative AI-Based Cloud Removal for LISS-IV Satellite Imagery\n\nAsk me for more details on either!",
    youtube:
      "📺 You're on the **YouTube** page!\n\nAditya runs the **BuilderBroo** channel featuring:\n- Prompt Engineering Series (2 videos live)\n- AI/ML tutorials and LLM walkthroughs\n- Generative AI project demos\n\nAsk me about the videos or the channel!",
    leadership:
      "🎯 You're on the **Leadership** page!\n\nAditya has held **8 leadership roles** including:\n- Coding Club Head\n- Google Campus Ambassador\n- IIT Madras & IIT Delhi Student Ambassador\n- Placement Cell Head\n- ILO Officer\n\nAsk me about any role!",
  };

  // ── Knowledge base (system prompt) ────────────────────────────────
  const SYSTEM_PROMPT = `You are a helpful portfolio assistant for Aditya Suyal. Answer questions accurately and concisely using only the information provided below. If a question is not covered by this information, say you don't have that detail but suggest the user contact Aditya directly.

IMPORTANT — Navigation rule:
NEVER include "NAVIGATE:" unless the user's message BOTH:
1. Contains an explicit action verb: "open", "go to", "take me to", "navigate to", "switch to", "load", OR "show" / "visit" combined with a page name
2. AND explicitly names a page: "awards", "certifications", "leadership", "research", "youtube", "home", "main page"

If the user just asks a QUESTION about a topic (even if it matches a page name), NEVER navigate — just answer.

RIGHT examples (navigate):
- "open the awards page" → NAVIGATE:awards.html
- "take me to certifications" → NAVIGATE:certifications.html
- "go to leadership" → NAVIGATE:leadership.html
- "show me the research page" → NAVIGATE:research.html
- "open youtube" → NAVIGATE:youtube.html
- "go home" → NAVIGATE:index.html

WRONG examples (DO NOT navigate, just answer):
- "what awards does Aditya have?" → answer only, NO NAVIGATE
- "show me his certifications" → answer only, NO NAVIGATE
- "tell me about his research" → answer only, NO NAVIGATE
- "what leadership roles does he have?" → answer only, NO NAVIGATE
- "show his projects" → answer only, NO NAVIGATE

When navigation IS triggered, respond with a short confirmation AND the exact text "NAVIGATE:" followed by the URL.

Available pages:
- awards.html — Awards and achievements
- certifications.html — Professional certifications
- leadership.html — Leadership experience
- research.html — Research papers and technical writing
- youtube.html — YouTube channel
- index.html — Main portfolio / home page

=== ABOUT ADITYA SUYAL ===
Name: Aditya Suyal
Role: AI/ML Engineer & Generative AI Developer
Education: 3rd-year B.Tech CSE student at Birla Institute of Applied Sciences (BIAS), Bhimtal
Focus: Generative AI engineering, Agentic AI, RAG, NLP, Computer Vision, Satellite Imagery Analysis, Scalable ML
Core Stack: Python, PyTorch, LangChain, transformer fine-tuning, MLOps
GitHub: https://github.com/Adirohansuyal
LinkedIn: https://www.linkedin.com/in/aditya-suyal
Email: adityasuyal0001@gmail.com

=== EXPERIENCE ===
1. AI Research and Development Trainee — CAIR, DIBER (DRDO), Bengaluru (Current)
   - Building LLM workflows combining model reasoning, retrieval, tool use, and structured outputs
   - Exploring autonomous agents and AI automation for defense research contexts

2. AI Agent Development Intern — Shell Global Pvt. Ltd. | Remote | Dec 2025 – Feb 2026
   - Built production-grade multi-agent AI systems with LangChain and CrewAI
   - Reduced manual processing by 65%, reached 88% task accuracy

3. Generative AI Intern — Analytics Vidhya | Remote | Nov 2025 – Dec 2025
   - Developed RAG pipelines and scalable AI APIs using FAISS embeddings
   - 10K+ documents, 92% retrieval accuracy, 500+ concurrent users

=== PROJECTS ===
1. Generative AI-Based Cloud Removal for LISS-IV Satellite Imagery — Python, PyTorch, SAR Fusion
2. Hybrid Multi-Agent Conversational AI Architecture — CrewAI, Llama 3.3 (+11.9% accuracy)
3. Memory-Augmented LLM using LSTM — PyTorch, LSTM, Transformers
4. CivicAI — Streamlit, Folium, OSRM, multi-agent backend on Render
5. Adaptive AI Steganography — Python, Streamlit, Fernet, PBKDF2
6. Fashion Product Intelligence System — CLIP, FAISS, embeddings
7. Private RAG Document QA System — LangChain, FAISS, Gemma-2B (90% relevance, 0.4s latency)
8. Agentic AI Multi-Agent System for EV Research — Python, Agno, Groq, AWS (70% effort reduction)

=== RESEARCH ===
1. Hybrid Multi-Agent Conversational AI Architecture — First-Author Paper, March 2026
   - 10-agent framework, supervisor routing, competitive debate, +11.9% accuracy
2. Cloud Removal for LISS-IV Satellite Imagery — Synopsis, SAR-optical fusion, NDVI preservation

=== SKILLS ===
ML & Deep Learning: Python, PyTorch, TensorFlow, scikit-learn, OpenCV, CLIP, CNNs, RNNs, LSTMs, Transformers, LoRA, QLoRA, NLP, Computer Vision
GenAI & LLMs: LangChain, LlamaIndex, CrewAI, Autogen, LangGraph, RAG, Embeddings, Vector DBs, Prompt Engineering, Agentic AI, Multi-Agent Systems
LLM Models: GPT-4, Gemini Pro, Llama 2/3, Mistral, Stable Diffusion, Tool Calling, RLHF
MLOps & Deployment: FAISS, Pinecone, ChromaDB, MongoDB, SQL, AWS EC2/Lambda/S3, Docker, Kubernetes, REST APIs, CI/CD

=== AWARDS ===
- 1st Place — NASA Space Hackathon 2025, North India Zone
- 1st Place — TechFest AI in Education
- 3rd Place — Grafest AI in Healthcare
- 2× State AI Hackathon Finalist
- Letter of Recommendation from HOD, Dept. of CSE, BIAS Bhimtal

=== CERTIFICATIONS (ranked) ===
1. Multi-Agent Systems with CrewAI — DeepLearning.AI
2. Masters in Generative AI & LLMs — GeeksforGeeks
3. Applied AI Lab for Deep Learning & CV — WorldQuant University
4. Generative AI Fundamentals — Databricks
5. Applied Data Science Lab (16 weeks) — WorldQuant University
6. Azure AI Fundamentals — Microsoft
7. Data Science Fundamentals — Cisco
8. SQL Advanced — HackerRank
9. Machine Learning with Python — freeCodeCamp
10. Power BI Data Analyst — Microsoft

=== LEADERSHIP (8 roles) ===
1. Event Coordinator — BIAS
2. Placement Cell Coordinator — BIAS
3. Placement Cell Head — BIAS
4. ILO Officer — GPF
5. Coding Club Head — BIAS
6. Google Campus Ambassador
7. IIT Madras Campus Ambassador
8. IIT Delhi Student Ambassador

=== YOUTUBE — BuilderBroo ===
Channel: youtube.com/@BuilderBroo
Content: Prompt Engineering Series, AI/ML tutorials, LLM agents, GenAI demos
Videos live:
- EP.1: Learn Prompt Engineering from Scratch (10:29) — https://youtu.be/qKFBiaWns68
- EP.2: Zero-Shot Prompting Technique (18:21) — https://youtu.be/hMPqgu0NO1o

=== CONTACT ===
Email: adityasuyal0001@gmail.com
LinkedIn: https://www.linkedin.com/in/aditya-suyal
GitHub: https://github.com/Adirohansuyal

Keep answers concise, friendly, and professional. Use bullet points for lists. Do not make up any information not listed above.`;

  // API key lives in Netlify environment — never hardcoded here.
  // Requests go to the serverless proxy at netlify/functions/groq-proxy.js
  const GROQ_MODEL = "llama-3.3-70b-versatile";
  const GROQ_URL   = "/.netlify/functions/groq-proxy";

  // ── Extract readable content from the current page ─────────────────
  function getPageContext() {
    const parts = [];

    // Current page name
    parts.push(`Current page: ${PAGE}`);

    // All headings (h1–h3) inside main content
    const headings = [
      ...document.querySelectorAll(
        "main h1, main h2, main h3, .page-hero h1, .research-hero h1, .channel-name"
      )
    ]
      .map(el => el.innerText.trim())
      .filter(Boolean);
    if (headings.length)
      parts.push("Headings on page:\n" + headings.map(h => `  - ${h}`).join("\n"));

    // Card/item content (awards, certs, research, videos, timeline, projects)
    const cards = [
      ...document.querySelectorAll(
        ".award-card, .cert-card, .research-page-card, .video-card article, " +
        ".tl-content, .project-card, .exp-card, [data-reveal]"
      )
    ];
    if (cards.length) {
      const cardTexts = cards
        .slice(0, 12)
        .map(el => el.innerText.replace(/\s+/g, " ").trim().slice(0, 220))
        .filter(Boolean);
      if (cardTexts.length)
        parts.push("Visible items on page:\n" + cardTexts.map(t => `  • ${t}`).join("\n"));
    }

    // Hero / about paragraphs
    const paras = [
      ...document.querySelectorAll(
        ".page-hero p, .research-hero p, .channel-desc, #about p, .about-text p"
      )
    ]
      .map(el => el.innerText.trim())
      .filter(Boolean)
      .slice(0, 3);
    if (paras.length)
      parts.push("Page intro:\n" + paras.map(p => `  ${p}`).join("\n"));

    return "\n\n=== WHAT IS CURRENTLY ON SCREEN ===\n" + parts.join("\n\n");
  }

  // ── Inject chatbot CSS (self-contained, works on any page) ────────
  function injectStyles() {
    if (document.getElementById("chatbot-styles")) return; // already injected
    const style = document.createElement("style");
    style.id = "chatbot-styles";
    style.textContent = `
.chat-fab {
  align-items: center;
  background: #2563eb;
  border: none;
  border-radius: 50%;
  bottom: 1.75rem;
  box-shadow: 0 8px 28px rgba(37,99,235,0.45);
  color: #fff;
  cursor: pointer;
  display: flex;
  height: 3.25rem;
  justify-content: center;
  position: fixed;
  right: 1.75rem;
  transition: background 250ms, box-shadow 250ms, transform 250ms;
  width: 3.25rem;
  z-index: 9999;
}
.chat-fab:hover {
  background: #1d4ed8;
  box-shadow: 0 12px 36px rgba(59,130,246,0.55);
  transform: translateY(-3px) scale(1.05);
}
.chat-fab-icon { transition: opacity 180ms, transform 180ms; }
.chat-fab-icon--close { display: none; }
.chat-fab.is-open .chat-fab-icon--open  { display: none; }
.chat-fab.is-open .chat-fab-icon--close { display: block; }

/* Backdrop — hidden on desktop, shown on mobile via media query */
.chat-backdrop { display: none; }

.chat-window {
  background: #0d1117;
  border: 1px solid rgba(59,130,246,0.25);
  border-radius: 20px;
  bottom: 6rem;
  box-shadow: 0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(59,130,246,0.1);
  display: flex;
  flex-direction: column;
  font-family: Inter, system-ui, sans-serif;
  height: min(560px, calc(100dvh - 8rem));
  position: fixed;
  right: 1.75rem;
  width: min(380px, calc(100vw - 2rem));
  z-index: 9998;
  /* Hidden by default — use transform+opacity so transitions work */
  opacity: 0;
  pointer-events: none;
  transform: translateY(16px) scale(0.97);
  transition: opacity 220ms ease, transform 220ms ease;
}
.chat-window.is-open {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0) scale(1);
  animation: none;
}
@keyframes chatbot-in {
  from { opacity: 0; transform: translateY(16px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

.chat-header {
  align-items: center;
  background: linear-gradient(135deg, #0f1923 0%, #111827 100%);
  border-bottom: 1px solid rgba(59,130,246,0.18);
  border-radius: 20px 20px 0 0;
  display: flex;
  justify-content: space-between;
  padding: 0.9rem 1rem;
  flex-shrink: 0;
}
.chat-header-info { align-items: center; display: flex; gap: 0.65rem; }
.chat-header-row  { display: flex; align-items: center; justify-content: space-between; width: 100%; }
.chat-avatar {
  align-items: center;
  background: linear-gradient(135deg,#1d4ed8,#7c3aed);
  border-radius: 50%;
  color: #fff;
  display: flex;
  font-size: 0.9rem;
  font-weight: 800;
  height: 2.1rem;
  justify-content: center;
  overflow: hidden;
  width: 2.1rem;
  flex-shrink: 0;
}
.chat-avatar--img { background: none; object-fit: cover; object-position: top center; }
.chat-header-name { color: #f8fafc; font-size: 0.88rem; font-weight: 700; margin: 0; line-height: 1.2; }
.chat-header-sub  { color: #64748b; font-size: 0.72rem; margin: 0; line-height: 1.3; }
.chat-close-btn {
  align-items: center;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 8px;
  color: #94a3b8;
  cursor: pointer;
  display: flex;
  height: 1.9rem;
  justify-content: center;
  transition: background 200ms, color 200ms;
  width: 1.9rem;
}
.chat-close-btn:hover { background: rgba(255,255,255,0.1); color: #f8fafc; }

.chat-messages {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.75rem;
  min-height: 0;
  overflow-y: auto;
  padding: 1rem;
  scroll-behavior: smooth;
}
.chat-messages::-webkit-scrollbar { width: 4px; }
.chat-messages::-webkit-scrollbar-track { background: transparent; }
.chat-messages::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }

.chat-msg { display: flex; flex-direction: column; gap: 0.2rem; max-width: 88%; }
.chat-msg--user { align-self: flex-end; align-items: flex-end; }
.chat-msg--bot  { align-self: flex-start; align-items: flex-start; }
.chat-bubble { border-radius: 14px; font-size: 0.84rem; line-height: 1.6; padding: 0.65rem 0.9rem; word-break: break-word; }
.chat-msg--user .chat-bubble { background: linear-gradient(135deg,#1d4ed8,#2563eb); border-bottom-right-radius: 4px; color: #fff; }
.chat-msg--bot  .chat-bubble { background: #1b2430; border: 1px solid rgba(255,255,255,0.07); border-bottom-left-radius: 4px; color: #e2e8f0; }

.chat-typing .chat-bubble { align-items: center; display: flex; gap: 4px; padding: 0.75rem 1rem; }
.chat-typing-dot { animation: chatbot-bounce 1.2s ease-in-out infinite; background: #64748b; border-radius: 50%; height: 6px; width: 6px; }
.chat-typing-dot:nth-child(2) { animation-delay: 0.2s; }
.chat-typing-dot:nth-child(3) { animation-delay: 0.4s; }
@keyframes chatbot-bounce {
  0%,60%,100% { transform: translateY(0); opacity: 0.4; }
  30%          { transform: translateY(-5px); opacity: 1; }
}

.chat-suggestions {
  border-top: 1px solid rgba(255,255,255,0.06);
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  padding: 0.65rem 1rem;
  flex-shrink: 0;
}
.chat-suggestions button {
  background: rgba(37,99,235,0.1);
  border: 1px solid rgba(37,99,235,0.25);
  border-radius: 999px;
  color: #93c5fd;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.73rem;
  font-weight: 600;
  padding: 0.3rem 0.75rem;
  transition: background 200ms, border-color 200ms, color 200ms;
  white-space: nowrap;
}
.chat-suggestions button:hover { background: rgba(37,99,235,0.22); border-color: rgba(59,130,246,0.5); color: #fff; }
.chat-suggestions.is-hidden { display: none; }

.chat-input-row {
  align-items: center;
  background: #0d1117;
  border-top: 1px solid rgba(255,255,255,0.07);
  border-radius: 0 0 20px 20px;
  display: flex;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  flex-shrink: 0;
}
.chat-input {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px;
  color: #f8fafc;
  flex: 1;
  font-family: inherit;
  font-size: 0.84rem;
  min-width: 0;
  outline: none;
  padding: 0.55rem 0.75rem;
  transition: border-color 200ms;
}
.chat-input::placeholder { color: #475569; }
.chat-input:focus { border-color: rgba(59,130,246,0.5); }
.chat-send-btn {
  align-items: center;
  background: #2563eb;
  border: none;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  height: 2.1rem;
  justify-content: center;
  transition: background 200ms, transform 150ms;
  width: 2.1rem;
}
.chat-send-btn:hover    { background: #1d4ed8; transform: scale(1.08); }
.chat-send-btn:disabled { background: #1e293b; cursor: not-allowed; transform: none; }

@media (max-width: 480px) {
  /* ── Full-screen overlay on mobile ── */
  .chat-backdrop {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.55);
    backdrop-filter: blur(4px);
    z-index: 9997;
    opacity: 0;
    pointer-events: none;
    transition: opacity 260ms ease;
  }
  .chat-backdrop.is-open {
    opacity: 1;
    pointer-events: auto;
  }

  .chat-window {
    /* Cover the full screen */
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    max-height: 100%;
    border-radius: 0;
    border: none;
    bottom: auto;
    right: auto;
    /* Keyboard: input row respects soft keyboard */
    padding-bottom: env(safe-area-inset-bottom, 0px);
    /* Override desktop transform with slide-from-bottom */
    transform: translateY(100%);
    transition: transform 300ms cubic-bezier(0.32, 0.72, 0, 1), opacity 260ms ease;
  }
  .chat-window.is-open {
    transform: translateY(0);
    opacity: 1;
  }

  /* Hide the FAB while chat is open on mobile */
  .chat-fab.is-open {
    opacity: 0;
    pointer-events: none;
    transform: scale(0.8);
  }

  /* Header: drag handle pill at top */
  .chat-header {
    border-radius: 0;
    padding: 0.6rem 1rem 0.75rem;
    flex-direction: column;
    gap: 0.5rem;
  }
  .chat-header::before {
    content: "";
    display: block;
    width: 36px;
    height: 4px;
    border-radius: 2px;
    background: rgba(255,255,255,0.2);
    margin: 0 auto;
  }
  .chat-header-sub { display: block; }

  /* Messages area fills remaining space */
  .chat-messages { flex: 1; padding: 1rem; gap: 0.75rem; }
  .chat-bubble { font-size: 0.9rem; padding: 0.7rem 0.9rem; }

  /* Suggestions: single scrollable row */
  .chat-suggestions {
    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    padding: 0.5rem 1rem;
  }
  .chat-suggestions::-webkit-scrollbar { display: none; }
  .chat-suggestions button { flex-shrink: 0; font-size: 0.75rem; }

  /* Input row sticks above keyboard */
  .chat-input-row {
    padding: 0.75rem 1rem;
    padding-bottom: max(0.75rem, env(safe-area-inset-bottom, 0.75rem));
    border-radius: 0;
  }
  /* font-size 1rem prevents iOS auto-zoom on focus */
  .chat-input { font-size: 1rem; border-radius: 14px; padding: 0.7rem 0.9rem; }
  .chat-send-btn { height: 2.6rem; width: 2.6rem; border-radius: 14px; }
}
@media (prefers-reduced-motion: reduce) {
  .chat-window { transition: none !important; animation: none !important; }
  .chat-typing-dot { animation: none; opacity: 0.6; }
}
    `;
    document.head.appendChild(style);
  }

  // ── Inject chatbot HTML into the page ─────────────────────────────
  function injectHTML() {
    const html = `
    <div class="chat-backdrop" id="chat-backdrop"></div>
    <button class="chat-fab" id="chat-fab" aria-label="Open portfolio chatbot" type="button">
      <svg class="chat-fab-icon chat-fab-icon--open" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      <svg class="chat-fab-icon chat-fab-icon--close" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
    <div class="chat-window" id="chat-window" role="dialog" aria-modal="true" aria-label="Portfolio assistant">
      <div class="chat-header">
        <div class="chat-header-row">
          <div class="chat-header-info">
            <img class="chat-avatar chat-avatar--img" src="assets/aditya-corporate.png" alt="Aditya" aria-hidden="true" />
            <div>
              <p class="chat-header-name">Aditya's Assistant</p>
              <p class="chat-header-sub">Ask me anything about this portfolio</p>
            </div>
          </div>
          <button class="chat-close-btn" id="chat-close-btn" type="button" aria-label="Close chat">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      </div>
      <div class="chat-messages" id="chat-messages" aria-live="polite" aria-relevant="additions"></div>
      <div class="chat-suggestions" id="chat-suggestions">
        <button type="button">What projects has Aditya built?</button>
        <button type="button">What is his tech stack?</button>
        <button type="button">Tell me about his experience</button>
        <button type="button">Show me his awards page</button>
      </div>
      <form class="chat-input-row" id="chat-form" autocomplete="off">
        <input class="chat-input" id="chat-input" type="text"
          placeholder="Ask about skills, projects, experience…"
          maxlength="400" aria-label="Your message" />
        <button class="chat-send-btn" type="submit" aria-label="Send message">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </form>
    </div>`;
    document.body.insertAdjacentHTML("beforeend", html);
  }

  // ── State ──────────────────────────────────────────────────────────
  const history = [];
  let isLoading = false;
  let chatOpen  = false;

  // ── Init ───────────────────────────────────────────────────────────
  function init() {
    // Inject CSS and HTML if not already in the DOM (for pages that don't have it hardcoded)
    injectStyles();
    if (!document.getElementById("chat-fab")) injectHTML();

    const fab         = document.getElementById("chat-fab");
    const win         = document.getElementById("chat-window");
    const closeBtn    = document.getElementById("chat-close-btn");
    const messagesEl  = document.getElementById("chat-messages");
    const form        = document.getElementById("chat-form");
    const inputEl     = document.getElementById("chat-input");
    const sendBtn     = form ? form.querySelector(".chat-send-btn") : null;
    const suggestionsEl = document.getElementById("chat-suggestions");

    if (!fab || !win) return;

    const backdrop = document.getElementById("chat-backdrop");
    const isMobile = () => window.innerWidth <= 480;

    // ── Open / close ─────────────────────────────────────────────────
    function openChat() {
      chatOpen = true;
      win.classList.add("is-open");
      fab.classList.add("is-open");
      fab.setAttribute("aria-label", "Close portfolio chatbot");
      if (backdrop) backdrop.classList.add("is-open");
      // Lock body scroll while chat is open (especially on mobile)
      document.body.style.overflow = "hidden";
      // Delay focus on mobile so the slide-up finishes before keyboard triggers
      setTimeout(() => inputEl.focus(), isMobile() ? 280 : 0);
      if (!messagesEl.children.length) addWelcome();
    }

    function closeChat() {
      chatOpen = false;
      win.classList.remove("is-open");
      fab.classList.remove("is-open");
      fab.setAttribute("aria-label", "Open portfolio chatbot");
      if (backdrop) backdrop.classList.remove("is-open");
      document.body.style.overflow = "";
      inputEl.blur(); // dismiss keyboard on mobile
    }

    fab.addEventListener("click", (e) => { e.stopPropagation(); chatOpen ? closeChat() : openChat(); });
    closeBtn.addEventListener("click", (e) => { e.stopPropagation(); closeChat(); });
    if (backdrop) backdrop.addEventListener("click", () => closeChat());
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && chatOpen) closeChat(); });

    // ── Welcome message with page-specific content ───────────────────
    function addWelcome() {
      addBotMessage(WELCOME[PAGE] || WELCOME.home);
    }

    // ── Suggestion chips ─────────────────────────────────────────────
    if (suggestionsEl) {
      suggestionsEl.querySelectorAll("button").forEach((btn) => {
        btn.addEventListener("click", () => {
          const text = btn.textContent.trim();
          suggestionsEl.classList.add("is-hidden");
          sendMessage(text);
        });
      });
    }

    // ── Form submit ──────────────────────────────────────────────────
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = inputEl.value.trim();
      if (!text || isLoading) return;
      inputEl.value = "";
      if (suggestionsEl) suggestionsEl.classList.add("is-hidden");
      sendMessage(text);
    });

    // ── Core send / receive ──────────────────────────────────────────
    async function sendMessage(text) {
      addUserMessage(text);
      history.push({ role: "user", content: text });
      isLoading = true;
      if (sendBtn) sendBtn.disabled = true;
      const typingEl = addTypingIndicator();

      try {
        const res = await fetch(GROQ_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: GROQ_MODEL,
            messages: [
              { role: "system", content: SYSTEM_PROMPT + getPageContext() },
              ...history.slice(-10)
            ],
            max_tokens: 700,
            temperature: 0.5,
            stream: false
          })
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error?.message || `HTTP ${res.status}`);
        }

        const data  = await res.json();
        const reply = data.choices?.[0]?.message?.content?.trim()
          || "Sorry, I couldn't get a response. Please try again.";

        typingEl.remove();

        const navMatch = reply.match(/NAVIGATE:\s*(\S+)/);
        if (navMatch) {
          // Client-side guard: BOTH a nav verb AND a page name must be present.
          // This prevents the LLM from navigating on purely informational questions.
          const navVerb = /\b(open|go to|take me|navigate|visit|switch to|load|bring up)\b/i;
          const showWithPage = /\bshow\b.*(page|awards|certifications|leadership|research|youtube|home)/i;
          const pageName = /\b(awards|certifications|leadership|research|youtube|home|main page|portfolio)\b/i;
          const userIntended = (navVerb.test(text) && pageName.test(text)) || showWithPage.test(text);

          if (userIntended) {
            const url        = navMatch[1];
            const cleanReply = reply.replace(/NAVIGATE:\s*\S+/g, "").trim();
            addBotMessage(cleanReply);
            playReplySound();
            history.push({ role: "assistant", content: cleanReply });
            sessionStorage.setItem("chatbot_nav", "1");
            setTimeout(() => { window.location.href = url; }, 900);
          } else {
            // Strip NAVIGATE: and just answer the question
            const cleanReply = reply.replace(/NAVIGATE:\s*\S+/g, "").trim();
            addBotMessage(cleanReply);
            playReplySound();
            history.push({ role: "assistant", content: cleanReply });
          }
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

    // ── Sound ────────────────────────────────────────────────────────
    function playReplySound() {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        [1046.5, 880].forEach((freq, i) => {
          const osc  = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          const t = ctx.currentTime + i * 0.13;
          gain.gain.setValueAtTime(0, t);
          gain.gain.linearRampToValueAtTime(0.18, t + 0.01);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.28);
          osc.start(t);
          osc.stop(t + 0.3);
        });
      } catch (_) {}
    }

    // ── Message renderers ────────────────────────────────────────────
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
      el.innerHTML = `<div class="chat-bubble">${formatMessage(text)}</div>`;
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

    // ── Helpers ──────────────────────────────────────────────────────
    function scrollToBottom() { messagesEl.scrollTop = messagesEl.scrollHeight; }

    function escapeHtml(str) {
      return str.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
    }

    function formatMessage(text) {
      return escapeHtml(text)
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/^[-•]\s+(.+)$/gm, "<li>$1</li>")
        .replace(/(<li>[\s\S]*?<\/li>)/g, m => `<ul style="margin:0.4em 0 0.4em 1.1em;padding:0;">${m}</ul>`)
        .replace(/\n/g, "<br>");
    }

    // ── Auto-open with page summary if navigated here via bot ────────
    // When the bot triggers navigation, sessionStorage flag is set.
    // On the destination page: auto-open chat and show the page summary.
    if (sessionStorage.getItem("chatbot_nav") === "1") {
      sessionStorage.removeItem("chatbot_nav");
      setTimeout(() => {
        // Force open (bypass the "already has messages" guard)
        chatOpen = true;
        win.classList.add("is-open");
        fab.classList.add("is-open");
        fab.setAttribute("aria-label", "Close portfolio chatbot");

        // Show a "page opened" confirmation + summary as a bot message
        const pageSummaries = {
          awards:
            "✅ Done! I've opened the **Awards & Recommendations** page for you.\n\n" +
            "Here's a quick summary:\n" +
            "- 🥇 **1st Place** — NASA Space Hackathon 2025, North India Zone\n" +
            "- 🥇 **1st Place** — TechFest AI in Education\n" +
            "- 🥉 **3rd Place** — Grafest AI in Healthcare\n" +
            "- 🏅 **2× State AI Hackathon Finalist**\n" +
            "- 📄 Letter of Recommendation from the HOD, Dept. of CSE, BIAS\n\n" +
            "Ask me anything about these achievements!",
          certifications:
            "✅ Done! I've opened the **Certifications** page for you.\n\n" +
            "Here's a quick summary of Aditya's top 10 certifications:\n" +
            "- Multi-Agent Systems with CrewAI — DeepLearning.AI\n" +
            "- Masters in Generative AI & LLMs — GeeksforGeeks\n" +
            "- Applied AI Lab for Deep Learning & CV — WorldQuant University\n" +
            "- Azure AI Fundamentals — Microsoft\n" +
            "- SQL Advanced — HackerRank\n" +
            "- ...and 5 more!\n\n" +
            "Ask me about any specific certification!",
          research:
            "✅ Done! I've opened the **Research** page for you.\n\n" +
            "Here's a quick summary:\n" +
            "- 📄 **First-Author Paper** (March 2026): Hybrid Multi-Agent Conversational AI Architecture — +11.9% accuracy over single-model baseline, 31.4% fewer unnecessary tool calls\n" +
            "- 🛰️ **Synopsis**: Generative AI-Based Cloud Removal for LISS-IV Satellite Imagery — SAR-optical fusion, NDVI preservation\n\n" +
            "Ask me for details on either research work!",
          youtube:
            "✅ Done! I've opened the **YouTube (BuilderBroo)** page for you.\n\n" +
            "Here's a quick summary:\n" +
            "- 📺 Channel: **BuilderBroo** (@BuilderBroo)\n" +
            "- EP.1: Learn Prompt Engineering from Scratch (10:29)\n" +
            "- EP.2: Zero-Shot Prompting Technique (18:21)\n" +
            "- More videos coming soon: Few-Shot, Chain-of-Thought, LLM Agents\n\n" +
            "Ask me about the channel or any video!",
          leadership:
            "✅ Done! I've opened the **Leadership** page for you.\n\n" +
            "Here's a quick summary of Aditya's 8 leadership roles:\n" +
            "- 💻 Coding Club Head — BIAS\n" +
            "- 🎓 Placement Cell Head — BIAS\n" +
            "- 🌐 Google Campus Ambassador\n" +
            "- 🏛️ IIT Madras & IIT Delhi Student Ambassador\n" +
            "- 🤝 ILO Officer — GPF\n" +
            "- 📋 Event Coordinator & Placement Cell Coordinator — BIAS\n\n" +
            "Ask me about any of these roles!",
          home:
            "✅ Done! I've taken you back to the **main portfolio** page.\n\n" +
            "Here's what you'll find here:\n" +
            "- 👨‍💻 About Aditya — AI/ML Engineer & GenAI Developer\n" +
            "- 💼 Work Experience (DRDO, Shell, Analytics Vidhya)\n" +
            "- 🚀 Projects (8 AI/ML projects)\n" +
            "- 🛠️ Skills & Tech Stack\n" +
            "- 📬 Contact Info\n\n" +
            "What would you like to explore?"
        };

        addBotMessage(pageSummaries[PAGE] || pageSummaries.home);
        scrollToBottom();
      }, 700);
    }
  }

  // Run after DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
// ═══════════════════════════════════════════════════════════════════
