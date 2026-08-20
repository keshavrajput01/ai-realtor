# AI Real-Estate Calling System

A mobile-first AI voice calling application for real-estate lead qualification and management.

## 🎯 Purpose

Transform real-estate lead management through autonomous AI voice conversations:

```
LEAD → AI CALL → NATURAL CONVERSATION → QUALIFICATION → INTENT DETECTION → SCORING → SUMMARY → FOLLOW-UP → HANDOFF
```

## ✨ Core Features

- **AI Voice Agent**: Professional conversational AI for lead qualification
- **Browser Voice Calling**: WebRTC-based calling (no phone number required for development)
- **Speech Recognition**: STT supporting English, Hindi, and Hinglish
- **Text-to-Speech**: Natural voice responses
- **Lead Management**: Import, track, and manage leads
- **Intelligent Scoring**: 0-100 lead intent scoring
- **Call Intelligence**: Automatic transcription, summary, and classification
- **Follow-up System**: Smart scheduling and reminders
- **Mobile-First**: Fully responsive design for all devices
- **Free Development**: Open-source AI during development
- **Provider Abstraction**: Swap AI/STT/TTS providers without code changes
- **Security First**: No credentials in frontend, secure authentication

## 🏗️ Architecture

### Voice Pipeline
```
MICROPHONE → STT → AI BRAIN → TEXT RESPONSE → TTS → SPEAKER
```

### Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js + React + TypeScript + TailwindCSS |
| **Backend** | Node.js + Express + TypeScript |
| **Database** | PostgreSQL + Prisma ORM |
| **Auth** | NextAuth.js + JWT |
| **Voice** | WebRTC + Web Audio API |
| **AI** | Provider abstraction (Ollama/Local-first) |
| **STT** | Provider abstraction (Whisper/local) |
| **TTS** | Provider abstraction (ElevenLabs/local) |
| **Real Telephony** | Modular architecture (ready for SIP/Twilio) |

## 📊 Database Models

- **users**: Authentication and profile
- **leads**: Contact information and lead tracking
- **projects**: Real-estate project details
- **call_sessions**: Individual call records
- **call_transcripts**: Call conversation logs
- **call_outcomes**: Results and scores
- **follow_ups**: Scheduled follow-up actions
- **ai_settings**: Configuration and knowledge base

## 🚀 Development Phases

- [x] **Phase 1**: Repository setup and architecture
- [ ] **Phase 2**: Application structure and dependencies
- [ ] **Phase 3**: Database schema and migrations
- [ ] **Phase 4**: Authentication system
- [ ] **Phase 5**: Lead import (CSV/XLSX)
- [ ] **Phase 6**: Browser/WebRTC voice
- [ ] **Phase 7**: Speech-to-Text (STT)
- [ ] **Phase 8**: Free/open AI brain
- [ ] **Phase 9**: Text-to-Speech (TTS)
- [ ] **Phase 10**: Conversation engine
- [ ] **Phase 11**: Lead qualification
- [ ] **Phase 12**: AI scoring system
- [ ] **Phase 13**: Call summaries
- [ ] **Phase 14**: Follow-up automation
- [ ] **Phase 15**: Dashboard and analytics
- [ ] **Phase 16**: Mobile optimization
- [ ] **Phase 17**: Security audit
- [ ] **Phase 18**: End-to-end testing

## 🔑 Key Features by Release

### MVP (Phase 1-9)
- User registration and login
- Lead import from CSV/XLSX
- Browser-based AI voice calls
- Basic lead qualification
- Call transcripts
- Simple dashboard

### Phase 2 (Phase 10-14)
- Intelligent conversation engine
- Advanced lead scoring
- AI-generated summaries
- Automatic follow-up scheduling
- Call history and replay

### Phase 3 (Phase 15-18)
- Advanced analytics dashboard
- Mobile app optimization
- Real telephony support (SIP, Twilio)
- Google Sheets integration
- Security hardening

## 📱 Mobile-First Design

- Touch-optimized UI
- Large call buttons
- Voice-first interface
- Offline support (planned)
- Native PWA capabilities

## 🔐 Security

- No API keys in frontend
- Environment-based secrets
- User data isolation
- Secure call recording
- Encrypted sensitive data
- Rate limiting and DDoS protection

## 🎤 Lead Qualification Flow

1. **Opening**: AI introduces itself and confirms availability
2. **Discovery**: Natural conversation about property interest
3. **Qualification**: AI identifies:
   - Genuine interest
   - Budget clarity
   - Timeline
   - Preferred location
   - Property type
   - Purpose (investment/end-use)
   - Decision-maker status
   - Site-visit readiness
4. **Objection Handling**: AI addresses concerns
5. **Scoring**: 0-100 intent score
6. **Classification**: HOT / WARM / COLD / NOT_INTERESTED / CALLBACK
7. **Summary**: AI generates executive summary
8. **Follow-up**: Smart scheduling based on lead behavior

## 💬 Language Support

- **English**: Full support
- **Hindi**: Full support
- **Hinglish**: Full support
- Auto-detection: AI responds in lead's language

## 🆓 Free-First Philosophy

All development uses free/open-source components:
- **AI**: Ollama (local LLMs)
- **STT**: Whisper (OpenAI's free model)
- **TTS**: gTTS or Coqui TTS (open-source)
- **Calling**: WebRTC (native browser)
- **Database**: PostgreSQL (open-source)

Future paid services are optional and configurable.

## 🚫 What This Is NOT

- Not a static demo
- Not fake calling functionality
- Not hard-coded responses
- Not limited to single AI provider
- Not missing mobile support
- Not storing credentials in code

## 📋 Getting Started

See [DEVELOPMENT.md](./DEVELOPMENT.md)

## 🤝 Contributing

Contributions welcome. Please ensure:
- Code is TypeScript
- Tests pass
- No hardcoded credentials
- Mobile-responsive
- Privacy-first

## 📄 License

MIT

## 👤 Author

keshavrajput01

---

**Status**: 🔨 Active Development - Phase 2 starting
