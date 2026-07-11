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

When the user asks to see or open a specific page (awards, certifications, leadership, research, YouTube, etc.), respond with a confirmation message AND include the exact text "NAVIGATE:" followed by the URL. For example:
- "Sure! Opening the awards page now. NAVIGATE:awards.html"
- "Let me show you the certifications. NAVIGATE:certifications.html"
- "Opening the leadership page. NAVIGATE:leadership.html"
- "Here's the research page. NAVIGATE:research.html"
- "Opening YouTube page. NAVIGATE:youtube.html"
- "Going back to the main portfolio. NAVIGATE:index.html"

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

  const GROQ_API_KEY = "YOUR_API_KEY)";
  const GROQ_MODEL   = "llama-3.3-70b-versatile";
  const GROQ_URL     = "https://api.groq.com/openai/v1/chat/completions";

  // ── Inject chatbot HTML into the page ─────────────────────────────
  function injectHTML() {
    const html = `
    <button class="chat-fab" id="chat-fab" aria-label="Open portfolio chatbot" type="button">
      <svg class="chat-fab-icon chat-fab-icon--open" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      <svg class="chat-fab-icon chat-fab-icon--close" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
    <div class="chat-window" id="chat-window" role="dialog" aria-modal="true" aria-label="Portfolio assistant">
      <div class="chat-header">
        <div class="chat-header-info">
          <div class="chat-avatar" aria-hidden="true">A</div>
          <div>
            <p class="chat-header-name">Aditya's Assistant</p>
            <p class="chat-header-sub">Ask me anything about this portfolio</p>
          </div>
        </div>
        <button class="chat-close-btn" id="chat-close-btn" type="button" aria-label="Close chat">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
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
    // Inject HTML if not already in the DOM (for pages that don't have it hardcoded)
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

    // ── Open / close ─────────────────────────────────────────────────
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

    fab.addEventListener("click", (e) => { e.stopPropagation(); chatOpen ? closeChat() : openChat(); });
    closeBtn.addEventListener("click", (e) => { e.stopPropagation(); closeChat(); });
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
            "Content-Type": "application/json",
            "Authorization": `Bearer ${GROQ_API_KEY}`
          },
          body: JSON.stringify({
            model: GROQ_MODEL,
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
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
          const url        = navMatch[1];
          const cleanReply = reply.replace(/NAVIGATE:\s*\S+/g, "").trim();
          addBotMessage(cleanReply);
          playReplySound();
          history.push({ role: "assistant", content: cleanReply });
          // Mark that we navigated via bot so the destination page auto-opens the chat
          sessionStorage.setItem("chatbot_nav", "1");
          setTimeout(() => { window.location.href = url; }, 900);
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
    // We use sessionStorage to detect a bot-triggered navigation
    if (sessionStorage.getItem("chatbot_nav") === "1" && PAGE !== "home") {
      sessionStorage.removeItem("chatbot_nav");
      setTimeout(() => openChat(), 600);
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
