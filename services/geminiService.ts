
import { GoogleGenAI, Type } from "@google/genai";
import { ChatMessage } from "../types";

const SYSTEM_INSTRUCTION = `Você é o Assistente Virtual Pulini, da Pulini Advocacia, especializado em Direito Digital e LGPD. 
Responda de forma profissional, ética e concisa. O seu objetivo é tirar dúvidas iniciais e encaminhar para um atendimento humano se necessário.
Não invente leis ou jurisprudências. Seja prestativo mas lembre o usuário que isso não substitui uma consulta jurídica formal.`;

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async sendMessage(history: ChatMessage[], newMessage: string) {
    try {
      const chat = this.ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      // Simple implementation: Send message. For full history, we'd map history to contents.
      const response = await chat.sendMessage({ message: newMessage });
      return response.text;
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw error;
    }
  }
}

export const geminiService = new GeminiService();
