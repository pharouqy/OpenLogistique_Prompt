const OpenAIApi = require("openai");
const Configuration = require("openai"); // Correction : Utilisez { Configuration } pour éviter la confusion avec le module OpenAI

exports.prompt = async (req, res, next) => {
  console.log(req.body.prompt);
  const obj = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: req.body.prompt,
      },
    ],
    temperature: 0.5,
    max_tokens: 1024,
  };
  // Configuration de l'API OpenAI
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    organisation: process.env.OPENAI_ORGANISATION,
  });
  const openai = new OpenAIApi(configuration); // Correction : Utilisez "new OpenAIApi" pour initialiser l'API OpenAI
  try {
    // Génération de la réponse de l'assistant
    const completion = await openai.chat.completions.create(obj);
    const completion_text = completion.choices[0].message.content;
    // Envoi de la réponse au frontend avec un statut 200
    res.status(200).json({ response: completion_text });
  } catch (error) {
    console.error("Erreur : ", error);
    // Envoi d'une réponse d'erreur au frontend avec un statut 500 (ou autre statut approprié)
    res.status(500).json({
      error:
        "Une erreur s'est produite lors de la communication avec l'API OpenAI.",
    });
  }
};