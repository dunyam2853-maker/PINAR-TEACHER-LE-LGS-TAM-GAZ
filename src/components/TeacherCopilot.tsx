import React, { useState } from "react";
import {
  BotMessageSquare,
  Send,
  BookOpen,
  MessageSquare,
  Copy,
  Printer,
  RefreshCw,
  Lightbulb
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

export const TeacherCopilot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-init",
      sender: "ai",
      text: `Hello Teacher! I am your AI LGS English Teaching Copilot. I specialize in the MEB 8th Grade English curriculum. 

You can ask me to:
• Generate reading passages & listening scripts
• Create printable vocabulary & grammar worksheets
• Draft parent progress updates & announcements
• Prepare speaking exam rubrics and dialogue prompts
• Explain tricky LGS distractor questions

How can I help your classroom today?`,
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
    }
  ]);
  const [inputText, setInputText] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const [activeVaultTab, setActiveVaultTab] = useState<"chat" | "vault">("chat");

  const quickPrompts = [
    "Draft an announcement for parents about next week's LGS Mock Exam.",
    "Generate a 10-question fill-in-the-blanks worksheet for Unit 3 (In the Kitchen) cooking verbs.",
    "Create a 4-line telephone dialogue with 'bad line' and 'put through' for Unit 4.",
    "Prepare an English speaking exam scoring rubric with 4 criteria (Fluency, Vocab, Grammar, Pronunciation)."
  ];

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputText;
    if (!textToSend.trim() || isSending) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customPrompt) setInputText("");
    setIsSending(true);

    try {
      const response = await fetch("/api/gemini/teacher-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          chatHistory: messages.slice(-6).map((m) => ({
            role: m.sender === "user" ? "user" : "model",
            parts: [{ text: m.text }]
          }))
        })
      });

      if (!response.ok) throw new Error("Failed to send message");
      const data = await response.json();

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: data.reply || "I have prepared the requested educational material for you.",
        timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: "ai",
        text: "I encountered a momentary connection issue. Here is a quick guideline: for LGS questions, always ensure distractors test common reading pitfalls like 'does NOT accept' or misinterpreting 'invitee' as 'inviter'.",
        timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsSending(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="no-print bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black shadow-xs">
            <BotMessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-800">
              AI English Teacher Assistant (Copilot) & Resource Vault
            </h2>
            <p className="text-xs text-slate-500">
              Printable worksheets, speaking exam rubrics, parent notifications, and MEB lesson resources.
            </p>
          </div>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveVaultTab("chat")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
              activeVaultTab === "chat" ? "bg-white text-indigo-700 shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>AI Copilot Chat</span>
          </button>
          <button
            onClick={() => setActiveVaultTab("vault")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
              activeVaultTab === "vault" ? "bg-white text-indigo-700 shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Material Vault</span>
          </button>
        </div>
      </div>

      {/* TAB 1: AI COPILOT CHAT */}
      {activeVaultTab === "chat" && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Chat Panel */}
          <div className="lg:col-span-3 bg-white border border-slate-200 rounded-xl p-4 sm:p-6 shadow-sm flex flex-col h-[650px]">
            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin">
              {messages.map((msg) => {
                const isAi = msg.sender === "ai";
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start space-x-3 ${isAi ? "justify-start" : "justify-end"}`}
                  >
                    {isAi && (
                      <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white flex-shrink-0 text-xs font-bold shadow-2xs">
                        AI
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed space-y-2 ${
                        isAi
                          ? "bg-slate-50 border border-slate-200 text-slate-800"
                          : "bg-indigo-600 text-white font-medium shadow-xs"
                      }`}
                    >
                      <div className="whitespace-pre-line">{msg.text}</div>
                      <div className={`flex items-center justify-between pt-1 border-t text-[10px] ${isAi ? "border-slate-200 text-slate-400" : "border-indigo-500/50 text-indigo-100"}`}>
                        <span>{msg.timestamp}</span>
                        {isAi && (
                          <button
                            onClick={() => copyToClipboard(msg.text)}
                            className="hover:text-indigo-600 flex items-center space-x-1 transition"
                          >
                            <Copy className="w-3 h-3" />
                            <span>Copy Text</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              {isSending && (
                <div className="flex items-center space-x-2 text-xs text-indigo-700 bg-indigo-50 border border-indigo-100 p-3 rounded-xl w-fit">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-600" />
                  <span>AI is generating your educational materials...</span>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <div className="pt-4 border-t border-slate-200">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center space-x-2"
              >
                <input
                  type="text"
                  placeholder="Type your request (e.g., Create 5 phone dialogue completion questions for Unit 4)..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  disabled={isSending || !inputText.trim()}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-xs disabled:opacity-50 transition flex items-center space-x-1.5"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </form>
            </div>
          </div>

          {/* Quick Prompts Sidebar */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center space-x-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              <span>Quick Prompt Ideas</span>
            </h3>

            <div className="space-y-2">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-indigo-300 text-xs text-slate-700 transition"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: READY MATERIAL VAULT */}
      {activeVaultTab === "vault" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Top 50 Irregular Verbs for LGS */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-xs">
              V1-V2
            </div>
            <h3 className="text-base font-bold text-slate-800">LGS Essential Irregular Verbs Chart</h3>
            <p className="text-xs text-slate-500">
              The 50 most frequent irregular verbs in LGS biographies, historical contexts, and past narrative questions (Base, Past Simple, Past Participle).
            </p>
            <button
              onClick={() => {
                alert("Printing LGS Irregular Verbs Worksheet...");
                window.print();
              }}
              className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold py-2 rounded-xl text-xs border border-slate-200 flex items-center justify-center space-x-1.5 transition shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5 text-indigo-600" />
              <span>Print Worksheet</span>
            </button>
          </div>

          {/* Card 2: Speaking Exam Assessment Rubric */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 font-bold text-xs">
              MEB
            </div>
            <h3 className="text-base font-bold text-slate-800">Speaking Exam Assessment Rubric</h3>
            <p className="text-xs text-slate-500">
              MEB-aligned 4-criteria assessment scale (Fluency, Vocabulary Range, Grammar Accuracy, Pronunciation) graded on a 100-point scale.
            </p>
            <button
              onClick={() => {
                alert("Printing Speaking Exam Assessment Rubric...");
                window.print();
              }}
              className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold py-2 rounded-xl text-xs border border-slate-200 flex items-center justify-center space-x-1.5 transition shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5 text-emerald-600" />
              <span>Print Assessment Rubric</span>
            </button>
          </div>

          {/* Card 3: LGS Exam Tactics Cheat Sheet */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
            <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 font-bold text-xs">
              LGS
            </div>
            <h3 className="text-base font-bold text-slate-800">Student Exam Strategies & Tactics Guide</h3>
            <p className="text-xs text-slate-500">
              Guide to mastering question stems (NOT, EXCEPT, ACCORDING TO), visual/chart interpretation pitfalls, and pacing strategy.
            </p>
            <button
              onClick={() => {
                alert("Printing Student Exam Tactics Guide...");
                window.print();
              }}
              className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold py-2 rounded-xl text-xs border border-slate-200 flex items-center justify-center space-x-1.5 transition shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5 text-amber-600" />
              <span>Print Tactics Guide</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
