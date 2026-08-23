# AGENT.MD — Agent Context & Change Log

## ⚠️ RULE FOR ALL AI AGENTS (READ THIS FIRST)

1. **Session start:** Sabse pehle is file (`agent.md`) ko PURA read karo — ye file project ka
   change log rakhti hai. Isse tumhe pata chalega ki pichhle sessions me kya-kya changes
   kiye gaye the.
2. **Session end / har kaam ke baad:** Jo bhi changes tumne project me kiye (naya feature,
   bug fix, file add/edit/delete, config change), unhe is file ke **CHANGE LOG** section me
   aaj ki date ke saath add karo. Date already exist karti hai to usi heading ke neeche
   naye entries daalo.
3. **Format:** Naya change is format me likho:
   `- [file/path ya feature ka naam] — kya change kiya (short, 1-2 lines)`
4. Purani entries ko kabhi delete ya edit mat karo — sirf append karo.
5. User preference (from replit.md): existing project structure ko maintain rakho —
   bina poochhe restructure/migrate mat karo.

---

## Project Overview (Quick Context)

**Infinity Fitness Gym** (Kaithal) — multi-page marketing website + backend API.

- **Monorepo:** pnpm workspaces (`artifacts/*`, `lib/*`, `scripts`)
- **Frontend** (`artifacts/infinity-fitness`): React 19, Vite 7, Tailwind CSS v4,
  shadcn/ui, Framer Motion, wouter (routing), TanStack Query
  - Pages: `/` Home, `/about`, `/services`, `/membership`, `/gallery`, `/contact`,
    `/testimonials`, `/owner`
  - Global components: `Navbar`, `Footer`, `ChatBot` (AI coach), `WhatsAppButton`, `ScrollToTop`
- **API Server** (`artifacts/api-server`): Express 5, port 8080
  - `GET /api/healthz` — health check
  - `POST /api/inquiry` — contact form → Nodemailer Gmail SMTP (`GMAIL_APP_PASSWORD`)
  - `POST /api/chat` — AI chatbot proxy → Groq API (`GROQ_API_KEY`)
  - `POST /api/tts` — text-to-speech proxy → Cartesia API (`CARTESIA_API_KEY`)
- **Libs:** `lib/db` (Drizzle ORM + PostgreSQL, schema abhi empty),
  `lib/api-spec` (OpenAPI), `lib/api-zod`, `lib/api-client-react` (orval-generated)
- **Env vars:** `GMAIL_APP_PASSWORD`, `SESSION_SECRET`, `DATABASE_URL`,
  `GROQ_API_KEY`, `CARTESIA_API_KEY` (`.env` me, commit mat karna)

### Run Locally (Windows)

- Terminal 1 (API, port 8080): `pnpm --filter @workspace/api-server run dev`
- Terminal 2 (Frontend, port 5173): `pnpm --filter @workspace/infinity-fitness run dev`
- Ya phir: `.\start-servers.ps1`
- Browser: http://localhost:5173 (Vite `/api` ko 8080 pe proxy karta hai)

---

## CHANGE LOG

> Agents: yahan neeche daily changes date-wise add karte raho. Sabse naye changes
> usi date ke section me list karo.

### 2026-08-22

- [agent.md] — File created. Ye change-log/context file banayi gayi taaki har session
  (koi bhi AI agent use ho) sabse pehle ise read kare aur apne changes yahan record kare.

### 2026-08-23

- [artifacts/infinity-fitness/public/infinity.mp4] — Nayi video `infinity.mp4`
  (`C:\Users\LENOVO\Videos\Captures\infinity.mp4` se copy ki) public folder me add ki.
- [artifacts/infinity-fitness/src/components/HeroVideoCarousel.tsx] — Home page hero
  background video `/hero-bg.mp4` se hatakar `/infinity.mp4` par point kiya.
  Video `muted` attribute + `vid.muted = true` (useEffect) ke saath mute hi chalegi.
