
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
    // Inicialização conforme diretrizes: usar objeto nomeado com apiKey
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    
    try {
      // Prepara o histórico omitindo a última mensagem que será o prompt atual
      const chatHistory = history.slice(0, -1).map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));
      
      const lastUserMessage = history[history.length - 1].text;

      // Criação do chat usando o modelo recomendado
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.2, // Precisão técnica aumentada
          topP: 0.95,
        },
        history: chatHistory as any,
      });

      const result = await chat.sendMessageStream({ message: lastUserMessage });

      for await (const chunk of result) {
        // Acessa .text como propriedade, não método, conforme regras
        const text = chunk.text;
        if (text) onChunk(text);
      }
    } catch (error: any) {
      console.error("Gemini Critical Error:", error);
      throw new Error(error?.message || "Erro de conexão com a inteligência artificial.");
    }
  }
}

export const geminiService = new GeminiService();
