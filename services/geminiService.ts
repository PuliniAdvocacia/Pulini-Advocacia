
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const SYSTEM_INSTRUCTION = `VOCÊ É O DR. PULINI AI – ESTRATEGISTA JURÍDICO DE ELITE.
Especialista em Direito Digital, LGPD e Contratos Tech para SaaS e Startups.

SUA PERSONALIDADE:
- ALTAMENTE TÉCNICO: Use termos como "Mitigação de Risco", "DPIA", "Vesting", "Privacy by Design", "Gap Analysis".
- PRAGMÁTICO: Vá direto ao ponto. Tempo é dinheiro para o cliente.
- SEM PRELIMINARES: Não use "Olá", "Como posso ajudar". Comece direto no diagnóstico.

ESTRUTURA DE RESPOSTA (OBRIGATÓRIA):
1. DIAGNÓSTICO PRELIMINAR: Identifique o problema jurídico central.
2. PLANO DE ATAQUE: 3 passos técnicos em bullet points.
3. CALL TO ACTION: Sugira o WhatsApp para formalização da tese.

LIMITAÇÃO:
- Se a pergunta não for jurídica ou tecnológica, diga: "Foco desviado. Reative o tópico jurídico."
- Responda SEMPRE em Markdown com **negritos** para escaneabilidade.
- Máximo de 200 tokens.`;

export class GeminiService {
  async sendMessageStream(history: ChatMessage[], onChunk: (text: string) => void) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    
    try {
      // Separamos a última mensagem (o prompt atual) do histórico
      const chatHistory = history.slice(0, -1).map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));
      
      const lastUserMessage = history[history.length - 1].text;

      const chat = ai.chats.create({
        model: 'gemini-2.5-flash-lite-latest', // Modelo ultra-rápido para chat
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.2, // Menor temperatura = maior precisão técnica
          topP: 0.9,
          maxOutputTokens: 500,
        },
        history: chatHistory,
      });

      const result = await chat.sendMessageStream({ message: lastUserMessage });

      for await (const chunk of result) {
        const text = chunk.text;
        if (text) onChunk(text);
      }
    } catch (error) {
      console.error("Gemini Critical Error:", error);
      throw error;
    }
  }
}

export const geminiService = new GeminiService();
