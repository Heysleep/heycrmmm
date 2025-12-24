import { GoogleGenAI } from "@google/genai";
import { Customer, MattressSpec } from "../types";

// Initialize Gemini Client
// Note: In a real production build, ensure process.env.API_KEY is populated via build tools or environment config.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = "gemini-3-flash-preview";

export const generateSalesEmail = async (customer: Customer, context: string): Promise<string> => {
  try {
    const prompt = `
      You are an expert sales assistant for a high-end handmade mattress workshop called "DreamCraft".
      Write a polite, professional, and warm follow-up email (in Chinese) to a customer.

      Customer Name: ${customer.name}
      Current Status: ${customer.status}
      Customer Notes: ${customer.notes}
      Specific Context for this email: ${context}

      Keep it concise (under 200 words). Focus on craftsmanship, health, and personalized sleep experience.
      Return ONLY the email body text.
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });

    return response.text || "无法生成邮件，请稍后重试。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "AI 服务暂时不可用，请检查网络或 API Key 设置。";
  }
};

export const recommendConfiguration = async (customerNeed: string): Promise<string> => {
  try {
    const prompt = `
      You are a master mattress craftsman with 30 years of experience.
      Based on the customer's description of their sleep problems or preferences, recommend a specific configuration (Materials, Firmness, Support system).

      Customer Need: "${customerNeed}"

      Output format (Markdown):
      - **推荐硬度**: [Soft/Medium/Hard]
      - **核心材料**: [List 2-3 materials like Talalay Latex, Mini Pocket Springs, Horsehair, Organic Cotton]
      - **设计理由**: [Brief explanation of why this solves their problem]
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });

    return response.text || "无法生成推荐。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "无法分析需求。";
  }
};

export const analyzeMarketTrends = async (): Promise<string> => {
   try {
    const prompt = `
      Analyze current global trends in the luxury handmade mattress market for 2024-2025.
      Focus on materials (e.g., organic, sustainable), customization trends, and customer values.
      Provide a bulleted list in Chinese.
    `;
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });
    return response.text || "暂无数据";
   } catch (error) {
     console.error("Gemini Error", error);
     return "分析失败";
   }
}
