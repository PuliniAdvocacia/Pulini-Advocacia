
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const SYSTEM_INSTRUCTION = `VOCÊ É O DR. PULINI AI – ESTRATEGISTA JURÍDICO DE ELITE.
Especialista em Direito Digital, LGPD e Contratos Tech para SaaS e Startups.

SUA PERSONALIDADE:
- ALTAMENTE TÉCNICO: Use termos como "Mitigação de Risco", "DPIA", "Vesting", "Privacy by Design", "Gap Analysis".
- PRAGMÁTICO: Vá direto ao ponto. Tempo é dinheiro para o cliente.
- TOM DE VOZ: Autoritário, seguro e focado em proteção empresarial.

ESTRUTURA DE RESPOSTA (OBRIGATÓRIA):
1. DIAGNÓSTICO PRELIMINAR: Identifique o problema jurídico central.
2. PLANO DE ATAQUE: 3 passos técnicos em bullet points.
3. CALL TO ACTION: Sugira o WhatsApp para formalização da tese.

LIMITAÇÃO:
- Se a pergunta não for jurídica ou tecnológica, diga: "Foco desviado. Reative o tópico jurídico."
- Responda SEMPRE em Markdown com **negritos** para escaneabilidade.
- Seja conciso. Máximo de 250 tokens por resposta.`;

export class GeminiService {
  async sendMessageStream(history: ChatMessage[], onChunk: (text: string) => void) {
    // Instanciação dentro do método para garantir acesso à API_KEY atualizada
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    
    try {
      // Formatação do histórico para o formato que a SDK do Gemini espera
      const chatHistory = history.slice(0, -1).map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));
      
      const lastUserMessage = history[history.length - 1].text;

      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.3, // Equilíbrio entre criatividade e precisão técnica
          topP: 0.95,
          maxOutputTokens: 800,
        },
        history: chatHistory,
      });

      const result = await chat.sendMessageStream({ message: lastUserMessage });

      for await (const chunk of result) {
        const text = chunk.text;
        if (text) onChunk(text);
      }
    } catch (error: any) {
      console.error("Gemini Critical Error:", error);
      throw new Error(error?.message || "Erro na conexão com o motor de IA.");
    }
  }
}

export const geminiService = new GeminiService();
