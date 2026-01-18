
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const SYSTEM_INSTRUCTION = `VOCÊ É O DR. PULINI AI – ESTRATEGISTA JURÍDICO DE ELITE.
Especialista em Direito Digital, LGPD e Contratos Tech para SaaS e Startups.

SUA PERSONALIDADE:
- ALTAMENTE TÉCNICO: Use termos como "Mitigação de Risco", "DPIA", "Privacy by Design", "Vesting".
- SEGURO E DIRETO: Tom de voz autoritário mas acessível para empresários.

ESTRUTURA DE RESPOSTA:
1. DIAGNÓSTICO: Identifique o risco jurídico em 1 frase.
2. ESTRATÉGIA: 3 passos práticos para proteção.
3. PRÓXIMO PASSO: Sugira o WhatsApp para formalização com o Dr. Pulini.`;

export class GeminiService {
  async sendMessageStream(history: ChatMessage[], onChunk: (text: string) => void) {
    // A chave deve ser capturada no momento da chamada para refletir seleções do usuário no Studio
    const apiKey = process.env.API_KEY;
    
    if (!apiKey) {
      throw new Error("API_KEY_MISSING");
    }

    const ai = new GoogleGenAI({ apiKey });
    
    try {
      const lastUserMessage = history[history.length - 1].text;
      const chatHistory = history.slice(0, -1).map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

      const responseStream = await ai.models.generateContentStream({
        model: 'gemini-3-flash-preview',
        contents: [
          ...chatHistory,
          { role: 'user', parts: [{ text: lastUserMessage }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.3,
          thinkingConfig: { thinkingBudget: 0 }
        },
      });

      for await (const chunk of responseStream) {
        const text = chunk.text;
        if (text) {
          onChunk(text);
        }
      }
    } catch (error: any) {
      console.error("Gemini Critical Error:", error);
      // Erros 403 ou mensagens sobre chave indicam falha de autenticação
      if (error.message?.includes("API key") || error.message?.includes("403") || error.message?.includes("not found")) {
        throw new Error("AUTH_ERROR");
      }
      throw error;
    }
  }
}

export const geminiService = new GeminiService();