- [artifacts/infinity-fitness/public/client-review.mp4, comeback.mp4] — Captures folder
  (`C:\Users\LENOVO\Videos\Captures\`) se `client review.mp4` → `client-review.mp4` aur
  `comeback.mp4` copy karke public me add kiya.
- [artifacts/infinity-fitness/src/pages/Gallery.tsx] — Gallery section update:
  (1) 3 nayi videos add ki (Client Review, Comeback Story, Infinity Fitness — total 5),
  (2) lightbox me video ab sound ke saath khulti hai + mute/unmute button,
  browser block kare to auto-muted fallback,
  (3) sequence playback — video khatam hone par agli apne aap chalti hai (wrap-around),
  prev/next buttons + ArrowLeft/ArrowRight keyboard support + counter "1 / 5",
  (4) videos aur photos grid items par whileTap press animation (scale 0.95).
- [artifacts/infinity-fitness/src] — Saare pre-existing TypeScript errors fix kiye
  (typecheck ab 0 errors):
  - `About.tsx`, `Owner.tsx` — fadeUp/photoRevealItem variants ko framer-motion ke
    `Variants` type se annotate kiya (`ease: 'easeOut'` string widen ho kar type error
    de raha tha). Runtime behavior unchanged.
  - `ChatBot.tsx:154` — `new Blob(chunks)` me TS 5.7+ ki new `Uint8Array<ArrayBufferLike>`
    generic typing BlobPart se match nahi hoti thi; `chunks as BlobPart[]` cast lagaya.
    Runtime behavior unchanged.
- [artifacts/infinity-fitness/src/pages/Gallery.tsx] — Video/photo cards ka clutter
  hataya (user feedback: "bekaar ki cheezein, attractive nahi"):
  - Videos: "Video" badge + hamesha dikhne wala bada play button + heavy border caption
    hataye. Ab clean reels-style grid (5 columns), play button + caption sirf hover par
    fade-in hote hain.
  - Photos: mixed aspect-ratio + row-span-2 wala uneven grid hata kar uniform `3/4`
    portrait grid kiya. Caption ab hover par slide-up hota hai, subtle ring highlight
    hover par add kiya.
- [artifacts/infinity-fitness/src/pages/Gallery.tsx] — Videos ki sequence badli (user
  request): Infinity Fitness Gym Reel → Client Review → Comeback Story → Infinity
  Fitness → Best Gym in Kaithal.
- [artifacts/infinity-fitness/src/components/GymHeroSlideshow.tsx] — `startIndex` prop
  add kiya taaki har page ki hero slideshow alag photo se shuru ho (pehle sab pages me
  first photo same thi). Overlay bhi dark kiya (`from-black/75 via-black/35 to-black/10`)
  kyunki About/Services/Membership pages par white text visible nahi ho raha tha.
- [artifacts/infinity-fitness/src/pages/About.tsx, Services.tsx, Membership.tsx,
  Contact.tsx] — Alag-alag startIndex pass kiya: About=0, Services=2, Membership=4,
  Contact=6. Loop sequence same rahta hai.
- [start-servers.ps1] — Preview "Failed to load page" bug fix (user report: VS Code
  band karke wapas kholne par localhost:5173 nahi khulta). Root cause: dev servers
  VS Code terminal ke andar chalte the, VS Code close hote hi processes mar jaate
  the. Fix: servers ab `cmd.exe` wrapper + `Start-Process -WindowStyle Hidden` se
  DETACHED hidden processes me start hote hain (VS Code/terminal band hone par bhi
  zinda rehte hain). Purane Start-Job approach ko replace kiya (jo parent session
  ke saath mar jaata tha). Ports 8080/5173 par stale processes ab start se pehle
  clean hote hain; API dist missing ho to auto-build; health-check polling add ki.
- [scripts/dev-api.cmd, scripts/dev-web.cmd] — Naye cmd wrappers jo api/vite ko
  logs redirect (`logs/api-server.log`, `logs/web-dev.log`) ke saath detached
  chalate hain.
- [stop-servers.ps1] — Naya script: dono servers (ports 8080 & 5173) gracefully
  band karne ke liye.
- [.vscode/tasks.json] — "Gym: Start Servers" task `runOn: folderOpen` ke saath:
  project VS Code me khulte hi dono servers AUTOMATIC background me start ho jaate
  hain. Plus "Gym: Stop Servers" aur "Gym: Restart Servers" tasks.
- [.vscode/settings.json] — `"task.allowAutomaticTasks": "on"` taaki folderOpen
  task bina permission prompt ke chale.
- [artifacts/infinity-fitness/src/index.css] — **TEXT VISIBILITY BUG FIX** (user report:
  navbar ke Home/About/Services sab pages par text proper visible nahi tha). Root cause:
  site ka pura design dark-first hai (hardcoded `text-white`, `text-gray-300`,
  `bg-[#050505]`, `white/5` borders) lekin `:root` theme tokens LIGHT the
  (`--background: white`, dark foreground, near-white cards) → jo sections
  `bg-background` use karte the unme WHITE bg par WHITE/light-gray text invisible ho
  raha tha (About story section, Services/Membership pricing cards, Contact info,
  Home "Our Programs" heading, etc.). Fix: `:root` tokens ko DARK palette me flip kiya —
  `--background: 0 0% 4%`, `--foreground: 0 0% 98%`, card/popover dark grays,
  `--muted-foreground: 0 0% 64%` (readable gray), accent dark-orange tint, borders
  `0 0% 15%`. Ek hi file se saare pages + Navbar/Footer/forms ek saath fix. Primary,
  gold, destructive tokens unchanged. Typecheck (0 errors) aur vite build dono verify
  kiye — pass.
- [artifacts/api-server/src/routes/inquiry.ts] — **AUTO-REPLY EMAIL AUTOMATION**
  (user request: customer ko form bhejne ke 1 min ke andar digitalguru99908@gmail.com
  se automatic reply jaye):
  - `POST /api/inquiry` ab optional/validated `email` field accept karta hai
    (regex validation, galat email par 400).
  - Owner notification email me customer ka Email row bhi add kiya + HTML escaping
    (`escapeHtml`) lagayi taaki form values se HTML injection na ho.
  - Customer ko turant branded dark-theme confirmation email jata hai (fire-and-forget,
    owner mail ke seconds baad — response client ko pehle hi chala jata hai):
    "24 ghante ke andar call karenge" acknowledgment + WhatsApp button + address/timings.
  - **Smart FAQ auto-answers:** keyword matcher customer ke message se topic detect
    karta hai aur email me "Quick Answers" section add hota hai — Fees (₹2,000/month,
    ₹6,000/6mo, ₹11,000/yr), Timings (7 days till 11 PM, busiest 6–9 PM), Location,
    Free Trial, Payment methods, Freeze policy, Trainers, Programs. Unknown query
    (jaise owner ka ghar) par generic fallback: "1–2 din me jawab, jaldi ke liye
    072063 33820 par call karo". Deterministic hai — koi AI hallucination risk nahi.
  - API rebuild karke servers restart kiye; live server par validation tests
    (missing name → 400, bad email → 400) pass.
- [artifacts/infinity-fitness/src/pages/Contact.tsx] — Contact form upgrade:
  (1) required **Email** field add kiya (auto-reply isi par jayega) — backend bhi
  validate karta hai; (2) **animations**: processing state me button spinner
  (`Loader2 animate-spin`) + pulse, success panel spring entrance + checkmark pop +
  ripple burst + staggered text fade-in (AnimatePresence mode="wait" se smooth
  form↔success swap), error banner shake animation. Success message me customer ka
  naam + "auto-reply email inbox me bheja gaya" note dikhta hai.
- [artifacts/infinity-fitness/src/pages/Testimonials.tsx] — Reviews page (navbar ka
  "Reviews") hero section me **client-review.mp4 background video** lagayi (public
  folder me pehle se thi, Captures wali hi). Video autoplay + loop, **by default
  MUTED** — bottom-right me mute/unmute circular toggle button (Gallery lightbox ke
  style wala: `bg-black/50 backdrop-blur-sm border-white/20`), click karke unmute.
  White heading readability ke liye dark scrim (`bg-black/65`) + top/bottom gradient
  fade. Purana dot-pattern/glow background hataya. Typecheck pass; video dev server
  par HTTP 200 serve ho rahi hai.
- [artifacts/infinity-fitness/src/pages/Testimonials.tsx] — Video layout REDESIGN
  (user feedback: full-bleed `object-cover` me client/trainer dono ke faces cut ho
  rahe the + video visibility bahut kam thi). Fix: hero ab **reel-style portrait
  card** dikhata hai — video 9/16 aspect card me poori visible (zero crop = faces
  safe), primary glow ring + rounded-2xl frame, hover par subtle scale. Background
  me same video ki blurred (blur-3xl, opacity-35) ambient copy + light gradient —
  page khali na lage. Mute/unmute button ab card ke andar bottom-right. Heading
  side me left-align desktop par ("Real Members · Real Results" label add kiya),
  mobile par stacked. Typecheck pass.
- [artifacts/api-server/src/routes/chat.ts] — **CHATBOT VOICE FIX** (user report:
  chatbot bol kar reply nahi de raha). Root cause: Cartesia ne June 2026 se `sonic-2`
  se Hindi (`hi`) language sunset kar di thi — English requests abhi chalti thin,
  Hinglish/Hindi TTS 400 "Model sunsetted" error de rahi thi (logs me confirm hua).
  Fix: `model_id` ko stable **`sonic-3`** par migrate kiya + request me explicit
  `language` field add kiya. Verify: Hindi aur English dono TTS ab 200 + real audio
  bytes return karti hain. NOTE: Oct 20, 2026 ko sonic-2/sonic-turbo/sonic-3
  (2025-10-27 snapshot) fully sunsetting hai — future me sonic-3.5 / sonic-preview
  par migrate karna ho sakta hai.
- [artifacts/infinity-fitness/src/pages/Contact.tsx] — Success panel text simplify:
  "Auto-reply email aapke inbox me bhej diya gaya" wali line hata di (user request),
  ab sirf "Thanks, {naam}!" + English line "We'll contact you within 24 hours."
  dikhti hai. Typecheck pass.
- [SERVER ACCESS] — User ko mila "unknown certificate error": browser https://localhost:5173
  khol raha tha (Chrome kabhi-kabhi auto-upgrade kar deta hai). Site sirf
  **http://localhost:5173** par kholni hai (koi HTTPS setup nahi hai local dev me).
  Agar Chrome force kare to chrome://net-internals/#hsts → "Delete domain security
  policies" → `localhost` daal ke clear karo.
