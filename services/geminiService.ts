
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const SYSTEM_INSTRUCTION = `VOCÊ É O DR. PULINI AI – ESTRATEGISTA JURÍDICO DE ELITE.
Especialista em Direito Digital, LGPD e Contratos Tech para SaaS e Startups.

SUA MISSÃO: Fornecer orientação jurídica precisa, moderna e estratégica.
SUA PERSONALIDADE: Técnico, seguro, focado em mitigação de riscos e proteção de ativos digitais.

DIRETRIZES:
1. Se a pergunta for sobre leis recentes ou eventos atuais, use a pesquisa do Google.
2. Seja pragmático: identifique o problema e sugira o plano de ação (3 passos).
3. Sempre mantenha o tom profissional de um advogado sênior.`;

export class GeminiService {
  async sendMessageStream(history: ChatMessage[], onChunk: (text: string, grounding?: any) => void) {
    // IMPORTANTE: Obter a chave no momento da execução
    const apiKey = process.env.API_KEY;
    
    if (!apiKey) {
      throw new Error("API_KEY_MISSING");
    }

    // Instancia o SDK com a chave atual
    const ai = new GoogleGenAI({ apiKey });
    
    try {
      const lastUserMessage = history[history.length - 1].text;
      const chatHistory = history.slice(0, -1).map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

      // Usando generateContentStream para melhor feedback visual
      const resultStream = await ai.models.generateContentStream({
        model: 'gemini-3-flash-preview',
        contents: [
          ...chatHistory,
          { role: 'user', parts: [{ text: lastUserMessage }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.2,
          tools: [{ googleSearch: {} }],
        },
      });

      let fullText = "";
      let groundingMetadata: any = null;

      for await (const chunk of resultStream) {
        fullText += chunk.text || "";
        // O grounding costuma vir nos últimos chunks ou no objeto final
        if (chunk.candidates?.[0]?.groundingMetadata) {
          groundingMetadata = chunk.candidates[0].groundingMetadata;
        }
        onChunk(fullText, groundingMetadata);
      }
    } catch (error: any) {
      console.error("Gemini Service Error:", error);
      const errorMsg = error.message || "";
      if (errorMsg.includes("API key") || errorMsg.includes("403") || errorMsg.includes("not found")) {
        throw new Error("AUTH_ERROR");
      }
      throw error;
    }
  }
}

export const geminiService = new GeminiService();
