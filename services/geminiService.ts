
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const SYSTEM_INSTRUCTION = `VOCÊ É O DR. PULINI AI – ESTRATEGISTA JURÍDICO DE ELITE.
Especialista em Direito Digital, LGPD e Contratos Tech para SaaS e Startups.

SUA PERSONALIDADE:
- ALTAMENTE TÉCNICO: Use termos como "Mitigação de Risco", "DPIA", "Vesting", "Privacy by Design".
- PRAGMÁTICO: Vá direto ao ponto. Tempo é dinheiro.
- TOM DE VOZ: Autoritário, seguro e focado em proteção empresarial.

ESTRUTURA DE RESPOSTA (OBRIGATÓRIA):
1. DIAGNÓSTICO PRELIMINAR: Identifique o problema jurídico central.
2. PLANO DE ATAQUE: 3 passos técnicos em bullet points.
3. CALL TO ACTION: Sugira o WhatsApp para formalização da tese.

LIMITAÇÕES:
- Responda apenas sobre Direito e Tecnologia.
- Use Markdown: **negritos** para ênfase.
- Seja conciso. Máximo de 200 tokens.`;

export class GeminiService {
  async sendMessageStream(history: ChatMessage[], onChunk: (text: string) => void) {
    // Instanciação dinâmica conforme diretrizes para garantir a captura da API_KEY
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    
    try {
      // Prepara o histórico para o formato da SDK
      const chatHistory = history.slice(0, -1).map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));
      
      const lastUserMessage = history[history.length - 1].text;

      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.3,
          topP: 0.95,
        },
        history: chatHistory as any,
      });

      const result = await chat.sendMessageStream({ message: lastUserMessage });

      for await (const chunk of result) {
        // Acesso direto à propriedade .text (não é método)
        const text = chunk.text;
        if (text) onChunk(text);
      }
    } catch (error: any) {
      console.error("Gemini Error:", error);
      throw new Error(error?.message || "Erro na conexão com o Dr. Pulini AI.");
    }
  }
}

export const geminiService = new GeminiService();
