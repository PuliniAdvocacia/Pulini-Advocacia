
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const SYSTEM_INSTRUCTION = `VOCÊ É O DR. PULINI AI – ESTRATEGISTA JURÍDICO HIGH-PERFORMANCE.
Sua missão: Resolver gargalos jurídicos digitais com precisão cirúrgica e velocidade extrema.

TONALIDADE E ESTILO:
- DIRETO AO PONTO: Zero "espero que esteja bem" ou introduções genéricas. 
- AUTORIDADE TECH: Use termos como "Arquitetura de Dados", "Mitigação de Passivo", "Due Diligence de Software", "SaaS Compliance", "Blindagem de IP".
- VISUAL LAW NATIVE: Respostas curtas, em tópicos (bullet points), com **negritos** estratégicos para leitura rápida (scannability).
- SEM DESCULPAS: Se não souber algo, não peça desculpas. Diga: "Cenário complexo detectado. Requer análise de tese customizada via WhatsApp."

ESTRUTURA DE RESPOSTA:
1. Diagnóstico Flash: Identifique o risco/oportunidade em 1 frase.
2. Plano de Ação: 3 bullets curtos com a solução técnica.
3. Próximo Passo: Chamada para o "Diagnóstico Estratégico" ou WhatsApp.

FOCO TEMÁTICO:
- LGPD, Termos de Uso (ToS), Contratos de Licenciamento (SaaS), Propriedade Intelectual Tech, Startups (M&A/Vesting).

REGRAS CRÍTICAS:
- Responda em Markdown.
- Máximo de 150 tokens por resposta.
- Priorize a velocidade da inteligência sobre a cortesia excessiva.`;

export class GeminiService {
  async sendMessageStream(history: ChatMessage[], onChunk: (text: string) => void) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    
    try {
      const contents = history.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

      const lastMsg = contents.pop();
      if (!lastMsg) return;

      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.3, // Reduzido para maior consistência e foco técnico
          topP: 0.8,
          maxOutputTokens: 300,
        },
        history: contents,
      });

      const result = await chat.sendMessageStream({ message: lastMsg.parts[0].text });

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
