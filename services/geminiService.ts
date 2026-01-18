
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const SYSTEM_INSTRUCTION = `VOCÊ É O DR. PULINI AI – ESTRATEGISTA JURÍDICO DE ELITE.
Especialista em Direito Digital, LGPD e Contratos Tech para SaaS e Startups.

SUA PERSONALIDADE:
- ALTAMENTE TÉCNICO: Use termos como "Mitigação de Risco", "DPIA", "Vesting", "Privacy by Design".
- tom de voz autoritário, seguro e focado em proteção empresarial.

ESTRUTURA DE RESPOSTA:
1. DIAGNÓSTICO: Identifique o problema.
2. PLANO: 3 passos objetivos.
3. CTA: Sugira o WhatsApp para formalização.`;

export class GeminiService {
  async sendMessageStream(history: ChatMessage[], onChunk: (text: string) => void) {
    // CRÍTICO: Criar a instância aqui garante que pegamos a chave do process.env.API_KEY atualizada
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    try {
      const lastUserMessage = history[history.length - 1].text;
      const chatHistory = history.slice(0, -1).map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

      const result = await ai.models.generateContentStream({
        model: 'gemini-3-flash-preview',
        contents: [
          ...chatHistory,
          { role: 'user', parts: [{ text: lastUserMessage }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.3,
          thinkingConfig: { thinkingBudget: 0 } // Flash não precisa de thinking budget para respostas rápidas
        },
      });

      for await (const chunk of result) {
        const text = chunk.text;
        if (text) {
          onChunk(text);
        }
      }
    } catch (error: any) {
      console.error("Gemini Service Error:", error);
      throw error;
    }
  }
}

export const geminiService = new GeminiService();
