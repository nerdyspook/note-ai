import { Configuration, OpenAIApi } from "openai-edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

// generate a detailed description for note book name for DALLE to generate proper image
export async function generateImagePrompt(name: string) {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a creative and helpful AI assistant capable of generating interesting thumbnail descriptions for my notes. Your output will be fed into the DALL-E API to generate a thumbnail. The description should be minimalistic and flat-styled.",
        },
        {
          role: "user",
          content: `Please generate a thumbnail description for my notebook title ${name}`,
        },
      ],
    });

    const data = await response.json();
    const image_description = data.choices[0].message.content;

    return image_description as string;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function generateImage(image_description: string) {
  try {
    const response = await openai.createImage({
      prompt: image_description,
      n: 1, // number of images to be generated
      size: "256x256",
    });

    const data = await response.json();
    const image_url = data.data[0].url;

    return image_url as string;
  } catch (error) {
    console.error(error);
  }
}
